/**
 * backup.worker.ts
 * 
 * Cloudflare Worker com Cron Trigger — roda diariamente às 02:00 UTC.
 * Busca todas as conversas do dia anterior e envia um email de backup
 * para cada usuário com suas conversas em formato legível.
 * 
 * Para ativar:
 * 1. Crie uma conta no Resend (resend.com) — plano gratuito: 3000 emails/mês
 * 2. Adicione RESEND_API_KEY como secret: wrangler secret put RESEND_API_KEY
 * 3. Configure EMAIL_FROM no wrangler.jsonc (ex: "backup@seudominio.com")
 * 4. Faça deploy: wrangler deploy
 */

export interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  EMAIL_FROM: string; // ex: "InfoMind Backup <backup@seudominio.com>"
}

export default {
  // Cron trigger — chamado automaticamente pelo Cloudflare
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runDailyBackup(env));
  },

  // Rota HTTP para testar manualmente: GET /backup-trigger
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname === "/backup-trigger" && request.method === "GET") {
      await runDailyBackup(env);
      return new Response("Backup executado com sucesso.", { status: 200 });
    }
    return new Response("Not found", { status: 404 });
  },
};

async function runDailyBackup(env: Env) {
  const today = new Date();
  const backupDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

  // Busca todos os usuários que têm conversas
  const users = await env.DB.prepare(
    `SELECT DISTINCT user_id, user_email FROM conversations`
  ).all();

  for (const user of users.results as { user_id: string; user_email: string }[]) {
    // Evita enviar backup duplicado no mesmo dia
    const alreadySent = await env.DB.prepare(
      `SELECT id FROM backup_log WHERE user_id = ? AND backup_date = ?`
    )
      .bind(user.user_id, backupDate)
      .first();

    if (alreadySent) continue;

    // Busca conversas das últimas 24h
    const since = new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString();

    const conversations = await env.DB.prepare(
      `SELECT id, title, created_at, updated_at FROM conversations
       WHERE user_id = ? AND updated_at >= ?
       ORDER BY updated_at DESC`
    )
      .bind(user.user_id, since)
      .all();

    if (conversations.results.length === 0) continue;

    // Monta o conteúdo do email
    let emailBody = buildEmailHTML(
      user.user_email,
      backupDate,
      conversations.results as ConversationRow[]
    );

    // Busca mensagens de cada conversa para incluir no email
    for (const conv of conversations.results as ConversationRow[]) {
      const msgs = await env.DB.prepare(
        `SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY created_at ASC`
      )
        .bind(conv.id)
        .all();

      emailBody = emailBody.replace(
        `{{MESSAGES_${conv.id}}}`,
        buildMessagesHTML(msgs.results as MessageRow[])
      );
    }

    // Envia o email via Resend
    await sendEmail(env, {
      to: user.user_email,
      subject: `📋 InfoMind — Backup das suas conversas (${backupDate})`,
      html: emailBody,
    });

    // Registra no log de backup
    await env.DB.prepare(
      `INSERT OR IGNORE INTO backup_log (id, user_id, user_email, backup_date, sent_at)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(crypto.randomUUID(), user.user_id, user.user_email, backupDate, new Date().toISOString())
      .run();
  }
}

// ─── Tipos ───────────────────────────────────────────────────────────────────

type ConversationRow = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

type MessageRow = {
  role: "user" | "assistant";
  content: string;
};

// ─── Envio de email via Resend ────────────────────────────────────────────────

async function sendEmail(
  env: Env,
  { to, subject, html }: { to: string; subject: string; html: string }
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`Erro ao enviar email para ${to}:`, err);
  }
}

// ─── Templates HTML ───────────────────────────────────────────────────────────

function buildEmailHTML(email: string, date: string, conversations: ConversationRow[]) {
  const convSections = conversations
    .map(
      (conv) => `
      <div style="margin-bottom:32px; border:1px solid #e5e5e5; border-radius:12px; overflow:hidden;">
        <div style="background:#f9f6ef; padding:16px 20px; border-bottom:1px solid #e5e5e5;">
          <h3 style="margin:0; font-family:'Playfair Display',serif; color:#1a1a1a; font-size:18px;">
            ${escapeHtml(conv.title)}
          </h3>
          <p style="margin:4px 0 0; font-size:12px; color:#888;">
            Atualizada em ${formatDate(conv.updated_at)}
          </p>
        </div>
        <div style="padding:20px;">
          {{MESSAGES_${conv.id}}}
        </div>
      </div>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Backup InfoMind — ${date}</title>
</head>
<body style="margin:0; padding:0; background:#f5f5f0; font-family:'Poppins',Arial,sans-serif;">
  <div style="max-width:680px; margin:0 auto; padding:32px 16px;">

    <!-- Header -->
    <div style="text-align:center; margin-bottom:32px;">
      <h1 style="font-family:'Playfair Display',serif; font-size:32px; margin:0; color:#1a1a1a;">
        Info<span style="color:#b8962e;">Mind</span>
      </h1>
      <p style="color:#666; font-size:14px; margin:8px 0 0;">Backup diário das suas conversas</p>
    </div>

    <!-- Info card -->
    <div style="background:#fff; border-radius:12px; padding:20px 24px; margin-bottom:28px; border:1px solid #e5e5e5;">
      <p style="margin:0; color:#444; font-size:14px;">
        Olá! Aqui está o backup das suas conversas do dia <strong>${date}</strong>.
        Este email é enviado automaticamente todo dia às 02:00 UTC.
      </p>
    </div>

    <!-- Conversas -->
    ${convSections}

    <!-- Footer -->
    <div style="text-align:center; margin-top:32px; color:#aaa; font-size:12px;">
      <p>© 2026 InfoMind · Este é um email automático, não responda.</p>
    </div>

  </div>
</body>
</html>`;
}

function buildMessagesHTML(messages: MessageRow[]) {
  if (messages.length === 0) return "<p style='color:#aaa;font-size:13px;'>Sem mensagens.</p>";

  return messages
    .map((msg) => {
      const isUser = msg.role === "user";
      return `
      <div style="margin-bottom:12px; display:flex; justify-content:${isUser ? "flex-end" : "flex-start"};">
        <div style="
          max-width:85%;
          padding:10px 14px;
          border-radius:${isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px"};
          background:${isUser ? "#3d6b50" : "#f0f0e8"};
          color:${isUser ? "#fff" : "#1a1a1a"};
          font-size:13px;
          line-height:1.6;
          white-space:pre-wrap;
        ">
          ${escapeHtml(msg.content)}
        </div>
      </div>`;
    })
    .join("");
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

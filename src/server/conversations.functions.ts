import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

// Acessa o binding D1 do Cloudflare
function getDB(): D1Database {
  // @ts-ignore — env disponível no runtime Cloudflare
  const db = (globalThis as any).__env__?.DB ?? (globalThis as any).DB;
  if (!db) throw new Error("D1 database binding 'DB' not found.");
  return db;
}

function nowISO() {
  return new Date().toISOString();
}

function uuid() {
  return crypto.randomUUID();
}

// ─── Salvar ou atualizar conversa ────────────────────────────────────────────

export const salvarConversa = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    z.object({
      conversationId: z.string().optional(), // se null, cria nova
      title: z.string().min(1).max(200),
      messages: z.array(
        z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        })
      ),
    })
  )
  .handler(async ({ data, context }) => {
    const db = getDB();
    const { userId, claims } = context;
    const userEmail = claims.email as string;
    const now = nowISO();

    try {
      let convId = data.conversationId;

      if (!convId) {
        // Nova conversa
        convId = uuid();
        await db
          .prepare(
            `INSERT INTO conversations (id, user_id, user_email, title, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?)`
          )
          .bind(convId, userId, userEmail, data.title, now, now)
          .run();
      } else {
        // Atualiza título e timestamp
        await db
          .prepare(
            `UPDATE conversations SET title = ?, updated_at = ? WHERE id = ? AND user_id = ?`
          )
          .bind(data.title, now, convId, userId)
          .run();

        // Remove mensagens antigas para reinserir
        await db
          .prepare(`DELETE FROM messages WHERE conversation_id = ?`)
          .bind(convId)
          .run();
      }

      // Insere todas as mensagens
      const insertMsg = db.prepare(
        `INSERT INTO messages (id, conversation_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)`
      );

      const batch = data.messages.map((msg) =>
        insertMsg.bind(uuid(), convId, msg.role, msg.content, now)
      );

      if (batch.length > 0) {
        await db.batch(batch);
      }

      return { ok: true, conversationId: convId };
    } catch (e: any) {
      return { ok: false, error: e.message };
    }
  });

// ─── Listar conversas do usuário ─────────────────────────────────────────────

export const listarConversas = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = getDB();
    const { userId } = context;

    try {
      const rows = await db
        .prepare(
          `SELECT id, title, created_at, updated_at
           FROM conversations
           WHERE user_id = ?
           ORDER BY updated_at DESC
           LIMIT 50`
        )
        .bind(userId)
        .all();

      return { ok: true, conversations: rows.results };
    } catch (e: any) {
      return { ok: false, conversations: [], error: e.message };
    }
  });

// ─── Carregar mensagens de uma conversa ──────────────────────────────────────

export const carregarConversa = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator(z.object({ conversationId: z.string() }))
  .handler(async ({ data, context }) => {
    const db = getDB();
    const { userId } = context;

    try {
      // Verifica que a conversa pertence ao usuário
      const conv = await db
        .prepare(`SELECT * FROM conversations WHERE id = ? AND user_id = ?`)
        .bind(data.conversationId, userId)
        .first();

      if (!conv) return { ok: false, error: "Conversa não encontrada." };

      const msgs = await db
        .prepare(
          `SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY created_at ASC`
        )
        .bind(data.conversationId)
        .all();

      return {
        ok: true,
        conversation: conv,
        messages: msgs.results as { role: "user" | "assistant"; content: string }[],
      };
    } catch (e: any) {
      return { ok: false, error: e.message };
    }
  });

// ─── Deletar conversa ────────────────────────────────────────────────────────

export const deletarConversa = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(z.object({ conversationId: z.string() }))
  .handler(async ({ data, context }) => {
    const db = getDB();
    const { userId } = context;

    try {
      await db
        .prepare(`DELETE FROM conversations WHERE id = ? AND user_id = ?`)
        .bind(data.conversationId, userId)
        .run();

      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e.message };
    }
  });

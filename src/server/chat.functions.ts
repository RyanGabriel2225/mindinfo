import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1).max(8000),
});

const InputSchema = z.object({
  historico: z.array(MessageSchema).min(1).max(40),
});

export const chatWithAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { resposta: "", error: "AI gateway não configurado." };
    }

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-5.2",
          messages: [
            {
              role: "system",
              content:
                "Você é o InfoMind, um assistente de IA em português brasileiro. Responda de forma clara, objetiva e bem estruturada. Use markdown quando ajudar a leitura.",
            },
            ...data.historico,
          ],
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          return { resposta: "", error: "Muitas solicitações. Aguarde alguns segundos e tente novamente." };
        }
        if (res.status === 402) {
          return { resposta: "", error: "Créditos da IA esgotados. Adicione créditos no workspace Lovable." };
        }
        const t = await res.text();
        console.error("AI gateway error", res.status, t);
        return { resposta: "", error: "Falha ao consultar a IA." };
      }

      const json = await res.json();
      const resposta = json?.choices?.[0]?.message?.content ?? "";
      return { resposta, error: null };
    } catch (e) {
      console.error("chat error", e);
      return { resposta: "", error: "Erro inesperado ao falar com a IA." };
    }
  });

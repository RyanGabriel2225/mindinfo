import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  categoria: z.string().min(1).max(60),
  especializacao: z.string().min(1).max(80),
});

export const buscarEspecializacao = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { conteudo: "", error: "AI gateway não configurado." };
    }

    const prompt = `Forneça informações detalhadas e bem estruturadas sobre a especialização "${data.especializacao}" da área de "${data.categoria}".

Responda em português brasileiro, em markdown, com as seguintes seções:

## Visão geral
Um parágrafo explicando o que é a especialização.

## Principais áreas de atuação
Lista de 5 a 7 áreas/procedimentos que o profissional realiza.

## Quando procurar
Lista de sinais, sintomas ou situações em que se deve procurar essa especialização.

## Formação e atuação
Breve descrição sobre formação necessária e onde o profissional atua.

## Curiosidades
2 ou 3 curiosidades interessantes sobre a área.

Seja informativo, técnico mas acessível, e evite repetir informações.`;

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content:
                "Você é o InfoMind, um assistente especialista em fornecer informações precisas e bem estruturadas sobre áreas profissionais e especializações.",
            },
            { role: "user", content: prompt },
          ],
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          return { conteudo: "", error: "Muitas solicitações. Aguarde alguns segundos." };
        }
        if (res.status === 402) {
          return { conteudo: "", error: "Créditos da IA esgotados." };
        }
        const t = await res.text();
        console.error("AI gateway error", res.status, t);
        return { conteudo: "", error: "Falha ao consultar a IA." };
      }

      const json = await res.json();
      const conteudo = json?.choices?.[0]?.message?.content ?? "";
      return { conteudo, error: null as string | null };
    } catch (e) {
      console.error("buscarEspecializacao error", e);
      return { conteudo: "", error: "Erro inesperado ao consultar a IA." };
    }
  });

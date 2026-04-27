import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { categoria, especializacao } = await req.json();

    if (
      typeof categoria !== "string" ||
      typeof especializacao !== "string" ||
      categoria.length === 0 ||
      especializacao.length === 0 ||
      categoria.length > 60 ||
      especializacao.length > 80
    ) {
      return new Response(
        JSON.stringify({ conteudo: "", error: "Parâmetros inválidos." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ conteudo: "", error: "AI gateway não configurado." }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const prompt = `Forneça informações diretas e objetivas sobre a especialização "${especializacao}" da área de "${categoria}".

Responda em português brasileiro, em markdown, de forma concisa, com as seguintes seções:

## Visão geral
Um parágrafo curto explicando o que é a especialização.

## Formação e atuação
Breve descrição sobre formação necessária e onde o profissional atua.

## Principais áreas de atuação
Lista de 5 a 7 áreas/procedimentos que o profissional realiza.

## Termos usados na área
Liste exatamente 5 termos, gírias, abreviações ou expressões informais que os profissionais dessa especialidade usam no dia a dia para se referir a coisas do trabalho deles (pacientes, procedimentos, equipamentos, situações, colegas, etc.) — o jeito que eles realmente falam entre si, não os termos técnicos formais do livro. Para cada termo, traga o nome em **negrito** seguido de uma explicação curta (1 linha) do que querem dizer com aquilo na prática.

## Curiosidades
2 ou 3 curiosidades interessantes sobre a área.

Seja direto, técnico e evite redundâncias.`;

    const res = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
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
      }
    );

    if (!res.ok) {
      if (res.status === 429) {
        return new Response(
          JSON.stringify({
            conteudo: "",
            error: "Muitas solicitações. Aguarde alguns segundos.",
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (res.status === 402) {
        return new Response(
          JSON.stringify({ conteudo: "", error: "Créditos da IA esgotados." }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const t = await res.text();
      console.error("AI gateway error", res.status, t);
      return new Response(
        JSON.stringify({ conteudo: "", error: "Falha ao consultar a IA." }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const json = await res.json();
    const conteudo = json?.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ conteudo, error: null }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("especializacao-info error", e);
    return new Response(
      JSON.stringify({
        conteudo: "",
        error: "Erro inesperado ao consultar a IA.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

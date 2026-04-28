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

    const prompt = `Gere um conteúdo COMPLETO e DETALHADO sobre a especialidade "${especializacao}" da área de "${categoria}".

Adapte TODO o conteúdo especificamente para "${especializacao}" — NÃO use exemplos genéricos de outras especialidades. Responda em português brasileiro, em markdown, usando EXATAMENTE a estrutura abaixo (8 seções com ## e subsecções com ###). Seja específico, técnico e prático, evitando redundâncias e generalidades.

## 1. Conheça a Especialidade
Explique o que é a especialidade "${especializacao}", nessa ordem, em bullets:
- **O que faz na prática:** descrição objetiva (1-2 linhas).
- **Principais atendimentos:** lista dos casos/procedimentos mais frequentes.
- **Perfil dos pacientes:** que tipo de pessoa/animal/cliente procura esse profissional.

## 2. Áreas de Atuação
Liste 3 frentes/subáreas principais dessa especialidade. Para cada uma, dê um nome em **negrito** seguido de uma explicação curta do que o profissional faz nela.

## 3. Formação e Atuação
Em bullets:
- **Formação e tempo médio:** graduação + especialização + tempo total.
- **Rotina prática:** como é o dia a dia real.
- **Onde mais gasta tempo e energia:** o que consome mais esforço mental/físico na rotina.

## 4. Principais Técnicas da Área
Liste 3 técnicas/procedimentos reais dessa especialidade. Para CADA UMA use este formato:
- Nome da técnica em **negrito**
  - **O que é:** descrição.
  - **Passo a passo:** etapas resumidas separadas por →.
  - **Quando é usada:** indicação clínica.
  - **Nível:** Básico, Intermediário ou Avançado.
  - **Bom vs Ruim:** o que diferencia um profissional bom de um ruim executando essa técnica.

## 5. Ambiente e Materiais do Dia a Dia
Liste 3 equipamentos/itens típicos do ambiente de trabalho. Para CADA UM:
- Nome em **negrito**
  - **O que é:** descrição.
  - **Para que serve:** função.
  - **Como é usado:** uso prático.
  - **Insight:** uma observação de bastidor que só quem trabalha na área sabe.

## 6. Materiais Essenciais para Atuar
Descreva o kit/ferramenta INDISPENSÁVEL sem o qual o profissional não consegue atuar:
- Nome em **negrito**
  - **Função:** para que serve.
  - **Indispensável:** por que é obrigatório ter.
  - **Formação:** se o profissional já sai da faculdade com ele ou precisa comprar depois.
  - **Status:** o que ter esse item indica sobre o nível do profissional.

## 7. Termos e Jargões da Rotina Profissional
Liste de 5 a 6 termos, gírias, abreviações ou expressões INFORMAIS que os profissionais dessa especialidade usam entre si no dia a dia (não termos de livro — o jeito que eles REALMENTE falam no consultório/hospital/clínica). Para cada um: nome em **negrito** seguido de uma explicação curta (1 linha) do que querem dizer com aquilo na prática.

## 8. Oportunidades de Infoproduto

### 8.1 Dominando a Técnica (para profissionais)
- **Nome:** nome comercial do curso.
- **Público:** para quem é.
- **Transformação:** o que o aluno passa a conseguir fazer.
- **Duração:** tempo estimado.
- **O que aprende:** principais módulos/conteúdos.

### 8.2 Gestão, Marketing e Vendas (para profissionais)
- **Nome:** nome comercial do curso.
- **Público:** para quem é.
- **Transformação:** o que muda no negócio do profissional.
- **Duração:** tempo estimado.
- **O que melhora:** áreas da gestão/marketing que avançam.

### 8.3 Pacientes de Alto Valor (para pacientes/clientes finais)
- **Nome:** nome comercial do produto.
- **Público:** para quem é.
- **Problema resolvido:** dor concreta que ele resolve.
- **Transformação:** resultado prático na vida do paciente.
- **Duração:** tempo do acompanhamento.
- **Por que pagaria caro:** motivo emocional/prático que justifica o ticket alto.

IMPORTANTE: mantenha EXATAMENTE os títulos numerados (## 1., ## 2., ... ## 8.) e as subsecções (### 8.1, ### 8.2, ### 8.3). Todo o conteúdo deve ser adaptado e verdadeiro para "${especializacao}" dentro de "${categoria}".`;

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

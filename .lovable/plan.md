# Plano: Novo formato de conteúdo das especialidades

Vou reestruturar o prompt enviado para a IA na página de detalhe de cada especialidade (Base → Médicos / Odontologia / Veterinários / Multidisciplinares → clicar em um nicho) para que o conteúdo gerado siga **exatamente** o modelo de 8 seções que você mandou (usando Estomatologia como referência de formato), adaptado dinamicamente para cada especialidade clicada.

## O que muda

**Único arquivo editado:** `supabase/functions/especializacao-info/index.ts`

Vou substituir o prompt atual (que pede apenas: Visão geral, Formação, Áreas, Termos e Curiosidades) por um prompt novo que exige as 8 seções no formato detalhado abaixo.

## Nova estrutura que a IA vai gerar

Para **qualquer** especialidade de **qualquer** categoria (Médicos, Odontologia, Veterinários, Multidisciplinares), o conteúdo virá com:

1. **Conheça a Especialidade** — o que é, o que faz na prática, principais atendimentos, perfil dos pacientes.
2. **Áreas de Atuação** — 3 frentes principais, cada uma explicada.
3. **Formação e Atuação** — formação + tempo médio, rotina prática, onde mais gasta tempo/energia.
4. **Principais Técnicas da Área** — 3 técnicas, cada uma com: o que é, passo a passo, quando é usada, nível (básico/intermediário/avançado) e "bom vs ruim".
5. **Ambiente e Materiais do Dia a Dia** — 3 itens com: o que é, para que serve, como é usado, insight.
6. **Materiais Essenciais para Atuar** — kit/ferramenta indispensável com função, se é indispensável, se sai da formação, o que o status dele indica.
7. **Termos e Jargões da Rotina Profissional** — 5 a 6 termos/gírias reais do dia a dia (não livro-texto), cada um com explicação curta de como é usado na prática.
8. **Oportunidades de Infoproduto** — 3 ideias:
   - 8.1 Dominando a técnica (para profissionais)
   - 8.2 Gestão, Marketing e Vendas (para profissionais)
   - 8.3 Pacientes de Alto Valor (para pacientes)
   Cada uma com: Nome, Público, Transformação/Problema resolvido, Duração, O que aprende / Por que pagaria caro.

## Detalhes técnicos

- O prompt novo deixa claro que é para **adaptar o conteúdo à especialidade específica** recebida (`categoria` + `especializacao`), não copiar Estomatologia.
- Mantém saída em **markdown** com `##` para cada seção numerada e `###` para subsecções (ex.: 8.1, 8.2, 8.3), para que o CSS atual de `[&_h2]` e `[&_h3]` em `base.$categoria.$especializacao.tsx` já renderize bonito sem alterar o frontend.
- Mantém **português brasileiro**, mesmo modelo (`google/gemini-2.5-flash`), mesma função edge, mesmo fluxo de erro.
- Como o conteúdo ficou bem maior, vou aumentar implicitamente o espaço de resposta confiando no modelo (sem `max_tokens` — Gemini 2.5 Flash comporta fácil).
- **Nada muda** na página de lista da base (`base.index.tsx`), nas rotas, ou no layout da página de detalhe — apenas o prompt dentro da edge function.

## Resultado esperado

Ao clicar em qualquer nicho (ex.: Cardiologia, Ortodontia, Radiologista veterinário, Fisioterapeuta Osteopata etc.), a página vai mostrar todas as 8 seções preenchidas com informações daquela especialidade específica, no mesmo nível de detalhe do exemplo de Estomatologia que você enviou.

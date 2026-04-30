
## Objetivo

Tornar 10 especialidades veterinárias **estáticas** (carregamento instantâneo, sem custo de IA), usando o conteúdo exato do PDF enviado, com layout de **6 seções** (formato do PDF, com tabelas e coluna "Tradução prática"). Para o resto das especializações, mantém o fluxo atual via IA.

## Especialidades cobertas (do PDF)

1. Radiologia Veterinária (Imaginologia)
2. Cirurgia Geral Veterinária
3. Anestesiologia Veterinária
4. Clínico Geral Veterinário
5. Oncologia Veterinária
6. Dermatologia Veterinária
7. Oftalmologia Veterinária
8. Ortopedia Veterinária
9. Patologia Veterinária
10. Cardiologia Veterinária

## Como vai funcionar para o usuário

1. Usuário clica em uma das 10 especialidades vet → página abre **instantânea** com o conteúdo do PDF (6 seções, tabelas com "Tradução prática", termos técnicos, oportunidades de infoproduto).
2. No topo aparece um selo "📖 Conteúdo curado" (em vez de "Gerado por IA").
3. Abaixo do conteúdo, botão **"✨ Complementar com IA"** — só dispara a edge function se o usuário clicar.
4. Para qualquer outra especialidade (médicos, odontologia, diversos, ou vet fora da lista) → comportamento atual (IA gera tudo automaticamente).

## Estrutura das 6 seções (exata do PDF)

1. **Conheça a Especialidade** — descrição técnica + tradução prática + atendimentos + perfil dos pacientes
2. **Áreas de Atuação** — tabela com 4 colunas (Área | O que faz | Tradução prática | Demanda)
3. **Formação e Atuação** — anos de formação, obrigatoriedade, rotina prática
4. **Principais Técnicas da Área** — tabela com 4 colunas (Técnica | O que é | Tradução prática | Uso)
5. **Termos Técnicos da Área** — lista de termos com tradução prática em itálico
6. **Oportunidades de Infoproduto** — 3 subsecções (Dominando a Técnica / Gestão e Vendas / Pacientes de Alto Valor)

## Detalhes técnicos

**Novos arquivos:**
- `src/data/vet-especialidades.ts` — exporta um `Record<slug, EspecialidadeVet>` tipado com o conteúdo das 10 especialidades transcrito do PDF (texto fiel, incluindo termos como "OSH", "Cistocentese", etc.)
- `src/components/EspecialidadeEstatica.tsx` — componente que renderiza as 6 seções do tipo `EspecialidadeVet` (cabeçalhos, parágrafos com "Tradução prática" em destaque, tabelas estilizadas com Tailwind, listas de termos)

**Arquivos editados:**
- `src/routes/base.$categoria.$especializacao.tsx`:
  - Antes do `useEffect`, faz `lookup` em `vet-especialidades.ts` pelo slug.
  - Se encontrado: renderiza `<EspecialidadeEstatica>` direto, **sem** chamar a edge function. Selo muda para "Conteúdo curado".
  - Adiciona estado `aiComplemento` + botão "Complementar com IA" que dispara a chamada existente sob demanda e renderiza o markdown abaixo.
  - Se não encontrado: comportamento atual permanece intacto.

**O que NÃO muda:**
- Edge function `especializacao-info` continua igual.
- Outras categorias (médicos, odontologia, diversos) continuam 100% via IA.
- Lista de especialidades em `base.index.tsx` permanece a mesma.

## Estilo visual

- Tabelas com cabeçalho em `bg-primary/10`, bordas suaves, coluna "Tradução prática" em itálico com cor `text-muted-foreground` para diferenciar do técnico.
- Termos técnicos em lista com **bullet bege** (`#e2b984`), título em negrito branco, tradução em itálico.
- Cards das oportunidades de infoproduto em grid de 1 coluna (mobile) / 3 colunas (desktop).

## Impacto / benefícios

- Zero custo de IA nessas 10 páginas.
- Carregamento instantâneo (sem loader).
- Conteúdo revisado e idêntico ao material oficial do MedDecoder.
- Usuário ainda pode pedir IA se quiser aprofundar.

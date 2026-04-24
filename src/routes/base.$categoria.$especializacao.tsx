import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Lightbulb, Target } from "lucide-react";

const DADOS: Record<
  string,
  { titulo: string; especializacoes: Record<string, { resumo: string; topicos: string[] }> }
> = {
  medicos: {
    titulo: "Médicos",
    especializacoes: {
      cardiologia: {
        resumo:
          "A Cardiologia é a especialidade que estuda e trata as doenças do coração e do sistema cardiovascular.",
        topicos: [
          "Diagnóstico de arritmias e insuficiência cardíaca",
          "Prevenção de infarto e AVC",
          "Acompanhamento de hipertensão arterial",
          "Exames: ECG, ecocardiograma, teste ergométrico",
          "Cirurgias e procedimentos intervencionistas",
        ],
      },
      dermatologia: {
        resumo:
          "A Dermatologia cuida da saúde da pele, cabelos e unhas, abrangendo doenças clínicas e estéticas.",
        topicos: [
          "Tratamento de acne, eczema e psoríase",
          "Diagnóstico precoce de câncer de pele",
          "Procedimentos estéticos: peelings, laser, botox",
          "Cuidados com cabelos e couro cabeludo",
          "Dermatologia pediátrica e geriátrica",
        ],
      },
      pediatria: {
        resumo:
          "A Pediatria é dedicada à saúde de crianças e adolescentes, do nascimento até a fase adulta.",
        topicos: [
          "Acompanhamento do crescimento e desenvolvimento",
          "Vacinação e prevenção de doenças",
          "Tratamento de infecções comuns na infância",
          "Orientação nutricional e comportamental",
          "Detecção precoce de transtornos do desenvolvimento",
        ],
      },
      ortopedia: {
        resumo:
          "A Ortopedia trata de lesões e doenças do sistema musculoesquelético: ossos, articulações, músculos e tendões.",
        topicos: [
          "Tratamento de fraturas e luxações",
          "Cirurgias de joelho, ombro e coluna",
          "Reabilitação de lesões esportivas",
          "Próteses e órteses",
          "Tratamento de osteoporose e artrose",
        ],
      },
      neurologia: {
        resumo:
          "A Neurologia estuda e trata as doenças do sistema nervoso central e periférico.",
        topicos: [
          "Tratamento de enxaquecas e cefaleias",
          "Acompanhamento de epilepsia e AVC",
          "Doenças degenerativas: Parkinson, Alzheimer",
          "Esclerose múltipla e neuropatias",
          "Exames: eletroencefalograma, ressonância",
        ],
      },
    },
  },
  odontologia: {
    titulo: "Odontologia",
    especializacoes: {
      ortodontia: {
        resumo:
          "A Ortodontia corrige a posição dos dentes e ossos da face, melhorando função e estética.",
        topicos: [
          "Aparelhos fixos metálicos e estéticos",
          "Alinhadores transparentes (Invisalign)",
          "Tratamento de mordidas cruzadas e abertas",
          "Ortodontia infantil preventiva",
          "Planejamento digital do sorriso",
        ],
      },
      endodontia: {
        resumo:
          "A Endodontia trata o interior do dente, especialmente a polpa e os canais radiculares.",
        topicos: [
          "Tratamento de canal",
          "Retratamento endodôntico",
          "Cirurgia parendodôntica",
          "Tratamento de dentes traumatizados",
          "Uso de microscopia operatória",
        ],
      },
      implantodontia: {
        resumo:
          "A Implantodontia substitui dentes perdidos por meio de implantes dentários osseointegrados.",
        topicos: [
          "Implantes unitários e múltiplos",
          "Protocolos All-on-4 e All-on-6",
          "Enxertos ósseos",
          "Carga imediata",
          "Reabilitação oral completa",
        ],
      },
      periodontia: {
        resumo:
          "A Periodontia cuida dos tecidos que sustentam os dentes: gengiva e osso alveolar.",
        topicos: [
          "Tratamento de gengivite e periodontite",
          "Raspagem e alisamento radicular",
          "Cirurgias gengivais estéticas",
          "Tratamento de retração gengival",
          "Manutenção periodontal",
        ],
      },
      odontopediatria: {
        resumo:
          "A Odontopediatria cuida da saúde bucal de bebês, crianças e adolescentes.",
        topicos: [
          "Prevenção de cáries",
          "Aplicação de flúor e selantes",
          "Tratamento de traumatismos dentários",
          "Manejo comportamental",
          "Orientação aos pais",
        ],
      },
    },
  },
  veterinarios: {
    titulo: "Veterinários",
    especializacoes: {
      "clinica-de-pequenos-animais": {
        resumo:
          "Atendimento clínico de cães, gatos e outros pets domésticos.",
        topicos: [
          "Consultas de rotina e emergências",
          "Vacinação e vermifugação",
          "Diagnóstico por imagem",
          "Tratamento de doenças crônicas",
          "Castração e cirurgias eletivas",
        ],
      },
      "clinica-de-grandes-animais": {
        resumo:
          "Cuidado com bovinos, equinos, ovinos e demais animais de produção.",
        topicos: [
          "Reprodução e manejo sanitário",
          "Tratamento de doenças infecciosas",
          "Cirurgias a campo",
          "Nutrição animal",
          "Bem-estar de rebanhos",
        ],
      },
      "cirurgia-veterinaria": {
        resumo:
          "Procedimentos cirúrgicos em diversas espécies, com técnicas modernas e seguras.",
        topicos: [
          "Cirurgias ortopédicas",
          "Cirurgias de tecidos moles",
          "Videocirurgia e laparoscopia",
          "Anestesia segura",
          "Pós-operatório especializado",
        ],
      },
      "dermatologia-veterinaria": {
        resumo:
          "Diagnóstico e tratamento de doenças de pele em animais.",
        topicos: [
          "Alergias alimentares e ambientais",
          "Tratamento de sarna e fungos",
          "Doenças autoimunes",
          "Otites recorrentes",
          "Acompanhamento dermatológico contínuo",
        ],
      },
      "cardiologia-veterinaria": {
        resumo:
          "Cuidado especializado com o coração de cães, gatos e outros animais.",
        topicos: [
          "Ecocardiograma e ECG",
          "Tratamento de insuficiência cardíaca",
          "Acompanhamento de raças predispostas",
          "Manejo de cardiopatias congênitas",
          "Avaliação pré-anestésica",
        ],
      },
    },
  },
  diversos: {
    titulo: "Diversos",
    especializacoes: {
      psicologia: {
        resumo:
          "A Psicologia atua na promoção da saúde mental e no tratamento de transtornos emocionais.",
        topicos: [
          "Terapia cognitivo-comportamental",
          "Atendimento infantil e adolescente",
          "Terapia de casal e familiar",
          "Tratamento de ansiedade e depressão",
          "Avaliação psicológica",
        ],
      },
      nutricao: {
        resumo:
          "A Nutrição promove saúde e qualidade de vida por meio da alimentação equilibrada.",
        topicos: [
          "Planos alimentares personalizados",
          "Nutrição esportiva",
          "Reeducação alimentar",
          "Nutrição clínica e hospitalar",
          "Suplementação responsável",
        ],
      },
      fisioterapia: {
        resumo:
          "A Fisioterapia previne e trata disfunções do movimento humano.",
        topicos: [
          "Reabilitação ortopédica",
          "Fisioterapia neurológica",
          "Pilates clínico e RPG",
          "Fisioterapia respiratória",
          "Tratamento pós-cirúrgico",
        ],
      },
      farmacia: {
        resumo:
          "A Farmácia cuida da dispensação, manipulação e orientação sobre medicamentos.",
        topicos: [
          "Atenção farmacêutica",
          "Manipulação de fórmulas",
          "Farmácia clínica e hospitalar",
          "Análises clínicas",
          "Cuidado com a saúde da comunidade",
        ],
      },
      "educacao-fisica": {
        resumo:
          "A Educação Física promove saúde e desempenho por meio da atividade física orientada.",
        topicos: [
          "Treinamento personalizado",
          "Atividades para terceira idade",
          "Esporte de alto rendimento",
          "Reabilitação cardíaca",
          "Promoção da qualidade de vida",
        ],
      },
    },
  },
};

export const Route = createFileRoute("/base/$categoria/$especializacao")({
  loader: ({ params }) => {
    const cat = DADOS[params.categoria];
    if (!cat) throw notFound();
    const esp = cat.especializacoes[params.especializacao];
    if (!esp) throw notFound();
    return { categoria: cat.titulo, nome: descodificar(params.especializacao), ...esp };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.nome ?? "Especialização"} — InfoMind` },
      {
        name: "description",
        content: loaderData?.resumo ?? "Detalhes da especialização.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-bold">Especialização não encontrada</h1>
      <p className="mt-4 text-muted-foreground">A página que você procura não existe.</p>
      <Link to="/base" className="mt-6 inline-block text-primary underline">
        Voltar para a Base
      </Link>
    </div>
  ),
  component: EspecializacaoPage,
});

function descodificar(slug: string) {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function EspecializacaoPage() {
  const data = Route.useLoaderData();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Marca d'água IM */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center"
      >
        <svg viewBox="0 0 400 400" className="h-[70vmin] w-[70vmin] opacity-[0.04]">
          <circle cx="200" cy="200" r="190" fill="none" stroke="var(--gold)" strokeWidth="2" />
          <text
            x="50%"
            y="54%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Playfair Display, serif"
            fontSize="160"
            fill="var(--gold)"
            fontWeight="700"
          >
            IM
          </text>
          <line x1="120" y1="280" x2="280" y2="280" stroke="var(--gold)" strokeWidth="2" />
        </svg>
      </div>

      <header className="mx-auto max-w-5xl px-6 py-8">
        <Link
          to="/base"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a Base
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24">
        <p className="font-medium uppercase tracking-widest text-primary">
          {data.categoria}
        </p>
        <h1 className="mt-2 font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          {data.nome}
        </h1>

        <div className="mt-8 rounded-2xl border border-border/60 bg-card/40 p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-primary">
            <BookOpen className="h-5 w-5" />
            <h2 className="font-display text-xl font-semibold">Visão geral</h2>
          </div>
          <p className="mt-3 text-lg leading-relaxed text-foreground/90">
            {data.resumo}
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-border/60 bg-card/40 p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-primary">
            <Target className="h-5 w-5" />
            <h2 className="font-display text-xl font-semibold">Principais áreas de atuação</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {data.topicos.map((t, i) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-lg border border-border/40 bg-background/40 px-4 py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="font-medium text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <Lightbulb className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-foreground/80">
            Conteúdo informativo. Para diagnósticos e tratamentos, sempre procure um
            profissional habilitado.
          </p>
        </div>
      </main>
    </div>
  );
}

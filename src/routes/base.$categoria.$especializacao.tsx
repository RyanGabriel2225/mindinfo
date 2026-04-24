import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Lightbulb, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { buscarEspecializacao } from "@/server/especializacao.functions";

const CATEGORIAS_LABEL: Record<string, string> = {
  medicos: "Médicos",
  odontologia: "Odontologia",
  veterinarios: "Veterinários",
  diversos: "Diversos",
};

export const Route = createFileRoute("/base/$categoria/$especializacao")({
  head: ({ params }) => {
    const nome = descodificar(params?.especializacao ?? "");
    return {
      meta: [
        { title: `${nome} — InfoMind` },
        {
          name: "description",
          content: `Informações detalhadas sobre ${nome}.`,
        },
      ],
      links: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap",
        },
      ],
    };
  },
  component: EspecializacaoPage,
});

function descodificar(slug: string) {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function EspecializacaoPage() {
  const { categoria, especializacao } = Route.useParams();
  const buscar = useServerFn(buscarEspecializacao);

  const nome = descodificar(especializacao);
  const categoriaLabel = CATEGORIAS_LABEL[categoria] ?? categoria;

  const [conteudo, setConteudo] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro(null);
    setConteudo("");

    buscar({ data: { categoria: categoriaLabel, especializacao: nome } })
      .then((res) => {
        if (!ativo) return;
        if (res.error) setErro(res.error);
        else setConteudo(res.conteudo);
      })
      .catch(() => {
        if (ativo) setErro("Erro ao buscar informações.");
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [buscar, categoriaLabel, nome]);

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
          {categoriaLabel}
        </p>
        <h1 className="mt-2 font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          {nome}
        </h1>
        <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          Conteúdo gerado por IA · Gemini 2.5
        </div>

        <div className="mt-8 rounded-2xl border border-border/60 bg-card/40 p-8 backdrop-blur-sm">
          {carregando && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              Buscando informações sobre {nome}...
            </div>
          )}

          {erro && !carregando && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {erro}
            </div>
          )}

          {!carregando && !erro && conteudo && (
            <article className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-foreground prose-h2:mt-8 prose-h2:text-2xl prose-h2:text-primary prose-p:text-foreground/90 prose-p:leading-relaxed prose-li:text-foreground/90 prose-strong:text-foreground prose-a:text-primary">
              <ReactMarkdown>{conteudo}</ReactMarkdown>
            </article>
          )}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <Lightbulb className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-foreground/80">
            Conteúdo informativo gerado por IA. Para diagnósticos e tratamentos, sempre
            procure um profissional habilitado.
          </p>
        </div>
      </main>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Lightbulb, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { VET_ESPECIALIDADES } from "@/data/vet-especialidades";
import { EspecialidadeEstatica } from "@/components/EspecialidadeEstatica";

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
        { name: "description", content: `Informações detalhadas sobre ${nome}.` },
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
  const nome = descodificar(especializacao);
  const categoriaLabel = CATEGORIAS_LABEL[categoria] ?? categoria;

  const estatico = VET_ESPECIALIDADES[especializacao];

  // Estado para conteúdo via IA (usado quando: não há estático OU usuário pediu complemento)
  const [conteudo, setConteudo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pediuIA, setPediuIA] = useState(false);

  const carregarIA = () => {
    setPediuIA(true);
    setLoading(true);
    setError(null);
    setConteudo("");

    supabase.functions
      .invoke("especializacao-info", {
        body: { categoria: categoriaLabel, especializacao: nome },
      })
      .then(({ data, error: invokeError }) => {
        if (invokeError) return setError("Erro ao buscar informações.");
        if (data?.error) return setError(data.error);
        setConteudo(data?.conteudo ?? "");
      })
      .catch(() => setError("Erro ao buscar informações."))
      .finally(() => setLoading(false));
  };

  // Auto-carrega IA apenas se NÃO houver conteúdo estático
  useEffect(() => {
    if (!estatico && !pediuIA) {
      carregarIA();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [especializacao]);

  return (
    <>
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
        <p className="font-medium uppercase tracking-widest text-primary">{categoriaLabel}</p>
        <h1 className="mt-2 font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          {nome}
        </h1>
        <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
          {estatico ? (
            <>
              <BookOpen className="h-4 w-4 text-primary" />
              Conteúdo curado · MedDecoder
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-primary" />
              Conteúdo gerado por IA · Gemini 2.5
            </>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-border/60 bg-card/40 p-8 backdrop-blur-sm">
          {estatico && <EspecialidadeEstatica data={estatico} />}

          {!estatico && loading && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              Carregando informações sobre {nome}...
            </div>
          )}

          {!estatico && error && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {!estatico && !loading && !error && conteudo && (
            <article className="space-y-4 text-foreground/90 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:marker:text-primary [&_strong]:text-foreground [&_strong]:font-semibold [&_a]:text-primary [&_a]:underline">
              <ReactMarkdown>{conteudo}</ReactMarkdown>
            </article>
          )}
        </div>

        {/* Botão complementar com IA (só nas páginas estáticas) */}
        {estatico && (
          <div className="mt-6">
            {!pediuIA && (
              <button
                onClick={carregarIA}
                className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-medium text-primary transition hover:bg-primary/20"
              >
                <Sparkles className="h-4 w-4" />
                Complementar com IA
              </button>
            )}

            {pediuIA && (
              <div className="mt-4 rounded-2xl border border-border/60 bg-card/40 p-8 backdrop-blur-sm">
                <h3 className="font-display text-xl font-semibold text-primary mb-4 inline-flex items-center gap-2">
                  <Sparkles className="h-5 w-5" /> Complemento gerado por IA
                </h3>
                {loading && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    Gerando conteúdo complementar...
                  </div>
                )}
                {error && (
                  <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                {!loading && !error && conteudo && (
                  <article className="space-y-4 text-foreground/90 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:marker:text-primary [&_strong]:text-foreground [&_strong]:font-semibold [&_a]:text-primary [&_a]:underline">
                    <ReactMarkdown>{conteudo}</ReactMarkdown>
                  </article>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <Lightbulb className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-foreground/80">
            Conteúdo informativo. Para diagnósticos e tratamentos, sempre procure um profissional habilitado.
          </p>
        </div>
      </main>
    </>
  );
}

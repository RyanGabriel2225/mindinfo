import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { chatWithAI } from "@/server/chat.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InfoMind — Busque menos. Entenda mais." },
      {
        name: "description",
        content:
          "InfoMind: inteligência artificial para respostas claras e rápidas em português.",
      },
      { property: "og:title", content: "InfoMind — Busque menos. Entenda mais." },
      {
        property: "og:description",
        content: "Inteligência artificial para respostas claras e rápidas.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Playfair+Display:wght@600&display=swap",
      },
    ],
  }),
  component: Index,
});

type Msg = { role: "user" | "assistant"; content: string };

function Index() {
  const callChat = useServerFn(chatWithAI);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function enviar(e?: React.FormEvent) {
    e?.preventDefault();
    const pergunta = input.trim();
    if (!pergunta || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: pergunta }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await callChat({ data: { historico: next } });
      if (res.error) {
        setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${res.error}` }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: res.resposta }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Erro ao buscar resposta." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-center py-6">
        <div className="font-display text-2xl font-semibold tracking-wide text-primary">
          InfoMind
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-8">
        {messages.length === 0 && (
          <div className="mt-12 text-center">
            <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Busque menos.{" "}
              <span className="text-primary">Entenda mais.</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Inteligência artificial para respostas claras e rápidas.
            </p>
          </div>
        )}

        <div
          ref={chatRef}
          className="mt-8 flex-1 space-y-3 overflow-y-auto"
          aria-live="polite"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-accent px-4 py-3 text-accent-foreground shadow-sm"
                  : "mr-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm border-l-2 border-primary bg-card px-4 py-3 text-card-foreground shadow-sm"
              }
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="mr-auto inline-flex items-center gap-2 rounded-2xl border-l-2 border-primary bg-card px-4 py-3 text-sm text-primary">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
              Pensando...
            </div>
          )}
        </div>

        <form
          onSubmit={enviar}
          className="sticky bottom-4 mt-6 flex items-center gap-0 overflow-hidden rounded-full border border-border bg-input shadow-lg focus-within:ring-2 focus-within:ring-primary"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte qualquer coisa..."
            disabled={loading}
            className="flex-1 bg-transparent px-5 py-4 text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Enviar"
            className="m-1 inline-flex h-11 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground transition hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
          >
            →
          </button>
        </form>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        © 2026 InfoMind
      </footer>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Search, Send, Sparkles, Globe, Link2, FileText, ArrowUpRight, Trash2 } from "lucide-react";
import { chatWithAI } from "@/server/chat.functions";
import { salvarConversa, listarConversas, carregarConversa, deletarConversa } from "@/server/conversations.functions";
import { SignOutButton } from "@/components/SignOutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import wavesBg from "@/assets/waves-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InfoMind — Busque menos. Entenda mais." },
      {
        name: "description",
        content:
          "InfoMind combina inteligência artificial com resultados da web para entregar respostas claras, rápidas e confiáveis.",
      },
      { property: "og:title", content: "InfoMind — Busque menos. Entenda mais." },
      {
        property: "og:description",
        content: "Inteligência artificial com resultados da web para respostas claras e rápidas.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

type Msg = { role: "user" | "assistant"; content: string; time?: string };

type SavedConversation = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

const SUGGESTIONS = [
  "Como funciona a inteligência artificial?",
  "Quais são os benefícios da meditação?",
  "O que é energia renovável?",
  "Curiosidades sobre o espaço",
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Playfair Display, serif"
          fontSize="18"
          fill="var(--gold)"
          fontWeight="700"
        >
          IM
        </text>
        <line x1="14" y1="34" x2="34" y2="34" stroke="var(--gold)" strokeWidth="0.8" />
      </svg>
      <span className="font-display text-2xl font-bold tracking-tight">
        <span className="text-foreground">Info</span>
        <span className="text-primary">Mind</span>
      </span>
    </div>
  );
}

function Index() {
  const callChat = useServerFn(chatWithAI);
  const callSalvar = useServerFn(salvarConversa);
  const callListar = useServerFn(listarConversas);
  const callCarregar = useServerFn(carregarConversa);
  const callDeletar = useServerFn(deletarConversa);

  const [input, setInput] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Conversa atual
  const [currentConvId, setCurrentConvId] = useState<string | undefined>(undefined);
  const [currentTitle, setCurrentTitle] = useState<string>("");

  // Lista de conversas salvas
  const [savedConversations, setSavedConversations] = useState<SavedConversation[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(true);

  const chatRef = useRef<HTMLDivElement>(null);

  // Carrega lista de conversas ao montar
  useEffect(() => {
    callListar({}).then((res) => {
      if (res.ok) setSavedConversations(res.conversations as SavedConversation[]);
      setLoadingConversations(false);
    });
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Salva automaticamente após cada resposta da IA
  const autoSave = useCallback(
    async (msgs: Msg[], title?: string) => {
      if (msgs.length < 2) return; // precisa de pelo menos uma troca
      setSaving(true);
      try {
        const convTitle = title || currentTitle || gerarTitulo(msgs);
        const res = await callSalvar({
          data: {
            conversationId: currentConvId,
            title: convTitle,
            messages: msgs.map(({ role, content }) => ({ role, content })),
          },
        });
        if (res.ok) {
          setCurrentConvId(res.conversationId);
          setCurrentTitle(convTitle);
          // Atualiza lista de conversas na sidebar
          callListar({}).then((r) => {
            if (r.ok) setSavedConversations(r.conversations as SavedConversation[]);
          });
        }
      } finally {
        setSaving(false);
      }
    },
    [currentConvId, currentTitle, callSalvar, callListar]
  );

  async function send(text: string) {
    const pergunta = text.trim();
    if (!pergunta || loading) return;

    const next: Msg[] = [
      ...messages,
      { role: "user", content: pergunta, time: nowHHMM() },
    ];
    setMessages(next);
    setLoading(true);

    try {
      const res = await callChat({
        data: { historico: next.map(({ role, content }) => ({ role, content })) },
      });
      const content = res.error ? `⚠️ ${res.error}` : res.resposta;
      const finalMsgs: Msg[] = [...next, { role: "assistant", content, time: nowHHMM() }];
      setMessages(finalMsgs);

      // Auto-salva após a resposta
      await autoSave(finalMsgs);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Erro ao buscar resposta.", time: nowHHMM() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function abrirConversa(conv: SavedConversation) {
    const res = await callCarregar({ data: { conversationId: conv.id } });
    if (!res.ok) return;
    setCurrentConvId(conv.id);
    setCurrentTitle(conv.title);
    setMessages(
      res.messages.map((m) => ({ role: m.role, content: m.content }))
    );
  }

  async function novaConversa() {
    setMessages([]);
    setCurrentConvId(undefined);
    setCurrentTitle("");
  }

  async function excluirConversa(convId: string, e: React.MouseEvent) {
    e.stopPropagation();
    await callDeletar({ data: { conversationId: convId } });
    setSavedConversations((prev) => prev.filter((c) => c.id !== convId));
    if (currentConvId === convId) novaConversa();
  }

  function onHeroSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = input;
    setInput("");
    send(v);
  }

  function onChatSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = chatInput;
    setChatInput("");
    send(v);
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Wave background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] opacity-50"
        style={{
          backgroundImage: `url(${wavesBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      />

      {/* IM watermark */}
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

      {/* NAV */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link to="/" className="text-primary">Início</Link>
          <Link to="/base" className="text-muted-foreground transition hover:text-foreground">Base</Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SignOutButton />
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-5xl px-6 pt-16 text-center">
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          <span className="block text-foreground">Busque menos.</span>
          <span className="block text-primary">Entenda mais.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          O InfoMind combina inteligência artificial com resultados da web para
          entregar respostas claras, rápidas e confiáveis.
        </p>

        {/* Search bar */}
        <form
          onSubmit={onHeroSubmit}
          className="mx-auto mt-10 flex max-w-3xl items-center gap-2 rounded-full border border-border bg-card/80 p-2 pl-5 shadow-2xl backdrop-blur focus-within:border-primary/60"
        >
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte qualquer coisa..."
            className="flex-1 bg-transparent px-2 py-3 text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            Buscar
          </button>
        </form>

        {/* Suggestion chips */}
        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-border bg-card/40 px-4 py-2 text-xs text-muted-foreground transition hover:border-primary/60 hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* CHAT PANEL */}
      <section className="mx-auto mt-14 max-w-7xl px-6 pb-16">
        <div className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <aside className="border-b border-border p-5 md:border-b-0 md:border-r">
              <button
                onClick={novaConversa}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-primary"
              >
                <Plus className="h-4 w-4" /> Nova conversa
              </button>

              <p className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">
                Conversas salvas
                {saving && <span className="ml-2 text-primary animate-pulse">· salvando…</span>}
              </p>

              <ul className="mt-3 space-y-1">
                {loadingConversations ? (
                  <li className="text-xs text-muted-foreground px-3 py-2">Carregando…</li>
                ) : savedConversations.length === 0 ? (
                  <li className="text-xs text-muted-foreground px-3 py-2">Nenhuma conversa ainda.</li>
                ) : (
                  savedConversations.map((conv) => (
                    <li key={conv.id}>
                      <button
                        onClick={() => abrirConversa(conv)}
                        className={
                          "group flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition " +
                          (currentConvId === conv.id
                            ? "bg-accent/30 text-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground")
                        }
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{conv.title}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {formatDate(conv.updated_at)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => excluirConversa(conv.id, e)}
                          className="shrink-0 opacity-0 group-hover:opacity-100 transition text-muted-foreground hover:text-destructive"
                          title="Excluir conversa"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </button>
                    </li>
                  ))
                )}
              </ul>

              <p className="mt-6 text-[10px] text-muted-foreground leading-relaxed">
                📧 Backup diário enviado por email às 02:00 UTC.
              </p>
            </aside>

            {/* Chat area */}
            <div className="flex min-h-[420px] flex-col">
              {/* Título da conversa atual */}
              {currentTitle && (
                <div className="border-b border-border px-6 py-3">
                  <p className="text-sm font-medium text-foreground truncate">{currentTitle}</p>
                </div>
              )}

              <div ref={chatRef} className="flex-1 space-y-4 overflow-y-auto p-6">
                {messages.length === 0 && (
                  <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center text-sm text-muted-foreground">
                    <Sparkles className="mb-3 h-6 w-6 text-primary/70" />
                    Faça uma pergunta para começar.
                  </div>
                )}
                {messages.map((m, i) =>
                  m.role === "user" ? (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-accent px-4 py-3 text-accent-foreground shadow">
                        <p className="text-sm leading-relaxed">{m.content}</p>
                        <p className="mt-1 text-right text-[10px] opacity-70">{m.time}</p>
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary">
                        <span className="font-display text-xs font-bold">IM</span>
                      </div>
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-border bg-secondary/60 px-4 py-3">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                          {m.content}
                        </p>
                        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                          <span>Fontes</span>
                          <Link2 className="h-3.5 w-3.5" />
                          <FileText className="h-3.5 w-3.5" />
                          <Globe className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  )
                )}
                {loading && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
                    Pensando...
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={onChatSubmit}
                className="flex items-center gap-3 border-t border-border bg-background/40 px-6 py-4"
              >
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Continue a conversa..."
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={loading || !chatInput.trim()}
                  aria-label="Enviar"
                  className="text-accent transition hover:text-primary disabled:opacity-40"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
              <p className="border-t border-border bg-background/40 px-6 py-3 text-center text-[11px] text-muted-foreground">
                As respostas do InfoMind podem conter imprecisões. Sempre verifique as informações importantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="pb-8 text-center text-xs text-muted-foreground">
        © 2026 InfoMind
      </footer>
    </div>
  );
}

function nowHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Gera um título automático com base na primeira mensagem do usuário
function gerarTitulo(msgs: Msg[]): string {
  const primeira = msgs.find((m) => m.role === "user")?.content ?? "Conversa";
  const truncated = primeira.length > 60 ? primeira.slice(0, 57) + "…" : primeira;
  const data = new Date().toLocaleDateString("pt-BR");
  return `${truncated} · ${data}`;
}

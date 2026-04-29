import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Search, Send, Sparkles, Globe, Link2, FileText, Trash2 } from "lucide-react";
import { chatWithAI } from "@/server/chat.functions";
import { SignOutButton } from "@/components/SignOutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/lib/auth-context";
import {
  listConversations,
  createConversation,
  deleteConversation,
  renameConversation,
  listMessages,
  insertMessage,
  deriveTitle,
  type Conversation,
} from "@/lib/conversations";
import infomindLogo from "@/assets/infomind-logo-transparent.png";

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

const SUGGESTIONS = [
  "Como funciona a inteligência artificial?",
  "Quais são os benefícios da meditação?",
  "O que é energia renovável?",
  "Curiosidades sobre o espaço",
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src={infomindLogo}
        alt="InfoMind"
        className="h-12 w-auto object-contain"
      />
      <span
        style={{ fontFamily: "'Poppins', sans-serif" }}
        className="text-xl font-semibold tracking-wide"
      >
        <span style={{ color: "#e2b984" }}>INFO</span>
        <span style={{ color: "#ffffff" }}>MIND</span>
      </span>
    </Link>
  );
}

function Index() {
  const { user } = useAuth();
  const callChat = useServerFn(chatWithAI);
  const [input, setInput] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Carregar conversas do usuário
  useEffect(() => {
    if (!user) return;
    listConversations(user.id).then(setConversations).catch(console.error);
  }, [user]);

  async function openConversation(id: string) {
    setActiveId(id);
    try {
      const msgs = await listMessages(id);
      setMessages(
        msgs.map((m) => ({
          role: m.role,
          content: m.content,
          time: formatTime(m.created_at),
        })),
      );
    } catch (e) {
      console.error(e);
    }
  }

  function newConversation() {
    setActiveId(null);
    setMessages([]);
  }

  async function removeConversation(id: string) {
    try {
      await deleteConversation(id);
      setConversations((c) => c.filter((x) => x.id !== id));
      if (activeId === id) newConversation();
    } catch (e) {
      console.error(e);
    }
  }

  async function send(text: string) {
    const pergunta = text.trim();
    if (!pergunta || loading || !user) return;

    // Cria conversa se necessário
    let convId = activeId;
    if (!convId) {
      try {
        const c = await createConversation(user.id, deriveTitle(pergunta));
        convId = c.id;
        setActiveId(c.id);
        setConversations((prev) => [c, ...prev]);
      } catch (e) {
        console.error(e);
        return;
      }
    }

    const userMsg: Msg = { role: "user", content: pergunta, time: nowHHMM() };
    const next: Msg[] = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    // Persistir mensagem do usuário
    insertMessage(user.id, convId, "user", pergunta).catch(console.error);

    try {
      const res = await callChat({
        data: { historico: next.map(({ role, content }) => ({ role, content })) },
      });
      const content = res.error ? `⚠️ ${res.error}` : res.resposta;
      setMessages((m) => [...m, { role: "assistant", content, time: nowHHMM() }]);
      // Persistir resposta
      insertMessage(user.id, convId, "assistant", content).catch(console.error);

      // Se primeira mensagem, garante título
      if (messages.length === 0) {
        renameConversation(convId, deriveTitle(pergunta)).catch(() => {});
        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId ? { ...c, title: deriveTitle(pergunta) } : c,
          ),
        );
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Erro ao buscar resposta.", time: nowHHMM() },
      ]);
    } finally {
      setLoading(false);
    }
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
      {/* Logo watermark */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center"
      >
        <img
          src={infomindLogo}
          alt=""
          className="h-[70vmin] w-[70vmin] object-contain opacity-[0.04]"
        />
      </div>

      {/* NAV */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link to="/" className="text-primary">
            Início
          </Link>
          <Link to="/base" className="text-muted-foreground transition hover:text-foreground">
            Base
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SignOutButton />
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-5xl px-6 pt-16 text-center">
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          <span className="block text-foreground">Vá além do óbvio.</span>
          <span className="block text-primary">Construa seu futuro.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Pequenos passos hoje constroem grandes conquistas amanhã.
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
            placeholder="Duvidas sobre nichos..."
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
      </section>

      {/* CHAT PANEL */}
      <section className="mx-auto mt-14 max-w-7xl px-6 pb-16">
        <div className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <aside className="border-b border-border p-5 md:border-b-0 md:border-r">
              <button
                onClick={newConversation}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/60 hover:text-primary"
              >
                <Plus className="h-4 w-4" /> Nova conversa
              </button>
              <p className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">
                Conversas
              </p>
              <ul className="mt-3 max-h-[420px] space-y-1 overflow-y-auto pr-1">
                {conversations.length === 0 && (
                  <li className="px-2 py-2 text-xs text-muted-foreground">
                    Nenhuma conversa ainda.
                  </li>
                )}
                {conversations.map((c) => (
                  <li key={c.id} className="group flex items-center gap-1">
                    <button
                      onClick={() => openConversation(c.id)}
                      className={
                        "flex-1 truncate rounded-lg px-3 py-2 text-left text-sm transition " +
                        (c.id === activeId
                          ? "bg-accent/30 text-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground")
                      }
                      title={c.title}
                    >
                      {c.title}
                    </button>
                    <button
                      onClick={() => removeConversation(c.id)}
                      className="rounded p-1 text-muted-foreground opacity-0 transition hover:text-destructive group-hover:opacity-100"
                      aria-label="Excluir conversa"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Chat area */}
            <div className="flex min-h-[420px] flex-col">
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
                  ),
                )}
                {loading && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
                    Pensando...
                  </div>
                )}
              </div>

              {/* Continue chat input */}
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

function formatTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

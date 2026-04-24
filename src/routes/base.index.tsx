import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Stethoscope,
  Smile,
  PawPrint,
  Layers,
  ChevronDown,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/base/")({
  head: () => ({
    meta: [
      { title: "Base — InfoMind" },
      {
        name: "description",
        content:
          "Explore a Base do InfoMind: Médicos, Odontologia, Veterinários e Diversos com suas especializações.",
      },
      { property: "og:title", content: "Base — InfoMind" },
      {
        property: "og:description",
        content: "Categorias e especializações organizadas por área.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap",
      },
    ],
  }),
  component: BaseIndexPage,
});

type Categoria = {
  id: string;
  titulo: string;
  descricao: string;
  icon: LucideIcon;
  especializacoes: string[];
};

const CATEGORIAS: Categoria[] = [
  {
    id: "medicos",
    titulo: "Médicos",
    descricao: "Áreas da medicina humana",
    icon: Stethoscope,
    especializacoes: ["Cardiologia", "Dermatologia", "Pediatria", "Ortopedia", "Neurologia"],
  },
  {
    id: "odontologia",
    titulo: "Odontologia",
    descricao: "Especialidades odontológicas",
    icon: Smile,
    especializacoes: [
      "Ortodontia",
      "Endodontia",
      "Implantodontia",
      "Periodontia",
      "Odontopediatria",
    ],
  },
  {
    id: "veterinarios",
    titulo: "Veterinários",
    descricao: "Cuidados com animais",
    icon: PawPrint,
    especializacoes: [
      "Clínica de Pequenos Animais",
      "Clínica de Grandes Animais",
      "Cirurgia Veterinária",
      "Dermatologia Veterinária",
      "Cardiologia Veterinária",
    ],
  },
  {
    id: "diversos",
    titulo: "Diversos",
    descricao: "Outras áreas e serviços",
    icon: Layers,
    especializacoes: ["Psicologia", "Nutrição", "Fisioterapia", "Farmácia", "Educação Física"],
  },
];

function BaseIndexPage() {
  const [aberta, setAberta] = useState<string | null>(null);

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-8 pb-12 text-center">
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
          <span className="text-foreground">Base de </span>
          <span className="text-primary">Conhecimento</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Escolha uma categoria para ver suas especializações.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-2">
        {CATEGORIAS.map((cat) => {
          const Icon = cat.icon;
          const isOpen = aberta === cat.id;

          return (
            <div
              key={cat.id}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm transition hover:border-primary/40"
            >
              <button
                onClick={() => setAberta(isOpen ? null : cat.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground">{cat.titulo}</h2>
                    <p className="text-sm text-muted-foreground">{cat.descricao}</p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-2 border-t border-border/60 px-6 py-5">
                    {cat.especializacoes.map((esp, i) => {
                      const slug = esp
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/\s+/g, "-");

                      return (
                        <li key={esp}>
                          <Link
                            to="/base/$categoria/$especializacao"
                            params={{ categoria: cat.id, especializacao: slug }}
                            preload="intent"
                            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition hover:bg-primary/5"
                          >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {i + 1}
                            </span>
                            <span className="font-medium group-hover:text-primary">{esp}</span>
                            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
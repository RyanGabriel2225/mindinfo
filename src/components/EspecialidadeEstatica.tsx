import type { EspecialidadeVet, Infoproduto, LinhaTabela } from "@/data/vet-especialidades";

function Tabela({ rows, col1Label }: { rows: LinhaTabela[]; col1Label: string }) {
  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-primary/10">
          <tr className="text-left">
            <th className="px-4 py-3 font-semibold text-foreground">{col1Label}</th>
            <th className="px-4 py-3 font-semibold text-foreground">O que faz (técnico)</th>
            <th className="px-4 py-3 font-semibold text-foreground">Tradução prática</th>
            <th className="px-4 py-3 font-semibold text-foreground">
              {col1Label === "Técnica" ? "Uso" : "Demanda / Paciente"}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border/40 align-top">
              <td className="px-4 py-3 font-medium text-foreground">{r.col1}</td>
              <td className="px-4 py-3 text-foreground/80">{r.tecnico}</td>
              <td className="px-4 py-3 italic text-muted-foreground">{r.pratica}</td>
              <td className="px-4 py-3 text-foreground/80">{r.uso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CardInfo({ titulo, info }: { titulo: string; info: Infoproduto }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm">
      <h4 className="font-display text-lg font-bold text-primary">{titulo}</h4>
      <p className="mt-3 text-sm text-foreground/90">
        <strong className="text-foreground">Nome:</strong> {info.nome}
      </p>
      <dl className="mt-3 space-y-2 text-sm text-foreground/80">
        <div><dt className="font-semibold text-foreground inline">Público: </dt><dd className="inline">{info.publico}</dd></div>
        <div><dt className="font-semibold text-foreground inline">Dores: </dt><dd className="inline">{info.dores}</dd></div>
        <div><dt className="font-semibold text-foreground inline">Problema: </dt><dd className="inline">{info.problema}</dd></div>
        <div><dt className="font-semibold text-foreground inline">Estrutura: </dt><dd className="inline">{info.estrutura}</dd></div>
        <div><dt className="font-semibold text-foreground inline">Entregáveis: </dt><dd className="inline">{info.entregaveis}</dd></div>
        <div><dt className="font-semibold text-foreground inline">Duração: </dt><dd className="inline">{info.duracao}</dd></div>
      </dl>
    </div>
  );
}

export function EspecialidadeEstatica({ data }: { data: EspecialidadeVet }) {
  const tutoresLabel = data.tutoresLabel ?? "Pacientes de Alto Valor (Tutores)";

  return (
    <div className="space-y-10 text-foreground/90 leading-relaxed">
      {/* 1 */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-3">1. Conheça a Especialidade</h2>
        <p><strong className="text-foreground">Descrição técnica:</strong> {data.descricaoTecnica}</p>
        <p className="mt-2 italic text-muted-foreground"><strong className="not-italic text-foreground">Tradução prática:</strong> {data.descricaoPratica}</p>
        <p className="mt-4"><strong className="text-foreground">Principais atendimentos:</strong> {data.atendimentos}</p>
        <p className="mt-2 italic text-muted-foreground"><strong className="not-italic text-foreground">Tradução prática:</strong> {data.atendimentosPratica}</p>
        <p className="mt-4"><strong className="text-foreground">Perfil dos pacientes:</strong> {data.perfilPacientes}</p>
      </section>

      {/* 2 */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-3">2. Áreas de Atuação</h2>
        <Tabela rows={data.areas} col1Label="Área" />
      </section>

      {/* 3 */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-3">3. Formação e Atuação</h2>
        <p><strong className="text-foreground">Formação:</strong> {data.formacao}</p>
        <p className="mt-2"><strong className="text-foreground">Formação é obrigatória?</strong> {data.obrigatoria}</p>
        <p className="mt-4"><strong className="text-foreground">Rotina prática:</strong> {data.rotina}</p>
        <p className="mt-2 italic text-muted-foreground"><strong className="not-italic text-foreground">Tradução prática:</strong> {data.rotinaPratica}</p>
      </section>

      {/* 4 */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-3">4. Principais Técnicas da Área</h2>
        <Tabela rows={data.tecnicas} col1Label="Técnica" />
      </section>

      {/* 5 */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-3">5. Termos Técnicos da Área</h2>
        <ul className="space-y-3">
          {data.termos.map((t) => (
            <li key={t.termo} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: "#e2b984" }} />
              <div>
                <p><strong className="text-foreground">{t.termo}:</strong> {t.tecnico}</p>
                <p className="italic text-muted-foreground">{t.pratica}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 6 */}
      <section>
        <h2 className="font-display text-2xl font-bold text-primary mb-4">6. Oportunidades de Infoproduto</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <CardInfo titulo="Dominando a Técnica" info={data.infoTecnica} />
          <CardInfo titulo="Gestão, Marketing e Vendas" info={data.infoGestao} />
          <CardInfo titulo={tutoresLabel} info={data.infoTutores} />
        </div>
      </section>
    </div>
  );
}

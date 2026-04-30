// Conteúdo curado das 10 especialidades veterinárias (MedDecoder).
// Estático — carregamento instantâneo, zero custo de IA.

export type LinhaTabela = {
  col1: string; // Área / Técnica
  tecnico: string;
  pratica: string;
  uso: string; // Demanda ou Uso
};

export type Termo = {
  termo: string;
  tecnico: string;
  pratica: string;
};

export type Infoproduto = {
  publico: string;
  dores: string;
  nome: string;
  problema: string;
  estrutura: string;
  entregaveis: string;
  duracao: string;
};

export type EspecialidadeVet = {
  // 1. Conheça
  descricaoTecnica: string;
  descricaoPratica: string;
  atendimentos: string;
  atendimentosPratica: string;
  perfilPacientes: string;

  // 2. Áreas de Atuação
  areas: LinhaTabela[];

  // 3. Formação e Atuação
  formacao: string;
  obrigatoria: string;
  rotina: string;
  rotinaPratica: string;

  // 4. Técnicas
  tecnicas: LinhaTabela[];

  // 5. Termos
  termos: Termo[];

  // 6. Infoprodutos
  infoTecnica: Infoproduto;
  infoGestao: Infoproduto;
  infoTutores: Infoproduto;
  tutoresLabel?: string; // Para casos especiais (ex: Patologia → Criadores B2B)
};

export const VET_ESPECIALIDADES: Record<string, EspecialidadeVet> = {
  "radiologia-veterinaria": {
    descricaoTecnica:
      "Especialidade focada no diagnóstico por métodos de imagem (radiografia, ultrassonografia, tomografia) para investigação de afecções em pequenos e grandes animais.",
    descricaoPratica:
      "É o veterinário dos bastidores que faz exames (Raio-X e Ultrassom) e emite os laudos para outros colegas tratarem o animal.",
    atendimentos:
      "Avaliação ultrassonográfica abdominal e laudos radiográficos ortopédicos/torácicos.",
    atendimentosPratica:
      "Ver se cadelas estão prenhas, se o cão engoliu um brinquedo ou se há fraturas nos ossos.",
    perfilPacientes:
      'O "cliente" principal é o colega veterinário que pede o exame. O paciente é o pet, e o decisor financeiro é o tutor (dono), frequentemente ansioso por um diagnóstico rápido.',
    areas: [
      {
        col1: "Ultrassonografia Volante",
        tecnico: "Avaliação ecográfica in loco em clínicas parceiras.",
        pratica: "O vet que dirige de clínica em clínica com a máquina no carro.",
        uso: "Clínicas sem equipamento próprio.",
      },
      {
        col1: "Radiologia Diagnóstica",
        tecnico: "Emissão de laudos radiográficos e avaliação de displasias.",
        pratica: "Olhar o raio-x e dizer se o osso quebrou ou se o coração está grande.",
        uso: "Cães traumatizados e idosos.",
      },
      {
        col1: "Tomografia/Ressonância",
        tecnico: "Imagem avançada seccional para neurologia e oncologia.",
        pratica: "Fazer a imagem 3D para achar tumores e hérnias de disco.",
        uso: "Alta complexidade e custo.",
      },
    ],
    formacao: "Medicina Veterinária (5 anos) + Especialização/Residência (2 anos) = Total: 7 anos",
    obrigatoria: "Sim. O CFMV exige título para se anunciar como Especialista.",
    rotina:
      "Carga horária exaustiva no trânsito (para volantes) ou longas horas no escuro laudando imagens.",
    rotinaPratica:
      "Passar o dia no carro indo de clínica em clínica, com a coluna doendo de carregar o ultrassom pesado.",
    tecnicas: [
      {
        col1: "Ultrassonografia FAST",
        tecnico: "Avaliação focada para pesquisa de fluido livre cavitário.",
        pratica: "Ultrassom rápido no PS para ver se há hemorragia interna.",
        uso: "Atropelamentos e traumas.",
      },
      {
        col1: "Posicionamento Radiográfico",
        tecnico: "Contenção e alinhamento anatômico para incidências ortogonais.",
        pratica: "Segurar o animal do jeito exato para a foto do osso sair perfeita.",
        uso: "Suspeita de fraturas.",
      },
      {
        col1: "Cistocentese Guiada",
        tecnico: "Punção vesical ecoguiada para coleta de urina estéril.",
        pratica: "Furar a bexiga com agulha olhando no ultrassom para tirar xixi limpo.",
        uso: "Exames de urina.",
      },
    ],
    termos: [
      {
        termo: "Corpo Estranho",
        tecnico: "Objeto não biológico no trato gastrointestinal.",
        pratica: "A bola ou meia que o cachorro engoliu e travou o intestino.",
      },
      {
        termo: "Ecocardiograma",
        tecnico: "USG focado na hemodinâmica cardíaca.",
        pratica: "Ultrassom do coração para ver força e sopro.",
      },
      {
        termo: "Radiopaco / Radiotransparente",
        tecnico: "Nível de absorção do RX.",
        pratica: "Radiopaco é branco (osso/metal), radiotransparente é preto (ar).",
      },
      {
        termo: "AFAST / TFAST",
        tecnico: "Protocolos de ultrassom de emergência (Abdomen/Tórax).",
        pratica: "Olhada rápida para achar sangramentos vitais.",
      },
      {
        termo: "Displasia Coxofemoral",
        tecnico: "Má formação da articulação do quadril.",
        pratica: "O quadril frouxo que dá muita dor em cães grandes.",
      },
    ],
    infoTecnica: {
      publico: "Vets com 1-4 anos.",
      dores:
        "Medo de errar laudo de ultrassom; Insegurança em USG de pequenos animais exóticos.",
      nome: "Mentoria USG Vet Blindado.",
      problema: "Travar na hora de laudar achados atípicos.",
      estrutura: "Aulas de varredura e rounds de imagens.",
      entregaveis: "Modelos de laudos pré-prontos e guias de botão da máquina.",
      duracao: "6 meses.",
    },
    infoGestao: {
      publico: "Imaginologistas Volantes.",
      dores:
        "Escravidão da agenda; Clínicas parceiras atrasando repasses; Desgaste físico.",
      nome: "Volante High-Ticket.",
      problema:
        "Vive no trânsito, cobra barato o exame e não consegue escalar o negócio.",
      estrutura: "Como precificar o exame e captar grandes clínicas (B2B).",
      entregaveis: "Contratos de parceria B2B, tabela de precificação.",
      duracao: "6 meses.",
    },
    infoTutores: {
      publico: "Criadores profissionais de cães de raça.",
      dores:
        "Perda de ninhadas caras por falta de monitoramento; Ansiedade na gestação.",
      nome: "Acompanhamento Gestacional Pet Prime.",
      problema: "Medo do sofrimento fetal e morte dos filhotes.",
      estrutura: "Pacote de USGs programados com acompanhamento vital.",
      entregaveis: "Calendário de vacinação/desmame em PDF, contato de urgência.",
      duracao: "3 meses.",
    },
  },

  "cirurgia-geral-veterinaria": {
    descricaoTecnica:
      "Especialidade dedicada à intervenção cirúrgica de tecidos moles, abordando tratos gastrointestinal, geniturinário e respiratório, além de cirurgias oncológicas básicas.",
    descricaoPratica:
      'O vet que "abre e opera" o animal, seja para uma castração de rotina ou para salvar a vida de um cão que torceu o estômago.',
    atendimentos:
      "Ovariohisterectomia (OSH), orquiectomia, enterotomia e nodulectomias.",
    atendimentosPratica:
      "Castração de fêmeas e machos, abrir o intestino para tirar objetos engolidos e arrancar tumores de pele.",
    perfilPacientes:
      "Cães e gatos de todas as idades. Os tutores chegam apavorados, temendo a anestesia geral e o pós-operatório.",
    areas: [
      {
        col1: "Cirurgia Eletiva",
        tecnico: "Procedimentos programados como OSH e castrações.",
        pratica: "Castrações de rotina e cirurgias agendadas preventivas.",
        uso: "Tutores jovens focados em saúde longa.",
      },
      {
        col1: "Cirurgia de Emergência",
        tecnico: "Intervenções de salvamento (ex: dilatação vólvulo-gástrica).",
        pratica: "Operar correndo um cão atropelado ou com estômago torcido.",
        uso: "Urgências de plantão.",
      },
      {
        col1: "Cirurgia de Tecidos Moles",
        tecnico: "Abordagem de cavidade abdominal e torácica não-óssea.",
        pratica: "Operar baço, bexiga, fígado e pulmão.",
        uso: "Doenças crônicas e cálculos.",
      },
    ],
    formacao:
      "Medicina Veterinária (5 anos) + Residência/Especialização (2-3 anos) = Total: 7 a 8 anos",
    obrigatoria: "Sim, para RQE.",
    rotina:
      "Bloco cirúrgico intenso, cheiros fortes, lidar com sangramentos imprevistos e trabalhar muito como cirurgião volante (indo operar em várias clínicas).",
    rotinaPratica:
      "Ficar horas de pé operando, carregar suas próprias caixas de cirurgia pesadas e lidar com donos de clínicas que pagam pouco.",
    tecnicas: [
      {
        col1: "Ovariohisterectomia (OSH)",
        tecnico: "Exérese cirúrgica de ovários e útero.",
        pratica: "A famosa castração de fêmeas para evitar cio e tumores.",
        uso: "Rotina preventiva.",
      },
      {
        col1: "Cistotomia",
        tecnico: "Incisão da vesícula urinária para remoção de urólitos.",
        pratica: 'Abrir a bexiga para tirar "pedras" que impedem o pet de urinar.',
        uso: "Cães e gatos obstruídos.",
      },
      {
        col1: "Laparotomia Exploratória",
        tecnico: "Abertura da cavidade abdominal para diagnóstico visual.",
        pratica: "Abrir a barriga quando os exames não mostram o problema.",
        uso: "Abdome agudo.",
      },
    ],
    termos: [
      {
        termo: "Piometra",
        tecnico: "Infecção purulenta do útero.",
        pratica:
          "Útero cheio de pus, emergência cirúrgica clássica em fêmeas não castradas.",
      },
      {
        termo: "Torção Gástrica (DVG)",
        tecnico: "Dilatação e rotação do estômago no próprio eixo.",
        pratica:
          "O estômago do cão grande enche de gás e gira, matando em horas se não operar.",
      },
      {
        termo: "Enterectomia",
        tecnico: "Ressecção de segmento intestinal com anastomose.",
        pratica: "Cortar um pedaço podre do intestino e costurar as pontas boas.",
      },
      {
        termo: "Deiscência",
        tecnico: "Ruptura da sutura cirúrgica.",
        pratica: "Quando os pontos do cachorro abrem porque ele lambeu ou pulou.",
      },
      {
        termo: "Hemostasia",
        tecnico: "Manobras para contenção de hemorragia.",
        pratica: "Parar o sangramento durante a cirurgia amarrando as veias.",
      },
    ],
    infoTecnica: {
      publico: "Cirurgiões 1-4 anos.",
      dores:
        "Pânico de hemorragias ao retirar o baço; Insegurança em enterotomias.",
      nome: "Bisturi Vet Seguro.",
      problema: "Formação fraca na prática de tecidos moles avançados.",
      estrutura: "Aulas de técnica cirúrgica em vídeo.",
      entregaveis: "Guia de hemostasia de emergência.",
      duracao: "6 meses.",
    },
    infoGestao: {
      publico: "Cirurgiões Volantes.",
      dores: "Ganhar 30% da cirurgia e deixar o lucro com a clínica parceira.",
      nome: "Cirurgião Vet High-Ticket.",
      problema:
        "Vender serviço barato por medo de não ser chamado pela clínica.",
      estrutura: "Como abrir clínica própria ou negociar % maiores.",
      entregaveis: "Precificação de caixas cirúrgicas.",
      duracao: "6 meses.",
    },
    infoTutores: {
      publico: "Tutores de pets operados.",
      dores: "Pânico do cachorro arrancar os pontos de madrugada.",
      nome: "Pós-Operatório Vet Sem Estresse.",
      problema: "Medo de complicações graves em casa.",
      estrutura: "Suporte WhatsApp 30 dias + Guias de curativo.",
      entregaveis: "PDF de dieta pós-alta, SOS curativo.",
      duracao: "3 meses.",
    },
  },

  "anestesiologia-veterinaria": {
    descricaoTecnica:
      "Manejo farmacológico da dor, sedação, bloqueios locorregionais e anestesia geral, com suporte avançado de vida perioperatório.",
    descricaoPratica:
      "É o guardião da vida do pet. Faz o bicho dormir sem dor, controla o coração e a respiração durante a cirurgia, e o acorda com segurança.",
    atendimentos:
      "Anestesia inalatória, bloqueio epidural e monitoramento hemodinâmico.",
    atendimentosPratica:
      "Colocar o pet na máquina de respirar gás anestésico e dar anestesia nas costas para não doer a cirurgia.",
    perfilPacientes:
      "Cães, gatos (e silvestres) que vão operar. O tutor tem mais medo do anestesista (medo do pet não acordar) do que do próprio cirurgião.",
    areas: [
      {
        col1: "Anestesia de Pequenos",
        tecnico: "TIVA e inalatória para cães e gatos.",
        pratica: "Fazer cães e gatos dormirem para castrar ou operar.",
        uso: "Rotina diária.",
      },
      {
        col1: "Manejo de Dor Crônica",
        tecnico: "Abordagem de pacientes oncológicos ou com artrose severa.",
        pratica: "Tirar a dor de pets idosos com câncer ou juntas gastas.",
        uso: "Idosos.",
      },
      {
        col1: "Anestesia de Exóticos",
        tecnico: "Protocolos anestésicos para aves, répteis e roedores.",
        pratica: "Anestesiar coelhos e calopsitas (altíssimo risco).",
        uso: "Pets não convencionais.",
      },
    ],
    formacao:
      "Medicina Veterinária (5 anos) + Residência/Especialização (2 anos) = Total: 7 anos",
    obrigatoria: "Sim.",
    rotina:
      "Chegar antes, preparar a máquina, entubar o animal, monitorar bipes de tela por horas e só ir embora quando o pet estiver acordado e seguro.",
    rotinaPratica:
      "Ser o primeiro a chegar e o último a sair. Viver sob tensão máxima nos bipes do monitor cardíaco.",
    tecnicas: [
      {
        col1: "Anestesia Inalatória",
        tecnico:
          "Manutenção do plano anestésico via isoflurano vaporizado endotraqueal.",
        pratica:
          "Manter o pet dormindo através de um tubo que manda gás anestésico pro pulmão.",
        uso: "Cirurgias médias/longas.",
      },
      {
        col1: "Bloqueio Epidural",
        tecnico: "Infiltração de anestésico local no espaço epidural.",
        pratica:
          'A famosa "rack" ou epidural para tirar a dor da cintura para baixo.',
        uso: "Cirurgias de perna e castração.",
      },
      {
        col1: "TIVA (Total Intravenous Anesthesia)",
        tecnico: "Anestesia geral exclusiva por fármacos intravenosos contínuos.",
        pratica: "Fazer o pet dormir só usando remédios direto na veia por bomba.",
        uso: "Neurocirurgia ou falta de gás.",
      },
    ],
    termos: [
      {
        termo: "Bradicardia",
        tecnico: "Queda da frequência cardíaca abaixo do basal.",
        pratica: "O coração batendo muito devagar (sinal de alerta na anestesia).",
      },
      {
        termo: "Apneia",
        tecnico: "Cessação dos movimentos respiratórios.",
        pratica: "O animal parou de respirar e a máquina precisa assumir.",
      },
      {
        termo: "Capnografia",
        tecnico: "Mensuração do CO₂ expirado pelo paciente.",
        pratica:
          "O gráfico que mostra se a respiração e a entubação estão corretas.",
      },
      {
        termo: "Extubação",
        tecnico: "Retirada da sonda endotraqueal após retorno do reflexo.",
        pratica: "Tirar o tubo da garganta quando o pet começa a acordar e tossir.",
      },
      {
        termo: "Analgesia Multimodal",
        tecnico: "Associação de fármacos com diferentes mecanismos para dor.",
        pratica: "Atacar a dor por vários caminhos de remédios juntos.",
      },
    ],
    infoTecnica: {
      publico: "Anestesistas recentes.",
      dores:
        "Pavor de parar pets cardíacos; Insegurança em anestesiar braquicefálicos (Pug, Bulldog).",
      nome: "Mentoria Anestesia Vet Segura.",
      problema: "Medo do animal morrer na mesa por falha farmacológica.",
      estrutura: "Estudo de casos e protocolos de TIVA.",
      entregaveis: "Calculadora de doses em bomba de seringa.",
      duracao: "6 meses.",
    },
    infoGestao: {
      publico: "Anestesistas Volantes.",
      dores:
        "Ser pago por baixo pela clínica; O tutor não entende o valor da anestesia.",
      nome: "Anestesista de Alto Valor.",
      problema: "Trabalha na sombra do cirurgião.",
      estrutura:
        "Fazer avaliação pré-anestésica cobrada separadamente direto com o tutor.",
      entregaveis: "Termos de risco anestésico, script de consulta pré.",
      duracao: "6 meses.",
    },
    infoTutores: {
      publico: "Tutores de pets idosos com artrose crônica (dor constante).",
      dores:
        "Cão não levanta mais, chora de dor, toma remédio de farmácia e não melhora.",
      nome: "Pet Sem Dor 360.",
      problema: "Qualidade de vida destruída pela dor.",
      estrutura:
        "Manejo canabinoide (CBD) e analgésicos avançados com acompanhamento quinzenal.",
      entregaveis: "Diário de dor do pet.",
      duracao: "6 meses.",
    },
  },

  "clinico-geral-veterinario": {
    descricaoTecnica:
      "Base da medicina veterinária focada na medicina preventiva, triagem diagnóstica, vacinação e tratamento de afecções comuns ambulatoriais.",
    descricaoPratica:
      "O pediatra e o geriatra do pet. Faz o check-up anual, dá as vacinas e resolve alergias, vermes e infecções de ouvido.",
    atendimentos:
      "Vacinação polivalente/antirrábica, manejo de gastroenterites e dermatopatias leves.",
    atendimentosPratica:
      "Dar as injeções de rotina, tratar cachorros com diarreia/vômito e curar coceiras comuns.",
    perfilPacientes:
      'Todos. Os tutores confiam muito neste profissional como o "médico de família" do pet.',
    areas: [
      {
        col1: "Clínica Preventiva (Pediatria)",
        tecnico: "Protocolos vacinais e vermifugação em neonatos.",
        pratica: "Dar a primeira série de vacinas e remédio de verme no filhote.",
        uso: "Filhotes.",
      },
      {
        col1: "Plantão Clínico",
        tecnico: "Abordagem sindrômica inicial de urgências no PS.",
        pratica: "Atender o que chegar de madrugada (febre, dor, brigas).",
        uso: "Plantões noturnos.",
      },
      {
        col1: "Geriatria Preventiva",
        tecnico: "Rastreio metabólico e controle geriátrico.",
        pratica: "Fazer exames de sangue anuais em cães velhinhos.",
        uso: "Pets acima de 8 anos.",
      },
    ],
    formacao: "Medicina Veterinária (5 anos) = Total: 5 anos",
    obrigatoria: "Sim (Graduação). Não exige residência.",
    rotina:
      'Muito volume de consultas diárias, respondendo dezenas de mensagens no WhatsApp com tutores perguntando "se o cocô tá normal".',
    rotinaPratica:
      "Atender 10 pets por dia, vender vacinas e viver no celular resolvendo dúvidas gratuitas de donos ansiosos.",
    tecnicas: [
      {
        col1: "Anamnese Completa",
        tecnico:
          "Entrevista clínica investigativa sobre manejo, ambiente e sinais do pet.",
        pratica:
          "A entrevista longa de detetive com o dono para descobrir o que o pet comeu.",
        uso: "Toda consulta.",
      },
      {
        col1: "Coleta de Sangue / Venopunção",
        tecnico: "Acesso venoso periférico (jugular/cefálica) para amostragem.",
        pratica: "Tirar sangue do pescoço ou patinha para fazer exame.",
        uso: "Check-ups e pets doentes.",
      },
      {
        col1: "Fluidoterapia",
        tecnico:
          "Infusão endovenosa de cristaloides para correção de déficit hídrico.",
        pratica: 'Deixar o pet "no soro" na clínica para curar desidratação.',
        uso: "Diarreias e vômitos agudos.",
      },
    ],
    termos: [
      {
        termo: "Gastroenterite",
        tecnico: "Inflamação do estômago e intestinos.",
        pratica: "A clássica diarreia com vômito.",
      },
      {
        termo: "Doença do Carrapato (Hemoparasitose)",
        tecnico: "Infecção por Erliquiose ou Babesiose.",
        pratica:
          "Doença grave transmitida por carrapato que destrói o sangue do cão.",
      },
      {
        termo: "Cinomose / Parvovirose",
        tecnico: "Doenças virais letais da infância.",
        pratica:
          "As piores viroses que matam filhotes não vacinados rapidamente.",
      },
      {
        termo: "Otite",
        tecnico: "Inflamação do conduto auditivo.",
        pratica: "Dor e pus no ouvido (cachorro balançando a cabeça).",
      },
      {
        termo: "Profilaxia",
        tecnico: "Prevenção de doenças (vacinas, antipulgas).",
        pratica: "Tudo que se faz para o bicho não ficar doente.",
      },
    ],
    infoTecnica: {
      publico: "Clínicos com 1-4 anos.",
      dores:
        "Dúvida ao interpretar exames de sangue confusos; Pânico no plantão noturno sozinho.",
      nome: "Domínio do Plantão Clínico Vet.",
      problema:
        "O recém-formado é jogado no plantão noturno sozinho e erra diagnósticos básicos por falta de base prática.",
      estrutura: "Casos clínicos ao vivo semanais.",
      entregaveis:
        "Checklists de conduta emergencial; Guia de exames laboratoriais rápidos.",
      duracao: "6 meses.",
    },
    infoGestao: {
      publico: "Donos de consultórios vet e clínicos de bairro.",
      dores:
        "Guerra de preços de vacina; WhatsApp gratuito sugando a energia; Receita imprevisível.",
      nome: "Assinatura Clínica Vet (Mensalidade).",
      problema: "Vende consulta avulsa barata e perde dinheiro.",
      estrutura:
        "Transição para planos de saúde próprios preventivos (assinatura anual do pet).",
      entregaveis:
        "Contratos de plano de prevenção; Script para não responder grátis no WhatsApp.",
      duracao: "6 meses.",
    },
    infoTutores: {
      publico:
        '"mães de pet" de primeira viagem (cães de raça pequenos).',
      dores:
        "Medo do filhote morrer por engasgo, doenças ou viroses; Cachorro destruindo a casa.",
      nome: "Filhote Blindado Prime.",
      problema: "Informação confusa do Google enlouquece o dono.",
      estrutura:
        "Acompanhamento quinzenal de desenvolvimento, calendário vacinal e tira-dúvidas.",
      entregaveis:
        "Guia de desfralde (xixi no lugar certo); Protocolo SOS Engasgo Pet.",
      duracao: "3 meses.",
    },
  },

  "oncologia-veterinaria": {
    descricaoTecnica:
      "Especialidade médica dedicada ao diagnóstico, estadiamento clínico e tratamento (quimioterapia, imunoterapia e paliação) de neoplasias benignas e malignas.",
    descricaoPratica:
      "O médico especialista em câncer animal. Cuida dos tumores, receita quimioterapia e ajuda a dar qualidade de vida ao pet gravemente doente.",
    atendimentos:
      "Estadiamento de linfomas e mastocitomas, infusão de quimioterápicos antineoplásicos.",
    atendimentosPratica:
      "Descobrir o tamanho do câncer, passar soro com quimioterapia na veia e evitar que o tumor se espalhe.",
    perfilPacientes:
      "Cães e gatos idosos. Tutores chegam com luto antecipado, desesperados e precisando de imenso suporte emocional.",
    areas: [
      {
        col1: "Oncologia Clínica / Quimioterapia",
        tecnico:
          "Protocolos quimioterápicos endovenosos sistêmicos (ex: CHOP).",
        pratica:
          "Aplicar o remédio forte na veia para matar as células do câncer.",
        uso: "Linfomas, leucemias e pós-cirúrgicos.",
      },
      {
        col1: "Eletroquimioterapia",
        tecnico:
          "Associação de fármaco com pulsos elétricos no tumor para permeabilização.",
        pratica:
          'Dar "choques" no tumor após injeção para o remédio entrar e secar a massa.',
        uso: "Tumores de pele muito grandes.",
      },
      {
        col1: "Cuidados Paliativos",
        tecnico:
          "Manejo focado em analgesia e qualidade de vida no fim de vida.",
        pratica: "Tirar a dor e dar conforto total até a hora de o animal partir.",
        uso: "Câncer terminal e metástases graves.",
      },
    ],
    formacao:
      "Medicina Veterinária (5 anos) + Especialização Oncologia (2 anos) = Total: 7 anos",
    obrigatoria: "Sim.",
    rotina:
      "Longas consultas explicativas, muito contato com a morte e toxicidade dos quimioterápicos. Exige grande controle de biossegurança.",
    rotinaPratica:
      "Chorar junto com o tutor, vestir roupas espaciais e capelas fechadas para preparar remédios tóxicos (químio) e ver animais que não resistem.",
    tecnicas: [
      {
        col1: "Citologia Aspirativa (PAAF)",
        tecnico:
          "Punção com agulha fina de neoformação para avaliação celular prévia.",
        pratica:
          "Furar o caroço com agulhinha e olhar no microscópio para ver se é câncer.",
        uso: "Todo nódulo ou caroço encontrado.",
      },
      {
        col1: "Estadiamento (TNM)",
        tecnico: "Pesquisa de linfonodos e metástase à distância via imagem.",
        pratica:
          "Fazer ultrassom e raio-x no corpo todo para ver se o câncer se espalhou.",
        uso: "Antes de qualquer cirurgia oncológica.",
      },
      {
        col1: "Infusão Antineoplásica",
        tecnico:
          "Acesso venoso perfeito para administração de drogas irritantes/vesicantes.",
        pratica:
          "Soro da quimioterapia, onde a agulha não pode vazar de jeito nenhum.",
        uso: "Ciclos mensais ou semanais de tratamento.",
      },
    ],
    termos: [
      {
        termo: "Neoplasia Maligna",
        tecnico:
          "Proliferação celular atípica, desordenada com invasão tecidual.",
        pratica: "O câncer perigoso e agressivo que destrói os órgãos.",
      },
      {
        termo: "Metástase",
        tecnico: "Disseminação de células neoplásicas para órgãos distantes.",
        pratica:
          'Quando o câncer do tumor inicial "espalha" pelo sangue para o pulmão ou fígado.',
      },
      {
        termo: "Mastocitoma",
        tecnico:
          "Neoplasia cutânea maligna de mastócitos (muito comum em cães).",
        pratica: "O câncer de pele mais comum dos cachorros, que incha e inflama.",
      },
      {
        termo: "Margem Cirúrgica",
        tecnico: "Tecido sadio retirado ao redor do tumor.",
        pratica:
          "A quantidade de pele boa que precisa ser cortada em volta do câncer para garantir que não sobrou raiz.",
      },
      {
        termo: "Eutanásia",
        tecnico: "Indução farmacológica indolor da morte por razões de bem-estar.",
        pratica:
          'O "descanso final" quando o sofrimento da doença é irreversível e cruel.',
      },
    ],
    infoTecnica: {
      publico: "Oncos 1-4 anos e clínicos gerais.",
      dores:
        "Insegurança grave de vazar quimioterapia na pata do cão e necrosear tudo; Não saber prescrever paliativos focados em dor oncológica extrema.",
      nome: "Mentoria OncoVet Segura.",
      problema:
        "Errar a dose da quimioterapia mata o animal de intoxicação ou permite que o tumor cresça.",
      estrutura: "Casos oncológicos guiados.",
      entregaveis:
        "Calculadora de área de superfície corporal (m²); Guia de manejo de reações alérgicas da quimio.",
      duracao: "6 meses.",
    },
    infoGestao: {
      publico: "Oncologistas Veterinários.",
      dores:
        "Carga emocional brutal de conviver com o luto; Tutores abandonando o tratamento caro no meio do caminho por falta de verba.",
      nome: "OncoVet Premium: Gestão de Esperança e Valor.",
      problema:
        "Vender quimioterápicos não é vender produtos, é vender sobrevida. Precisa alinhar pacotes de saúde fechados.",
      estrutura:
        "Precificação de ciclos de Quimioterapia e acompanhamento psico-veterinário.",
      entregaveis:
        "Contratos de tratamento oncológico de longo prazo; Treinamento de comunicação de más notícias para a equipe.",
      duracao: "6 meses.",
    },
    infoTutores: {
      publico:
        "Tutores de cães/gatos com diagnóstico recente de câncer não curável.",
      dores:
        'Desespero, sentimento de culpa severa; Dúvidas diárias de "será que ele está com dor e deve ser sacrificado hoje?".',
      nome: "Mentoria Cuidados Paliativos & Qualidade de Vida.",
      problema:
        'O tutor fica sozinho em casa com o animal doente e definhando. Paga para ter o médico "segurando sua mão" nessa jornada final de meses.',
      estrutura:
        "Acompanhamento semanal de escore de qualidade de vida do pet.",
      entregaveis:
        "Diário HHHHHMM Scale (Escala de Qualidade de Vida do Pet); SOS WhatsApp direto para crises de dor.",
      duracao: "3 a 6 meses.",
    },
  },

  "dermatologia-veterinaria": {
    descricaoTecnica:
      "Diagnóstico e manejo de afecções tegumentares (pele e anexos) e sistema auditivo, majoritariamente imunomediadas, alérgicas, fúngicas e bacterianas.",
    descricaoPratica:
      "O médico de pele e ouvidos. Trata alergias infinitas, sarnas, fungos e cães que não param de se coçar ou lamber as patas.",
    atendimentos:
      "Controle da Dermatite Atópica Canina (DAC) e otites crônicas recidivantes.",
    atendimentosPratica:
      "Dar banhos medicamentosos, prescrever vacinas antialérgicas e remédios imunossupressores para cachorros que se coçam até sangrar.",
    perfilPacientes:
      'Raças alérgicas clássicas (Bulldog, Shih-tzu, Golden). Tutores esgotados pelo mau cheiro do cão e barulho da coceira de madrugada. Alta demanda emocional por buscarem a "cura" que não existe (só controle).',
    areas: [
      {
        col1: "Alergologia Vet",
        tecnico: "Investigação e imunoterapia para alergia alimentar e DAC.",
        pratica:
          "Descobrir se o cão tem alergia a frango, poeira ou grama e vacinar.",
        uso: "Cães que lambem patas e se coçam sempre.",
      },
      {
        col1: "Otologia Veterinária",
        tecnico:
          "Avaliação do canal auditivo (otoscopia) e lavagem de orelhas médias.",
        pratica: "Curar os ouvidos cheios de pus, fungo e cera que doem muito.",
        uso: "Orelhas inflamadas cronicamente.",
      },
      {
        col1: "Dermatologia Infecciosa",
        tecnico:
          "Tratamento de Piodermites profundas, Dermatofitoses e Malasseziose.",
        pratica:
          'Curar o cachorro com cheiro forte de "chulé", cheio de feridas e fungos na pele.',
        uso: "Sarnas e infecções bacterianas na pele.",
      },
    ],
    formacao:
      "Medicina Veterinária (5 anos) + Especialização Dermato (2 anos) = Total: 7 anos",
    obrigatoria: "Sim.",
    rotina:
      "Muito microscópio no próprio consultório (raspar a pele e olhar), repetição constante das mesmas doenças (90% é alergia) e muito atrito com donos que querem milagres em doenças incuráveis.",
    rotinaPratica:
      "Passar o dia vendo ácaros e bactérias no microscópio, acalmando donos frustrados que dizem que o cachorro não para de feder mesmo com banho.",
    tecnicas: [
      {
        col1: "Raspado Cutâneo (Citologia)",
        tecnico:
          "Coleta de material do estrato córneo para pesquisa parasitológica e celular sob microscopia.",
        pratica:
          "Raspar a pele machucada com lâmina e olhar no microscópio para achar o ácaro da sarna ou bactérias.",
        uso: "Toda consulta dermatológica básica.",
      },
      {
        col1: "Dieta de Eliminação",
        tecnico:
          "Fornecimento de proteína hidrolisada exclusiva por 60 dias para diagnóstico de Alergia Alimentar.",
        pratica:
          "Dar ração especial anti-alérgica sem nenhum petisco por dois meses para ver se a coceira some.",
        uso: "Diagnóstico de alergia de comida.",
      },
      {
        col1: "Video-otoscopia",
        tecnico:
          "Inspeção do canal auditivo com câmera fibrótica até a membrana timpânica.",
        pratica:
          "Colocar uma microcâmera no ouvido do cão e mostrar a sujeira e inflamação na TV para o dono.",
        uso: "Otites graves.",
      },
    ],
    termos: [
      {
        termo: "Dermatite Atópica (DAC)",
        tecnico:
          "Doença inflamatória pruriginosa crônica de origem genética/ambiental.",
        pratica:
          'A famosa alergia a "tudo" (poeira, pólen, ácaros) que faz o cão lamber as patas e ter otite crônica.',
      },
      {
        termo: "Prurido",
        tecnico:
          "Sensação cutânea desagradável provocando o reflexo de coçar.",
        pratica: "A coceira desesperadora do animal.",
      },
      {
        termo: "Piodermite",
        tecnico: "Infecção bacteriana da pele, geralmente secundária.",
        pratica:
          "Bolinhas de pus e crostas de feridas na pele (geralmente por estafilococos).",
      },
      {
        termo: "Malassezia",
        tecnico: "Levedura (fungo) oportunista comensal da pele.",
        pratica:
          'O fungo que prolifera e dá o cheiro terrível de "queijo/chulé" na pele e orelha do cão alérgico.',
      },
      {
        termo: "Alopecia",
        tecnico: "Perda de pelame focal ou generalizada.",
        pratica: "O animal ficar careca, com falhas na pelagem.",
      },
    ],
    infoTecnica: {
      publico: "Clínicos com 1-4 anos.",
      dores:
        'Tratar otites repetitivas e o tutor brigar que "nunca sara"; Não saber prescrever imunossupressores biológicos caros (Apoquel, Cytopoint).',
      nome: "Mentoria Dermato Vet Prática.",
      problema:
        "Dermatologia gera muita grana, mas o clínico só sabe passar corticoide, viciando e adoecendo o pet (iatrogenia).",
      estrutura: "Casos clínicos, aulas de citologia em consultório.",
      entregaveis:
        "Atlas fotográfico de lâminas de microscópio; Guia de desmame de corticoides.",
      duracao: "6 meses.",
    },
    infoGestao: {
      publico: "Dermatologistas Vet.",
      dores:
        "Consulta complexa com baixo valor agregado; Retornos infinitos que não geram faturamento; Tutores desistindo na metade por custo de xampus.",
      nome: "DermaVet Premium: Fim da Consulta Isolada.",
      problema:
        'O dermato sofre porque atopia não tem cura, tem controle. Se cobrar por consulta avulsa, o cliente acha caro. Precisa vender pacotes anuais de controle.',
      estrutura:
        'Modelagem de planos anuais de Atopia, marketing focado na dor de "dormir sem o barulho da lambedura".',
      entregaveis:
        "Planilha de pacote trimestral (vacina + xampus + consultas).",
      duracao: "6 meses.",
    },
    infoTutores: {
      publico: "Tutores de cães atópicos (Bulldogs Franceses, Spitz).",
      dores:
        "Gastos absurdos com pet-shops, rações caras e pomadas, sem resultado; Pet fede e não dorme; Sofre com o cachorro chorando de dor no ouvido.",
      nome: "Programa Cão Atópico Controlado (Pele de Ouro).",
      problema:
        "O dono erra no manejo básico em casa. Dá o petisco errado, dá banho com sabonete errado e destrói o tratamento. Ele precisa de educação semanal focada.",
      estrutura:
        "Acompanhamento quinzenal de estilo de vida do pet, orientação ambiental e manejo de banhoterapia (banhos terapêuticos em casa).",
      entregaveis:
        "Guia de banho terapêutico correto; Diário de prurido (coceira).",
      duracao: "6 meses.",
    },
  },

  "oftalmologia-veterinaria": {
    descricaoTecnica:
      "Ramo clínico e microcirúrgico destinado ao diagnóstico, tratamento e preservação da estrutura ocular e anexos em animais.",
    descricaoPratica:
      "O médico dos olhos. Trata alergias nos olhos, cura úlceras de córnea de cães de olho esbugalhado (Pug) e opera a catarata do cão idoso.",
    atendimentos:
      "Úlceras de córnea, glaucoma, catarata e olho seco (KCS).",
    atendimentosPratica:
      "Curar arranhões nos olhos, medir a pressão ocular para o cão não ficar cego e tirar a lente opaca (catarata).",
    perfilPacientes:
      "Raças braquicefálicas (focinho curto e olho saltado) e idosos. Tutores têm desespero absoluto de que o cão perca o olho ou fique cego, gerando enorme urgência.",
    areas: [
      {
        col1: "Microcirurgia Oftálmica",
        tecnico:
          "Facoemulsificação e reconstruções corneanas/palpebrais (enxertos).",
        pratica:
          "Cirurgia fina de catarata e costuras no olho sob o microscópio.",
        uso: "Catarata, úlceras perfurantes e entrópio (pálpebra virada).",
      },
      {
        col1: "Oftalmologia Clínica",
        tecnico: "Controle de ceratoconjuntivite seca e uveítes imunes.",
        pratica:
          "Passar colírios específicos para infecções e inflamações graves da íris e olho seco.",
        uso: "Pacientes de rotina e alérgicos.",
      },
      {
        col1: "Neuro-oftalmologia",
        tecnico: "Investigação das vias ópticas nervosas e cegueira central.",
        pratica:
          "Descobrir se a cegueira vem do olho ou de lesão cerebral no fundo do nervo.",
        uso: "Cegueira súbita.",
      },
    ],
    formacao:
      "Medicina Veterinária (5 anos) + Especialização (2 anos) = Total: 7 anos",
    obrigatoria: "Sim.",
    rotina:
      "Consultas no escuro usando fendas de luz e lupas na cabeça, lidando com animais agressivos na hora de pingar colírios e tensão máxima na microcirurgia.",
    rotinaPratica:
      "Desligar a luz o dia todo para examinar olhos brilhantes de pets, e muito estresse por precisar de precisão de fios mais finos que cabelo na cirurgia.",
    tecnicas: [
      {
        col1: "Teste de Fluoresceína",
        tecnico:
          "Colírio de corante fluoróforo para detecção de defeitos no epitélio corneano sob luz azul.",
        pratica:
          "Pingar colírio amarelo e ligar a luz UV para ver se o olho está arranhado/machucado (úlcera).",
        uso: "Sempre que o pet fechar o olho de dor.",
      },
      {
        col1: "Tonometria",
        tecnico:
          "Mensuração da pressão intraocular (PIO) através de tonômetro de rebote/aplanamento.",
        pratica:
          "Bater um pininho plástico de leve no olho do cachorro para medir a pressão e ver se tem glaucoma.",
        uso: "Rotina e glaucoma.",
      },
      {
        col1: "Teste de Schirmer",
        tecnico:
          "Fita de papel de filtro na conjuntiva para quantificação da produção de lágrima basal.",
        pratica:
          'Colocar um papelzinho no olho por 1 minuto para ver se o cão fabrica lágrima suficiente ou tem "olho seco".',
        uso: "Olhos vermelhos e com remela.",
      },
    ],
    termos: [
      {
        termo: "Ceratoconjuntivite Seca (KCS)",
        tecnico:
          "Disfunção crônica das glândulas lacrimais (Olho Seco).",
        pratica:
          "Falta de lágrima que faz o olho encher de remela grossa esverdeada e inflamar.",
      },
      {
        termo: "Úlcera de Córnea",
        tecnico: "Perda de continuidade do epitélio/estroma da córnea.",
        pratica:
          'Arranhão profundo na "tampa" do olho, que dói muito e pode furar.',
      },
      {
        termo: "Catarata",
        tecnico: "Opacificação das fibras do cristalino lenticular.",
        pratica: "O olho fica branco e opaco e o cachorro idoso bate nos móveis.",
      },
      {
        termo: "Glaucoma",
        tecnico: "Neuropatia óptica por hipertensão do humor aquoso.",
        pratica:
          "Pressão do olho explode e causa dor de cabeça terrível no pet, cegando em dias.",
      },
      {
        termo: "Proptose",
        tecnico: "Luxação traumática do globo ocular para fora da órbita.",
        pratica:
          "Quando o olho do pug/shih-tzu pula inteiro para fora do rosto após um trauma ou briga. (Urgência máxima).",
      },
    ],
    infoTecnica: {
      publico: "Oftalmos 1-4 anos.",
      dores:
        "Insegurança em microcirurgias (Flap de conjuntiva) em úlceras profundas; Medo do olho furar sob anestesia.",
      nome: "Mentoria MicroCirurgia Ocular Vet.",
      problema:
        'Na especialização, treinam em olho de porco, mas na prática a pressão de estourar um olho de Shih-Tzu é gigantesca e ele trava na hora do "vamos ver".',
      estrutura: "Análise de vídeos de microcirurgia.",
      entregaveis:
        'Checklist cirúrgico de úlcera derretida ("melting"); Protocolo de colírios agressivos em PDF.',
      duracao: "6 meses.",
    },
    infoGestao: {
      publico: "Oftalmologistas clínicos.",
      dores:
        "Cirurgia de catarata é cara e os tutores não fecham; Depender de clínicos gerais mandarem exames para eles.",
      nome: "Vendas High-Ticket OftalmoVet.",
      problema:
        "As máquinas oftálmicas custam fortunas. O oftalmo não pode vender consulta, tem que empacotar as cirurgias intraoculares premium (facoemulsificação).",
      estrutura:
        "Script de argumentação focada no resgate da visão do idoso.",
      entregaveis:
        "Modelos de termo de alto risco (Glaucoma); Planilha de ROI de máquinas caras.",
      duracao: "6 meses.",
    },
    infoTutores: {
      publico:
        "Tutores de cães recém diagnosticados com Glaucoma ou que acabaram de operar catarata.",
      dores:
        "Pingar colírios de hora em hora é exaustivo; Medo brutal do cão ficar cego permanentemente por bobeira deles em casa; Custo absurdo mensal de colírios.",
      nome: "Acompanhamento Visão Protegida 360.",
      problema:
        "O tratamento oftalmológico depende 100% da dedicação do dono em casa de respeitar horários e proteger da luz. O acompanhamento garante o resultado cirúrgico não ser perdido.",
      estrutura:
        "Suporte no WhatsApp para ajustes da pressão ocular, acompanhamento fotográfico do olho pelo tutor.",
      entregaveis:
        "Tabela de colírios com alarme programado; SOS Dor ocular.",
      duracao: "3 meses.",
    },
  },

  "ortopedia-veterinaria": {
    descricaoTecnica:
      "Abordagem clínico-cirúrgica das afecções do sistema musculoesquelético (ossos, tendões, articulações e ligamentos) em trauma e doenças degenerativas.",
    descricaoPratica:
      "O marceneiro/mecânico de ossos. Engessa pernas quebradas, coloca pinos de titânio em fraturas graves e trata o joelho solto de cães obesos.",
    atendimentos:
      "Redução de fraturas com placas/parafusos, tratamento de ruptura de ligamento cruzado cranial, cirurgia de patela.",
    atendimentosPratica:
      "Operar cachorro atropelado colocando ferro e placa no osso e consertar o joelho do cachorro que rompeu brincando para ele voltar a correr.",
    perfilPacientes:
      "Cães atropelados, cães obesos que rompem o joelho e raças grandes (Labrador, Pastor) com dores severas de quadril por idade.",
    areas: [
      {
        col1: "Traumatologia",
        tecnico:
          "Osteossíntese complexa (fixadores externos, placas bloqueadas).",
        pratica: "Furadeira e parafusos no osso para juntar a perna estilhaçada.",
        uso: "Atropelamentos e quedas altas.",
      },
      {
        col1: "Ortopedia Articular",
        tecnico:
          "Manejo de ruptura de ligamento cruzado (TPLO/TTA) e displasias.",
        pratica:
          "Técnicas modernas para estabilizar joelhos e tratar quadril gasto.",
        uso: "Doença degenerativa e acidentes do dia a dia.",
      },
      {
        col1: "Neuro-Ortopedia (Coluna)",
        tecnico: "Laminectomias e descompressão de hérnias discais.",
        pratica:
          "Operar a coluna do cachorro Dachshund (salsicha) que parou de andar.",
        uso: "Paralisias repentinas por dor na coluna.",
      },
    ],
    formacao:
      "Medicina Veterinária (5 anos) + Especialização/Residência Orto (2-3 anos) = Total: 7 a 8 anos",
    obrigatoria: "Sim.",
    rotina:
      "Especialidade pesada fisicamente e cara. Lida com serras, martelos e furadeiras no bloco. No PS, enfrenta dores extremas do pet e desespero do tutor.",
    rotinaPratica:
      "Fazer força física bruta na mesa de cirurgia de cães de 40kg para colocar o osso no lugar enquanto lida com ferramentas de impacto e radiação constante (RX).",
    tecnicas: [
      {
        col1: "Osteossíntese por Placa",
        tecnico:
          "União de fragmentos ósseos com implantes fixos de aço/titânio.",
        pratica:
          "Abrir a perna, colocar uma placa de metal em cima do osso quebrado e parafusar tudo.",
        uso: "Fraturas de ossos longos (Fêmur, Tíbia).",
      },
      {
        col1: "TPLO",
        tecnico:
          "Osteotomia de nivelamento do platô tibial para instabilidade de joelho.",
        pratica:
          "Cortar o osso da canela e girar a angulação para o joelho do cão parar de falsear sem usar ligamento artificial.",
        uso: "Ruptura de ligamento de cães pesados.",
      },
      {
        col1: "Fixador Externo",
        tecnico: "Pinos transósseos conectados a barras fora do corpo.",
        pratica: 'Aquela "gaiola de ferro" externa espetada na perna do cachorro.',
        uso: "Fraturas muito sujas e expostas.",
      },
    ],
    termos: [
      {
        termo: "Ruptura de Ligamento Cruzado Cranial (RLCC)",
        tecnico: "Falha biomecânica da estabilização femorotibial.",
        pratica:
          "Quando o ligamento do joelho estoura e a perna fica manca (muito comum).",
      },
      {
        termo: "Displasia Coxofemoral",
        tecnico: "Congruência deficiente e frouxidão do quadril.",
        pratica: "Quadril mal encaixado de nascença que mói a cartilagem.",
      },
      {
        termo: "Luxação de Patela",
        tecnico: "Deslocamento do osso do joelho do sulco troclear.",
        pratica:
          'A "bolinha" do joelho pula pra fora, o cachorrinho dá um pulinho manco e volta ao normal (comum em Spitz e Yorkshire).',
      },
      {
        termo: "Crepitação",
        tecnico: "Ruído tátil/audível de fricção óssea/articular.",
        pratica:
          'O barulho de "areia" ou "crac crac" na junta gasta quando a examina.',
      },
      {
        termo: "Hérnia de Disco Cervical/Toracolombar",
        tecnico: "Extrusão do disco da coluna.",
        pratica:
          "Compressão na medula que faz o cão uivar de dor de coluna e paralisar as patas.",
      },
    ],
    infoTecnica: {
      publico: "Ortopedistas nível pleno (1-4 anos).",
      dores:
        "Cirurgia de TPLO e fraturas articulares são um pesadelo se errar a angulação do corte; Medo dos parafusos soltarem dias depois.",
      nome: "Mentoria OrtoVet Master: Planejamento Reverso.",
      problema:
        "O erro na ortopedia é visível no Raio-x (o osso fica torto). A insegurança de serrar ossos sozinhos afasta o médico de cirurgias altamente lucrativas.",
      estrutura:
        "Aulas de planejamento de cortes cirúrgicos antes de abrir o animal.",
      entregaveis:
        "Protocolo de fixação externa; Guia de implantes bloqueados.",
      duracao: "6 meses.",
    },
    infoGestao: {
      publico: "Ortopedistas clínicos e cirurgiões.",
      dores:
        'Materiais de implante (placas TPLO) são caros e o tutor foge do orçamento de R$ 6 mil; Brigas sobre "devolução de dinheiro" se a placa infeccionar.',
      nome: "OrtoVet Rentável.",
      problema:
        "Vender cirurgia complexa ortopédica requer táticas de percepção de valor. Sem vendas, ele engessa muito e opera pouco.",
      estrutura:
        "Treinamento de script de venda no consultório provando o custo de uma vida paralisada vs a cirurgia definitiva.",
      entregaveis:
        "Modelos de termo cirúrgico com isenção em rejeição de pino.",
      duracao: "6 meses.",
    },
    infoTutores: {
      publico:
        "Tutores pós-operatórios de TPLO/Coluna e donos de pets idosos com dor crônica displásica.",
      dores:
        "Segurar o cão ativo na gaiola pós-cirurgia (repouso) é um terror; Cachorro obeso chora de dor para levantar todo dia; Reabilitação (fisioterapia) custa caro.",
      nome: "RehabVet em Casa (Movimento sem Dor).",
      problema:
        "O sucesso da cirurgia depende do cão não pular por 30 dias, e os tutores piram com isso. Além de cães com dor crônica que precisam perder peso com urgência.",
      estrutura:
        "Acompanhamento quinzenal de repouso, fisioterapia básica passiva em casa (ensinada por vídeo).",
      entregaveis:
        'Cronograma de "Ocupação Mental" (brinquedos de roer) para cão repousar; Protocolo de Dieta de Redução Articular.',
      duracao: "3 meses.",
    },
  },

  "patologia-veterinaria": {
    descricaoTecnica:
      "Estudo macro e microscópico das lesões teciduais decorrentes de processos patológicos, fornecendo o diagnóstico etiológico ou celular através de citologia, histopatologia e necropsia.",
    descricaoPratica:
      "É o médico dos tecidos e dos mortos. Ele avalia as biópsias para dizer se aquele nódulo é câncer e faz necropsias para descobrir do que o pet morreu.",
    atendimentos:
      "Leitura de lâminas de citologia e biópsias tumorais para clínicas oncológicas e cirurgiões.",
    atendimentosPratica:
      "Ficar no microscópio avaliando se as células retiradas pelo cirurgião são do bem ou do mal, e dar o veredito final.",
    perfilPacientes:
      "Não há contato direto com o pet vivo ou o tutor. O cliente é B2B (Clínicas veterinárias, hospitais, zoológicos e grandes criadores comerciais).",
    areas: [
      {
        col1: "Patologia Cirúrgica (Histopatologia)",
        tecnico:
          "Análise estrutural de fragmentos de biópsia em formol e parafina.",
        pratica:
          "Fazer cortes fininhos do tumor que o cirurgião mandou e dizer que tipo exato de câncer é.",
        uso: "Alta escala para oncologistas.",
      },
      {
        col1: "Patologia Clínica (Laboratório)",
        tecnico: "Leitura de hemogramas, bioquímicos e fluidos corporais.",
        pratica:
          "O patologista da máquina de exame de sangue (avaliar células de sangue/urina).",
        uso: "Laboratórios de rotina.",
      },
      {
        col1: "Necropsia / Forense",
        tecnico:
          "Abertura de cadáveres para causa mortis e exames periciais legais.",
        pratica:
          "Abrir os pets que faleceram misteriosamente para ver se houve veneno ou erro médico (CSI Animal).",
        uso: "Hospitais, criadores e disputas judiciais.",
      },
    ],
    formacao:
      "Medicina Veterinária (5 anos) + Residência/Especialização (2 a 3 anos) = Total: 7 a 8 anos",
    obrigatoria: "Sim.",
    rotina:
      "Passar a vida isolado em laboratórios refrigerados (ou com forte cheiro de formol na sala de necropsia), debruçado sobre microscópios, emitindo dezenas de laudos cruciais sob imensa responsabilidade (um erro de laudo e o pet perde a perna por um câncer falso).",
    rotinaPratica:
      "Trabalho invisível, altíssima cobrança técnica e risco de alergias severas ao formol.",
    tecnicas: [
      {
        col1: "Microscopia Óptica",
        tecnico: "Análise celular de corantes em lâminas (H&E, Giemsa).",
        pratica:
          "A velha arte de olhar pelo microscópio e reconhecer os núcleos das células das doenças.",
        uso: "100% da rotina diária.",
      },
      {
        col1: "Imuno-histoquímica (IHQ)",
        tecnico:
          "Uso de anticorpos marcados para identificar proteínas específicas do tumor e sua origem.",
        pratica:
          'Técnica cara para descobrir o "nome e sobrenome" exato daquele tumor muito bizarro e indefinido.',
        uso: "Oncologia avançada.",
      },
      {
        col1: "Necropsia Sistemática",
        tecnico: "Dissecação cavitária em bloco dos órgãos internos pós-morte.",
        pratica:
          "Abrir peito, cabeça e barriga para colher os órgãos e ver por que parou.",
        uso: "Morte sem diagnóstico ou litígios.",
      },
    ],
    termos: [
      {
        termo: "Carcinoma / Sarcoma",
        tecnico:
          "Tipos histológicos de malignidade epitelial e mesenquimal.",
        pratica: "As grandes classificações dos piores cânceres no laudo.",
      },
      {
        termo: "Biópsia Excisional / Incisional",
        tecnico:
          "Remoção inteira do tumor ou de apenas um pedacinho.",
        pratica:
          "A forma que o cirurgião cortou para mandar para o laboratório.",
      },
      {
        termo: "Grau de Diferenciação",
        tecnico: "O quanto a célula cancerígena se parece com a normal.",
        pratica:
          "Se for 'mal diferenciado', o câncer é horrível e agressivo; se for 'bem diferenciado', é menos agressivo.",
      },
      {
        termo: "Pleomorfismo / Mitoses Atípicas",
        tecnico: "Critérios de malignidade celular ao microscópio.",
        pratica:
          "Células deformadas e se reproduzindo loucamente (Sinal de câncer).",
      },
      {
        termo: "Necrose de Coagulação / Liquefativa",
        tecnico: "Padrões de morte do tecido.",
        pratica: 'O tecido morto "apodrecendo" em volta da doença.',
      },
    ],
    infoTecnica: {
      publico: "Patologistas e residentes 1-4 anos.",
      dores:
        "Insegurança letal ao dar um diagnóstico falso positivo para um sarcoma e o pet sofrer amputação à toa; Lâminas com artefatos (sujas) que confundem as células.",
      nome: "Patologia Master: Diagnóstico sem Dúvidas.",
      problema:
        "O patologista é o juiz final do diagnóstico. Sem orientador, ele passa noites sem dormir porque não consegue dizer se aquilo é câncer ou infecção crônica e a clínica o pressiona pelo resultado.",
      estrutura:
        "Acesso a Atlas Digitais e envio de imagens do microscópio para análise conjunta (Telepatologia e rounds).",
      entregaveis:
        "Modelos perfeitos de Laudo Histopatológico Descritivo; Guia de gradação tumoral (TNM).",
      duracao: "6 meses.",
    },
    infoGestao: {
      publico: "Patologistas autônomos ou pequenos laboratórios.",
      dores:
        "Vender laudo muito barato por causa de grandes redes laboratoriais que monopolizam o mercado; Ser tratado como um despachante de papel pela clínica.",
      nome: "Patologista de Alto Valor (PJ B2B).",
      problema:
        'Ele precisa se vender como "Consultor Especialista" para os cirurgiões oncológicos de alto padrão e não ser o "laboratório barato da esquina".',
      estrutura:
        "Como captar hospitais e clínicas oncológicas focando na exclusividade e assessoria do patologista.",
      entregaveis:
        "Portfólio comercial B2B de Laboratório Premium; Precificação de exames IHQ de alto ticket.",
      duracao: "6 meses.",
    },
    tutoresLabel: "Pacientes de Alto Valor (Criadores / Haras B2B)",
    infoTutores: {
      publico:
        'Como não lidam com tutores comuns, o "paciente" de alto valor são grandes Haras (cavalos de R$ 1 Milhão) ou Criadores Comerciais (Canis de luxo/Gatis e Rebanhos).',
      dores:
        "Um vírus letal ou doença invisível entrando no plantel e matando dezenas de filhotes de alto valor comercial, gerando falência no haras/canil.",
      nome: "Assessoria de Prevenção e Investigação de Surtos (CSI Vet).",
      problema:
        "O criador perde ninhadas seguidas ou um garanhão de luxo. Ele precisa de um patologista investigativo na fazenda/canil que necropsie, laudo e pare a doença na raiz, elaborando programas de biossegurança restrita.",
      estrutura:
        "Contrato de retenção de assessoria mensal (retentor) + visitas de campo focadas na higiene epidemiológica do plantel.",
      entregaveis:
        "Protocolos Rígidos de Quarentena em Canil PDF; Investigação post-mortem com plano de ação emergencial de surtos (Parvovirose/Herpes).",
      duracao: "12 meses (Acompanhamento Anual).",
    },
  },

  "cardiologia-veterinaria": {
    descricaoTecnica:
      "Ramo clínico voltado à investigação, manejo hemodinâmico, prevenção e tratamento de afecções congênitas ou adquiridas do sistema cardiovascular e respiratório associado.",
    descricaoPratica:
      'O médico da "bomba" (coração) e das veias. Trata pressão alta, cães que desmaiam por falha no coração e idosos com o "coração inchado" e cansado.',
    atendimentos:
      "Manejo crônico de Insuficiência Cardíaca Congestiva (ICC), arritmias ventriculares e diagnóstico ecocardiográfico, além da emissão de liberação pré-cirúrgica.",
    atendimentosPratica:
      "Dar vários remédios para o cão que não consegue respirar de tanto líquido no pulmão pelo coração fraco. E fazer o exame obrigatório para autorizar ou barrar qualquer cirurgia com anestesia.",
    perfilPacientes:
      "Majoritariamente cães idosos (Poodles, Yorkshires com doença de válvula) e cães gigantes (Dobermann, Boxer) que sofrem infartos fulminantes. Gatos com sopros escondidos. Tutores super protetores que têm medo constante do pet morrer subitamente dormindo.",
    areas: [
      {
        col1: "Cardiologia Clínica",
        tecnico:
          "Acompanhamento ambulatorial de estadiamento cardíaco e ajuste terapêutico e diuréticos.",
        pratica:
          "A consulta de 1 hora para dar 5 comprimidos para o coração funcionar e tirar água do pulmão.",
        uso: "Doença Crônica, idosos tossindo, retorno mensal.",
      },
      {
        col1: "Ecocardiografia (Diagnóstico)",
        tecnico:
          "Realização de ultrassom focado em parâmetros sistólicos e fluxos valvulares (Doppler).",
        pratica:
          'O médico passa o gel no peito do cão para ver no monitor como as "portinhas" do coração batem ou vazam.',
        uso: "Exame pedido por outros colegas pré-cirurgia.",
      },
      {
        col1: "Eletrocardiografia/Holter",
        tecnico:
          "Monitoramento da condução elétrica do coração para investigar bloqueios atrioventriculares.",
        pratica:
          "Colar adesivos no peito ou um aparelhinho na roupinha do cão 24h para ver falhas de ritmo elétrico.",
        uso: "Pacientes que desmaiam e arritmias graves.",
      },
    ],
    formacao:
      "Medicina Veterinária (5 anos) + Especialização de Cardiologia (2 anos) = Total: 7 anos",
    obrigatoria: "Sim.",
    rotina:
      "Sala escura no ecocardiograma metade do dia. E a outra metade fazendo laudos e consultas de pacientes que têm tosse crônica e engasgos.",
    rotinaPratica:
      'Ouvir muito "tuk-tuk" de corações, sentar e digitar avaliações de risco e tentar convencer tutores de que o cachorro não pode comer sal grosso de churrasco. O nível de ansiedade (medo da morte do animal) é diário.',
    tecnicas: [
      {
        col1: "Ecocardiograma Doppler",
        tecnico:
          "Avaliação anatômica e cálculo de velocidade/direção dos fluxos sanguíneos no coração.",
        pratica:
          "Ultrassom do coração que usa cores (vermelho/azul) pra mostrar que o sangue está voltando e vazando da válvula.",
        uso: "Diagnóstico padrão ouro para sopro.",
      },
      {
        col1: "Eletrocardiograma (ECG)",
        tecnico:
          "Captação dos vetores elétricos por derivações no tecido cardíaco.",
        pratica:
          'O exame das "linhas subindo e descendo" em papel contínuo no aparelho ligado nos jacarezinhos na perna.',
        uso: "Arritmias e Risco Cirúrgico.",
      },
      {
        col1: "Mensuração de Pressão (Doppler vascular)",
        tecnico:
          "Uso de probe Doppler e esfigmomanômetro em membro distal para pressão sistólica.",
        pratica:
          "Medir a pressão com manguito inflável na patinha do cachorro/gato (e é super chato porque eles não ficam quietos).",
        uso: "Hipertensão e idosos.",
      },
    ],
    termos: [
      {
        termo: "Insuficiência Cardíaca Congestiva (ICC)",
        tecnico:
          "Síndrome onde o coração perde débito cardíaco, causando congestão (edema) pulmonar ou abdominal.",
        pratica:
          'Coração inchado e fraco que faz o sangue refluir, enchendo o pulmão de "água" e o cão tosse como se estivesse engasgado.',
      },
      {
        termo: "Degeneração Valvar Mitral (Endocardiose)",
        tecnico:
          "A afecção mais comum em cães pequenos; a válvula entre as câmaras sofre degeneração mixomatosa.",
        pratica:
          'A "portinha" do coração entorta com a idade, não fecha direito e o sangue vaza. Causador de sopro alto.',
      },
      {
        termo: "Cardiomiopatia Dilatada (CMD)",
        tecnico:
          "Músculo ventricular fino e incapaz de contratilidade forte (típico de raças grandes).",
        pratica:
          'O coração vira um "balão molenga" sem força (típico do Boxer ou Dobermann).',
      },
      {
        termo: "Sopro Cardíaco",
        tecnico: "Turbulência audível do fluxo sanguíneo à ausculta.",
        pratica:
          'O barulho de "shhh" escutado no estetoscópio quando o sangue bate errado nas paredes.',
      },
      {
        termo: "Síncope",
        tecnico:
          "Perda transitória de consciência e tônus postural por hipoperfusão cerebral global e transitória.",
        pratica:
          "Desmaio repentino porque faltou sangue na cabeça por falha da bomba do coração. O cão cai duro e levanta logo após.",
      },
    ],
    infoTecnica: {
      publico:
        "Cardiologistas Vet em início de carreira, ou Clínicos Gerais que fazem ecocardiograma iniciante.",
      dores:
        "Travamento extremo na hora de laudar a fração de encurtamento no ultrassom cardíaco; Desespero ao ter que classificar qual estágio de insuficiência (B1, B2, C) e errar a dose do diurético, levando o animal ao óbito.",
      nome: "CardioVet Masterclass: Do Doppler ao Laudo.",
      problema:
        "Ajustar diurético e Pimobendan exige exatidão matemática nos números do ecocardiograma. O eco é um exame operador-dependente difícil e sem o preceptor ensinando onde colocar o cursor na tela, o médico lauda tudo errado.",
      estrutura:
        'Aulas práticas gravadas simulando as medições "botão a botão" na máquina; grupos de tira-dúvida de ECG diário de madrugada (Tele-ECG).',
      entregaveis:
        "Guias rápidos plastificados de Medição Ecocardio; Tabela Rápida de Doses de Anti-Arrítmicos de Emergência; Checklist de Risco Cirúrgico.",
      duracao: "6 meses.",
    },
    infoGestao: {
      publico: "Cardiologistas Veterinários autônomos Volantes ou de clínica.",
      dores:
        '"Migalhas" do valor do eco volante que a clínica parceira fatia; Perda terrível de clientes porque os tutores abandonam as consultas de rotina; Ansiedade pelas contas.',
      nome: "Clínico Cardio de Alto Retorno.",
      problema:
        "Cardiopatas precisam de reavaliação a cada 3 meses para ajustar doses pro resto da vida. O veterinário cobra consulta normal e o dono desiste pelo preço somado aos exames.",
      estrutura:
        "Transição do modelo de vendas avulsas para Planos Anuais de Prevenção e Controle Cardiológico (Mensalidade). Marketing direto pro dono do cão sem intermediários da clínica geral.",
      entregaveis:
        'Script de Consultoria de Vendas "Seu cão blindado" — modelo de plano anual contratual; Roteiros de Instagram para alertar sinais sutis (como tosse de cão que não é gripe e sim coração).',
      duracao: "6 meses.",
    },
    infoTutores: {
      publico:
        "Tutores desesperados de cães e gatos em Insuficiência Cardíaca avançada ou com Sopros Severos (Ex: Poodle e Cavalier).",
      dores:
        'Acordar de madrugada com o cachorro com tosse "de ganso", língua roxa, achando que vai morrer sufocado e correr pro hospital gastando R$ 2.000 em UTI. Dar 6 comprimidos horários e o pet cuspir tudo, se perdendo na rotina estressante.',
      nome: "Acompanhamento Coração Blindado Pet 360.",
      problema:
        'O cardiopata idoso oscila. O tutor vive refém do medo do cão ter uma síncope. Aceitaria pagar premium para ter o cardiologista "segurando sua mão" em casa, via WhatsApp, a cada pequena tosse e reajustando doses de imediato.',
      estrutura:
        'Consulta mestre inicial com todos os ecos/mapa + Avaliação contínua semanal pelo botão de Whats VIP + ensino da "Frequência Respiratória de Repouso (FRR)" pro dono fazer à noite com relógio.',
      entregaveis:
        "App Planner Físico diário de administração das dezenas de remédios sem erro; Vídeoaula exclusiva: 'O que fazer nos 10 minutos após um desmaio'; Acesso a oxigenoterapia de suporte locada.",
      duracao: "12 meses (retenção anual).",
    },
  },
};

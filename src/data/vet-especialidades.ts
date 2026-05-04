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

export type IdeiaInfoproduto = {
  nome: string;
  descricao: string;
};

export type InfoIdeias = {
  tecnica: IdeiaInfoproduto[];
  gestao: IdeiaInfoproduto[];
  altoValor: IdeiaInfoproduto[];
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
  infoIdeias: InfoIdeias;
  altoValorLabel?: string; // Para casos especiais (ex: Patologia → Criadores B2B)
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
    infoIdeias: {
      tecnica: [
      {
        nome: "Expert em Ultrassonografia Abdominal Vet",
        descricao: "Capacitação avançada para o clínico ou radiologista iniciante dominar a varredura abdominal completa, identificando alterações sutis em órgãos parenquimatosos e cavidade.",
      },
      {
        nome: "Tórax Sem Mistério: Radiologia Avançada",
        descricao: "Domine a interpretação de radiografias torácicas complexas, aprendendo a diferenciar padrões pulmonares e silhuetas cardíacas com segurança e precisão.",
      },
      {
        nome: "Doppler Dominado: Do Básico ao Avançado",
        descricao: "Imersão técnica no Doppler de grandes vasos e órgãos abdominais, capacitando o veterinário a realizar exames hemodinâmicos detalhados.",
      },
      {
        nome: "Imagens em Ortopedia: Radiologia e US Musculoesquelética",
        descricao: "Curso focado na anatomia radiográfica e ultrassonográfica do sistema musculoesquelético para diagnósticos rápidos de claudicações e traumas ortopédicos.",
      },
      {
        nome: "Intervencionismo Guiado por Imagem na Prática",
        descricao: "Aprenda a realizar biópsias e citologias guiadas por ultrassom com máxima segurança, agregando este diferencial diagnóstico ao seu portfólio de serviços.",
      },
      ],
      gestao: [
      {
        nome: "Lucro no Laudo: Precificação Estratégica na Imagem",
        descricao: "Guia prático para precificar laudos e serviços de imagem com base em custos operacionais e margem de lucro real, elevando a percepção de valor do radiologista.",
      },
      {
        nome: "Mestre do Workflow: Eficiência na Radiologia Vet",
        descricao: "Treinamento focado em produtividade e organização de fluxo de trabalho para que o radiologista consiga laudar com qualidade em menos tempo, otimizando seu dia.",
      },
      {
        nome: "Imagem de Autoridade: Personal Branding para Radiologistas",
        descricao: "Estratégias de branding e presença digital específicas para especialistas em diagnóstico por imagem aumentarem sua rede de indicações e autoridade local.",
      },
      {
        nome: "Gestão de Centros de Imagem Veterinários",
        descricao: "Como estruturar e gerir uma equipe de radiologistas itinerantes ou em clínica fixa, focando em padronização de laudos e gestão de processos.",
      },
      {
        nome: "Negociador de Laudos: Parcerias de Sucesso",
        descricao: "Técnicas de comunicação e persuasão para o radiologista negociar melhores parcerias com clínicas e hospitais, garantindo fidelidade dos parceiros.",
      },
      ],
      altoValor: [
      {
        nome: "Ouro Diagnóstico: Exóticos e Silvestres",
        descricao: "Treinamento focado no atendimento de pets exóticos e silvestres, ensinando o radiologista a cobrar o valor justo por exames complexos em espécies não convencionais.",
      },
      {
        nome: "Laudo VIP: Imagem Premium em Domicílio",
        descricao: "Metodologia para realizar ultrassonografia e radiografia em domicílio com padrão luxo, focando em proprietários que buscam conveniência e exclusividade acima do preço.",
      },
      {
        nome: "Protocolo Longevidade: Check-up por Imagem High-Ticket",
        descricao: "Capacitação técnica e comercial para oferecer Check-ups de Imagem Preventivos de alta performance, transformando o diagnóstico precoce em uma constante de faturamento.",
      },
      {
        nome: "Consultoria de Imagem para Centros de Elite",
        descricao: "Estratégias de posicionamento para se tornar a referência de hospitais de alto padrão, garantindo a indicação de casos complexos e cirurgias de grande porte.",
      },
      {
        nome: "Doppler Hunter: Monetizando a Alta Complexidade",
        descricao: "Aprenda a realizar e precificar exames de alta complexidade, como a dopplerfluxometria avançada, atraindo médicos veterinários especialistas que demandam precisão absoluta.",
      },
      ],
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
    infoIdeias: {
      tecnica: [
      {
        nome: "Mestres da Reconstrução de Tecidos Moles",
        descricao: "Capacitação prática para o cirurgião geral dominar as principais técnicas de sutura, retalhos cutâneos e fechamento de feridas complexas em cães e gatos sob qualquer tensão.",
      },
      {
        nome: "Imersão em Cirurgia Abdominal Avançada",
        descricao: "Treinamento avançado em cirurgias do trato urinário e digestório, focado na prevenção de deiscências e no domínio de técnicas seguras para enterectomias e cistotomias desafiadoras.",
      },
      {
        nome: "Domínio Cirúrgico: Cabeça e Pescoço v2.0",
        descricao: "Um guia técnico completo sobre anatomia aplicada e manobras cirúrgicas cruciais para o tratamento de afecções no pescoço e cabeça, como otoplastias e glossectomias.",
      },
      {
        nome: "Expert em Síndrome do Braquiocefálico",
        descricao: "Ensino detalhado de técnicas para correções de fendas palatinas, estenose de narinas e palato mole prolongado, transformando o cirurgião em especialista em vias aéreas superiores.",
      },
      {
        nome: "Cirurgia de Emergência: Do Trauma ao Bloco",
        descricao: "Protocolos cirúrgicos para o manejo de emergências que chegam no dia a dia, desde a hemostasia rápida em hemoperitônio até a resolução de torções gástricas com segurança.",
      },
      ],
      gestao: [
      {
        nome: "Lucratividade na Mesa Cirúrgica",
        descricao: "Método de precificação específico para procedimentos de tecidos moles, considerando custos de materiais especiais, riscos cirúrgicos e margem de lucro real para cirurgiões autônomos e donos de clínicas.",
      },
      {
        nome: "Posicionamento de Autoridade para Cirurgiões",
        descricao: "Estratégias de diferenciação no Instagram e LinkedIn para cirurgiões veterinários que desejam ser reconhecidos por colegas e tutores como referências técnicas em sua região.",
      },
      {
        nome: "Gestão de Parcerias e Referenciamento Cirúrgico",
        descricao: "Aprenda a estruturar o fluxo de indicação cirúrgica, transformando clínicas parceiras em canais recorrentes de pacientes sem depender de descontos, focando em profissionalismo e confiança.",
      },
      {
        nome: "Blindagem Jurídica e Comercial do Cirurgião",
        descricao: "Documentação completa e estratégias de comunicação assertiva para evitar conflitos judiciais e garantir que o tutor entenda o valor e os riscos do procedimento proposto.",
      },
      {
        nome: "Escala Cirúrgica: Gestão de Tempo e Equipe",
        descricao: "Manual prático para organizar sua agenda cirúrgica, otimizar o tempo de bloco e gerir sua equipe de auxiliares para escalar o número de procedimentos sem perder a qualidade de vida.",
      },
      ],
      altoValor: [
      {
        nome: "Cirurgia Estética e Reconstrutiva Premium",
        descricao: "Treinamento focado em cirurgias reconstrutivas e plásticas para pets de raças nobres, ensinando o cirurgião a cobrar pelo resultado estético e funcional de excelência em clientes de alto poder aquisitivo.",
      },
      {
        nome: "Master em Cirurgias de Alta Complexidade",
        descricao: "Aprenda a realizar procedimentos complexos de tórax e abdômen utilizando tecnologias avançadas, posicionando-se como a autoridade máxima para casos referenciados que exigem suporte de alta complexidade.",
      },
      {
        nome: "Cirurgião de Elite: O Plantão High-Ticket",
        descricao: "Capacitação técnica para triagem e intervenção imediata em pacientes críticos de clínicas de luxo, elevando o valor da sua hora de sobreaviso e a taxa de sucesso em emergências cirúrgicas.",
      },
      {
        nome: "Oncologia Cirúrgica de Alto Valor",
        descricao: "Domine as técnicas de cirurgia oncológica com margens limpas e reconstrução imediata, tornando-se o cirurgião preferencial para tutores que não medem investimentos no tratamento do câncer animal.",
      },
      {
        nome: "O Cirurgião Volante Particular: Atendimento VIP",
        descricao: "Um guia para o cirurgião volante firmar parcerias exclusivas com centros diagnósticos e hospitais de luxo, focando em um padrão de atendimento VIP que justifica honorários acima da média.",
      },
      ],
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
    infoIdeias: {
      tecnica: [
      {
        nome: "Mestres do Bloqueio: Locorregional Guiada por USG",
        descricao: "Curso prático para veterinários que desejam dominar o uso do ultrassom para guiar bloqueios locorregionais, garantindo maior precisão e segurança em cirurgias de membros e tronco.",
      },
      {
        nome: "Monitorização Avançada: Além do Básico na Monitoria",
        descricao: "Treinamento intensivo em interpretação de curvas de capnografia, pressão invasiva e eletrocardiografia para veterinários que atuam em cirurgias de pacientes críticos (ASA III e IV).",
      },
      {
        nome: "Domínio TIVA: Infusões e Equilíbrio Hemodinâmico",
        descricao: "Atualização técnica focada em protocolos de infusão contínua (TIVA e PIVA) para veterinários que buscam estabilidade hemodinâmica superior em procedimentos de longa duração.",
      },
      {
        nome: "Anestesia de Emergência: O Guia do Plantonista Cirúrgico",
        descricao: "Capacitação técnica para o manejo anestésico de emergências de tórax e abdômen agudo, focada em veterinários que realizam plantões em centros cirúrgicos 24h.",
      },
      {
        nome: "Ventilação Mecânica do Zero ao Avançado",
        descricao: "Especialização em ventilação mecânica perioperatória para veterinários, ensinando a ajustar parâmetros do ventilador para prevenir atelectasias e melhorar a oxigenação dos pacientes.",
      },
      ],
      gestao: [
      {
        nome: "Checkout Seguro: Precificação Exata em Anestesia",
        descricao: "Aprenda a calcular seus custos operacionais reais, definir tabelas de preços justas e criar orçamentos profissionais que valorizam seu tempo e insumos na anestesia volante ou fixa.",
      },
      {
        nome: "Posicionamento de Autoridade para Anestesistas",
        descricao: "Estratégias de diferenciação para anestesistas plantonistas ou volantes, focadas em construir uma marca pessoal forte e ser a primeira escolha dos principais cirurgiões da região.",
      },
      {
        nome: "Blindagem e Gestão: O Negócio da Anestesia",
        descricao: "Um guia jurídico e administrativo para veterinários organizarem seus contratos de prestação de serviço, termos de consentimento e gestão de estoque de fármacos controlados sem riscos.",
      },
      {
        nome: "Venda Técnica: Persuasão e Ética em Anestesiologia",
        descricao: "Técnicas de comunicação assertiva para explicar riscos anestésicos aos tutores e fechar orçamentos de maior valor com confiança e transparência.",
      },
      {
        nome: "Anestesia em Escala: Do Volante ao Digital",
        descricao: "Dicas e ferramentas para organizar a agenda volante, otimizar deslocamentos e escalar o número de procedimentos diários sem perder a qualidade de vida.",
      },
      ],
      altoValor: [
      {
        nome: "Protocolo Braqui-Premium: A Anestesia de Elite",
        descricao: "Capacitação para o anestesiologista dominar o atendimento de raças braquicefálicas extremas e o uso de monitorização avançada, permitindo cobrar honorários diferenciados por procedimentos de alta complexidade.",
      },
      {
        nome: "Imersão em Anestesia para Microcirurgia e Neuro",
        descricao: "Treinamento focado em técnicas anestésicas para cirurgias oftalmológicas e neurocirurgias em hospitais de alto padrão, ensinando o vet a se posicionar como o profissional indispensável para cirurgiões renomados.",
      },
      {
        nome: "Anestesia para Diagnóstico de Ponta: RM e TC",
        descricao: "Estratégias para anestesistas que desejam atuar em centros diagnósticos de luxo, otimizando o fluxo de exames de imagem com segurança máxima e transformando exames de rotina em faturamento de alto valor.",
      },
      {
        nome: "Expert em Controle de Dor: O Serviço High-Ticket",
        descricao: "Método para implementar o serviço de Clinica da Dor na rotina volante, fidelizando tutores de alto poder aquisitivo que buscam qualidade de vida e cuidados paliativos para pets idosos.",
      },
      {
        nome: "Anestesia VIP: Do Pré ao Pós-Operatório Premium",
        descricao: "Guia prático para o anestesista construir parcerias com clínicas boutique, elevando o ticket médio através do oferecimento de pacotes de monitorização invasiva e cuidados intensivos perioperatórios.",
      },
      ],
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
    infoIdeias: {
      tecnica: [
      {
        nome: "Lab sem Mistério: O Guia do Bioquímico ao Hemograma",
        descricao: "Curso prático para veterinários de campo e consultório dominarem a interpretação ágil de hemogramas e bioquímicos, permitindo diagnósticos precisos e condutas terapêuticas imediatas.",
      },
      {
        nome: "Domínio na Emergência: Do Triage ao Manejo Crítico",
        descricao: "Capacitação focada no manejo de urgências comuns no plantão da clínica geral, como intoxicações, traumas e crises convulsivas, garantindo segurança total no primeiro atendimento.",
      },
      {
        nome: "Endocrino na Prática: Descomplicando o Tratamento",
        descricao: "Treinamento intensivo sobre as principais doenças endócrinas que chegam ao clínico geral, ensinando protocolos de controle para diabetes, hiperadreno e hipotireoidismo.",
      },
      {
        nome: "Prescrição Master: Farmacologia Aplicada à Rotina",
        descricao: "Oportunidade para o clínico dominar a farmaco-clínica moderna, aprendendo a combinar moléculas e ajustar doses para tratamentos multimodais mais eficazes e com menos efeitos colaterais.",
      },
      {
        nome: "Cirurgia de Consultório: Pequenos Procedimentos, Grandes Resultados",
        descricao: "Passo a passo visual e técnico para clínicos realizarem pequenos procedimentos cirúrgicos e suturas avançadas no consultório, ampliando o leque de serviços oferecidos sem depender de terceiros.",
      },
      ],
      gestao: [
      {
        nome: "Calculadora Vet: Precificação Lucrativa na Clínica",
        descricao: "Aprenda a precificar consultas, procedimentos e exames laboratoriais de forma técnica, garantindo margem de lucro real e acabando com a insegurança na hora de passar o orçamento para o tutor.",
      },
      {
        nome: "Instagram para Clínicos: Autoridade e Atração",
        descricao: "Estratégias de posicionamento no Instagram para clínicos gerais se tornarem autoridade na sua região, atraindo clientes qualificados através de conteúdo estratégico e tráfego pago.",
      },
      {
        nome: "Fluxo Ágil: Gestão de Consultório Sem Caos",
        descricao: "Treinamento para organizar a rotina do consultório, otimizar o tempo de atendimento e gerenciar assistentes, permitindo que o clínico foque apenas no diagnóstico e na venda técnica.",
      },
      {
        nome: "Venda Ética: Fechamento de Planos de Tratamento",
        descricao: "Domine as técnicas de fechamento de orçamentos complexos e internações, aprendendo a comunicar o valor do seu trabalho e aumentando a taxa de aceitação de exames e tratamentos.",
      },
      {
        nome: "Vet de Sucesso: Gestão Financeira para Autônomos",
        descricao: "Guia Prático para organizar as finanças da sua atuação como autônomo ou dono de clínica, separando contas pessoais e profissionais com foco em investimento e expansão.",
      },
      ],
      altoValor: [
      {
        nome: "Longevidade Silver: O Check-up High-Ticket",
        descricao: "Ensina o clínico a estruturar um check-up preventivo premium para pacientes idosos, utilizando protocolos de diagnóstico precoce que elevam o ticket médio da consulta e fidelizam tutores exigentes.",
      },
      {
        nome: "Clínica de Elite: Atendimento Premium e Exclusivo",
        descricao: "Treinamento focado no atendimento de raças selecionadas e pets de luxo, abordando desde o manejo diferenciado até a comunicação persuasiva com tutores dispostos a investir no que há de melhor.",
      },
      {
        nome: "Home Care VVIP: A Clínica na Casa do Cliente",
        descricao: "Capacite-se para realizar consultas domiciliares de alto padrão, transformando a visita em uma experiência de conveniência e luxo que justifica honorários até 3x maiores que na clínica.",
      },
      {
        nome: "Dermo-Lucro: O Mercado de Pets Alérgicos",
        descricao: "Domine a prescrição e a venda de nutracêuticos e dietas personalizadas para pacientes dermatológicos e alérgicos, nicho com alta recorrência e disposição de investimento por parte do tutor.",
      },
      {
        nome: "Assinatura Wellness: Recorrência de Alto Valor",
        descricao: "Método para implementar um plano de saúde preventivo próprio da sua clínica, garantindo previsibilidade de caixa e foco total na saúde de pets com tutores de alto poder aquisitivo.",
      },
      ],
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
    infoIdeias: {
      tecnica: [
      {
        nome: "Descomplicando a Quimioterapia Clínica",
        descricao: "Treinamento prático para veterinários dominarem os protocolos de quimioterapia citotóxica, garantindo segurança na manipulação, cálculo de doses e manejo clínico de efeitos colaterais.",
      },
      {
        nome: "Mestre em Cirurgia Oncológica e Reconstrutiva 2.0",
        descricao: "Específico para cirurgiões que buscam perfeição em margens oncológicas e técnicas de reconstrução cutânea após a exérese de tumores complexos em cães e gatos.",
      },
      {
        nome: "Diagnóstico Oncológico: Da PAAF ao Laudo",
        descricao: "Curso voltado para o clínico geral ou especialista iniciante aprender a realizar coletas citológicas assertivas e interpretar laudos histopatológicos com segurança diagnóstica.",
      },
      {
        nome: "Imunoterapia e Terapias-Alvo na Prática",
        descricao: "Domine o uso de inibidores de tirosina quinase e imunoterapia na rotina veterinária, aprendendo a selecionar o paciente ideal e monitorar a resposta terapêutica moderna.<br>",
      },
      {
        nome: "Expert em Mastocitoma Canino",
        descricao: "Focado na abordagem clínica e cirúrgica do mastocitoma, ensinando desde o estadiamento correto até as terapias adjuvantes mais eficazes para este tumor tão comum.",
      },
      ],
      gestao: [
      {
        nome: "Lucratividade na Quimioterapia",
        descricao: "Aprenda a calcular o custo real de cada frasco e aplicação, precificando suas sessões de quimioterapia com margem de lucro real e inteligência financeira.",
      },
      {
        nome: "O Oncologista Referência no Instagram",
        descricao: "Estratégias de posicionamento digital e autoridade para oncologistas, focando em se tornar a principal referência para generalistas e centros de diagnóstico da sua região.",
      },
      {
        nome: "Gestão de Blindagem Oncológica",
        descricao: "Treinamento para organizar o fluxo de atendimento oncológico, desde o prontuário até o descarte de resíduos, garantindo segurança jurídica e eficiência operacional.",
      },
      {
        nome: "Networking e Captação de Pacientes Onco",
        descricao: "Aprenda a prospectar e manter parcerias sólidas com clínicas gerais, criando um sistema de indicação recorrente que mantém sua agenda sempre cheia de casos especializados.",
      },
      {
        nome: "Venda Consultiva em Oncologia",
        descricao: "Como vender protocolos complexos de tratamento sem parecer um 'vendedor', utilizando gatilhos mentais e clareza técnica para aumentar a aceitação de orçamentos altos.",
      },
      ],
      altoValor: [
      {
        nome: "Onco-Premium: Cuidados Paliativos VIP",
        descricao: "Capacitação completa para montar e vender protocolos de oncologia integrativa e cuidados paliativos de luxo, transformando o atendimento de fim de vida em uma experiência acolhedora e altamente valorizada.",
      },
      {
        nome: "Tecnologia de Ponta na Oncologia",
        descricao: "Método para médicos veterinários dominarem a eletroquimioterapia e terapias-alvo, técnicas de última geração que justificam honorários diferenciados e atraem tutores que buscam o melhor da ciência.",
      },
      {
        nome: "A Tomada de Decisão no Paciente Crítico",
        descricao: "Estratégias de comunicação e conduta para converter casos complexos de oncologia em tratamentos de longo prazo, focando na fidelização do tutor 'high-ticket' que não poupa recursos para o bem-estar do pet.",
      },
      {
        nome: "Onco Home Office: O Atendimento Exclusivo",
        descricao: "Guia prático para estruturar um serviço de quimioterapia domiciliar ou 'boutique', oferecendo conveniência e exclusividade para pacientes oncológicos de alto padrão.",
      },
      {
        nome: "Oncologia de Precisão e Monetização de Exames",
        descricao: "Treinamento focado em oncogenética e diagnósticos moleculares, ensinando o veterinário a interpretar e cobrar por exames sofisticados que direcionam a medicina personalizada.",
      },
      ],
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
    infoIdeias: {
      tecnica: [
      {
        nome: "Mestre da Citologia Dermatológica",
        descricao: "Domine a coleta, coloração e leitura de citologias cutâneas e otológicas no dia a dia, transformando o microscópio em sua principal ferramenta de diagnóstico rápido e preciso no consultório.",
      },
      {
        nome: "Domínio da Atopia: Do Controle ao Manejo Moderno",
        descricao: "Capacitação clínica focada no manejo avançado do cão atópico, abordando desde o controle de crises até a imunoterapia personalizada e o uso de biológicos de última geração.",
      },
      {
        nome: "DermoCirurgia: Procedimentos de Consultório",
        descricao: "Aprenda as principais técnicas de biópsia cutânea e procedimentos cirúrgicos menores da dermatologia, como a remoção de pequenos nódulos e criocirurgia com precisão e segurança.",
      },
      {
        nome: "Expert em Otites: Do Diagnóstico ao Tratamento Final",
        descricao: "Treinamento prático para identificar e tratar otites externas e médias complexas, com foco em video-otoscopia e lavagem de orelha média para clínicos e especialistas.",
      },
      {
        nome: "Farmacologia Dermatológica Avançada",
        descricao: "Um guia definitivo sobre o uso racional e estratégico de antibióticos, antifúngicos e terapias tópicas para combater as principais infecções bacterianas e fúngicas resistentes em pequenos animais.",
      },
      ],
      gestao: [
      {
        nome: "Lucratividade na Dermato: Precificação e Margem",
        descricao: "Aprenda a precificar consultas, biópsias, citologias e testes alérgicos de forma lucrativa, garantindo que sua especialidade seja financeiramente sustentável e escalável.",
      },
      {
        nome: "Autoridade Dermato: Posicionamento no Digital",
        descricao: "Estratégias de marketing digital focadas em dermatologia para atrair os casos certos via redes sociais, construindo autoridade e transformando seguidores em pacientes agendados.",
      },
      {
        nome: "Dermato de Sucesso: Gestão de Carreira e Parcerias",
        descricao: "Método de organização de agenda e fluxo de atendimento especializado para dermatologistas volantes ou que atendem em clínicas parceiras, otimizando tempo e parcerias.",
      },
      {
        nome: "Venda Consultiva para Dermatologistas",
        descricao: "Roteiros de vendas e comunicação assertiva para aumentar a adesão do tutor aos tratamentos longos, garantindo o retorno financeiro e o sucesso clínico na dermatologia.",
      },
      {
        nome: "Consultório Dermato do Zero: Planejamento e ROI",
        descricao: "Guia prático para montar seu consultório ou centro de diagnóstico dermatológico do zero, com foco em layout funcional e escolha assertiva de equipamentos que se pagam rápido.",
      },
      ],
      altoValor: [
      {
        nome: "Dermo Luxury: O Guia das Raças Nobres",
        descricao: "Treinamento especializado em dermatologia de raças braquicefálicas premium e cães de exposição, ensinando o veterinário a cobrar por protocolos de manutenção estética e saúde da barreira cutânea a longo prazo.",
      },
      {
        nome: "High-Tech Dermato: Monetizando com Laser e Biológicos",
        descricao: "Capacitação para implementar um centro de terapia regenerativa e laserterapia na rotina dermato, atraindo tutores dispostos a investir em tecnologias de ponta para cura de feridas e atopia.",
      },
      {
        nome: "Dermatologia de Elite: Ticket Alto e Fidelização",
        descricao: "Estratégias de comunicação e serviço diferenciado para transformar consultas de dermatologia em planos de saúde personalizados de alto valor, focados em check-ups dermatológicos preventivos para o mercado de luxo.",
      },
      {
        nome: "Casos Complexos: A Rota da Consultoria Premium",
        descricao: "Domine o diagnóstico e manejo de doenças raras e autoimunes, posicionando-se como o \"veterinário de última instância\" que resolve casos complexos onde outros falharam, permitindo honorários diferenciados.",
      },
      {
        nome: "Spa Dermato Business: O Próximo Nível do Atendimento",
        descricao: "Método para o veterinário oferecer serviços de Spa Dermatológico Clínico, unindo medicina de precisão com bem-estar, focado em pacientes com doenças crônicas de tutores com alto poder aquisitivo.",
      },
      ],
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
    infoIdeias: {
      tecnica: [
      {
        nome: "Exame Oftalmológico de Elite: Do Clínico ao Especialista",
        descricao: "Para veterinários que desejam dominar o uso da lâmpada de fenda e do oftalmoscópio, garantindo diagnósticos precisos desde a superfície ocular até a retina de cães e gatos.",
      },
      {
        nome: "Mestre das Suturas de Córnea e Anexos Oculares",
        descricao: "Focado no veterinário que quer segurança para realizar desde flaps conjuntivais até ceratectomias, entregando técnicas de sutura delicadas para preservação da visão.",
      },
      {
        nome: "Domínio do Glaucoma e Superfície Ocular na Prática",
        descricao: "Capacita o colega a interpretar e realizar a tonometria e o teste de Schirmer corretamente, permitindo o manejo avançado de casos complexos de glaucoma e olho seco.",
      },
      {
        nome: "Protocolo Úlcera Zero: Diagnóstico e Manejo Avançado",
        descricao: "Transforma a conduta do veterinário no atendimento de úlceras de córnea complicadas, ensinando a escolha correta de fármacos e o momento exato da intervenção cirúrgica.",
      },
      {
        nome: "Farmacologia Ocular: Prescrições de Alta Performance",
        descricao: "Curso técnico voltado para o domínio da farmacologia ocular veterinária, permitindo que o colega prescreva formulações magistrais e colírios específicos com máxima eficácia terapêutica.",
      },
      ],
      gestao: [
      {
        nome: "Lucratividade na Oftalmologia: Precificação e Margem",
        descricao: "Enfoca o veterinário que precisa ajustar a precificação de exames e cirurgias oculares, garantindo que a margem de lucro cubra a manutenção de equipamentos caros e o tempo dedicado à especialidade.",
      },
      {
        nome: "Oftalmo em Foco: Marketing Geolocalizado e Parcerias",
        descricao: "Ensina o colega a se posicionar no Instagram e LinkedIn como referência em oftalmologia, atraindo parcerias de encaminhamento de outros veterinários e clínicas gerais de forma ética.",
      },
      {
        nome: "Do Volante ao Centro Oftalmológico: Gestão de Carreira",
        descricao: "Um guia de gestão para o veterinário que deseja transicionar do atendimento volante para o próprio consultório de oftalmologia, otimizando o fluxo de caixa e a agenda de procedimentos.",
      },
      {
        nome: "Vendas em Oftalmologia: Convertendo Consultas em Cirurgias",
        descricao: "Capacita o especialista a treinar sua equipe de apoio para realizar um pré-atendimento focado em converter orçamentos cirúrgicos e exames complementares de forma elegante e eficaz.",
      },
      {
        nome: "Gestão de Insumos e Eficiência em Consultório Ocular",
        descricao: "Ensina ao veterinário como organizar o estoque de colírios e insumos cirúrgicos, evitando desperdícios e garantindo que o custo operacional não consuma o lucro da especialidade.",
      },
      ],
      altoValor: [
      {
        nome: "Oftalmo Prime: O Nicho dos Braquicefálicos",
        descricao: "Direcionado ao veterinário que deseja se especializar no atendimento de raças braquicefálicas de alto padrão, dominando procedimentos estéticos e funcionais que agregam alto valor percebido pelo tutor premium.",
      },
      {
        nome: "High-Ticket em Microcirurgia Ocular",
        descricao: "Capacita o colega a implementar um serviço diferenciado de microcirurgia ocular, ensinando como justificar o investimento em tecnologia e cobrar honorários compatíveis com a alta complexidade e precisão.",
      },
      {
        nome: "Oftalmologia Veterinária VIP: Do Check-up à Fidelização",
        descricao: "Estratégias para o veterinário transformar a consulta de rotina em um check-up oftalmológico preventivo de luxo, atraindo clientes que priorizam o bem-estar e a longevidade ocular de pets de elite.",
      },
      {
        nome: "Plástica Ocular: O Poder da Estética Funcional Vet",
        descricao: "Guia prático para o clínico se posicionar como autoridade em correções de pálpebras e anexos, focando em resultados impecáveis que satisfazem os tutores mais exigentes e que investem no melhor para seus animais.",
      },
      {
        nome: "Urgência Premium: Valorizando a Visão em Tempo Real",
        descricao: "Treinamento focado no atendimento particular de urgências oftalmológicas, ensinando o veterinário a cobrar o valor real da sua disponibilidade e expertise em casos críticos fora do horário comercial.",
      },
      ],
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
    infoIdeias: {
      tecnica: [
      {
        nome: "Mestre do Planejamento Radiográfico Ortopédico",
        descricao: "Destinado a veterinários que desejam segurança total na interpretação de radiografias e tomografias para planejar cirurgias de joelho, quadril e coluna com precisão milimétrica.",
      },
      {
        nome: "Expertise em Semiologia e Claudicação",
        descricao: "Um guia prático para o clínico e o cirurgião iniciante dominarem o exame físico ortopédico e identificarem claudicações sutis que passam despercebidas na rotina.",
      },
      {
        nome: "Imersão em Placas Bloqueadas e Fixação Interna",
        descricao: "Capacitação técnica em técnicas de osteossíntese com foco em placas bloqueadas, entregando confiança para realizar fixações estáveis em fraturas complexas de rádio e ulna.",
      },
      {
        nome: "Dominando a TPLO e Ruptura de Ligamento Crucial",
        descricao: "Focado no veterinário que deseja realizar a cirurgia de TPLO com maestria, desde o posicionamento do paciente até o pós-operatório imediato para rápida recuperação.",
      },
      {
        nome: "Manual Definitivo da Luxação de Patela",
        descricao: "Curso focado em técnicas cirúrgicas para correção de luxação de patela em pequenos e grandes cães, garantindo o alinhamento perfeito do mecanismo extensor.",
      },
      ],
      gestao: [
      {
        nome: "Lucratividade no Centro Cirúrgico Ortopédico",
        descricao: "Aprenda a calcular custos reais de implantes, instrumentais e tempo cirúrgico para garantir que suas cirurgias ortopédicas sejam altamente lucrativas e sustentáveis.",
      },
      {
        nome: "Autoridade Ortopédica: Marketing de Indicação",
        descricao: "Estratégias para se posicionar como o ortopedista de referência na sua região, gerando um fluxo constante de encaminhamentos qualificados por parte de outros colegas clínicos.",
      },
      {
        nome: "Gestão Ágil para Ortopedistas Volantes",
        descricao: "Ferramentas práticas para organizar sua agenda de cirurgias, controle de estoque de placas e parafusos e gestão de equipe auxiliar para otimizar seu tempo.",
      },
      {
        nome: "Venda de Cirurgias de Alta Complexidade",
        descricao: "Como apresentar orçamentos de grandes cirurgias de forma persuasiva, aumentando drasticamente a taxa de aprovação de procedimentos complexos e de alto custo.",
      },
      {
        nome: "Business Vet: Sua Clínica Ortopédica do Zero",
        descricao: "Passo a passo para tirar o consultório focado em ortopedia do papel, desde a escolha de equipamentos rentáveis até o layout que otimiza o fluxo de atendimento.",
      },
      ],
      altoValor: [
      {
        nome: "Ortopedia de Performance: O Nicho High-Ticket",
        descricao: "Treinamento para transformar o ortopedista em uma referência para cães de exposição e esportistas, focando em protocolos de performance que tutores de elite pagam com prazer.",
      },
      {
        nome: "A Jornada do Paciente Premium em Ortopedia",
        descricao: "Estratégias de abordagem e fidelização para tutores de raças gigantes e braquicefálicos com demandas ortopédicas complexas, onde o valor da solução supera qualquer barreira de preço.",
      },
      {
        nome: "Terapias de Luxo: Células-Tronco e PRP na Prática",
        descricao: "Como estruturar um serviço diferenciado de ortopedia regenerativa e tratamento de osteoartrite com terapias biológicas, atraindo clientes que buscam o que há de mais moderno na medicina.",
      },
      {
        nome: "Ortopedia Exclusive: Atendimento de Alto Padrão",
        descricao: "Domine a arte de realizar diagnósticos em etapas e cirurgias de alta complexidade com precificação baseada em valor, focando em famílias que tratam o pet como prioridade máxima.",
      },
      {
        nome: "Soluções Customizadas para Pacientes Vips",
        descricao: "Método para captar e reter pacientes que necessitam de próteses e órteses customizadas, elevando o faturamento por paciente através de tecnologia e personalização extrema.",
      },
      ],
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
    infoIdeias: {
      tecnica: [
      {
        nome: "Mestres da Citopatologia Diagnóstica",
        descricao: "Capacitação avançada para veterinários que desejam dominar a citopatologia de linfonodos e órgãos cavitários, garantindo diagnósticos precisos e segurança na diferenciação de processos reativos e neoplásicos.",
      },
      {
        nome: "Hematologia sem Mistérios: Do Viral ao Parasitário",
        descricao: "Guia prático para patologistas clínicos dominarem a hematologia das doenças infecciosas e parasitárias, com foco em identificação de microorganismos e interpretação de hemogramas complexos.",
      },
      {
        nome: "DermatoPath: O Guia Definitivo de Histopatologia Cutânea",
        descricao: "Imersão técnica em histopatologia de pele para o patologista que quer se tornar referência no diagnóstico de dermatopatias inflamatórias e neoplásicas de cães e gatos.",
      },
      {
        nome: "Líquidos e Efusões: Do Microscópio ao Diagnóstico",
        descricao: "Curso focado na análise morfológica de efusões e líquidos cavitários, ensinando o veterinário a correlacionar achados citológicos com a clínica para um diagnóstico etiológico rápido.",
      },
      {
        nome: "Expert em Necropsia: Da Macro à Micro",
        descricao: "Treinamento intensivo para dominar a técnica de necropsia em pequenos animais, garantindo a coleta correta de fragmentos e a interpretação macroscópica precisa para laudos conclusivos.",
      },
      ],
      gestao: [
      {
        nome: "Lab Pro: Gestão de Laboratórios Lucrativos",
        descricao: "Passo a passo para estruturar um laboratório de apoio lucrativo, focando em otimização de fluxo de amostras, logística reversa de materiais e redução de desperdício em reagentes.",
      },
      {
        nome: "Precificação Estratégica na Patologia Vet",
        descricao: "Aprenda a precificar diagnósticos histopatológicos e citológicos com base em margem de contribuição, eliminando o medo de cobrar mais que a concorrência por laudos de qualidade superior.",
      },
      {
        nome: "Patologista de Autoridade: Marketing B2B",
        descricao: "Técnicas de posicionamento digital e networking para patologistas que desejam se tornar a primeira escolha dos melhores hospitais e clínicas da sua cidade. autoridade através do laudo.",
      },
      {
        nome: "Experiência do Patologista: Fidelização de Clínicos",
        descricao: "Treinamento para padronizar o atendimento e a comunicação do laboratório, transformando recepcionistas e técnicos em uma equipe focada em experiência do cliente e fidelização de clínicos.",
      },
      {
        nome: "Eficiência Laboratorial: Escala e Produtividade",
        descricao: "Método para automatizar processos burocráticos e laudos no laboratório, liberando tempo para o patologista focar na análise diagnóstica e aumentar sua escala de faturamento.",
      },
      ],
      altoValor: [
      {
        nome: "Diagnóstico de Elite: Oncologia Molecular",
        descricao: "Treinamento focado em laudos de imuno-histoquímica e patologia molecular para oncologistas que atendem casos de alto custo, ensinando o patologista a cobrar o justo pela complexidade diagnóstica.",
      },
      {
        nome: "Check-up High-Ticket Geriatria",
        descricao: "Metodologia para implementar check-ups laboratoriais preventivos em pacientes geriátricos de raças gigantes, transformando exames de rotina em um plano de saúde laboratorial de alto valor anual.",
      },
      {
        nome: "Patologia VIP: O Expert na Sala de Parto e Cirurgia",
        descricao: "Capacitação para montar um serviço de biópsia por congelamento e citologia intraoperatória, permitindo ao patologista cobrar por hora em cirurgias premium de grandes hospitais.",
      },
      {
        nome: "Nicho de Ouro: Patologia de Exóticos e Criadores",
        descricao: "Estratégias de consultoria laboratorial para criadores de raças exóticas e silvestres, nicho que exige precisão técnica extrema e possui alta disposição de investimento para preservação genética.",
      },
      {
        nome: "Necropsia Forense e Animais de Alto Valor",
        descricao: "Aprenda a realizar e precificar necropsias forenses para casos judiciais e seguros de animais de alto valor zootécnico, tornando-se o perito referência na sua região.",
      },
      ],
    },
    altoValorLabel: "Pacientes de Alto Valor (Criadores / Haras B2B)",
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
    infoIdeias: {
      tecnica: [
      {
        nome: "Mestres do Ecocardio",
        descricao: "Capacita o clínico focado em pequenos animais a interpretar ecocardiogramas com confiança, identificando valvulopatias e cardiomiopatias com precisão diagnóstica imediata.",
      },
      {
        nome: "Descomplicando o ECG Vet",
        descricao: "Treinamento prático e avançado em eletrocardiografia para veterinários que desejam dominar arritmias complexas e distúrbios de condução em cães e gatos.",
      },
      {
        nome: "Cardio FAST na Emergência acoustics",
        descricao: "Ensina o veterinário intensivista a realizar a ecocardiografia focada em emergências (POCUS), permitindo decisões rápidas em pacientes com efusão pleural e choque.",
      },
      {
        nome: "FarmacoCardio de Elite",
        descricao: "Protocolos modernos de farmacologia cardiovascular para o clínico que busca dominar as titulações de fármacos inotrópicos e diuréticos em pacientes com insuficiência cardíaca.",
      },
      {
        nome: "O Coração Felino Master",
        descricao: "Aprimoramento técnico em cardiologia felina para o veterinário que deseja entender as particularidades de diagnóstico e manejo da cardiomiopatia hipertrófica em gatos.",
      },
      ],
      gestao: [
      {
        nome: "Cardio Volante Lucrativo",
        descricao: "Método para o cardiologista volante precificar seus exames de forma lucrativa, considerando deslocamento, manutenção de equipamentos e taxas de clínicas parceiras.",
      },
      {
        nome: "Vendas em Cardiologia",
        descricao: "Script de vendas e oratória para aumentar a adesão dos tutores a tratamentos cardíacos de longo prazo, garantindo a recorrência na agenda e a saúde do paciente.",
      },
      {
        nome: "Posicionamento Cardio Expert",
        descricao: "Estratégias de branding de rede social focadas em transformar o cardiologista veterinário em uma referência local, atraindo indicações diretas e diminuindo a dependência de clínicos.",
      },
      {
        nome: "Dashboard da Clinica Cardíaca",
        descricao: "Modelo de gestão de custos e otimização de tempo para laudos de eletrocardiograma e ecocardiograma, focado em ganhar escala sem perder a qualidade técnica.",
      },
      {
        nome: "Network Heart Strategy",
        descricao: "Guia prático para montar parcerias estratégicas com clínicas gerais e hospitais 24h, criando um fluxo constante de novos pacientes por meio do marketing de indicação.",
      },
      ],
      altoValor: [
      {
        nome: "Protocolo Breeding Gold",
        descricao: "Ensina o cardiologista a se posicionar para atender raças gigantes e braquicefálicos de linhagens premiadas, focando em protocolos de check-up de luxo e acompanhamento preventivo de alto rendimento.",
      },
      {
        nome: "Cardio VIP Monitoring",
        descricao: "Capacita o veterinário a oferecer um serviço diferenciado de monitoramento remoto 24h para pacientes cardíacos críticos, elevando o valor da mensalidade e a percepção de cuidado exclusivo.",
      },
      {
        nome: "Exotic Heart Premium",
        descricao: "Estratégias para captar e fidelizar tutores de animais exóticos que demandam exames cardíacos complexos, transformando a raridade do paciente em precificação de alta performance.",
      },
      {
        nome: "Cat-Friendly Heart Home",
        descricao: "Treinamento focado no atendimento domiciliar de luxo para gatos cardiopatas idosos, com foco em conforto extremo, tecnologia portátil e experiência de atendimento sem estresse para o tutor.",
      },
      {
        nome: "Authority Cardio Insight",
        descricao: "Como estruturar consultas de 'Segunda Opinião' em casos complexos de cirurgia cardíaca, posicionando-se como a autoridade máxima que resolve os casos que ninguém mais resolve.",
      },
      ],
    },
  },
};

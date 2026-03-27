import { Service, ServiceCategory } from './types';

export const SERVICE_FEE = 0.00;

export const SERVICES: Service[] = [
  {
    id: 's1',
    category: ServiceCategory.DELIVERY,
    name: '✨ O Oráculo do Ovo Dourado – Especial de Páscoa ✨',
    description: 'Uma experiência única de Páscoa com Baralho Cigano e Tarot. Uma leitura completa revelando direcionamentos sobre espiritualidade, amor, prosperidade e saúde, com envio da Carta do Destino (a leitura) escrita com base nas revelações do oráculo, e mimos energéticos pelos correios.',
    price: 'R$ 150,00',
    image: 'https://storage.googleapis.com/www.ciganasoraya.com/public/ovo_dourado.jpeg',
    details: [
      'Atendimento offline',
      'Leitura completa: Espiritualidade, Amor, Prosperidade e Saúde',
      'Carta do Destino física preparada energeticamente e enviada pelo correio',
      'Elementos simbólicos surpresa exclusivos desta edição',
      'Atendimento personalizado e vagas limitadas',
      'Pedidos aceitos até o dia 25 de março'
    ],
    isFeatured: true,
    badge: 'ESPECIAL DE PÁSCOA',
    isOffline: true
  },
  {
    id: 's2',
    category: ServiceCategory.SCHEDULED,
    name: 'O Círculo do Tempo',
    description: 'Leitura completa com Mesa Real (Baralho Cigano) e Tarot (aprofundamentos). Análise: Profissional, Financeiro, Saúde, Espiritual, Amoroso, Energias e caminhos. Perguntas ilimitadas dentro do tempo. Envio de orientações + banho energético personalizado.',
    duration: '1h30',
    price: 'R$ 225,00',
    image: 'https://img.freepik.com/premium-photo/magician-tarot-card-mysterious-3d-figure-channeling-energy-sky-earth_937679-88429.jpg',
    details: ['Perguntas ilimitadas dentro do tempo da sessão', 'Instrução de banho personalizada', 'Documento com direcionamentos da leitura (até 72h)',  'Análise dos campos: profissional, financeiro, saúde, espiritual, amoroso, energias e caminhos'],
    isFeatured: false
  },
  {
    id: 's3',
    category: ServiceCategory.DELIVERY,
    name: 'Mesa Real',
    description: 'Leitura pela Mesa Real (Baralho Cigano). Sem perguntas objetivas — apenas interpretação espiritual e dúvidas sobre o que sair no jogo. Ideal para quem deseja ouvir a espiritualidade sem direcionamento prévio.',
    price: 'R$ 170,00',
    image: 'https://img.freepik.com/free-photo/high-angle-occult-items-assortment_23-2149413250.jpg',
    details: ['Análise dos caminhos considerando passado, presente e possibilidades futuras', 'Não são permitidas perguntas objetivas ao baralho', 'Interpretação Espiritual', 'Dúvidas apenas sobre os pontos revelados no jogo'],
    isOffline: true
  },
  {
    id: 's4',
    category: ServiceCategory.SCHEDULED,
    name: 'Caminho de Ouro',
    description: 'Foco: Vida profissional, Finanças, Carreira, Decisões e crescimento. Ferramentas: Mesa Real Profissional, Tarot, Astrologia (Mapa Astral). Perguntas objetivas durante o atendimento.',
    duration: '50 min',
    price: 'R$ 167,00',
    image: 'https://img.freepik.com/premium-photo/fortune-teller-secret-world-full-art-science-psychic_563241-71362.jpg',
    details: [
      'Mesa Real Profissional (Baralho Cigano)',
      'Aprofundamento com Tarot',
      'Análise Astrológica com base no Mapa Astral',
      'Foco em vida profissional, finanças e carreira',
      'Identificação de oportunidades, desafios e potenciais',
      'Perguntas objetivas permitidas dentro de 50 minutos',
      'Atendimento com horário marcado'
    ],
    isFeatured: true,
    badge: 'MAIS ESCOLHIDO'
  },
  {
    id: 's5',
    category: ServiceCategory.SCHEDULED,
    name: 'Espelho do Coração',
    description: 'Análise: Relacionamentos, Sentimentos, Intenções, Bloqueios afetivos. Oráculos: Mesa Real do Amor, Tarot, Sibilla Italiana. Perguntas permitidas dentro do tempo.',
    duration: '45 min',
    price: 'R$ 139,00',
    image: 'https://img.freepik.com/premium-photo/lover-tarot-logo-art-architecture-archangel_53876-444418.jpg',
    details: [
      'Mesa Real do Amor (Baralho Cigano)',
      'Aprofundamento com Tarot',
      'Complemento com Sibilla Italiana',
      'Análise da vida amorosa e relacionamentos',
      'Clareza sobre sentimentos, intenções e bloqueios',
      'Perguntas permitidas dentro de 45 minutos',
      'Atendimento com agendamento de horário'
    ],
    isFeatured: false
  },
  {
    id: 's6',
    category: ServiceCategory.SCHEDULED,
    name: 'Direção do Destino',
    description: 'Perguntas objetivas sobre qualquer área da vida. Respostas claras com análise de passado, presente e futuro.',
    duration: '30 min',
    price: 'R$ 99,00',
    image: 'https://img.freepik.com/premium-photo/golden-staircase-starry-sky_53876-1192822.jpg',
    details: [
      'Perguntas objetivas sobre qualquer área da vida dentro do tempo da sessão',
      'Análise das influências do passado, presente e futuro',
      'Direcionamento e respostas claras para cada situação',
      'Consulta com agendamento de horário'
    ],
    isFeatured: false
  },
  {
    id: 's7',
    category: ServiceCategory.DELIVERY,
    name: 'Mapa Astral',
    description: 'Análise de: Sol, Ascendente, Lua, Meio do Céu, Parte da Fortuna. Foco em: Autoconhecimento, Potenciais, Desenvolvimento pessoal, Caminhos profissionais.',
    price: 'R$ 97,00',
    image: 'https://img.freepik.com/premium-photo/paper-frames-decorative-backgrounds-vintageinspired-urban-themes-creative-templates_1020495-135976.jpg',
    details: [
      'Análise de Sol, Ascendente, Lua, Meio do Céu e Parte da Fortuna',
      'Identificação de qualidades a serem desenvolvidas',
      'Reconhecimento de potenciais e pontos fortes',
      'Direcionamento para áreas de maior realização pessoal e profissional',
      'Leitura focada em autoconhecimento e compreensão da personalidade',
      'Documento com direcionamentos da leitura (até 72h)'
    ],
    isOffline: true
  },
  {
    id: 's8',
    category: ServiceCategory.DELIVERY,
    name: 'Três Perguntas',
    description: 'Três perguntas objetivas ao Baralho Cigano. Resposta via canais digitais.',
    price: 'R$ 80,00',
    image: 'https://img.freepik.com/premium-photo/tarot-card-with-candlelight-darkness-background-astrology-occult-magic-illustration-ma_926199-4103996.jpg',
    details: [
      'Baralho Cigano',
      'Três perguntas objetivas',
      'Respostas direcionadas e claras',
      'Atendimento offline',
      'Entregue em até 24h'
    ],
    isOffline: true
  },
  {
    id: 's9',
    category: ServiceCategory.DELIVERY,
    name: 'O Silêncio do Vento',
    description: 'Experiência sensorial escrita. Sem fala direta da cartomante. Inclui imagens ou vídeos energéticos. Indicado para: Reflexão profunda, Conexão emocional, Decisões internas.',
    price: 'R$ 60,00',
    image: 'https://img.freepik.com/premium-photo/celestial-woman-reaching-star-violet_886588-36469.jpg',
    details: [
      'Conselho e direcionamento indireto por escrito',
      'Leitura sensível e intuitiva',
      'Experiência com imagens ou vídeos selecionados',
      'Reflexão e conexão interior',
      'Entregue em até 48h'
    ],
    isOffline: true
  },
  {
    id: 's10',
    category: ServiceCategory.DELIVERY,
    name: 'Uma Pergunta',
    description: 'Uma pergunta objetiva ao Baralho Cigano.',
    price: 'R$ 50,00',
    image: 'https://img.freepik.com/premium-photo/tarot-card-with-candlelight-darkness-background-astrology-occult-magic-illustration-ma_926199-4115328.jpg',
    details: [
      'Baralho Cigano',
      '1 pergunta objetiva',
      'Orientação e resposta direta',
      'Atendimento offline',
      'Entregue em até 24h'
    ],
    isOffline: true
  }
];
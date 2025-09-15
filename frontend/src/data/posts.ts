export type Post = {
    id: string
    title: string
    excerpt: string
    cover: string
    category: string
    author: string
    date: string
    content: string
}

export const posts: Post[] = [
    {
        id: "1",
        title: "Tecnologia IoT aplicada ao estacionamento inteligente",
        excerpt: "Como sensores e conectividade otimizam a ocupação e reduzem filas.",
        cover: "/images/post-1.jpg",
        category: "Tecnologia",
        author: "Equipe Smart Parking",
        date: "2025-08-29T10:00:00.000Z",
        content:
            "A Internet das Coisas (IoT) tem revolucionado a forma como gerenciamos espaços urbanos, e os estacionamentos inteligentes são um dos exemplos mais práticos dessa transformação. Por meio de sensores instalados em cada vaga e gateways conectados à nuvem, é possível monitorar a ocupação em tempo real, disponibilizando essas informações em painéis digitais e aplicativos móveis. Isso reduz filas, evita a circulação desnecessária de veículos e melhora a experiência do usuário.\n\nAlém disso, a integração da IoT com sistemas de pagamento automatizado e aplicativos de mobilidade urbana abre caminho para soluções mais completas e seguras. Nesta publicação, exploramos a arquitetura típica — do sensor até o dashboard de gestão — destacando boas práticas para confiabilidade, escalabilidade e segurança da informação. Também mostramos como dados coletados podem gerar relatórios estratégicos para tomada de decisão e melhoria contínua.",
    },
    {
        id: "2",
        title: "Boas práticas para gestão de vagas em centros urbanos",
        excerpt: "Dicas práticas para melhorar a experiência e aumentar a rotatividade.",
        cover: "/images/post-2.jpg",
        category: "Gestão",
        author: "Equipe Smart Parking",
        date: "2025-08-20T12:00:00.000Z",
        content:
            "A gestão eficiente de vagas é um dos grandes desafios em centros urbanos, onde a demanda por estacionamentos supera a oferta disponível. Para lidar com esse cenário, gestores precisam adotar políticas claras, comunicação eficiente e sistemas de monitoramento em tempo real. Com dados confiáveis, é possível identificar padrões de ocupação, prever picos de movimento e tomar decisões rápidas para aumentar a rotatividade.\n\nEntre as boas práticas, destacam-se: a utilização de sinalização inteligente para orientar motoristas, a implementação de precificação dinâmica para estimular a ocupação equilibrada e a integração com aplicativos que mostram, em tempo real, onde há vagas disponíveis. Também abordamos a importância da transparência com o usuário, criando confiança por meio de notificações claras, regras bem definidas e suporte acessível. Quando bem executada, a gestão de vagas contribui não apenas para a mobilidade, mas também para a qualidade de vida nos centros urbanos.",
    },
    {
        id: "3",
        title: "Segurança 24h: monitoramento e prevenção",
        excerpt: "Conheça recursos de segurança para proteger veículos e usuários.",
        cover: "/images/post-3.jpg",
        category: "Segurança",
        author: "Equipe Smart Parking",
        date: "2025-08-18T09:30:00.000Z",
        content:
            "A segurança é um dos pilares fundamentais para qualquer estacionamento, seja ele público ou privado. A combinação de câmeras de alta definição, sensores de presença e sistemas de alerta inteligente garante não apenas a proteção dos veículos, mas também a tranquilidade dos usuários. Com a análise em tempo real, é possível detectar comportamentos anômalos, identificar zonas de risco e acionar equipes de vigilância de forma imediata.\n\nAlém da prevenção contra furtos e vandalismo, as soluções modernas permitem integração com autoridades locais, otimizando a resposta a incidentes. Outro ponto importante é a retenção e o tratamento adequado das imagens, que precisam respeitar normas de privacidade e LGPD. Ao adotar políticas claras de segurança, os estacionamentos fortalecem a confiança dos clientes, tornando-se espaços mais seguros e atrativos.",
    },
    {
        id: "4",
        title: "Sustentabilidade: redução de CO₂ com rotas otimizadas",
        excerpt: "Menos tempo procurando vaga significa menos emissões.",
        cover: "/images/post-4.jpg",
        category: "Sustentabilidade",
        author: "Equipe Smart Parking",
        date: "2025-08-12T15:20:00.000Z",
        content:
            "A busca por uma vaga de estacionamento é uma das principais causas do tráfego lento em áreas urbanas, representando até 30% do tempo gasto pelos motoristas em alguns centros. Essa espera gera impactos diretos na emissão de gases poluentes, especialmente o CO₂. Ao adotar soluções de estacionamento inteligente, que orientam o motorista diretamente para a vaga livre, reduzimos o tempo de circulação e, consequentemente, diminuímos o impacto ambiental.\n\nMais do que uma conveniência, essa prática se alinha às metas de sustentabilidade urbana e responsabilidade socioambiental. É possível medir e apresentar métricas de impacto, como toneladas de CO₂ evitadas, litros de combustível economizados e horas de tráfego reduzidas. Esses relatórios ambientais fortalecem a imagem do empreendimento e mostram à sociedade que tecnologia e sustentabilidade podem caminhar juntas. Estacionamentos inteligentes deixam de ser apenas uma solução de mobilidade e se tornam agentes ativos na luta contra as mudanças climáticas.",
    },
]

export function getPostById(id: string): Post | undefined {
    return posts.find(p => p.id === id)
}

export function getRelatedPosts(id: string, category?: string, limit = 3): Post[] {
    return posts
        .filter(p => p.id !== id && (category ? p.category === category : true))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
}



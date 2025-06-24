// src/data/explanations.ts

export interface ExplanationContentBlock {
  heading?: string; // Um título de subseção (ex: "1. Pronome")
  text?: string; // Um parágrafo de texto
  list?: string[]; // Uma lista de itens
  table?: { headers: string[]; rows: string[][] }; // Dados de tabela
  examples?: string[]; // Uma lista de exemplos com suas traduções
  note?: string; // Uma nota especial ou observação
  structure?: string; // Para estruturas gramaticais (ex: "If + Present Simple, Will + Verb")
}

export interface ExplanationContent {
  id: string; // ID da explicação (corresponde a explanationTextId em MateriaContentItem)
  title: string; // Título da explicação (ex: "Básico 2: Pronomes e Verbo 'To Be'")
  content: ExplanationContentBlock[];
}

export const ALL_EXPLANATIONS: ExplanationContent[] = [
  // --- Explicação BÁSICO 1 (NOVO) ---
  {
    id: "basico1_explicacao_id", // ID deve corresponder ao usado em materiasContent.ts
    title: "Básico 1: Introdução ao Inglês",
    content: [
      {
        text: "Bem-vindo(a) à sua primeira aula de inglês! Aqui você vai começar do zero, aprendendo o essencial para se comunicar em situações básicas do dia a dia. Prepare-se para uma jornada divertida e cheia de descobertas!",
      },
      { heading: "1. Alfabeto e Pronúncia Básica" },
      {
        text: "O alfabeto em inglês tem as mesmas 26 letras do português, mas a pronúncia é diferente.",
      },
      {
        examples: [
          "A (ei)",
          "B (bi)",
          "C (ci)",
          "D (di)",
          "E (i)",
          "F (éf)",
          "...",
        ],
      },
      { heading: "2. Saudações e Apresentações" },
      {
        text: "Aprender a cumprimentar e se apresentar é o primeiro passo para iniciar uma conversa.",
      },
      {
        examples: [
          "Hello! (Olá!)",
          "Hi! (Oi!)",
          "Good morning! (Bom dia!)",
          "Good afternoon! (Boa tarde!)",
          "Good evening! (Boa noite! - ao chegar)",
          "Good night! (Boa noite! - ao sair/dormir)",
        ],
      },
      {
        examples: [
          "What's your name? (Qual o seu nome?)",
          "My name is... (Meu nome é...)",
          "Nice to meet you! (Prazer em conhecê-lo/a!)",
        ],
      },
      { heading: "3. Pronomes Pessoais e Verbo 'To Be' (Básico)" },
      {
        text: "Os pronomes substituem nomes. O verbo 'to be' é fundamental para descrever estados e identidades.",
      },
      {
        table: {
          headers: ["Pronome", "Verbo 'to be'", "Exemplo", "Tradução"],
          rows: [
            ["I", "am", "I am a student.", "Eu sou um estudante."],
            ["You", "are", "You are happy.", "Você está feliz."],
            ["He", "is", "He is from Brazil.", "Ele é do Brasil."],
            ["She", "is", "She is my sister.", "Ela é minha irmã."],
            ["It", "is", "It is a cat.", "É um gato."],
            ["We", "are", "We are friends.", "Nós somos amigos."],
            ["They", "are", "They are teachers.", "Eles são professores."],
          ],
        },
      },
      { heading: "4. Números (1-10)" },
      {
        examples: [
          "One (1)",
          "Two (2)",
          "Three (3)",
          "Four (4)",
          "Five (5)",
          "Six (6)",
          "Seven (7)",
          "Eight (8)",
          "Nine (9)",
          "Ten (10)",
        ],
      },
    ],
  },
  // --- Explicação Básico 2 --- (Existente)
  {
    id: "basico2_explicacao_id",
    title: "Básico 2: Pronomes e Verbo 'To Be'",
    content: [
      {
        text: "Bem-vindo(a) à sua segunda aula de inglês! Este material foi cuidadosamente preparado para iniciantes, com o objetivo de fornecer uma base sólida para a sua jornada de aprendizado. Vamos começar com o essencial, construindo seu vocabulário e sua confiança passo a passo.",
      },
      { heading: "1. Pronome" },
      {
        text: "O verbo 'to be' (ser/estar) é um dos mais importantes em inglês. Ele é usado para descrever estados, identidades, localizações e muito mais.",
      },
      {
        table: {
          headers: ["Pronome", "Português"],
          rows: [
            ["I", "Eu"],
            ["You", "Você"],
            ["He", "Ele"],
            ["She", "Ela"],
            ["It*", "Ela/Ele/Isso"],
            ["We", "Nós"],
            ["They", "Eles/Elas"],
          ],
        },
      },
      { note: "*Usado para objetos/animais" },
      { heading: "2. Verbo 'To Be'" },
      {
        text: "O verbo 'to be' (ser/estar) é um dos mais importantes em inglês. Ele é usado para descrever estados, identidades, localizações e muito mais.",
      },
      {
        table: {
          headers: ["Pronome", "Verbo to be"],
          rows: [
            ["I", "am"],
            ["You", "are"],
            ["He/She/It", "is"],
            ["We", "are"],
            ["They", "are"],
          ],
        },
      },
      { heading: "Exemplos:" },
      { heading: "Frases Afirmativas:" },
      {
        examples: [
          "I am a student. (Eu sou um estudante.)",
          "You are happy. (Você está feliz.)",
          "She is from Brazil. (Ela é do Brasil.)",
        ],
      },
      { heading: "Frases Negativas: (Adicione 'not' depois do 'to be')" },
      {
        examples: [
          "I am not sad. (Eu não estou triste.)",
          "You are not a doctor. (Você não é um médico.)",
          "He is not here. (Ele não está aqui.)",
        ],
      },
      {
        heading:
          "Frases Interrogativas: (Inverta a posição do 'to be' com o sujeito)",
      },
      {
        examples: [
          "Am I right? (Eu estou certo?)",
          "Are you tired? (Você está cansado?)",
          "Is she tall? (Ela é alta?)",
        ],
      },
      { heading: "3. Artigos (A/An, The)" },
      { heading: "Artigos Indefinidos (A/An):" },
      {
        text: "Usados para se referir a algo não específico ou pela primeira vez.",
      },
      {
        text: "A: Usado antes de palavras que começam com som de consoante. Ex: a book, a car.",
      },
      {
        text: "An: Usado antes de palavras que começam com som de vogal. Ex: an apple, an hour (o 'h' tem som de vogal).",
      },
      { heading: "Artigo Definido (The):" },
      { text: "Usado para se referir a algo específico ou já mencionado." },
      {
        text: "The: Usado para singular e plural, para todos os gêneros. Ex: the sun, the books, the cat.",
      },
      { heading: "4. Substantivos (Singular/Plural)" },
      { heading: "Plural Regular:" },
      { text: "A maioria dos substantivos forma o plural adicionando '-s'." },
      { examples: ["Cat -> Cats", "Book -> Books"] },
      { heading: "Plural Irregular:" },
      { text: "Alguns substantivos têm formas de plural diferentes." },
      {
        examples: [
          "Man -> Men",
          "Woman -> Women",
          "Child -> Children",
          "Mouse -> Mice",
          "Foot -> Feet",
        ],
      },
      { heading: "5. Adjetivos Comuns" },
      {
        text: "Adjetivos descrevem substantivos. Em inglês, eles geralmente vêm antes do substantivo.",
      },
      {
        table: {
          headers: ["Adjetivos", "Comuns", "Adjetivos", "Comuns"],
          rows: [
            ["Big", "Grande", "Old", "Velho"],
            ["Small", "Pequeno", "Good", "Bom"],
            ["Happy", "Feliz", "Bad", "Ruim"],
            ["Sad", "Triste", "Beautiful", "Bonito(a)"],
            ["New", "Novo", "Ugly:", "Feio(a)"],
          ],
        },
      },
      {
        examples: [
          "A big house (Uma casa grande).",
          "A beautiful butterfly (Uma linda borboleta).",
        ],
      },
      { heading: "6. Wh-questions" },
      {
        text: "As 'Wh-questions' são usadas para fazer perguntas específicas.",
      },
      { text: "What? (O quê? / Qual?) - Para coisas ou informações." },
      {
        examples: ["What is your favorite color? (Qual é a sua cor favorita?)"],
      },
      { text: "Where? (Onde?) - Para lugares." },
      { examples: ["Where are you from? (De onde você é?)"] },
      { text: "When? (Quando?) - Para tempo." },
      { examples: ["When is your birthday? (Quando é o seu aniversário?)"] },
      { text: "Who? (Quem?) - Para pessoas." },
      { examples: ["Who is that man? (Quem é aquele homem?)"] },
      { text: "Why? (Por quê?) - Para razões." },
      {
        examples: [
          "Why are you learning English? (Por que você está aprendendo inglês?)",
        ],
      },
      { text: "How? (Como?) - Para modo ou maneira." },
      { examples: ["How are you? (Como você está?)"] },
    ],
  },
  // --- Explicação Intermediário 1 --- (Existente)
  {
    id: "interm1_explicacao_id",
    title: "Intermediário 1: Present Perfect, Future Tenses e Modais",
    content: [
      {
        text: "Bem-vindo(a) à sua aula de inglês intermediário! Nesta etapa, vamos aprofundar seus conhecimentos, explorando estruturas gramaticais mais complexas e expandindo seu vocabulário para que você possa se comunicar com mais fluidez e precisão.",
      },
      { heading: "1. Present Perfect" },
      {
        text: "O Present Perfect é usado para conectar o passado ao presente. Ele é formado com o verbo auxiliar have/has + o particípio passado do verbo principal.",
      },
      { heading: "Usos principais:" },
      {
        text: "Experiências de vida: Ações que aconteceram em um tempo não especificado no passado.",
      },
      {
        examples: [
          "I have traveled to many countries. (Eu viajei para muitos países.)",
        ],
      },
      {
        text: "Ações que começaram no passado e continuam no presente: Geralmente com since (desde) ou for (por).",
      },
      {
        examples: [
          "She has lived here for five years. (Ela mora aqui há cinco anos.)",
        ],
      },
      {
        text: "Ações passadas com resultados no presente: O foco está no resultado atual da ação.",
      },
      {
        examples: [
          "He has lost his keys. (Ele perdeu as chaves. - O resultado é que ele não as tem agora.)",
        ],
      },
      { heading: "Estrutura:" },
      { text: "Afirmativa: Subject + have/has + Past Participle" },
      { examples: ["I have finished my homework."] },
      { text: "Negativa: Subject + have/has + not + Past Participle" },
      { examples: ["They haven't seen that movie."] },
      { text: "Interrogativa: Have/Has + Subject + Past Participle?" },
      { examples: ["Have you eaten yet?"] },
      { heading: "2. Past Simple vs. Present Perfect" },
      {
        text: "É comum confundir o Past Simple com o Present Perfect. A principal diferença é o foco:",
      },
      {
        text: "Past Simple: Foca em ações concluídas em um tempo específico no passado. (last year)",
      },
      {
        examples: [
          "I visited Paris last year. (Eu visitei Paris no ano passado. - Tempo específico:)",
        ],
      },
      {
        text: "Present Perfect: Foca na conexão da ação passada com o presente, sem um tempo específico ou com um resultado no presente.",
      },
      {
        examples: [
          "I have visited Paris. (Eu visitei Paris. - Não importa quando, a experiência é o foco.)",
        ],
      },
      { heading: "Palavras-chave:" },
      { text: "Past Simple: yesterday, last week, in 2005, ago, when" },
      {
        text: "Present Perfect: ever, never, already, yet, just, since, for, recently, lately",
      },
      { heading: "3. Future Tenses (Will vs. Going to)" },
      {
        text: "Ambos são usados para falar sobre o futuro, mas com nuances diferentes.",
      },
      { heading: "Will:" },
      {
        examples: [
          "Previsões (sem evidência forte): It will rain tomorrow.",
          "Decisões espontâneas: I will help you with that.",
          "Promessas/Ofertas: I will call you later.",
        ],
      },
      { heading: "Going to:" },
      {
        examples: [
          "Planos e intenções: I am going to visit my grandparents next weekend.",
          "Previsões (com evidência forte): Look at those dark clouds! It's going to rain.",
        ],
      },
      { heading: "4. Comparatives and Superlatives" },
      { text: "Usados para comparar coisas, pessoas ou lugares." },
      { heading: "Comparativos: Comparar duas coisas" },
      { text: "Adjetivos curtos (1 ou 2 sílabas): Adicione -er e than." },
      {
        examples: [
          "Tall -> Taller than (mais alto que)",
          "Happy -> Happier than (mais feliz que)",
        ],
      },
      { text: "Adjetivos longos (3 ou mais sílabas): Use more e than." },
      { examples: ["Beautiful -> More beautiful than (mais bonito que)"] },
      {
        text: "Irregulares: Good -> Better, Bad -> Worse, Far -> Farther/Further",
      },
      { heading: "5. Modal Verbs (Can, Could, May, Might, Must, Should)" },
      { text: "Verbos modais expressam diferentes funções:" },
      { text: "Can: Habilidade, permissão." },
      {
        examples: [
          "I can speak English. (Habilidade)",
          "You can go now. (Permissão)",
        ],
      },
      { text: "Could: Habilidade no passado, possibilidade, pedido educado." },
      {
        examples: [
          "I could swim when I was five. (Habilidade no passado)",
          "It could rain later. (Possibilidade)",
          "Could you help me? (Pedido educado)",
        ],
      },
      { text: "May: Permissão, possibilidade." },
      {
        examples: [
          "You may enter. (Permissão)",
          "It may be true. (Possibilidade)",
        ],
      },
      { text: "Might: Possibilidade (mais remota que may)." },
      { examples: ["I might go to the party. (Possibilidade)"] },
      { text: "Must: Obrigação forte, dedução." },
      {
        examples: [
          "You must study for the exam. (Obrigação)",
          "He must be tired. (Dedução)",
        ],
      },
      { text: "Should: Conselho, recomendação." },
      { examples: ["You should eat more vegetables. (Conselho)"] },
    ],
  },
  // --- Explicação Intermediário 2 --- (Existente)
  {
    id: "interm2_explicacao_id",
    title: "Intermediário 2: Conditionals, Passive Voice e Reported Speech",
    content: [
      {
        text: "Bem-vindo(a) à sua aula de inglês intermediário 2! Nesta etapa, vamos aprofundar seus conhecimentos, explorando estruturas gramaticais mais complexas e expandindo seu vocabulário para que você possa se comunicar com mais fluidez e precisão.",
      },
      { heading: "1. First Conditional" },
      {
        text: "Usado para falar sobre situações reais ou prováveis no futuro.",
      },
      { structure: "Estrutura: If + Present Simple, Will + Verb (base form)" },
      {
        examples: [
          "If it rains, I will stay home. (Se chover, eu ficarei em casa.)",
          "If you study hard, you will pass the exam. (Se você estudar muito, você passará no exame.)",
        ],
      },
      { heading: "2. Second Conditional" },
      {
        text: "Usado para falar sobre situações hipotéticas ou improváveis no presente ou futuro.",
      },
      { structure: "Estrutura: If + Past Simple, Would + Verb (base form)" },
      {
        examples: [
          "If I won the lottery, I would buy a big house. (Se eu ganhasse na loteria, eu compraria uma casa grande. - Improvável)",
          "If I were you, I would accept the offer. (Se eu fosse você, eu aceitaria a oferta. - Hipotético)",
        ],
      },
      { heading: "3. Passive Voice (Present Simple and Past Simple)" },
      {
        text: "A voz passiva é usada quando o foco está na ação ou no objeto que sofre a ação, e não em quem a realiza.",
      },
      {
        structure:
          "Estrutura: Object + verb to be (conjugated) + Past Participle + (by + agent)",
      },
      { heading: "Present Simple Passive:" },
      {
        examples: [
          "Active: People make cars in Japan.",
          "Passive: Cars are made in Japan.",
        ],
      },
      { heading: "Past Simple Passive:" },
      {
        examples: [
          "Active: Someone stole my car yesterday.",
          "Passive: My car was stolen yesterday.",
        ],
      },
      { heading: "4. Reported Speech (Statements)" },
      {
        text: "Usado para reportar o que alguém disse, geralmente mudando o tempo verbal e pronomes.",
      },
      {
        examples: [
          "Direct Speech: 'I am happy.' (Eu estou feliz.)",
          "Reported Speech: She said that she was happy. (Ela disse que ela estava feliz.)",
        ],
      },
      { heading: "Mudanças comuns:" },
      {
        list: [
          "Present Simple -> Past Simple",
          "Present Continuous -> Past Continuous",
          "Past Simple -> Past Perfect",
          "Will -> Would",
          "Can -> Could",
        ],
      },
      { heading: "5. Phrasal Verbs" },
      {
        text: "Phrasal verbs são combinações de um verbo com uma preposição ou advérbio, que juntos têm um significado diferente do verbo original.",
      },
      { heading: "Look for: Procurar" },
      { examples: ["I am looking for my keys."] },
      { heading: "Turn off: Desligar" },
      { examples: ["Please turn off the lights."] },
      { heading: "Turn on: Ligar" },
      { examples: ["Can you turn on the TV?"] },
      { heading: "Take off: Decolar (avião), tirar (roupa)" },
      { examples: ["The plane took off on time.", "Take off your shoes."] },
      { heading: "Give up: Desistir" },
      { examples: ["Don't give up on your dreams."] },
      { heading: "Get up: Levantar" },
      { examples: ["I get up at 7 AM every day."] },
      { heading: "Call off: Cancelar" },
      { examples: ["They called off the meeting."] },
      { heading: "Put on: Vestir" },
      { examples: ["Put on your coat, it's cold."] },
    ],
  },
  {
    id: "avancado1_explicacao_id", // ID deve corresponder ao usado em materiasContent.ts
    title: "Avançado 1: Inversões Gramaticais e Collocations",
    content: [
      {
        text: "Bem-vindo(a) à sua aula de inglês avançado! Nesta etapa, exploraremos estruturas gramaticais mais sofisticadas e nuances da língua, essenciais para uma comunicação fluente e precisa.",
      },
      { heading: "1. Inversão Gramatical" },
      {
        text: "A inversão gramatical ocorre quando a ordem normal de sujeito-verbo é alterada, geralmente para ênfase ou em certas estruturas negativas/restritivas no início da frase.",
      },
      { heading: "Estruturas comuns de inversão:" },
      {
        list: [
          "Com advérbios negativos/restritivos (Hardly, Seldom, Never, Rarely, Scarcely, No sooner) no início da frase.",
          "Com 'Not until' ou 'Only when/after/if/by' no início da frase.",
          "Em condicionais sem 'if' (Were, Had, Should).",
        ],
      },
      {
        examples: [
          "Hardly had I arrived when the phone rang. (Mal eu cheguei quando o telefone tocou.)",
          "Never have I seen such a beautiful sight. (Nunca vi uma vista tão bonita.)",
          "Not until last week did I understand the problem. (Somente na semana passada eu entendi o problema.)",
          "Were I rich, I would travel the world. (Se eu fosse rico, eu viajaria o mundo.)",
        ],
      },
      { heading: "2. Collocations (Avançado)" },
      {
        text: "Collocations são combinações de palavras que ocorrem naturalmente juntas em inglês. Dominá-las é crucial para soar mais fluente e nativo, e para evitar traduções literais incorretas.",
      },
      {
        examples: [
          "Make a decision (tomar uma decisão)",
          "Take a risk (correr um risco)",
          "Pay attention (prestar atenção)",
          "Heavy rain (chuva forte)",
          "Strong tea (chá forte)",
          "Highly recommended (altamente recomendado)",
        ],
      },
      { heading: "3. Expressões Idiomáticas (Idioms)" },
      {
        text: "Idioms são frases cujo significado não pode ser deduzido das palavras individuais. Elas enriquecem a linguagem e são muito usadas por falantes nativos.",
      },
      {
        examples: [
          "Bite the bullet (enfrentar uma situação difícil com coragem)",
          "Beat around the bush (evitar o assunto principal)",
          "Hit the nail on the head (acertar em cheio)",
          "Break a leg (boa sorte - para artistas)",
          "Cost an arm and a leg (custar muito caro)",
          "A blessing in disguise (um mal que veio para o bem)",
        ],
      },
    ],
  },
  // --- Explicação AVANÇADO 2 (NOVO) ---
  {
    id: "avancado2_explicacao_id", // ID deve corresponder ao usado em materiasContent.ts
    title: "Avançado 2: Discurso Indireto Complexo e Vozes",
    content: [
      {
        text: "Bem-vindo(a) à sua aula de inglês avançado 2! Nesta fase final, aprofundaremos em aspectos mais complexos da gramática e do vocabulário, focando em nuances e estruturas que elevam sua fluência e precisão.",
      },
      { heading: "1. Discurso Indireto (Reported Speech) - Avançado" },
      {
        text: "Além das mudanças básicas de tempo verbal e pronomes, o Reported Speech em nível avançado envolve a reportagem de perguntas, comandos e o uso de diferentes verbos introdutórios.",
      },
      { heading: "Reportando Perguntas (Wh-questions e Yes/No questions):" },
      {
        examples: [
          "Direct: 'Where do you live?' -> Reported: She asked where I lived.",
          "Direct: 'Are you coming?' -> Reported: He asked if I was coming.",
        ],
      },
      { heading: "Reportando Comandos/Pedidos (Imperativos):" },
      {
        examples: [
          "Direct: 'Close the door!' -> Reported: He told me to close the door.",
          "Direct: 'Don't be late.' -> Reported: She told him not to be late.",
        ],
      },
      { heading: "2. Voz Passiva (Passive Voice) - Tempos Verbais Variados" },
      {
        text: "A voz passiva pode ser usada em diversos tempos verbais. A estrutura básica 'verb to be + Past Participle' se mantém, mas o 'to be' muda conforme o tempo verbal.",
      },
      {
        examples: [
          "Present Continuous Passive: The car is being repaired. (O carro está sendo consertado.)",
          "Present Perfect Passive: The task has been completed. (A tarefa foi concluída.)",
          "Modal Passive: The letter must be sent. (A carta deve ser enviada.)",
        ],
      },
      { heading: "3. Conditionals Mistos (Mixed Conditionals)" },
      {
        text: "Mixed Conditionals combinam diferentes tipos de condicionais (geralmente tipo 2 e tipo 3) para expressar situações hipotéticas no passado com resultados no presente, ou vice-versa.",
      },
      {
        structure:
          "Tipo 3 + Tipo 2: If + Past Perfect, would + base form (Resultado presente de uma condição passada)",
      },
      {
        examples: [
          "If I had studied harder (past condition), I would be a doctor now (present result). (Se eu tivesse estudado mais, eu seria um médico agora.)",
        ],
      },
      {
        structure:
          "Tipo 2 + Tipo 3: If + Past Simple, would have + Past Participle (Resultado passado de uma condição presente/geral)",
      },
      {
        examples: [
          "If I were rich (present condition), I would have bought that house (past result). (Se eu fosse rico, eu teria comprado aquela casa.)",
        ],
      },
      {
        heading:
          "4. Frases Compostas e Conectores (Connectors/Discourse Markers)",
      },
      {
        text: "O uso de conectores avançados e marcadores de discurso eleva a complexidade e coesão do seu texto e fala.",
      },
      {
        list: [
          "Adição: furthermore, moreover, in addition, besides",
          "Contraste: however, nevertheless, on the other hand, in contrast",
          "Causa/Efeito: consequently, therefore, as a result, hence",
          "Sequência: subsequently, subsequently, ultimately",
        ],
      },
      {
        examples: [
          "The project was complex; nevertheless, they completed it successfully.",
          "She is fluent in three languages. Furthermore, she is learning a fourth.",
        ],
      },
    ],
  },
];

export const findExplanationById = (
  id: string
): ExplanationContent | undefined => {
  return ALL_EXPLANATIONS.find((exp) => exp.id === id);
};

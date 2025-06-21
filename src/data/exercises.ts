// src/data/exercises.ts
// ... (suas interfaces ExerciseOption e ExerciseData permanecem as mesmas)

// Defina as interfaces se ainda não estiverem definidas ou importe-as de outro arquivo
export interface ExerciseOption {
  id: string;
  text: string;
}

export interface ExerciseData {
  id: string;
  title: string;
  questionParts: string[];
  instruction: string;
  options: ExerciseOption[];
  correctAnswerIndex: number;
  translation?: string;
}

export const ALL_EXERCISES: ExerciseData[] = [
  // Exercícios BÁSICOS (já existentes):
  {
    id: "ex1_dialog",
    title: "Exercício 1 (Básico):",
    questionParts: [
      "A: Hello! What's _ name?",
      "B: Hi! My name is Ana. Nice to _ you!",
      "A: Nice to meet you _, Ana. My name is Pedro.",
    ],
    instruction: "Qual é a palavra correta para completar o espaço em branco?",
    options: [
      { id: "a", text: "a) your / meet / too" },
      { id: "b", text: "b) her / see / also" },
      { id: "c", text: "c) his / know / as" },
      { id: "d", text: "d) your / meet / you" },
    ],
    correctAnswerIndex: 3,
  },
  {
    id: "ex2_dialog_greeting",
    title: "Exercício 2 (Básico):",
    questionParts: [
      "A: Good morning! How _ ?",
      "B: I'm fine, thanks. And _ you?",
      "A: I'm good, _!",
    ],
    instruction: "Qual é a palavra correta para completar o espaço em branco?",
    options: [
      { id: "a", text: "a) are / you / too" },
      { id: "b", text: "b) is / it / so" },
      { id: "c", text: "c) are / you / thanks" },
      { id: "d", text: "d) are / me / okay" },
    ],
    correctAnswerIndex: 2,
  },
  {
    id: "ex3_sky_color",
    title: "Exercício 3 (Básico):",
    questionParts: ["What color is the sky on a clear, sunny day?"],
    translation: "(De que cor é o céu em um dia claro e ensolarado?)",
    instruction: "Qual é a cor correta?",
    options: [
      { id: "a", text: "a) Blue" },
      { id: "b", text: "b) Green" },
      { id: "c", text: "c) Red" },
      { id: "d", text: "d) Yellow" },
    ],
    correctAnswerIndex: 0,
  },

  // --- NOVOS EXERCÍCIOS PARA BÁSICO 2 (baseado no PDF Básico 2: Pronomes, Verbo To Be, Artigos, Substantivos) ---
  {
    id: "ex_basico2_pronoun",
    title: "Exercício 1 (Básico 2):",
    questionParts: ["This is my friend, Sarah. _ is from Canada."],
    instruction: "Escolha o pronome correto:",
    options: [
      { id: "a", text: "a) He" },
      { id: "b", text: "b) She" },
      { id: "c", text: "c) It" },
      { id: "d", text: "d) They" },
    ],
    correctAnswerIndex: 1, // She
  },
  {
    id: "ex_basico2_tobe",
    title: "Exercício 2 (Básico 2):",
    questionParts: ["We _ students. They _ happy."],
    instruction: "Complete com a forma correta do verbo 'to be':",
    options: [
      { id: "a", text: "a) am / is" },
      { id: "b", text: "b) are / are" },
      { id: "c", text: "c) is / am" },
      { id: "d", text: "d) are / is" },
    ],
    correctAnswerIndex: 1, // are / are
  },
  {
    id: "ex_basico2_articles",
    title: "Exercício 3 (Básico 2):",
    questionParts: ["I have _ apple and _ book. _ apple is red."],
    instruction: "Complete com o artigo correto (A/An/The):",
    options: [
      { id: "a", text: "a) a / an / The" },
      { id: "b", text: "b) an / a / The" },
      { id: "c", text: "c) the / a / An" },
      { id: "d", text: "d) an / the / A" },
    ],
    correctAnswerIndex: 1, // an / a / The
  },

  // --- NOVOS EXERCÍCIOS PARA INTERMEDIÁRIO 1 (baseado no PDF Intermediário 1: Present Perfect, Future Tenses, Comparatives) ---
  {
    id: "ex_interm1_gramatica", // (já existente)
    title: "Exercício 1 (Intermediário 1):",
    questionParts: ["She _ (live) in London since 2010."],
    instruction: "Preencha com o tempo verbal correto:",
    options: [
      { id: "a", text: "a) live" },
      { id: "b", text: "b) has lived" },
      { id: "c", text: "c) lived" },
      { id: "d", text: "d) is living" },
    ],
    correctAnswerIndex: 1, // "has lived"
  },
  {
    id: "ex_interm1_vocabulario", // (já existente)
    title: "Exercício 2 (Intermediário 1):",
    questionParts: ["I need to _ up with a new idea for the project."],
    instruction: "Escolha o phrasal verb correto:",
    options: [
      { id: "a", text: "a) come" },
      { id: "b", text: "b) get" },
      { id: "c", text: "c) make" },
      { id: "d", text: "d) take" },
    ],
    correctAnswerIndex: 0, // "come" (come up with)
  },
  {
    id: "ex_interm1_present_perfect",
    title: "Exercício 3 (Intermediário 1):",
    questionParts: ["I _ (never / see) such a beautiful sunset before."],
    instruction: "Complete a frase usando o Present Perfect:",
    options: [
      { id: "a", text: "a) never saw" },
      { id: "b", text: "b) have never seen" },
      { id: "c", text: "c) has never seen" },
      { id: "d", text: "d) am never seeing" },
    ],
    correctAnswerIndex: 1, // have never seen
  },
  {
    id: "ex_interm1_future_tenses",
    title: "Exercício 4 (Intermediário 1):",
    questionParts: ["Look at those dark clouds! It _ (rain) soon."],
    instruction: "Escolha a forma correta para o futuro:",
    options: [
      { id: "a", text: "a) will rain" },
      { id: "b", text: "b) is going to rain" },
      { id: "c", text: "c) rains" },
      { id: "d", text: "d) rained" },
    ],
    correctAnswerIndex: 1, // is going to rain (com evidência forte)
  },
  {
    id: "ex_interm1_comparatives",
    title: "Exercício 5 (Intermediário 1):",
    questionParts: ["This book is _ (interesting) than the last one."],
    instruction: "Complete com o comparativo correto:",
    options: [
      { id: "a", text: "a) more interesting" },
      { id: "b", text: "b) most interesting" },
      { id: "c", text: "c) interestinger" },
      { id: "d", text: "d) as interesting" },
    ],
    correctAnswerIndex: 0, // more interesting
  },

  // --- NOVOS EXERCÍCIOS PARA INTERMEDIÁRIO 2 (baseado no PDF Intermediário 2: Conditionals, Passive Voice, Reported Speech, Phrasal Verbs) ---
  {
    id: "ex_interm2_first_conditional",
    title: "Exercício 1 (Intermediário 2):",
    questionParts: ["If she _ (study) hard, she _ (pass) the exam."],
    instruction: "Complete com a forma correta dos verbos (First Conditional):",
    options: [
      { id: "a", text: "a) studies / will pass" },
      { id: "b", text: "b) will study / passes" },
      { id: "c", text: "c) studied / would pass" },
      { id: "d", text: "d) study / will pass" },
    ],
    correctAnswerIndex: 0, // studies / will pass
  },
  {
    id: "ex_interm2_passive_voice",
    title: "Exercício 2 (Intermediário 2):",
    questionParts: ["Cars _ (make) in Japan. (Passive Voice - Present Simple)"],
    instruction: "Complete com a forma correta na Voz Passiva:",
    options: [
      { id: "a", text: "a) is made" },
      { id: "b", text: "b) are made" },
      { id: "c", text: "c) makes" },
      { id: "d", text: "d) were made" },
    ],
    correctAnswerIndex: 1, // are made
  },
  {
    id: "ex_interm2_reported_speech",
    title: "Exercício 3 (Intermediário 2):",
    questionParts: [
      'Direct Speech: "I am happy." Reported Speech: She said that she _ happy.',
    ],
    instruction: "Complete com a forma correta (Reported Speech):",
    options: [
      { id: "a", text: "a) is" },
      { id: "b", text: "b) was" },
      { id: "c", text: "c) were" },
      { id: "d", text: "d) had been" },
    ],
    correctAnswerIndex: 1, // was
  },

  // --- NOVOS EXERCÍCIOS PARA AVANÇADO 1 ---
  {
    id: "ex_avancado1_compreensao", // (já existente)
    title: "Exercício 1 (Avançado 1):",
    questionParts: [
      "Which of the following idioms means 'to delay making a decision'?",
    ],
    instruction: "Escolha a opção correta:",
    options: [
      { id: "a", text: "a) Bite the bullet" },
      { id: "b", text: "b) Beat around the bush" },
      { id: "c", text: "c) Hit the nail on the head" },
      { id: "d", text: "d) Break a leg" },
    ],
    correctAnswerIndex: 1, // "Beat around the bush"
  },
  {
    id: "ex_avancado1_inversion",
    title: "Exercício 2 (Avançado 1):",
    questionParts: ["Hardly _ she entered the room when the phone rang."],
    instruction: "Complete a frase com a inversão correta:",
    options: [
      { id: "a", text: "a) had" },
      { id: "b", text: "b) did" },
      { id: "c", text: "c) has" },
      { id: "d", text: "d) was" },
    ],
    correctAnswerIndex: 0, // had (Hardly had she entered)
  },
  {
    id: "ex_avancado1_collocations",
    title: "Exercício 3 (Avançado 1):",
    questionParts: ["She finally managed to _ her dream of becoming a doctor."],
    instruction: "Escolha o verbo que forma a collocation correta:",
    options: [
      { id: "a", text: "a) make" },
      { id: "b", text: "b) achieve" },
      { id: "c", text: "c) do" },
      { id: "d", text: "d) get" },
    ],
    correctAnswerIndex: 1, // achieve (achieve a dream)
  },
  {
    id: "ex_avancado1_nuance",
    title: "Exercício 4 (Avançado 1):",
    questionParts: [
      "Despite the challenging circumstances, they _ persevered.",
    ],
    instruction: "Escolha o advérbio que melhor expressa a ideia:",
    options: [
      { id: "a", text: "a) merely" },
      { id: "b", text: "b) utterly" },
      { id: "c", text: "c) steadfastly" },
      { id: "d", text: "d) somewhat" },
    ],
    correctAnswerIndex: 2, // steadfastly (firmemente)
  },

  // --- NOVOS EXERCÍCIOS PARA AVANÇADO 2 ---
  {
    id: "ex_avancado2_phrasal_advanced", // (já existente)
    title: "Exercício 1 (Avançado 2):",
    questionParts: ["The team decided to _ the project due to budget cuts."],
    instruction: "Complete com o phrasal verb mais adequado:",
    options: [
      { id: "a", text: "a) call off" },
      { id: "b", text: "b) call on" },
      { id: "c", text: "c) call up" },
      { id: "d", text: "d) call in" },
    ],
    correctAnswerIndex: 0, // "call off"
  },
  {
    id: "ex_avancado2_connectors",
    title: "Exercício 2 (Avançado 2):",
    questionParts: ["_ she had studied hard, she still failed the exam."],
    instruction: "Escolha o conector que melhor se encaixa:",
    options: [
      { id: "a", text: "a) Although" },
      { id: "b", text: "b) Despite" },
      { id: "c", text: "c) In spite of" },
      { id: "d", text: "d) However" },
    ],
    correctAnswerIndex: 0, // Although
  },
  {
    id: "ex_avancado2_conditionals_mixed",
    title: "Exercício 3 (Avançado 2):",
    questionParts: ["If I _ (not miss) the bus, I _ (be) on time now."],
    instruction: "Complete com o Mixed Conditional Type 3/2:",
    options: [
      { id: "a", text: "a) hadn't missed / would be" },
      { id: "b", text: "b) didn't miss / would be" },
      { id: "c", text: "c) haven't missed / would be" },
      { id: "d", text: "d) wouldn't miss / were" },
    ],
    correctAnswerIndex: 0, // hadn't missed / would be
  },
  {
    id: "ex_avancado2_idioms_complex",
    title: "Exercício 4 (Avançado 2):",
    questionParts: ["When faced with a difficult decision, he tends to _."],
    instruction:
      "Escolha o idiom que significa 'evitar tomar uma decisão rapidamente':",
    options: [
      { id: "a", text: "a) pull out all the stops" },
      { id: "b", text: "b) sit on the fence" },
      { id: "c", text: "c) bite the bullet" },
      { id: "d", text: "d) get cold feet" },
    ],
    correctAnswerIndex: 1, // sit on the fence
  },
];

export const findExerciseById = (id: string): ExerciseData | undefined => {
  return ALL_EXERCISES.find((ex) => ex.id === id);
};

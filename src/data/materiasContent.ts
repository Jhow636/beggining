// src/data/materiasContent.ts (Novo arquivo)

export interface MateriaContentItem {
  id: string; // ID da matéria (ex: "1", "basico1")
  title: string; // Título da matéria (ex: "Básico - 1")
  description: string; // Descrição breve da matéria
  explanationTextId: string; // Um ID para buscar o texto da explicação (Firestore ou outro local)
  activityIds: string[]; // IDs dos exercícios associados a esta matéria
}

export const ALL_MATERIAS_CONTENT: MateriaContentItem[] = [
  // ... (Sua matéria 'Básico - 1' e outros que já estavam corretos, se houver)
  {
    id: "1",
    title: "Básico - 1",
    description: "Introdução aos fundamentos da língua inglesa.",
    explanationTextId: "basico1_explicacao_id",
    activityIds: ["ex1_dialog", "ex2_dialog_greeting", "ex3_sky_color"], // Mantenha os IDs de Básico 1
  },
  {
    id: "2",
    title: "Básico - 2",
    description: "Aprofundando em cumprimentos e apresentações.",
    explanationTextId: "basico2_explicacao_id",
    activityIds: [
      "ex_basico2_pronoun", // Novo exercício 4 de Básico 2
      "ex_basico2_tobe", // Novo exercício 5 de Básico 2
      "ex_basico2_articles", // Novo exercício 6 de Básico 2
    ],
  },
  // Adicione as demais matérias aqui
  {
    id: "3",
    title: "Intermediário - 1",
    description: "Verbos irregulares e tempos verbais básicos.",
    explanationTextId: "interm1_explicacao_id",
    activityIds: [
      "ex_interm1_gramatica", // Exercício existente em Intermediário 1
      "ex_interm1_vocabulario", // Exercício existente em Intermediário 1
      "ex_interm1_present_perfect", // Novo exercício 3 de Intermediário 1
      "ex_interm1_future_tenses", // Novo exercício 4 de Intermediário 1
      "ex_interm1_comparatives", // Novo exercício 5 de Intermediário 1
    ],
  },
  {
    id: "4",
    title: "Intermediário - 2",
    description: "Construção de frases complexas e vocabulário avançado.",
    explanationTextId: "interm2_explicacao_id",
    activityIds: [
      "ex_interm2_first_conditional", // Novo exercício 1 de Intermediário 2
      "ex_interm2_passive_voice", // Novo exercício 2 de Intermediário 2
      "ex_interm2_reported_speech", // Novo exercício 3 de Intermediário 2
    ],
  },
  {
    id: "5",
    title: "Avançado - 1",
    description: "Imersão em conversação e fluência.",
    explanationTextId: "avancado1_explicacao_id",
    activityIds: [
      "ex_avancado1_compreensao", // Exercício existente em Avançado 1
      "ex_avancado1_inversion", // Novo exercício 2 de Avançado 1
      "ex_avancado1_collocations", // Novo exercício 3 de Avançado 1
      "ex_avancado1_nuance", // Novo exercício 4 de Avançado 1
    ],
  },
  {
    id: "6",
    title: "Avançado - 2",
    description: "Estratégias de argumentação e debate em inglês.",
    explanationTextId: "avancado2_explicacao_id",
    activityIds: [
      "ex_avancado2_phrasal_advanced", // Exercício existente em Avançado 2
      "ex_avancado2_connectors", // Novo exercício 2 de Avançado 2
      "ex_avancado2_conditionals_mixed", // Novo exercício 3 de Avançado 2
      "ex_avancado2_idioms_complex", // Novo exercício 4 de Avançado 2
    ],
  },
  // ... (suas outras matérias)
  {
    id: "7", // << ESTE ID DEVE SER O QUE VOCÊ USA EM TelaTutorialCards
    title: "Reconhecimento Visual", // Título da matéria de imagem
    description:
      "Exercícios de reconhecimento de objetos e conceitos visuais em inglês.",
    explanationTextId: "visual_intro_exp_id", // Pode ser um ID genérico se não tiver explicação para o tutorial
    activityIds: [
      // << AQUI VÃO OS IDS DOS EXERCÍCIOS DE IMAGEM
      "img_ex1_objects",
      "img_ex2_clothing",
      "img_ex3_abstract",
      // ... outros IDs de exercícios de imagem
    ],
  },
  // ... (restante do seu arquivo materiasContent.ts)
];

export const findMateriaContentById = (
  id: string
): MateriaContentItem | undefined => {
  return ALL_MATERIAS_CONTENT.find((m) => m.id === id);
};

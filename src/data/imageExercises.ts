// src/data/imageExercises.ts

import { ImageSourcePropType } from "react-native";

export interface ImageExerciseOption {
  id: string;
  text?: string; // Texto opcional para a opção (ex: "Gato")
  // imageSource: ImageSourcePropType; // <--- REMOVIDO DA INTERFACE se a imagem não for mais usada nas opções
}

export interface ImageExerciseData {
  id: string;
  title: string;
  instruction: string;
  questionImage?: ImageSourcePropType; // Imagem principal da pergunta (se a pergunta for uma imagem)
  questionText?: string; // Texto da pergunta (se a pergunta for texto com opções de imagem)
  options: ImageExerciseOption[]; // As opções de resposta AGORA SÓ TÊM ID E TEXTO
  correctAnswerId: string;
}

const Images = {
  house: require("@assets/images/house.png"),
  sweater: require("@assets/images/sweater.png"),
  toothbrush: require("@assets/images/toothbrush.png"),
  butterfly: require("@assets/images/butterfly.png"),
  thinking: require("@assets/images/thinking.png"),
  // default_fallback: require("@assets/images/default_fallback.png"), // Certifique-se de que esta imagem existe se for usá-la
};

export const ALL_IMAGE_EXERCISES: ImageExerciseData[] = [
  {
    id: "img_ex1_objects",
    title: "Exercício de Imagem 1:",
    instruction: "Qual objeto você vê na imagem?",
    questionImage: Images.house, // Imagem da pergunta (mantida)
    options: [
      { id: "house", text: "Casa" }, // Sem imageSource
      { id: "sweater", text: "Suéter" }, // Sem imageSource
      { id: "toothbrush", text: "Escova de dente" }, // Sem imageSource
      { id: "butterfly", text: "Borboleta" }, // Sem imageSource
    ],
    correctAnswerId: "house",
  },
  {
    id: "img_ex2_clothing",
    title: "Exercício de Imagem 2:",
    instruction: "Qual dessas imagens representa uma peça de roupa?",
    questionImage: Images.sweater, // Pergunta textual com opções de texto
    options: [
      { id: "toothbrush", text: "Escova de dente" }, // Sem imageSource
      { id: "sweater", text: "Suéter" }, // Correto, sem imageSource
      { id: "house", text: "Casa" }, // Sem imageSource
      { id: "thinking", text: "Pensando" }, // Sem imageSource
    ],
    correctAnswerId: "sweater",
  },
  {
    id: "img_ex3_abstract",
    title: "Exercício de Imagem 3:",
    instruction: "Esta imagem transmite a ideia de:",
    questionImage: Images.thinking, // Imagem da pergunta (mantida)
    options: [
      { id: "speaking", text: "Speaking" }, // Sem imageSource
      { id: "crying", text: "Crying" }, // Sem imageSource
      { id: "thinking", text: "Thinking" }, // Correto, sem imageSource
      { id: "talking", text: "Talking" }, // Sem imageSource
    ],
    correctAnswerId: "thinking",
  },
  // Adicione mais exercícios de imagem aqui usando as imagens disponíveis
];

export const findImageExerciseById = (
  id: string
): ImageExerciseData | undefined => {
  return ALL_IMAGE_EXERCISES.find((ex) => ex.id === id);
};

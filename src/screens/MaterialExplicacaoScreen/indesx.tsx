import React from "react";
import { ScrollView, Text, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Container, Title, ExplanationContentText } from "./styles"; // Seus estilos para MateriaExplicacaoScreen

// Tipagem dos parâmetros da rota
type MateriaExplicacaoScreenRouteProp = RouteProp<
  { MateriaExplicacao: { explanationId: string; materiaTitle: string } },
  "MateriaExplicacao"
>;

// Dados de exemplo para explicações (em um app real, viriam do Firestore)
const DUMMY_EXPLANATIONS: { [key: string]: string } = {
  basico1_explicacao_id:
    "Esta é a explicação detalhada para a matéria Básico - 1. Aqui você aprenderá sobre cumprimentos, apresentações e frases básicas para o dia a dia. Foco em gramática simples e vocabulário essencial.\n\nContinue lendo para mais exemplos e dicas de pronúncia. A prática leva à perfeição!",
  basico2_explicacao_id:
    "A explicação para Básico - 2 aborda tópicos como verbos mais comuns, formação de perguntas e respostas curtas. Prepare-se para conversações mais complexas e o uso de artigos definidos e indefinidos.",
  // Adicione mais explicações conforme seus IDs
};

const MateriaExplicacaoScreen: React.FC = () => {
  const route = useRoute<MateriaExplicacaoScreenRouteProp>();
  const { explanationId, materiaTitle } = route.params;

  const explanationText = DUMMY_EXPLANATIONS[explanationId];

  if (!explanationText) {
    return (
      <Container style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00C2A1" />
        <Text style={{ marginTop: 10 }}>Carregando explicação...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: RFValue(20) }}>
        <Title>{materiaTitle}</Title>
        <ExplanationContentText>{explanationText}</ExplanationContentText>
      </ScrollView>
    </Container>
  );
};

export default MateriaExplicacaoScreen;

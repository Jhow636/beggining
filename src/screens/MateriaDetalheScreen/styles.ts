import React from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import CustomButton from "@components/CustomButton"; // Seu botão reutilizável
import { RFValue } from "react-native-responsive-fontsize";

import {
  Container,
  Title,
  DescriptionText,
  SectionContainer,
  SectionTitle,
  ButtonContainer,
} from "./styles"; // Seus estilos para MateriaDetalheScreen

// Importe os dados e a função de busca
import {
  MateriaContentItem,
  findMateriaContentById,
} from "../../data/materiasContent";
import { ALL_EXERCISES } from "../../data/exercises"; // Para verificar se o exercício existe

// Tipagem dos parâmetros da rota
type MateriaDetalheScreenRouteProp = RouteProp<
  { MateriaDetalhe: { materiaId: string; materiaTitle: string } },
  "MateriaDetalhe"
>;

const MateriaDetalheScreen: React.FC = () => {
  const route = useRoute<MateriaDetalheScreenRouteProp>();
  const navigation = useNavigation();
  const { materiaId, materiaTitle } = route.params;

  const materiaDetails: MateriaContentItem | undefined =
    findMateriaContentById(materiaId);

  if (!materiaDetails) {
    return (
      <Container style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00C2A1" />
        <Text style={{ marginTop: 10 }}>Carregando detalhes da matéria...</Text>
      </Container>
    );
  }

  // Função para navegar para a explicação
  const navigateToExplanation = () => {
    // Você pode passar o ID da explicação ou o objeto completo da matéria
    navigation.navigate("MateriaExplicacao", {
      explanationId: materiaDetails.explanationTextId,
      materiaTitle: materiaDetails.title,
    });
  };

  // Função para navegar para uma atividade específica
  const navigateToActivity = (exerciseId: string) => {
    // Verifica se o exercício existe antes de navegar
    const exercise = ALL_EXERCISES.find((ex) => ex.id === exerciseId);
    if (exercise) {
      navigation.navigate("Atividade", { exerciseId: exercise.id });
    } else {
      alert("Exercício não encontrado!");
      console.warn(
        `Exercício com ID ${exerciseId} não encontrado em ALL_EXERCISES.`
      );
    }
  };

  return (
    <Container>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Title>{materiaDetails.title}</Title>
        <DescriptionText>{materiaDetails.description}</DescriptionText>

        <SectionContainer>
          <SectionTitle>Conteúdo</SectionTitle>
          <ButtonContainer>
            <CustomButton
              title="Ver Explicação"
              onPress={navigateToExplanation}
            />
          </ButtonContainer>
        </SectionContainer>

        {materiaDetails.activityIds.length > 0 && (
          <SectionContainer>
            <SectionTitle>Atividades</SectionTitle>
            <ButtonContainer>
              {materiaDetails.activityIds.map((exerciseId) => (
                <CustomButton
                  key={exerciseId}
                  title={`Iniciar Atividade: ${exerciseId}`} // Você pode buscar o título real do exercício aqui
                  onPress={() => navigateToActivity(exerciseId)}
                  style={{ marginBottom: RFValue(10) }}
                />
              ))}
            </ButtonContainer>
          </SectionContainer>
        )}
        {materiaDetails.activityIds.length === 0 && (
          <SectionContainer>
            <Text style={{ color: "#666", textAlign: "center" }}>
              Não há atividades para esta matéria.
            </Text>
          </SectionContainer>
        )}
      </ScrollView>
    </Container>
  );
};

export default MateriaDetalheScreen;

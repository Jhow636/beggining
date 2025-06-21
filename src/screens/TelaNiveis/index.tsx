import React from "react";
import { Container, MainWrapper, Title, Wrapper } from "./styles";
import { useNavigation } from "@react-navigation/native";
import HeaderAtividades from "@components/HeaderAtividades";
import CardsMaterias from "@components/CardsMaterias"; // Seu componente CardsMaterias
import {
  ALL_MATERIAS_CONTENT,
  findMateriaContentById,
} from "../../data/materiasContent";
import { ALL_EXERCISES } from "../../data/exercises"; // Seus exercícios
import { Alert } from "react-native";

const TelaNiveis: React.FC = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMateriaCardToActivity = (
    materia: (typeof ALL_MATERIAS_CONTENT)[0]
  ) => {
    const materiaDetails = findMateriaContentById(materia.id);

    if (materiaDetails && materiaDetails.activityIds.length > 0) {
      const firstActivityId = materiaDetails.activityIds[0];
      const exerciseExists = ALL_EXERCISES.some(
        (ex) => ex.id === firstActivityId
      );

      if (exerciseExists) {
        console.log(
          `Navegando para Atividade com exerciseId: ${firstActivityId}`
        );
        navigation.navigate("Atividade", {
          materiaId: materiaDetails.id,
          exerciseId: firstActivityId,
          activityIdsInSequence: materiaDetails.activityIds,
        });
      } else {
        Alert.alert(
          "Erro",
          `Exercício '${firstActivityId}' não encontrado para ${materia.title}.`
        );
      }
    } else {
      Alert.alert(
        "Ops!",
        `A matéria '${materia.title}' não possui atividades associadas.`
      );
    }
  };
  return (
    <Container>
      <HeaderAtividades iconBack={true} onPress={handleBackPress} />
      <MainWrapper>
        <Wrapper>
          <Title>Escolha o nivel:</Title>
          <CardsMaterias onCardPress={handleMateriaCardToActivity} />
        </Wrapper>
      </MainWrapper>
    </Container>
  );
};

export default TelaNiveis;

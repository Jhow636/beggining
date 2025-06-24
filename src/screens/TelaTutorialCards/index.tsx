import React from "react";
import { Alert } from "react-native";
import { Container, MainWrapper, Title, Description, Wrapper } from "./styles";
import HeaderAtividades from "@components/HeaderAtividades";
import CustomButton from "@components/CustomButton";
import { useNavigation } from "@react-navigation/native";

// --- IMPORTAÇÕES CORRETAS PARA OS DADOS ---
// Importe os dados de MATÉRIAS
import {
  ALL_MATERIAS_CONTENT,
  findMateriaContentById,
} from "@data/materiasContent"; // Caminho relativo
// Importe os dados de EXERCÍCIOS DE IMAGEM
import { ALL_IMAGE_EXERCISES } from "@data/imageExercises"; // Alias

const TelaTutorialCards: React.FC = () => {
  const navigation = useNavigation();

  const handleTelaCards = () => {
    // 1. Identifique qual MATÉRIA (do materiasContent.ts) você quer iniciar.
    //    Essa matéria deve ter em seu `activityIds` os IDs dos exercícios de imagem.
    const materiaIdParaAtividadeDeImagem = "7"; // Exemplo: ID da matéria "Atividades Visuais"

    // Use findMateriaContentById para encontrar os detalhes da MATÉRIA
    const materiaDetails = findMateriaContentById(
      materiaIdParaAtividadeDeImagem
    );

    // Verifica se a matéria foi encontrada e se ela possui atividades
    if (materiaDetails && materiaDetails.activityIds.length > 0) {
      // Pega o ID da PRIMEIRA atividade associada a essa matéria
      const firstActivityId = materiaDetails.activityIds[0];

      // Verifica se este `firstActivityId` existe na lista de TODOS os exercícios de IMAGEM
      const exerciseExists = ALL_IMAGE_EXERCISES.some(
        (ex) => ex.id === firstActivityId
      );

      if (exerciseExists) {
        console.log(
          `Navegando para ImagemAtividade com exerciseId: ${firstActivityId}`
        );
        // Navega para ImagemAtividade, passando os parâmetros corretos
        navigation.navigate("ImagemAtividadeScreen", {
          // <<< O NOME DA ROTA NO STACK DEVE SER 'ImagemAtividade'
          materiaId: materiaDetails.id, // ID da matéria atual
          exerciseId: firstActivityId, // ID do primeiro exercício de imagem
          activityIdsInSequence: materiaDetails.activityIds, // A sequência completa de IDs da matéria
        });
      } else {
        Alert.alert(
          "Erro",
          `O primeiro exercício de imagem '${firstActivityId}' (associado à matéria '${materiaDetails.title}') não foi encontrado em seus exercícios de imagem.`
        );
      }
    } else {
      Alert.alert(
        "Ops!",
        `Nenhuma matéria associada ao ID '${materiaIdParaAtividadeDeImagem}' foi encontrada ou ela não possui atividades de imagem configuradas.`
      );
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <HeaderAtividades iconBack={true} onPress={handleGoBack} />
      <MainWrapper>
        <Wrapper>
          <Title>Como Jogar?</Title>
          <Description>
            Voce deve relacionar a palavra com a imagem apresentada no card.
            Caso correta passe para direita, caso incorreto passe para esquerda.
            {"\n"}
            {"\n"}
            Será mostrado na tela a resposta correta apos deslizar.
          </Description>
          <CustomButton title="Começar" onPress={handleTelaCards} />
        </Wrapper>
      </MainWrapper>
    </Container>
  );
};

export default TelaTutorialCards;

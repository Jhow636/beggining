import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@components/CustomButton";
import { RFValue } from "react-native-responsive-fontsize";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import HeaderAtividades from "@components/HeaderAtividades";

import {
  Container,
  ExerciseTitle,
  QuestionText,
  InstructionText,
  OptionsContainer,
  OptionButton,
  OptionText,
  ConfirmButtonContainer,
  MainWrapper,
  ModalContainer,
  CustomModalContent,
  ModalTitle,
  ModalMessage,
  ModalButtonContainer,
  ModalActionButton,
  ModalCancelButton,
  ModalButtonText,
} from "./styles";

// !!! CORREÇÃO AQUI: Inclua ExerciseData e ALL_EXERCISES na importação
import {
  ALL_EXERCISES,
  findExerciseById,
  ExerciseOption,
  ExerciseData,
} from "@data/exercises";

// !!! CORREÇÃO AQUI: Descomentar e/ou ajustar o caminho para findMateriaContentById
import { findMateriaContentById } from "../../data/materiasContent"; // Ajuste o caminho conforme seu projeto

// Tipagem dos parâmetros da rota:
// Esta tipagem define o que a rota 'Atividade' (ou 'AtividadeScreen' se você preferir este nome)
// espera receber como parâmetros.
type AtividadeScreenRouteProp = RouteProp<
  {
    // AQUI O NOME DA ROTA NO SEU STACK NAVIGATOR DEVE SER 'Atividade' (recomendado) ou 'AtividadeScreen'
    // Se for 'AtividadeScreen' no Stack, mantenha 'AtividadeScreen' aqui.
    // Se for 'Atividade' no Stack, mude para 'Atividade'.
    Atividade: {
      // <<< VERIFIQUE SE ESTE É O NOME DA ROTA NO SEU STACK
      exerciseId: string;
      materiaId: string;
      activityIdsInSequence: string[];
    };
  },
  // O segundo parâmetro de RouteProp é o nome da rota a que se refere
  "Atividade" // <<< E AQUI TAMBÉM: Deve ser o mesmo nome da rota no Stack
>;

// Interface para o conteúdo do nosso modal personalizado (nenhuma mudança aqui)
interface CustomModalContentData {
  title: string;
  message: string;
  type: "success" | "error" | "info" | "confirm";
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const AtividadeScreen: React.FC = () => {
  const route = useRoute<AtividadeScreenRouteProp>();
  const { exerciseId, materiaId, activityIdsInSequence } = route.params;
  const navigation = useNavigation();

  const exercise = findExerciseById(exerciseId);

  const [selectedOption, setSelectedOption] = useState<ExerciseOption | null>(
    null
  );
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customModalContent, setCustomModalContent] =
    useState<CustomModalContentData | null>(null);

  const openCustomModal = (content: CustomModalContentData) => {
    setCustomModalContent(content);
    setShowCustomModal(true);
  };

  const closeCustomModal = () => {
    setShowCustomModal(false);
    setSelectedOption(null);
    setCustomModalContent(null);
  };

  const handleOptionSelect = (option: ExerciseOption) => {
    setSelectedOption(option);
  };

  const handleBack = () => {
    openCustomModal({
      title: "Voltar ao Início",
      message:
        "Deseja realmente voltar ao início? Todo o progresso será perdido.",
      type: "confirm",
      onConfirm: () => {
        closeCustomModal();
        navigation.popToTop();
      },
      onCancel: () => closeCustomModal(),
      confirmText: "Sim, voltar",
      cancelText: "Cancelar",
    });
  };

  const handleConfirm = () => {
    if (!exercise) return;

    if (!selectedOption) {
      openCustomModal({
        title: "Atenção",
        message: "Por favor, selecione uma opção antes de confirmar.",
        type: "info",
        onConfirm: () => closeCustomModal(),
        confirmText: "Ok",
      });
      return;
    }

    const isCorrect =
      selectedOption.id === exercise.options[exercise.correctAnswerIndex].id;

    if (isCorrect) {
      const currentIndex = activityIdsInSequence.indexOf(exerciseId);
      const nextIndex = currentIndex + 1;

      if (nextIndex < activityIdsInSequence.length) {
        const nextExerciseId = activityIdsInSequence[nextIndex];
        openCustomModal({
          title: "Parabéns!",
          message: "Você acertou! Próximo exercício...",
          type: "success",
          onConfirm: () => {
            closeCustomModal();
            // AQUI O NOME DA ROTA NO navigation.replace DEVE SER O MESMO QUE NO STACK
            navigation.replace("Atividade", {
              // <<< VERIFIQUE AQUI: Deve ser o nome da rota no seu Stack
              materiaId,
              exerciseId: nextExerciseId,
              activityIdsInSequence,
            });
          },
          confirmText: "Continuar",
        });
      } else {
        const materiaDetails = findMateriaContentById(materiaId);

        openCustomModal({
          title: "Matéria Concluída!",
          message: `Parabéns! Você completou todos os exercícios de "${
            materiaDetails?.title || "esta matéria"
          }"!`,
          type: "success",
          onConfirm: () => {
            closeCustomModal();
            navigation.navigate("TelaNiveis");
          },
          confirmText: "Finalizar",
        });
      }
    } else {
      openCustomModal({
        title: "Que pena!",
        message: "Resposta incorreta. Tente novamente.",
        type: "error",
        onConfirm: () => closeCustomModal(),
        confirmText: "Entendi",
      });
    }
  };

  if (!exercise) {
    return (
      <Container style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00C2A1" />
        <Text style={{ marginTop: 10 }}>Carregando exercício...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderAtividades iconBack={true} onPress={handleBack} />

      <MainWrapper>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ExerciseTitle>{exercise.title}</ExerciseTitle>

          {exercise.questionParts.map((part, index) => (
            <QuestionText key={index}>{part}</QuestionText>
          ))}

          {exercise.instruction && (
            <InstructionText>{exercise.instruction}</InstructionText>
          )}
          {exercise.translation && (
            <InstructionText
              style={{ fontStyle: "italic", marginBottom: RFValue(10) }}
            >
              {exercise.translation}
            </InstructionText>
          )}

          <OptionsContainer>
            {exercise.options.map((option) => (
              <OptionButton
                key={option.id}
                onPress={() => handleOptionSelect(option)}
                isSelected={selectedOption?.id === option.id}
              >
                <OptionText isSelected={selectedOption?.id === option.id}>
                  {option.text}
                </OptionText>
              </OptionButton>
            ))}
          </OptionsContainer>
        </ScrollView>

        <ConfirmButtonContainer>
          <CustomButton title="Confirmar" onPress={handleConfirm} />
        </ConfirmButtonContainer>
      </MainWrapper>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showCustomModal}
        onRequestClose={closeCustomModal}
      >
        <ModalContainer>
          {customModalContent && (
            <CustomModalContent type={customModalContent.type}>
              <ModalTitle>{customModalContent.title}</ModalTitle>
              <ModalMessage>{customModalContent.message}</ModalMessage>

              <ModalButtonContainer>
                {customModalContent.onCancel && (
                  <ModalCancelButton onPress={customModalContent.onCancel}>
                    <ModalButtonText>
                      {customModalContent.cancelText || "Cancelar"}
                    </ModalButtonText>
                  </ModalCancelButton>
                )}
                {customModalContent.onConfirm && (
                  <ModalActionButton
                    onPress={customModalContent.onConfirm}
                    type={customModalContent.type}
                  >
                    <ModalButtonText>
                      {customModalContent.confirmText || "Ok"}
                    </ModalButtonText>
                  </ModalActionButton>
                )}
              </ModalButtonContainer>
            </CustomModalContent>
          )}
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default AtividadeScreen;

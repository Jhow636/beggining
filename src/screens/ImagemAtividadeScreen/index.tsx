import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  // Removida a importação de Image aqui, pois não será usada nas opções
} from "react-native";
import { StatusBar } from "expo-status-bar"; // Ajustado para o nome completo se for o caso
import CustomButton from "@components/CustomButton";
import { RFValue } from "react-native-responsive-fontsize";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import HeaderAtividades from "@components/HeaderAtividades";

import {
  Container,
  ExerciseTitle,
  InstructionText,
  QuestionImage, // Mantém a imagem para a pergunta
  ImageOptionsContainer,
  ImageOptionButton,
  // Removida a importação de ImageOptionImage
  ImageOptionText,
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

import {
  ALL_IMAGE_EXERCISES,
  findImageExerciseById,
  ImageExerciseOption,
  ImageExerciseData,
} from "@data/imageExercises";

import { findMateriaContentById } from "../../data/materiasContent";

type ImagemAtividadeScreenRouteProp = RouteProp<
  {
    ImagemAtividade: {
      exerciseId: string;
      materiaId: string;
      activityIdsInSequence: string[];
    };
  },
  "ImagemAtividade"
>;

interface CustomModalContentData {
  title: string;
  message: string;
  type: "success" | "error" | "info" | "confirm";
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ImagemAtividadeScreen: React.FC = () => {
  const route = useRoute<ImagemAtividadeScreenRouteProp>();
  const { exerciseId, materiaId, activityIdsInSequence } = route.params;
  const navigation = useNavigation();

  const exercise: ImageExerciseData | undefined =
    findImageExerciseById(exerciseId);

  const [selectedOption, setSelectedOption] =
    useState<ImageExerciseOption | null>(null);
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

  const handleOptionSelect = (option: ImageExerciseOption) => {
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

    const isCorrect = selectedOption.id === exercise.correctAnswerId;

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
            navigation.replace("ImagemAtividadeScreen", {
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
            navigation.popToTop();
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
        confirmText: "Tentar de novo",
      });
    }
  };

  if (!exercise) {
    return (
      <Container style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00C2A1" />
        <Text style={{ marginTop: 10 }}>Carregando exercício de imagem...</Text>
        <Text style={{ fontSize: 12, color: "#FF000080" }}>
          ID: {exerciseId}
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderAtividades iconBack={true} onPress={handleBack} />

      <MainWrapper>
        <StatusBar style="dark" />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: RFValue(20),
          }}
        >
          <ExerciseTitle>{exercise.title}</ExerciseTitle>

          {exercise.questionText && (
            <InstructionText>{exercise.questionText}</InstructionText>
          )}
          {exercise.questionImage && (
            <QuestionImage source={exercise.questionImage} />
          )}

          <InstructionText>{exercise.instruction}</InstructionText>

          <ImageOptionsContainer>
            {exercise.options.map((option) => (
              <ImageOptionButton
                key={option.id}
                onPress={() => handleOptionSelect(option)}
                isSelected={selectedOption?.id === option.id}
              >
                {option.text && ( // Garante que o texto sempre seja renderizado (se existir)
                  <ImageOptionText
                    isSelected={selectedOption?.id === option.id}
                  >
                    {option.text}
                  </ImageOptionText>
                )}
              </ImageOptionButton>
            ))}
          </ImageOptionsContainer>
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

export default ImagemAtividadeScreen;

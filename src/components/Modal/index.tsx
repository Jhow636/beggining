// components/Modal/Modal.tsx
import React from "react";
import {
  Modal as RNModal, // Importe o Modal do React Native e renomeie para evitar conflito
  View, // Necessário para envolver o conteúdo
} from "react-native";
import { useModal } from "@contexts/ModalProvider"; // Ou o caminho correto que você está usando
import {
  ModalOverlay,
  CustomModalContent,
  ModalTitle,
  ModalMessage,
  ModalButtonContainer,
  ModalActionButton,
  ModalButtonText,
} from "./styles";

const Modal: React.FC = () => {
  const { modalState, hideModal } = useModal();

  // Determine o título do modal com base no tipo
  let title = "";
  switch (modalState.type) {
    case "success":
      title = "Sucesso!";
      break;
    case "error":
      title = "Erro!";
      break;
    case "warning":
      title = "Atenção!";
      break;
    case "confirm":
      title = "Confirmação";
      break;
    case "info":
    default:
      title = "Informação";
      break;
  }

  const handleConfirm = () => {
    if (modalState.onConfirm) {
      modalState.onConfirm();
    }
    hideModal();
  };

  const handleCancel = () => {
    if (modalState.onCancel) {
      modalState.onCancel();
    }
    hideModal();
  };

  return (
    <RNModal // Use o componente Modal do React Native
      transparent={true} // Torna o fundo do modal transparente para que o overlay seja visível
      visible={modalState.isOpen} // Controla a visibilidade com base no estado do contexto
      onRequestClose={hideModal} // Permite fechar o modal ao pressionar o botão de voltar no Android
      animationType="fade" // Adiciona uma animação de fade ao abrir/fechar
    >
      <ModalOverlay>
        <CustomModalContent type={modalState.type}>
          <ModalTitle>{title}</ModalTitle>
          <ModalMessage>{modalState.message}</ModalMessage>
          <ModalButtonContainer>
            {modalState.onCancel && (
              <ModalActionButton
                buttonType="cancel"
                modalType={modalState.type}
                onPress={handleCancel}
              >
                <ModalButtonText buttonType="cancel">Cancelar</ModalButtonText>
              </ModalActionButton>
            )}
            <ModalActionButton
              buttonType="confirm"
              modalType={modalState.type}
              onPress={modalState.onConfirm ? handleConfirm : hideModal}
            >
              <ModalButtonText>
                {modalState.onConfirm ? "Confirmar" : "Ok"}
              </ModalButtonText>
            </ModalActionButton>
          </ModalButtonContainer>
        </CustomModalContent>
      </ModalOverlay>
    </RNModal>
  );
};

export default Modal;

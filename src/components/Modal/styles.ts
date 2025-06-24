// components/Modal/styles.ts
import styled from "styled-components/native";
import { DefaultTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

// Importe as interfaces necessárias se não estiverem globalmente definidas
interface CustomModalContentProps {
  type: "success" | "error" | "info" | "warning" | "confirm";
}

// O Container principal do modal que ocupa toda a tela e centraliza o conteúdo
export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
  justify-content: center;
  align-items: center;
  padding: ${RFValue(
    20
  )}px; /* Padding para evitar que o modal encoste nas bordas */
`;

// Conteúdo do modal (a "caixa" central)
export const CustomModalContent = styled.View<CustomModalContentProps>`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  border-radius: ${RFValue(12)}px;
  padding: ${RFValue(25)}px;
  width: 85%; /* Você já tinha isso */
  align-items: center;
  /* Cor da borda ou sombra baseada no tipo de modal */
  border-width: 2px;
  border-color: ${({
    theme,
    type,
  }: {
    theme: DefaultTheme;
    type: CustomModalContentProps["type"];
  }) => {
    switch (type) {
      case "success":
        // Supondo que você tenha COLORS.SUCCESS no seu tema
        return "green";
      case "error":
        return theme.COLORS.RED;
      case "info":
        return theme.COLORS.PRIMARY;
      case "confirm":
        return theme.COLORS.TERTIARY; // Usando TERTIARY como exemplo para confirm
      case "warning": // Adicionando caso para warning
        return "orange"; // Supondo COLORS.YELLOW
      default:
        return theme.COLORS.LIGHTGRAY;
    }
  }};
`;

export const ModalTitle = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.PROMPT.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.BLACK};
  margin-bottom: ${RFValue(10)}px;
  text-align: center;
`;

export const ModalMessage = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.PROMPT.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.DARKGRAY};
  text-align: center;
  line-height: ${RFValue(24)}px;
  margin-bottom: ${RFValue(20)}px;
`;

export const ModalButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

interface ModalActionButtonProps {
  buttonType: "confirm" | "cancel"; // Use um nome diferente para evitar conflito com 'type' do modal
  modalType: CustomModalContentProps["type"]; // O tipo do modal para determinar a cor
}

export const ModalActionButton = styled.TouchableOpacity<ModalActionButtonProps>`
  background-color: ${({
    theme,
    buttonType,
    modalType,
  }: {
    theme: DefaultTheme;
    buttonType: ModalActionButtonProps["buttonType"];
    modalType: ModalActionButtonProps["modalType"];
  }) => {
    if (buttonType === "cancel") {
      return theme.COLORS.LIGHTGRAY;
    }
    // Lógica para o botão de confirmação baseada no tipo do modal
    switch (modalType) {
      case "success":
        return "green";
      case "error":
        return theme.COLORS.RED;
      case "info":
        return theme.COLORS.PRIMARY;
      case "confirm":
        return theme.COLORS.PRIMARY;
      case "warning":
        return "orange";
      default:
        return theme.COLORS.PRIMARY;
    }
  }};
  padding: ${RFValue(12)}px;
  border-radius: ${RFValue(8)}px;
  min-width: ${RFValue(100)}px;
  align-items: center;
  flex: 1; /* Para os botões preencherem o espaço disponível */
  margin: 0 ${RFValue(5)}px; /* Espaçamento entre os botões */
`;

export const ModalButtonText = styled.Text<{ buttonType?: "cancel" }>`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.PROMPT.BOLD};
  color: ${({
    theme,
    buttonType,
  }: {
    theme: DefaultTheme;
    buttonType?: "cancel";
  }) => (buttonType === "cancel" ? theme.COLORS.DARKGRAY : theme.COLORS.WHITE)};
`;

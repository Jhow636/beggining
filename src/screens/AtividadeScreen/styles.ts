import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

// Assuma que a tipagem do seu DefaultTheme está disponível

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
`;

export const ExerciseTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.PROMPT.BOLD}; /* Use a fonte mais adequada para títulos */
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.BLACK};
  margin-bottom: ${RFValue(15)}px;
`;

export const QuestionText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.PROMPT.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.DARKGRAY}; /* Cor mais escura para o texto da pergunta */
  line-height: ${RFValue(28)}px; /* Espaçamento entre linhas */
  margin-bottom: ${RFValue(5)}px; /* Espaço entre as partes da pergunta */
`;

export const InstructionText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.PROMPT.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.DARKGRAY};
  margin-top: ${RFValue(30)}px; /* Espaço acima da instrução */
  margin-bottom: ${RFValue(20)}px; /* Espaço abaixo da instrução */
`;

export const OptionsContainer = styled.View`
  margin-bottom: ${RFValue(30)}px; /* Espaço entre as opções e o botão */
`;

interface OptionButtonProps {
  isSelected: boolean;
}

export const OptionButton = styled.TouchableOpacity<OptionButtonProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${({
    theme,
    isSelected,
  }: {
    theme: DefaultTheme;
    isSelected: boolean;
  }) =>
    isSelected
      ? theme.COLORS.SECONDARY + "30"
      : theme.COLORS.WHITE}; /* Um pouco de opacidade para a cor secundária */
  border-width: 2px;
  border-color: ${({
    theme,
    isSelected,
  }: {
    theme: DefaultTheme;
    isSelected: boolean;
  }) => (isSelected ? theme.COLORS.SECONDARY : theme.COLORS.LIGHTGRAY)};
  border-radius: ${RFValue(10)}px;
  padding: ${RFValue(15)}px;
  margin-bottom: ${RFValue(10)}px;
`;

export const OptionText = styled.Text<OptionButtonProps>`
  font-size: ${RFValue(16)}px;
  font-family: ${({
    theme,
    isSelected,
  }: {
    theme: DefaultTheme;
    isSelected: boolean;
  }) => (isSelected ? theme.FONTS.PROMPT.BOLD : theme.FONTS.PROMPT.REGULAR)};
  color: ${({
    theme,
    isSelected,
  }: {
    theme: DefaultTheme;
    isSelected: boolean;
  }) =>
    isSelected
      ? theme.COLORS.TERTIARY
      : theme.COLORS.DARKGRAY}; /* Cor mais escura para texto selecionado */
  margin-left: ${RFValue(
    10
  )}px; /* Espaço para simular um radio button (se adicionar) */
`;

export const ConfirmButtonContainer = styled.View`
  padding-bottom: ${RFValue(20)}px; /* Espaço abaixo do botão */
  padding: ${RFValue(
    20
  )}px; /* Alinha com o padding do container se o botão não for full width */
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE}; /* Garante que o fundo seja branco abaixo do scroll */
`;

export const MainWrapper = styled.View`
  padding: ${RFValue(20)}px; /* Espaçamento interno */
  padding-top: ${RFValue(40)}px; /* Espaço do topo */
  flex: 1; /* Permite que o conteúdo ocupe todo o espaço disponível */
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE}; /* Fundo branco para o conteúdo principal */
  justify-content: center; /* Alinha o conteúdo no topo */
  align-items: center; /* Centraliza o conteúdo horizontalmente */
  border-top-left-radius: ${RFValue(20)}px;
  border-top-right-radius: ${RFValue(20)}px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6); /* Overlay escuro */
`;

interface CustomModalContentProps {
  type: "success" | "error" | "info" | "confirm";
}

export const CustomModalContent = styled.View<CustomModalContentProps>`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  border-radius: ${RFValue(12)}px;
  padding: ${RFValue(25)}px;
  width: 85%;
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
        return "green"; // Adicione SUCCESS ao seu tema se não tiver
      case "error":
        return theme.COLORS.RED;
      case "info":
        return theme.COLORS.PRIMARY;
      case "confirm":
        return theme.COLORS.TERTIARY;
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
  type: CustomModalContentProps["type"]; // Tipo do botão de ação
}

export const ModalActionButton = styled.TouchableOpacity<ModalActionButtonProps>`
  background-color: ${({
    theme,
    type,
  }: {
    theme: DefaultTheme;
    type: ModalActionButtonProps["type"];
  }) => {
    switch (type) {
      case "success":
        return theme.COLORS.SUCCESS || "green";
      case "error":
        return theme.COLORS.RED;
      case "info":
        return theme.COLORS.PRIMARY;
      case "confirm":
        return theme.COLORS.PRIMARY; // Confirm pode ser a cor principal
      default:
        return theme.COLORS.PRIMARY;
    }
  }};
  padding: ${RFValue(12)}px;
  border-radius: ${RFValue(8)}px;
  min-width: ${RFValue(100)}px;
  align-items: center;
`;

export const ModalCancelButton = styled.TouchableOpacity`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.LIGHTGRAY};
  padding: ${RFValue(12)}px;
  border-radius: ${RFValue(8)}px;
  min-width: ${RFValue(100)}px;
  align-items: center;
  margin-right: ${RFValue(10)}px; /* Espaço entre os botões */
`;

export const ModalButtonText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.PROMPT.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
`;

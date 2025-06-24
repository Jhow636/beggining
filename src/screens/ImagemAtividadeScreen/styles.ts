import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
`;

export const MainWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  border-top-left-radius: ${RFValue(20)}px;
  border-top-right-radius: ${RFValue(20)}px;
`;

export const ExerciseTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.PROMPT.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.BLACK};
  margin-bottom: ${RFValue(15)}px;
  padding: ${RFValue(20)}px;
`;

export const InstructionText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.PROMPT.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.DARKGRAY};
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(20)}px;
  padding: ${RFValue(20)}px;
`;

export const QuestionImage = styled.Image`
  width: 100%;

  margin: ${RFValue(20)}px;
  align-self: center;
`;

export const ImageOptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface ImageOptionButtonProps {
  isSelected: boolean;
}

export const ImageOptionButton = styled.TouchableOpacity<ImageOptionButtonProps>`
  width: ${RFValue(140)}px;
  height: ${RFValue(80)}px;
  border-width: 2px;
  border-color: ${({
    theme,
    isSelected,
  }: {
    theme: DefaultTheme;
    isSelected: boolean;
  }) => (isSelected ? theme.COLORS.PRIMARY : theme.COLORS.LIGHTGRAY)};
  border-radius: ${RFValue(10)}px;
  margin: ${RFValue(5)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({
    theme,
    isSelected,
  }: {
    theme: DefaultTheme;
    isSelected: boolean;
  }) => (isSelected ? theme.COLORS.PRIMARY + "20" : theme.COLORS.WHITE)};
  overflow: hidden;
`;

export const ImageOptionText = styled.Text<ImageOptionButtonProps>`
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
  }) => (isSelected ? theme.COLORS.TERTIARY : theme.COLORS.DARKGRAY)};
  text-align: center;
  padding: ${RFValue(5)}px;
`;

export const ConfirmButtonContainer = styled.View`
  padding-bottom: ${RFValue(20)}px;
  padding: ${RFValue(20)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  justify-content: center;
  align-items: center;
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

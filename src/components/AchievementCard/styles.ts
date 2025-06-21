// src/components/AchievementCard/styles.ts
import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface AchievementCardContainerProps {
  isEarned: boolean;
}

// AchievementCardContainer agora é um View que será envolto por um TouchableOpacity
export const AchievementCardContainer = styled.View<AchievementCardContainerProps>`
  width: ${RFValue(90)}px;
  height: ${RFValue(90)}px;
  border-radius: ${RFValue(45)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.GRAY5};
  justify-content: center;
  align-items: center;
  margin: ${RFValue(8)}px;
  overflow: hidden;
  border-width: 2px;
  border-color: ${({
    theme,
    isEarned,
  }: {
    theme: DefaultTheme;
    isEarned: boolean;
  }) => (isEarned ? theme.COLORS.PRIMARY : theme.COLORS.GRAY3)};
  ${({ isEarned }) =>
    isEarned &&
    `
    shadow-color: #000;
    shadow-offset: 0px ${RFValue(2)}px;
    shadow-opacity: 0.2;
    shadow-radius: ${RFValue(3.84)}px;
    elevation: ${RFValue(5)};
  `}
`;

export const AchievementImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
  position: absolute;
`;

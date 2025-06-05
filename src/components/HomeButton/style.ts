import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface ButtonProps {
  variant?: "primary" | "secondary";
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  width: ${RFValue(307)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(30)}px;
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(20)}px;

  background-color: ${({ theme, variant = "primary" }) =>
    variant === "primary" ? theme.COLORS.SECONDARY : theme.COLORS.LIGHTGRAY};
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-family: ${({ theme }) => theme.FONTS.PROMPT.BOLD};
  font-size: ${RFValue(20)}px;

  color: ${({ theme, variant = "primary" }) =>
    variant === "primary" ? theme.COLORS.WHITE : theme.COLORS.SECONDARY};
`;

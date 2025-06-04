import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled.TouchableOpacity`
  width: ${RFValue(219)}px;
  height: ${RFValue(31)}px;
  border-radius: ${RFValue(20)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
  margin-top: ${RFValue(10)}px;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
  font-size: ${RFValue(15)}px;
`;

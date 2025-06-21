import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled.TouchableOpacity`
  width: ${RFValue(287)}px;
  height: ${RFValue(35)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.GRAY6};
  border-radius: ${RFValue(15)}px;
  margin-bottom: ${RFValue(10)}px;
  justify-content: center;
`;

export const Text = styled.Text`
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
  margin-left: ${RFValue(10)}px;
`;

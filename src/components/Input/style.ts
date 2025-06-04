import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ContainerInput = styled.View`
  width: 100%;
`;

export const CustomInput = styled.TextInput`
  width: ${RFValue(314)}px;
  height: ${RFValue(37)}px;
  border-radius: ${RFValue(20)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.GRAY3};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY4};
  padding: 0 ${RFValue(16)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
`;

export const ErrorText = styled.Text`
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  font-size: ${RFValue(12)}px;
  margin-top: ${RFValue(2)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.RED};
`;

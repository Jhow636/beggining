import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Tittle = styled.Text`
  padding-top: ${RFValue(32)}px;
  font-size: ${RFValue(28)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY1};
  margin-bottom: ${RFValue(32)}px;
`;

export const ForgetPassword = styled.TouchableOpacity`
  margin-top: ${RFValue(16)}px;
`;

export const ForgetPasswordText = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
  text-align: center;
  margin-bottom: ${RFValue(16)}px;
`;

export const PrivacyPolicy = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY2};
  text-align: center;
  margin-top: ${RFValue(16)}px;
  padding: 0 ${RFValue(16)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const Strong = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

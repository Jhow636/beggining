import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import Checkbox from "expo-checkbox";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.DARKGRAY};
`;

export const Title = styled.Text`
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY1};
  text-align: center;
`;

export const Footer = styled.View`
  flex-direction: row;
  padding: 0 ${RFValue(40)}px;
  margin-top: ${RFValue(10)}px;
`;

export const Description = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  text-align: center;
`;

export const CheckBox = styled(Checkbox).attrs()`
  margin-top: ${RFValue(20)}px;
  margin-right: ${RFValue(10)}px;
`;

export const Strong = styled.Text`
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.EXTRABOLD};
`;

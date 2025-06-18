import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import Checkbox from "expo-checkbox";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.DARKGRAY};
`;

export const Footer = styled.View`
  flex: 1;
  justify-content: flex-end;
  flex-direction: row;
  margin-bottom: ${RFValue(30)}px;
`;

export const Description = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  text-align: center;
  padding: 0 ${RFValue(16)}px;
`;

export const CheckBox = styled(Checkbox).attrs()`
  margin-top: ${RFValue(20)}px;
  margin-right: ${RFValue(10)}px;
`;

export const Strong = styled.Text`
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.EXTRABOLD};
`;

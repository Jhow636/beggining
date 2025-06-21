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
  margin-top: ${RFValue(-20)}px;
  padding-top: ${RFValue(20)}px;
`;

export const Form = styled.View`
  flex: 1;
  padding: ${RFValue(20)}px;
  margin-top: ${RFValue(20)}px;
`;

export const ContainerButton = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
  margin-bottom: ${RFValue(10)}px;
`;

import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
  margin-bottom: ${RFValue(10)}px;
`;

export const ContainerButtons = styled.View`
  width: 100%;

  margin-top: ${RFValue(20)}px;
  justify-content: center;
  align-items: center;
`;

export const InputPassword = styled.View`
  width: ${RFValue(314)}px;
  height: ${RFValue(37)}px;
  border-radius: ${RFValue(20)}px;
  background-color: ${({ theme }) => theme.COLORS.GRAY6};
  color: ${({ theme }) => theme.COLORS.GRAY4};
  padding: 0 ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.FONTS.POPPINS.REGULAR};
  justify-content: center;
`;

export const TextInputPassword = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.POPPINS.REGULAR};
  font-size: ${RFValue(12)}px;
  margin-top: ${RFValue(2)}px;
  color: ${({ theme }) => theme.COLORS.DARKGRAY};
`;

import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.DARKGRAY};
`;

export const ContainerButton = styled.View`
  margin-bottom: ${RFValue(50)}px;
`;

export const HeaderTitle = styled.View`
  margin-top: ${RFValue(25)}px;
`;

export const Text = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
  text-align: center;
`;

export const Description = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 ${RFValue(30)}px;
`;

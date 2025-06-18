import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.DARKGRAY};
`;

export const ContainerInput = styled.View`
  margin-top: ${RFValue(32)}px;
  justify-content: center;
  gap: ${RFValue(16)}px;
  align-items: center;
`;

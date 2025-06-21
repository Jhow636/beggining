import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
  flex-direction: row;
  height: ${RFValue(60)}px;
  align-items: center;
  justify-content: center;
`;

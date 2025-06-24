import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
  flex-direction: row;
  height: ${RFValue(60)}px;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${RFValue(16)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
`;

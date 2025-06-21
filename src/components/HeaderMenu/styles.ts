import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
export const Container = styled.View`
  width: 100%;
  height: ${RFValue(180)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: ${RFValue(10)}px;
`;

export const Wrapper = styled.View`
  align-items: center;
  width: 100%;
`;

export const Title = styled.Text`
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
  margin-top: ${RFValue(-40)}px;
`;

export const Image = styled.Image``;

import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.PRIMARY};
  align-items: center;
`;

export const Content = styled.View`
  margin-top: ${RFValue(100)}px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  width: ${RFValue(112)}px;
  height: ${RFValue(103)}px;
  margin-bottom: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(64)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.STICK_NO_BILLS.EXTRA_BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.SECONDARY};
`;

export const Description = styled.Text`
  font-size: ${RFValue(24)}px;
  text-align: center;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.PROMPT.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
`;

export const ButtonContainer = styled.View`
  margin-top: ${RFValue(120)}px;
`;

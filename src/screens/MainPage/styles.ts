import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
`;

export const Wrapper = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: ${RFValue(28)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY5};
  margin-top: 20px;
`;

export const MainWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  padding: 20px;
`;

export const CardAssistindo = styled.View`
  width: 150px;
  height: 200px;

  border-radius: 10px;
`;

export const Text = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  margin-right: 25px;
`;

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
  padding: ${RFValue(20)}px;
`;

export const MainTitle = styled.Text`
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.SECONDARY};
  margin-bottom: ${RFValue(10)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
  margin-bottom: ${RFValue(10)}px;
`;
export const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  text-align: center;
`;

export const Wrapper = styled.View``;

export const Card = styled.View`
  height: ${RFValue(60)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
  border-radius: ${RFValue(10)}px;
  justify-content: center;
  align-items: center;
`;
export const Text = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
  text-align: center;
`;

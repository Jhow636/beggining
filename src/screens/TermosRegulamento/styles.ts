import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
`;

export const MainWrapper = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  border-radius: ${RFValue(10)}px;
  padding: ${RFValue(20)}px;
  margin-top: ${RFValue(10)}px;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(60)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
  padding-top: ${RFValue(20)}px;
  padding-left: ${RFValue(35)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(26)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.SECONDARY};
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
`;

export const Description = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY4};
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
`;

export const Text = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.BLACK};
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  margin: ${RFValue(10)}px;
  line-height: ${RFValue(20)}px;
`;

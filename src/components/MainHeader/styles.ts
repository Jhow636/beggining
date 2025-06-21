import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
  border-bottom-left-radius: ${RFValue(20)}px;
  border-bottom-right-radius: ${RFValue(20)}px;
  flex-direction: row;
  height: ${RFValue(120)}px;
  align-items: flex-end;
  justify-content: flex-start;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  border-radius: ${RFValue(10)}px;
  width: ${RFValue(99)}px;
  height: ${RFValue(27)}px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: ${RFValue(4)}px ${RFValue(8)}px;
`;

export const UserName = styled.Text`
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
  margin-left: ${RFValue(20)}px;
`;

export const Image = styled.Image`
  width: ${RFValue(24)}px;
  height: ${RFValue(24)}px;
`;

export const Score = styled.Text``;

export const MainWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(8)}px;
  padding-left: ${RFValue(10)}px;
  margin-bottom: ${RFValue(20)}px;
`;

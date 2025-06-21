import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  border-radius: 15px;
  margin-bottom: ${RFValue(12)}px;
  overflow: hidden;
  border-width: 2px;
  border-color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY4};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const QuestionContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${RFValue(16)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  min-height: ${RFValue(50)}px;
`;

export const QuestionText = styled.Text`
  flex: 1;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.BLACK};
  margin-right: ${RFValue(10)}px;
`;

export const AnswerText = styled.Text`
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
  padding-top: ${RFValue(10)}px;
  padding-bottom: ${RFValue(16)}px;
  line-height: ${RFValue(20)}px;
`;

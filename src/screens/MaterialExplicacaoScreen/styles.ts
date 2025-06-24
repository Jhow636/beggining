import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SECONDARY};
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.BLACK};
  margin-bottom: ${RFValue(15)}px;
  text-align: center; /* Centraliza o título da matéria */
`;
export const MainWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  border-top-left-radius: ${RFValue(20)}px;
  border-top-right-radius: ${RFValue(20)}px;
`;

export const ExplanationContentText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.DARKGRAY};
  line-height: ${RFValue(
    26
  )}px; /* Espaçamento entre linhas para melhor leitura */
  margin-bottom: ${RFValue(10)}px; /* Espaçamento no final do conteúdo */
`;

// NOVOS ESTILOS PARA TIPOS DE BLOCO
export const HeadingText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.PRIMARY}; /* Cor primária para títulos de seção */
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(10)}px;
`;

export const ExampleText = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.DARKGRAY};
  margin-left: ${RFValue(10)}px; /* Indentação para exemplos */
  line-height: ${RFValue(24)}px;
`;

export const NoteText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
  font-style: italic;
  margin-top: ${RFValue(5)}px;
  margin-bottom: ${RFValue(10)}px;
  padding: ${RFValue(5)}px;
  border-left-width: 3px;
  border-left-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.LIGHTGRAY};
`;

export const StructureText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.TERTIARY ||
    theme.COLORS.PRIMARY}; /* Usa TERTIARY se definido, senão PRIMARY */
  margin: ${RFValue(10)}px;
  text-align: center;
  padding: ${RFValue(8)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.LIGHTGRAY + "40"}; /* Fundo levemente transparente */
  border-radius: ${RFValue(5)}px;
`;

export const ListItemText = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.DARKGRAY};
  margin-left: ${RFValue(15)}px; /* Indentação para itens de lista */
  margin-bottom: ${RFValue(5)}px;
`;

// Estilos para Tabela
export const TableContainer = styled.View`
  border-width: 1px;
  border-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.LIGHTGRAY};
  margin: ${RFValue(15)}px;
  border-radius: ${RFValue(5)}px;
  overflow: hidden; /* Garante que bordas internas fiquem dentro do radius */
`;

export const TableRow = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.LIGHTGRAY};
  &:last-child {
    border-bottom-width: 0; /* Remove a borda da última linha */
  }
`;

export const TableHeader = styled.Text`
  flex: 1; /* Distribui as colunas igualmente */
  padding: ${RFValue(10)}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.GRAY5}; /* Fundo de cabeçalho da tabela */
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.BOLD};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
  text-align: center;
  border-right-width: 1px;
  border-right-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.LIGHTGRAY};
  &:last-child {
    border-right-width: 0;
  }
`;

export const TableCell = styled.Text`
  flex: 1; /* Distribui as colunas igualmente */
  padding: ${RFValue(10)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINS.REGULAR};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.DARKGRAY};
  text-align: center;
  border-right-width: 1px;
  border-right-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.LIGHTGRAY};
  &:last-child {
    border-right-width: 0;
  }
`;

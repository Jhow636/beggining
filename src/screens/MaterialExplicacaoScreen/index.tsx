import React from "react";
import { ScrollView, Text, ActivityIndicator, View } from "react-native"; // Importe View para renderizar blocos
import { StatusBar } from "expo-status-bar";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

// Importe os estilos para os diferentes tipos de blocos de conteúdo
import {
  Container,
  Title,
  ExplanationContentText,
  HeadingText,
  ExampleText,
  NoteText,
  StructureText,
  ListItemText,
  TableContainer,
  TableRow,
  TableHeader,
  TableCell,
  MainWrapper,
} from "./styles"; // Seus estilos para MateriaExplicacaoScreen

// !!! CORREÇÃO AQUI: Importe os dados de explicação estruturados
import {
  ALL_EXPLANATIONS,
  findExplanationById,
  ExplanationContent,
  ExplanationContentBlock,
} from "@data/materialContent"; // Ajuste o caminho
import HeaderAtividades from "@components/HeaderAtividades";

// Tipagem dos parâmetros da rota
type MateriaExplicacaoScreenRouteProp = RouteProp<
  { MateriaExplicacao: { explanationId: string; materiaTitle: string } },
  "MateriaExplicacao"
>;

// Remova DUMMY_EXPLANATIONS pois agora usaremos ALL_EXPLANATIONS
// const DUMMY_EXPLANATIONS: { [key: string]: string } = { ... };

const MateriaExplicacaoScreen: React.FC = () => {
  const route = useRoute<MateriaExplicacaoScreenRouteProp>();
  const { explanationId, materiaTitle } = route.params;
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack(); // Volta para a tela anterior
  };

  // !!! CORREÇÃO AQUI: Busque o objeto ExplanationContent completo
  const explanationData: ExplanationContent | undefined =
    findExplanationById(explanationId);

  // Se a explicação não for encontrada, exibe um loading/erro
  if (!explanationData) {
    return (
      <Container style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00C2A1" />
        <Text style={{ marginTop: 10 }}>Carregando explicação...</Text>
        {/* Adicione um log ou mensagem mais específica se o ID não for encontrado */}
        <Text style={{ marginTop: 5, fontSize: RFValue(12), color: "#FF0000" }}>
          Explicação com ID '{explanationId}' não encontrada.
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderAtividades
        iconBack={true}
        onPress={handleBackPress}
        title={materiaTitle}
      />
      <MainWrapper>
        <StatusBar style="dark" />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: RFValue(20) }}
        >
          {/* Use o título da explicação que vem dos dados, que pode ser mais específico */}
          <Title>{explanationData.title}</Title>

          {/* !!! CORREÇÃO AQUI: Itere sobre os blocos de conteúdo para renderizá-los */}
          {explanationData.content.map(
            (block: ExplanationContentBlock, index: number) => {
              if (block.heading) {
                return <HeadingText key={index}>{block.heading}</HeadingText>;
              }
              if (block.text) {
                return (
                  <ExplanationContentText key={index}>
                    {block.text}
                  </ExplanationContentText>
                );
              }
              if (block.examples) {
                return (
                  <View key={index} style={{ marginBottom: RFValue(10) }}>
                    {block.examples.map((example, exIndex) => (
                      <ExampleText key={exIndex}>• {example}</ExampleText>
                    ))}
                  </View>
                );
              }
              if (block.table) {
                return (
                  <TableContainer key={index}>
                    <TableRow>
                      {block.table.headers.map((header, hIndex) => (
                        <TableHeader key={hIndex}>{header}</TableHeader>
                      ))}
                    </TableRow>
                    {block.table.rows.map((row, rIndex) => (
                      <TableRow key={rIndex}>
                        {row.map((cell, cIndex) => (
                          <TableCell key={cIndex}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableContainer>
                );
              }
              if (block.note) {
                return <NoteText key={index}>Nota: {block.note}</NoteText>;
              }
              if (block.structure) {
                return (
                  <StructureText key={index}>{block.structure}</StructureText>
                );
              }
              if (block.list) {
                return (
                  <View key={index} style={{ marginBottom: RFValue(10) }}>
                    {block.list.map((item, itemIndex) => (
                      <ListItemText key={itemIndex}>• {item}</ListItemText>
                    ))}
                  </View>
                );
              }
              return null; // Caso um tipo de bloco não seja reconhecido
            }
          )}
        </ScrollView>
      </MainWrapper>
    </Container>
  );
};

export default MateriaExplicacaoScreen;

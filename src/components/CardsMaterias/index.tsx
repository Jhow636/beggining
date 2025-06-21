import React from "react";
import { FlatList, View } from "react-native"; // FlatList não precisa ser importado aqui se ListaMaterias já é um styled(FlatList)
import CardMateria from "@components/CardMateria";
// Removidas as importações de useNavigation, Alert, ALL_EXERCISES, findMateriaContentById
// A lógica de navegação e validação será passada como prop
import { ListaMaterias } from "./styles"; // Assumindo que ListaMaterias é um styled(FlatList)

// Importe os dados completos das matérias
import {
  ALL_MATERIAS_CONTENT,
  MateriaContentItem,
} from "../../data/materiasContent";

// A interface Materia agora usa a MateriaContentItem
interface Materia extends MateriaContentItem {}

// Use os dados completos das matérias como DUMMY_DATA
const DUMMY_DATA: Materia[] = ALL_MATERIAS_CONTENT;

// Nova interface de props para CardsMaterias
interface CardsMateriasProps {
  onCardPress: (materia: Materia) => void; // Função que será chamada ao clicar em um card
}

const CardsMaterias: React.FC<CardsMateriasProps> = ({ onCardPress }) => {
  // Recebe onCardPress como prop
  // A lógica de handlePressCard foi movida para o componente pai que usará CardsMaterias
  // e será passada via prop onCardPress

  // Função para renderizar cada item na FlatList
  const renderItem = ({ item }: { item: Materia }) => (
    <CardMateria
      title={item.title}
      onPress={() => onCardPress(item)} // Chama a prop onCardPress
    />
  );

  return (
    <ListaMaterias
      data={DUMMY_DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CardsMaterias;

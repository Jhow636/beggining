import React from "react";
import { ListaMaterias } from "./styles";
import CardMateria from "@components/CardMateria";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

interface Materia {
  id: string;
  title: string;
}

const DUMMY_DATA: Materia[] = [
  { id: "1", title: "Básico - 1" },
  { id: "2", title: "Básico - 2" },
  { id: "3", title: "Intermediário - 1" },
  { id: "4", title: "Intermediário - 2" },
  { id: "5", title: "Avançado - 1" }, // Ajustado para ser como na imagem
  { id: "6", title: "Avançado - 2" },
];

const CardsMaterias: React.FC = () => {
  const navigation = useNavigation(); // Hook para navegação

  // Função que será chamada quando um card for pressionado
  const handlePressCard = (materia: Materia) => {
    console.log("Card pressionado:", materia.title);
    // Exemplo de navegação para uma tela 'MateriaDetalhe'
    // Certifique-se de que 'MateriaDetalhe' esteja configurada no seu Stack Navigator
    navigation.navigate("MateriaDetalhe", {
      materiaId: materia.id,
      materiaTitle: materia.title,
    });
  };

  // Função para renderizar cada item na FlatList
  const renderItem = ({ item }: { item: Materia }) => (
    <CardMateria
      title={item.title}
      onPress={() => handlePressCard(item)} // Passa a função de onPress
    />
  );

  return (
    <ListaMaterias
      data={DUMMY_DATA} // Seus dados
      renderItem={renderItem} // A função para renderizar cada item
      keyExtractor={(item) => item.id} // Uma chave única para cada item // Estilo para o conteúdo interno (espaçamento)
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // Opcional: Adiciona espaçamento entre os cards
    />
  );
};

export default CardsMaterias;

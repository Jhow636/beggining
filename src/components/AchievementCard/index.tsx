// src/components/AchievementCard/index.tsx
import React from "react";
import { ImageSourcePropType, TouchableOpacity } from "react-native"; // Importe TouchableOpacity
// Removidos Ionicons, LockedOverlay, LockedIcon (já foram tratados)
import { AchievementCardContainer, AchievementImage } from "./styles"; // Seus estilos para o card

interface AchievementCardProps {
  iconUrl: ImageSourcePropType;
  isEarned: boolean;
  // NOVAS PROPS para passar os detalhes da conquista
  name: string; // Nome da conquista
  description: string; // Descrição da conquista
  // NOVA PROP para o manipulador de clique
  onPress: (achievement: {
    id: string;
    name: string;
    description: string;
    isEarned: boolean;
  }) => void; // Função chamada ao clicar
  id: string; // ID da conquista, para passar de volta no onPress
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  iconUrl,
  isEarned,
  name, // Destrutura o nome
  description, // Destrutura a descrição
  onPress, // Destrutura o onPress
  id, // Destrutura o id
}) => {
  return (
    // AchievementCardContainer agora será um TouchableOpacity.
    // O estilo condicional da borda deve ser passado para o componente estilizado.
    <TouchableOpacity
      onPress={() => onPress({ id, name, description, isEarned })} // Chama a função onPress com os detalhes da conquista
      activeOpacity={0.7} // Opacidade ao tocar
    >
      <AchievementCardContainer isEarned={isEarned}>
        <AchievementImage source={iconUrl} />
      </AchievementCardContainer>
    </TouchableOpacity>
  );
};

export default AchievementCard;

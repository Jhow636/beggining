import React, { useState } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  // Removida a importação de ScrollView daqui, pois MainWrapper já é uma
  Modal,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "@contexts/authContext";
import { StatusBar } from "expo-status-bar";
import AchievementCard from "@components/AchievementCard";
import { RFValue } from "react-native-responsive-fontsize";

import {
  Container,
  SectionTitle,
  AchievementsGrid,
  RankingItem,
  RankIcon,
  RankPlaceholder,
  MainWrapper, // MainWrapper já é um ScrollView
  LoadingContainer,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalDescription,
} from "./styles";
import MainHeader from "@components/MainHeader";
import { Ionicons } from "@expo/vector-icons";

const achievementIconsMap = {
  "1": {
    locked: require("../../assets/images/conquista1locked.png"),
    unlocked: require("../../assets/images/conquista1unlocked.png"),
  },
  "2": {
    locked: require("../../assets/images/conquista2locked.png"),
    unlocked: require("../../assets/images/conquista2unlocked.png"),
  },
  "3": {
    locked: require("../../assets/images/conquista3locked.png"),
    unlocked: require("../../assets/images/conquista3unlocked.png"),
  },
  "4": {
    locked: require("../../assets/images/conquista4locked.png"),
    unlocked: require("../../assets/images/conquista4unlocked.png"),
  },
  "5": {
    locked: require("../../assets/images/conquista5locked.png"),
    unlocked: require("../../assets/images/conquista5unlocked.png"),
  },
  "6": {
    locked: require("../../assets/images/conquista6locked.png"),
    unlocked: require("../../assets/images/conquista6unlocked.png"),
  },
};

interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  type: string;
  criteria: any;
}

const Conquistas: React.FC = () => {
  const { userProfile, allAchievementDefinitions, loading } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAchievement, setSelectedAchievement] =
    useState<AchievementDefinition | null>(null);

  const handleAchievementPress = (achievement: {
    id: string;
    name: string;
    description: string;
    isEarned: boolean;
  }) => {
    setSelectedAchievement(achievement as AchievementDefinition);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAchievement(null);
  };

  const rankingData = [
    { id: "1", rank: "1º", name: "Juliano Alves", points: "245 pts" },
    { id: "2", rank: "2º", name: "Maria Silva", points: "200 pts" },
    { id: "3", rank: "3º", name: "João Pereira", points: "180 pts" },
  ];

  return (
    <Container>
      <StatusBar style="light" />
      <MainHeader />

      {loading || !userProfile || allAchievementDefinitions.length === 0 ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#00BFA6" />
          <Text style={{ color: "#666", marginTop: RFValue(10) }}>
            Carregando conquistas...
          </Text>
        </LoadingContainer>
      ) : (
        // MainWrapper já é um ScrollView, então o conteúdo vai direto aqui.
        <MainWrapper>
          <View // Esta View interna ainda é útil para o background branco e bordas arredondadas
            style={{
              flex: 1, // Permite que a View interna ocupe o espaço restante
              backgroundColor: "white",
              borderTopLeftRadius: RFValue(20),
              borderTopRightRadius: RFValue(20),
              // O margin-top negativo deve ser controlado pelo MainWrapper no styles.ts
              paddingTop: RFValue(20),
            }}
          >
            {/* Seção de Conquistas */}
            <SectionTitle>Conquistas</SectionTitle>
            <AchievementsGrid
              data={allAchievementDefinitions}
              keyExtractor={(item) => item.id}
              numColumns={3}
              renderItem={({ item }) => {
                const isEarned =
                  userProfile.achievements_earned?.includes(item.id) || false;

                const achievementIconSet =
                  achievementIconsMap[
                    item.id as keyof typeof achievementIconsMap
                  ];

                const iconSource = achievementIconSet
                  ? isEarned
                    ? achievementIconSet.unlocked
                    : achievementIconSet.locked
                  : undefined;

                const finalIconSource =
                  iconSource ||
                  require("../../assets/images/conquista1unlocked.png");

                return (
                  <AchievementCard
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    iconUrl={finalIconSource}
                    isEarned={isEarned}
                    onPress={handleAchievementPress}
                  />
                );
              }}
              columnWrapperStyle={{ justifyContent: "center" }}
              ListEmptyComponent={() => (
                <Text
                  style={{
                    textAlign: "center",
                    color: "#666",
                    marginTop: RFValue(20),
                  }}
                >
                  Nenhuma conquista encontrada.
                </Text>
              )}
            />

            {/* Seção de Ranking */}
            <SectionTitle style={{ marginTop: RFValue(30) }}>
              Ranking
            </SectionTitle>
            <View style={{ paddingHorizontal: RFValue(20) }}>
              {rankingData.map((item, index) => (
                <RankingItem key={item.id}>
                  <RankIcon
                    name="trophy-outline"
                    size={RFValue(24)}
                    color={
                      index === 0
                        ? "#FFD700"
                        : index === 1
                        ? "#C0C0C0"
                        : "#CD7F32"
                    }
                  />
                  <RankPlaceholder>{item.rank}</RankPlaceholder>
                  <RankPlaceholder style={{ flex: 1, marginLeft: RFValue(10) }}>
                    {item.name || "Nome do Jogador"}
                  </RankPlaceholder>
                  <RankPlaceholder>{item.points || "0 pts"}</RankPlaceholder>
                </RankingItem>
              ))}
            </View>
          </View>
        </MainWrapper>
      )}

      {/* MODAL DE DESCRIÇÃO DA CONQUISTA */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ModalContainer>
          <ModalContent>
            <TouchableOpacity
              onPress={closeModal}
              style={{ alignSelf: "flex-end" }}
            >
              <Ionicons
                name="close-circle-outline"
                size={RFValue(30)}
                color="#666"
              />
            </TouchableOpacity>
            {selectedAchievement && (
              <>
                <ModalTitle>{selectedAchievement.name}</ModalTitle>
                <ModalDescription>
                  {selectedAchievement.description}
                </ModalDescription>
                <Text
                  style={{
                    marginTop: RFValue(10),
                    fontSize: RFValue(14),
                    color: selectedAchievement.isEarned ? "green" : "red",
                  }}
                >
                  {selectedAchievement.isEarned
                    ? "Conquista Ganha!"
                    : "Conquista Bloqueada"}
                </Text>
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default Conquistas;

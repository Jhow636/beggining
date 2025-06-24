import { createStackNavigator } from "@react-navigation/stack";
import TelaAtividade from "@screens/TelaAtividades"; // Sua tela principal onde os cards podem aparecer
import TelaNiveis from "@screens/TelaNiveis"; // Sua tela de seleção de níveis
import AtividadeScreen from "@screens/AtividadeScreen"; // Sua tela de atividade (exercícios)
import ActivitiesScreen from "@screens/ActivitiesScreen"; // Tela de atividades, onde o usuário escolhe a matéria
// A variável do Stack Navigator
const AtividadesStackNavigator = createStackNavigator(); // Renomeado para mais clareza
import TelaTutorialCards from "@screens/TelaTutorialCards"; // Tela de tutorial para o jogo de cards
import ImagemAtividadeScreen from "@screens/ImagemAtividadeScreen"; // Tela de atividade com imagens

// !!! Tipagem dos parâmetros para todas as rotas no seu Stack
// Isso é o que React Navigation usa para validar os 'navigate' calls.
export type AtividadesStackParamList = {
  TelaAtividade: undefined; // Não aceita parâmetros
  TelaNiveis: undefined; // Não aceita parâmetros
  // A rota 'Atividade' AGORA ESPERA OS TRÊS PARÂMETROS
  Atividade: {
    exerciseId: string;
    materiaId: string;
    activityIdsInSequence: string[];
  };
};

const AtividadesStack = () => {
  return (
    // Usa a tipagem definida para o Navigator
    <AtividadesStackNavigator.Navigator<AtividadesStackParamList> // <<< Adicione a tipagem aqui
      screenOptions={{
        headerShown: false, // Esconde o cabeçalho padrão para todas as telas neste stack
      }}
    >
      <AtividadesStackNavigator.Screen
        name="ActivitiesScreen"
        component={ActivitiesScreen}
      />
      <AtividadesStackNavigator.Screen
        name="TelaAtividade"
        component={TelaAtividade}
      />
      <AtividadesStackNavigator.Screen
        name="TelaNiveis"
        component={TelaNiveis}
      />

      <AtividadesStackNavigator.Screen
        name="Atividade"
        component={AtividadeScreen}
      />
      <AtividadesStackNavigator.Screen
        name="TelaTutorialCards"
        component={TelaTutorialCards}
      />
      <AtividadesStackNavigator.Screen
        name="ImagemAtividadeScreen"
        component={ImagemAtividadeScreen}
      />
    </AtividadesStackNavigator.Navigator>
  );
};

export default AtividadesStack;

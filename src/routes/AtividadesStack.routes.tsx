import { createStackNavigator } from "@react-navigation/stack";
import TelaAtividade from "@screens/TelaAtividades"; // Sua tela principal onde os cards podem aparecer
import TelaNiveis from "@screens/TelaNiveis"; // Sua tela de seleção de níveis
import AtividadeScreen from "@screens/AtividadeScreen"; // Sua tela de atividade (exercícios)

// A variável do Stack Navigator
const AtividadesStackNavigator = createStackNavigator(); // Renomeado para mais clareza

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
        name="TelaAtividade"
        component={TelaAtividade}
      />
      <AtividadesStackNavigator.Screen
        name="TelaNiveis"
        component={TelaNiveis}
      />
      {/* Nome da rota AGORA É 'Atividade' e usa o componente AtividadeScreen */}
      {/* Não é necessário definir 'component={AtividadeScreen}' duas vezes */}
      <AtividadesStackNavigator.Screen
        name="Atividade"
        component={AtividadeScreen}
      />
    </AtividadesStackNavigator.Navigator>
  );
};

export default AtividadesStack;

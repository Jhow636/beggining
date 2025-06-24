import { createStackNavigator } from "@react-navigation/stack";
import TelaDeBusca from "@screens/TelaDeBusca";
import MateriaExplicacaoScreen from "@screens/MaterialExplicacaoScreen";
import MainPage from "@screens/MainPage";

// A variável do Stack Navigator
const MainPageStackNavigator = createStackNavigator(); // Renomeado para mais clareza

const MainPageStack = () => {
  return (
    // Usa a tipagem definida para o Navigator
    <MainPageStackNavigator.Navigator
      screenOptions={{
        headerShown: false, // Esconde o cabeçalho padrão para todas as telas neste stack
      }}
    >
      <MainPageStackNavigator.Screen
        name="MainPageScreen"
        component={MainPage}
      />
      <MainPageStackNavigator.Screen
        name="MateriaExplicacao"
        component={MateriaExplicacaoScreen}
      />
    </MainPageStackNavigator.Navigator>
  );
};

export default MainPageStack;

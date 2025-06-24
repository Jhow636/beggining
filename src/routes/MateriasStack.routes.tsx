import { createStackNavigator } from "@react-navigation/stack";
import TelaDeBusca from "@screens/TelaDeBusca";
import MateriaExplicacaoScreen from "@screens/MaterialExplicacaoScreen";

// A variável do Stack Navigator
const MateriasStackNavigator = createStackNavigator(); // Renomeado para mais clareza

const MateriasStack = () => {
  return (
    // Usa a tipagem definida para o Navigator
    <MateriasStackNavigator.Navigator
      screenOptions={{
        headerShown: false, // Esconde o cabeçalho padrão para todas as telas neste stack
      }}
    >
      <MateriasStackNavigator.Screen
        name="TelaDeBusca"
        component={TelaDeBusca}
      />
      <MateriasStackNavigator.Screen
        name="MateriaExplicacao"
        component={MateriaExplicacaoScreen}
      />
    </MateriasStackNavigator.Navigator>
  );
};

export default MateriasStack;

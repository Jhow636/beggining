import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainPage from "@screens/MainPage";
import TelaAtividade from "@screens/TelaAtividades";
import TelaDeBusca from "@screens/TelaDeBusca";
import Menu from "@screens/Menu";
import TelaMedalhas from "@screens/TelaMedalhas";
import tab1 from "@assets/images/tab1.png";
import tab2 from "@assets/images/tab2.png";
import tab3 from "@assets/images/tab3.png";
import tab4 from "@assets/images/tab4.png";
import tab5 from "@assets/images/tab5.png";
import { Image } from "react-native";
import theme from "@styles/theme";

const AppTab = createBottomTabNavigator();

const AppRoutes = () => {
  return (
    <AppTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.COLORS.SECONDARY,
          height: 90,
          paddingTop: 20,
        },
      }}
    >
      <AppTab.Screen
        name="MainPage"
        component={MainPage}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={tab3} />,
        }}
      />
      <AppTab.Screen
        name="TelaAtividade"
        component={TelaAtividade}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={tab2} />,
        }}
      />
      <AppTab.Screen
        name="TelaDeBusca"
        component={TelaDeBusca}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={tab4} />,
        }}
      />
      <AppTab.Screen
        name="TelaMedalhas"
        component={TelaMedalhas}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={tab5} />,
        }}
      />
      <AppTab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({ color, size }) => <Image source={tab1} />,
        }}
      />
    </AppTab.Navigator>
  );
};

export default AppRoutes;

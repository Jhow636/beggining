import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SignUpProcess from "@screens/SignUpProcess";
import UserRegistration from "@screens/UserRegistration";
import Home from "@screens/Home";
import SignIn from "@screens/SingIn";
import ForgotPassword from "@screens/ForgotPassword";
import WelcomeScreen from "@screens/WelcomeScreen";

const AuthStack = createStackNavigator();

const AuthRoutes = ({ initialRouteName }: { initialRouteName?: string }) => {
  return (
    <AuthStack.Navigator initialRouteName={initialRouteName || "Home"}>
      <AuthStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="UserRegistration"
        component={UserRegistration}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUpProcess"
        component={SignUpProcess}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;

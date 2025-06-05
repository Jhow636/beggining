import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SignUpProcess from "@screens/SignUpProcess";
import UserRegistration from "@screens/UserRegistration";
import Home from "@screens/Home";
import SignIn from "@screens/SingIn";

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <AuthStack.Navigator>
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
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;

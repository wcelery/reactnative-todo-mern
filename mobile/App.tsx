import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";

import { IFormProps, Main, TodoForm } from "./src/views";

type RootStackParamList = {
  Main: undefined;
  TodoForm: IFormProps;
};

export type TodoFormProps = NativeStackScreenProps<RootStackParamList, "TodoForm">;

const MainStack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Main">
            <MainStack.Screen
              name="Main"
              component={Main}
              options={{ title: "Your todo's" }}
            />
            <MainStack.Screen
              name="TodoForm"
              component={TodoForm}
              options={{ title: "Create or edit todo" }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

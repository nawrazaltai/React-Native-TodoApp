import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  createStackNavigator,
} from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Detail from "./screens/Detail";
import Add from "./screens/Add";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <RootStack.Group> */}
        <Stack.Screen
          name="Home"
          options={({ navigation }) => ({
            title: "Todos",
            headerTitleStyle: {
              fontSize: 25,
            },
            headerStyle: { backgroundColor: "#cdf" },
            headerTintColor: "black",
            headerRight: () => (
              <Button
                title="Add todo"
                color={"green"}
                onPress={() => navigation.navigate("Add")}
              />
            ),
          })}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={({ route }) => ({
            title: route.params.item.title,
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#cdf" },
          })}
        />
        {/* </RootStack.Group> */}
        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen
            name="Add"
            options={({ navigation, route, title, description }) => ({
              title: "New todo",
              headerTitleStyle: { fontSize: 25 },
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#cdf",
              },
              // headerRight: () => (
              //   <Button
              //     title="Done"
              //     color={"green"}
              //     backgroundColor={"green"}
              //     onPress={() => {
              //       navigation.navigate("Home", {
              //         params: {
              //           title: title,
              //           description: description,
              //         },
              //         merge: true,
              //       });
              //     }}
              //   />
              // ),
            })}
            component={Add}
          />
        </RootStack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({});

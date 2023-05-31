import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Button,
  TouchableOpacity,
  SectionList,
} from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

let id = 0;
export default function HomeScreen({ navigation, route }) {
  const [todos, setTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  function updateStatus(id, done) {
    const newList = [...todos];
    const completedCopy = [...completeTodos];

    // console.log(done);

    for (let i = 0; i < newList.length; i++) {
      const item = newList[i];
      if (item.id == id) {
        item.done = !done;
      }
      if (item.done) {
        completedCopy.push(item) && newList.splice(i, 1);
        setTodos(newList);
        setCompleteTodos(completedCopy);
      }
    }

    for (let j = 0; j < completedCopy.length; j++) {
      const item = completedCopy[j];
      if (item.id == id) {
        item.done = !done;
      }
      if (!item.done) {
        completedCopy.splice(j, 1) && newList.push(item);
        setTodos(newList);
        setCompleteTodos(completedCopy);
      }
    }
  }
  useEffect(() => {
    if (route.params) {
      const { itemId, done } = route.params;
      //   console.log(route.params);
      updateStatus(itemId, done);
    }
  }, [route.params?.itemId, route.params?.done]);

  function deleteTodo(id) {
    const newList = [...todos];
    for (let i = 0; i < newList.length; i++) {
      const item = newList[i];
      if (item.id === id) {
        newList.splice(i, 1);
      }
    }
    setTodos(newList);

    const completedCopy = [...completeTodos];
    for (let j = 0; j < completedCopy.length; j++) {
      const item = completedCopy[j];
      if (item.id == id) {
        completedCopy.splice(j, 1);
      }
    }
    setCompleteTodos(completedCopy);
  }

  useEffect(() => {
    if (route.params) {
      const { deleteId } = route.params;
      deleteTodo(deleteId);
    }
  }, [route.params?.deleteId]);

  useEffect(() => {
    if (route.params?.title && route.params?.description) {
      const { title, description } = route.params;

      let todosCopy = [...todos];

      const newTodo = {
        title: title,
        description: description,
        id: id,
        done: false,
      };
      todosCopy.push(newTodo);
      id++;
      setTodos(todosCopy);
    }
  }, [route.params]);

  return (
    <View style={styles.home_container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <View>
        <Text style={styles.home_header}>
          {todos.length == 0 ? "You have no active tasks!" : "Todays tasks"}
        </Text>

        <SectionList
          sections={[
            { title: "Active tasks", data: todos },
            { title: "Completed tasks", data: completeTodos },
          ]}
          data={todos}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Detail", {
                  item: item,
                });
              }}
            >
              <View style={styles.todo_div}>
                <Text
                  style={!item.done ? styles.todo_title : styles.todo_complete}
                >
                  Todo: {item.title}
                </Text>
                <AntDesign name="right" color="black" size={20} />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <View>
              <Text style={styles.section_title}>
                {todos.length > 0 && section.title == "Active tasks"
                  ? section.title
                  : completeTodos.length > 0 &&
                    section.title == "Completed tasks"
                  ? section.title
                  : ""}

                {/* {todos.length > 0 ? section.title : completeTodos.length > 0 && section.title} */}
              </Text>
            </View>
          )}
        />
      </View>

      {/* FLATLIST
      
      <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Detail", {
                  item: item,
                });
              }}
            >
              <View style={styles.todo_div}>
                <Text style={styles.todo_title}>Todo: {item.title}</Text>
                <AntDesign name="right" color="black" size={20} />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        /> */}

      {/* <View style={styles.complete_div}>
        <Text style={{ textAlign: "center" }}>
          {completeTodos.length == 0 ? "" : "Complete"}
        </Text>
        <FlatList
          data={completeTodos}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Detail", {
                  item: item,
                });
              }}
            >
              <View style={styles.todo_div}>
                <Text style={{ textDecorationLine: "line-through" }}>
                  Todo: {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  home_container: {
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cde",
    // paddingTop: 40,
  },
  home_header: {
    color: "black",
    fontSize: 27,
    fontWeight: "500",
    marginTop: 20,
    textAlign: "center",
  },

  todo_div: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: 350,
    height: 80,
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 8,
    paddingLeft: 5,
    paddingRight: 5,
  },
  todo_title: {
    fontSize: 18,
  },
  todo_complete: {
    fontSize: 18,
    textDecorationLine: "line-through",
  },
  section_title: {
    fontSize: 20,
    marginTop: 20,
    textDecorationLine: "underline",
    fontWeight: 600,
  },
});

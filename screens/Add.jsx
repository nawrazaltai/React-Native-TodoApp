import { StyleSheet, View, Button, TextInput } from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";

export default function Add({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function addTodo() {
    navigation.navigate("Home", {
      //   params: { title: title, description: description },
      title: title,
      description: description,
      merge: true,
    });
  }

  return (
    <View style={styles.add_container}>
      <View style={styles.main}>
        <TextInput
          placeholder="Title"
          style={styles.title_input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.description_input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Button onPress={addTodo} title="Add" color={"green"} />
    </View>
  );
}

const styles = StyleSheet.create({
  add_container: {
    height: 800,
    alignItems: "center",
    backgroundColor: "#cde",
    paddingTop: 10,
  },
  main: { gap: 40 },

  title_input: {
    borderWidth: 1,
    width: 350,
    height: 40,
    fontSize: 18,
    borderRadius: 8,
    textAlign: "left",
    paddingLeft: 6,
    backgroundColor: "white",
    color: "black",
  },
  description_input: {
    borderWidth: 1,
    textAlign: "left",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingBottom: 200,
    paddingLeft: 6,
    paddingTop: 2,
    fontSize: 18,
    borderRadius: 8,
    marginBottom: 60,
    backgroundColor: "white",
  },
});

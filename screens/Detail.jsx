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
import { useState, useEffect } from "react";
import Trash from "react-native-vector-icons/Feather";

export default function Detail({ navigation, route }) {
  const { item } = route.params;
  const [complete, setComplete] = useState(item.done);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <View style={styles.details_container}>
      <Text style={!complete ? styles.todo_title : styles.todo_title_complete}>
        {item.description}
      </Text>
      <View style={styles.details_buttons}>
        <Button
          title={complete ? "Undo" : "Done"}
          onPress={() => {
            setComplete(!complete);
            navigation.navigate("Home", { itemId: item.id, done: item.done });
          }}
        />
      </View>

      {/* <Button
        title="Delete"
        style={{ marginTop: 5, backgroundColor: "red" }}
        onPress={() => {
          navigation.navigate("Home", { deleteId: item.id });
        }}
      /> */}
      <View style={styles.trash_div}>
        <Text style={styles.date}>{date}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home", { deleteId: item.id });
          }}
          style={styles.trash_can}
        >
          <Trash name="trash" size={25} color={"black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  details_container: {
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cde",
    // paddingTop: 40,
  },
  todo_title: {
    fontSize: 25,
    margin: 30,
  },
  todo_title_complete: {
    fontSize: 25,
    margin: 30,
    textDecorationLine: "line-through",
  },
  details_buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  trash_can: {
    width: 55,
    height: 38,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6666",
  },
  trash_div: {
    position: "absolute",
    bottom: 0,
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    backgroundColor: "#eed",
  },
  date: {
    fontSize: 20,
  },
});

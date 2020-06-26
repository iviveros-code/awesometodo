import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./colors";
import tempData from "../tempData";

export default function AddListModal({ closeModal, addList }) {
  const backgroundColors = [
    "#5cd859",
    "#24a6d9",
    "#595bd9",
    "#8022d9",
    "#d159d8",
    "#d85963",
    "#d88559",
  ];
  const [name, setName] = useState("");
  const [color, setColor] = useState(backgroundColors[0]);

  const renderColors = () => {
    return backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => setColor(color)}
        />
      );
    });
  };

  const createTodo = () => {
    const list = { name, color };

    addList(list);

    // tempData.push({
    //   name,
    //   color,
    //   todos: [],
    // });
    setName("");
    closeModal();
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={styles.btnModal}>
        <AntDesign
          name="close"
          size={24}
          color={colors.black}
          onPress={closeModal}
        />
      </TouchableOpacity>
      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Create Todo List</Text>
        <TextInput
          style={styles.input}
          placeholder="list Name?"
          value={name.toString()}
          onChangeText={(name) => setName(name)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          {renderColors()}
        </View>
        <TouchableOpacity
          style={[styles.create, { backgroundColor: color }]}
          onPress={createTodo}
        >
          <Text style={{ color: colors.white, fontWeight: "600" }}>
            Create!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnModal: {
    position: "absolute",
    top: 64,
    right: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

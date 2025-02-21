import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { launchCameraAsync, useCameraPermissions } from "expo-image-picker";
import * as MailComposer from "expo-mail-composer";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [numeroCTE, setNumeroCTE] = useState("");
  const [numeroPatrimonio, setNumeroPatrimonio] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const tirarFoto = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) return;
    }
    const result = await launchCameraAsync({ base64: true });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const enviarEmail = async () => {
    if (!nomeFuncionario || !nomeCliente || !numeroCTE || !numeroPatrimonio || !image) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    const emailOptions = {
      recipients: [
        "raphael.tw22@gmail.com", 
        "raphael.silva@viaexpressa.com", 
        "robson.lima@viaexpressa.com", 
        "brendon.vieira@viaexpressa.com",
        "sidnei.oliveira@viaexpressa.com",
      ],
      subject: "Operação Conferência - Novo Registro",
      body: `Nome do Funcionário: ${nomeFuncionario}\nNome do Cliente: ${nomeCliente}\nNúmero do CTE: ${numeroCTE}\nNúmero do Patrimônio: ${numeroPatrimonio}`,
      attachments: [image],
    };

    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      await MailComposer.composeAsync(emailOptions);
      Alert.alert("Sucesso", "Formulário enviado com sucesso!");
      setNomeFuncionario("");
      setNomeCliente("");
      setNumeroCTE("");
      setNumeroPatrimonio("");
      setImage(null);
    } else {
      Alert.alert("Erro", "Nenhum aplicativo de e-mail disponível");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Funcionário:</Text>
      <TextInput value={nomeFuncionario} onChangeText={setNomeFuncionario} style={styles.input} />

      <Text style={styles.label}>Nome do Cliente:</Text>
      <TextInput value={nomeCliente} onChangeText={setNomeCliente} style={styles.input} />

      <Text style={styles.label}>Número do CTE:</Text>
      <TextInput value={numeroCTE} onChangeText={setNumeroCTE} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Número do Patrimônio:</Text>
      <TextInput value={numeroPatrimonio} onChangeText={setNumeroPatrimonio} style={styles.input} keyboardType="numeric" />

      <TouchableOpacity style={styles.button} onPress={tirarFoto}>
        <Text style={styles.buttonText}>Tirar Foto</Text>
      </TouchableOpacity>
      
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity onPress={() => setImage(null)} style={styles.trashButton}>
            <Ionicons name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={enviarEmail}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  trashButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 5,
  },
});

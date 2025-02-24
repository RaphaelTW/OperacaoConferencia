import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { launchCameraAsync, useCameraPermissions } from "expo-image-picker";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./src/components/style/home/styles";

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
      Alert.alert("Erro", "Todos os campos e a foto são obrigatórios!");
      return;
    }

    const emailOptions = {
      recipients: ["raphael.tw22@gmail.com", "tecnologia@viaexpressa.com", "raphael.silva@viaexpressa.com",],
      subject: `Operação Conferência - ${numeroCTE}`,
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

  const logoSource = require("./src/assets/images/logo.png");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <View style={styles.containerLogo}>
              <Animatable.Image
                animation="flipInY"
                source={logoSource}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.label}>Nome do Funcionário:</Text>
            <TextInput
              value={nomeFuncionario}
              onChangeText={setNomeFuncionario}
              style={styles.input}
              placeholder="Digite o nome"
            />

            <Text style={styles.label}>Nome do Cliente:</Text>
            <TextInput
              value={nomeCliente}
              onChangeText={setNomeCliente}
              style={styles.input}
              placeholder="Digite o cliente"
            />

            <Text style={styles.label}>Número do CTE:</Text>
            <TextInput
              value={numeroCTE}
              onChangeText={setNumeroCTE}
              style={styles.input}
              keyboardType="numeric"
              placeholder="Digite o número"
            />

            <Text style={styles.label}>Número do Patrimônio:</Text>
            <TextInput
              value={numeroPatrimonio}
              onChangeText={setNumeroPatrimonio}
              style={styles.input}
              keyboardType="numeric"
              placeholder="Digite o patrimônio"
            />

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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

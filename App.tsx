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
  
  // Declare o estado apenas aqui, no topo do componente.
  const [image, setImage] = useState<string | null>(null);
  
  const [permission, requestPermission] = useCameraPermissions();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const tirarFoto = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) return;
    }
    const result = await launchCameraAsync({ base64: true });
    if (!result.canceled) {
      // Aqui você pode atribuir o URI da imagem sem problemas,
      // pois o estado image está tipado para aceitar string ou null.
      setImage(result.assets[0].uri);
    }
  };

  const enviarEmail = async () => {
    if (!nomeFuncionario || !nomeCliente || !numeroCTE || !numeroPatrimonio || !image) {
      Alert.alert("Erro", "Todos os campos e a foto são obrigatórios!");
      return;
    }

    const emailOptions = {
      recipients: [
        "raphael.tw22@gmail.com",
        "tecnologia@viaexpressa.com",
        "raphael.silva@viaexpressa.com"
      ],
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

  // Define a logo com base no modo atual
  const logoSource = isDarkMode
    ? require("./src/assets/images/logo-white.png")
    : require("./src/assets/images/logo.png");

  // Cria estilos dinâmicos para suportar o modo escuro
  const dynamicStyles = {
    container: [styles.container, { backgroundColor: isDarkMode ? "#333" : "#f2f2f2" }],
    innerContainer: styles.innerContainer,
    containerLogo: [styles.containerLogo, { backgroundColor: isDarkMode ? "#333" : "#f2f2f2" }],
    logoImage: styles.logoImage,
    scrollContainer: styles.scrollContainer,
    label: [styles.label, { color: isDarkMode ? "#fff" : "#000" }],
    input: [
      styles.input,
      { backgroundColor: isDarkMode ? "#555" : "#fff", color: isDarkMode ? "#fff" : "#000" }
    ],
    imageContainer: styles.imageContainer,
    image: styles.image,
    trashButton: styles.trashButton,
    button: [styles.button, { backgroundColor: isDarkMode ? "#888" : "#ff6600" }],
    buttonText: [styles.buttonText, { color: isDarkMode ? "#000" : "#fff" }]
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={dynamicStyles.container}
      keyboardVerticalOffset={0}
    >
      <TouchableOpacity
        style={localStyles.darkModeButton}
        onPress={() => setIsDarkMode(!isDarkMode)}
      >
        <Ionicons
          name={isDarkMode ? "sunny" : "moon"}
          size={24}
          color={isDarkMode ? "yellow" : "black"}
        />
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={dynamicStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={dynamicStyles.innerContainer}>
            <View style={dynamicStyles.containerLogo}>
              <Animatable.Image
                animation="flipInY"
                source={logoSource}
                style={dynamicStyles.logoImage}
                resizeMode="contain"
              />
            </View>

            <Text style={dynamicStyles.label}>Nome do Funcionário:</Text>
            <TextInput
              value={nomeFuncionario}
              onChangeText={setNomeFuncionario}
              style={dynamicStyles.input}
              placeholder="Digite o nome"
              placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
            />

            <Text style={dynamicStyles.label}>Nome do Cliente:</Text>
            <TextInput
              value={nomeCliente}
              onChangeText={setNomeCliente}
              style={dynamicStyles.input}
              placeholder="Digite o cliente"
              placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
            />

            <Text style={dynamicStyles.label}>Número do CTE:</Text>
            <TextInput
              value={numeroCTE}
              onChangeText={setNumeroCTE}
              style={dynamicStyles.input}
              keyboardType="numeric"
              placeholder="Digite o número"
              placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
            />

            <Text style={dynamicStyles.label}>Número do Patrimônio:</Text>
            <TextInput
              value={numeroPatrimonio}
              onChangeText={setNumeroPatrimonio}
              style={dynamicStyles.input}
              keyboardType="numeric"
              placeholder="Digite o patrimônio"
              placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
            />

            <TouchableOpacity style={dynamicStyles.button} onPress={tirarFoto}>
              <Text style={dynamicStyles.buttonText}>Tirar Foto</Text>
            </TouchableOpacity>

            {image && (
              <View style={dynamicStyles.imageContainer}>
                <Image source={{ uri: image }} style={dynamicStyles.image} />
                <TouchableOpacity onPress={() => setImage(null)} style={dynamicStyles.trashButton}>
                  <Ionicons name="trash" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={dynamicStyles.button} onPress={enviarEmail}>
              <Text style={dynamicStyles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const localStyles = StyleSheet.create({
  darkModeButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    right: 20,
    zIndex: 10,
    backgroundColor: "transparent"
  }
});

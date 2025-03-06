import React, { useState, useEffect } from "react";
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
import Constants from "expo-constants"; // Para acessar a versão nativa
import { launchCameraAsync, useCameraPermissions } from "expo-image-picker";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";
import { Ionicons } from "@expo/vector-icons";
import * as Updates from "expo-updates";
import { styles } from "./src/components/style/home/styles";

export default function App() {
  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [numeroCTE, setNumeroCTE] = useState("");
  const [numeroPatrimonio, setNumeroPatrimonio] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    async function checkForUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          Alert.alert(
            'Nova atualização disponível!',
            'Uma nova versão está disponível. Deseja atualizar agora?',
            [
              {
                text: 'Cancelar',
                style: 'cancel'
              },
              {
                text: 'Atualizar',
                onPress: async () => {
                  try {
                    await Updates.fetchUpdateAsync();
                    Alert.alert('Atualização', 'Atualização baixada, reiniciando o app.');
                    await Updates.reloadAsync();
                  } catch (error) {
                    console.log('Erro ao aplicar a atualização:', error);
                  }
                }
              }
            ],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.log("Erro ao verificar atualização:", error);
      }
    }

    checkForUpdates();
    // Caso deseje verificar periodicamente:
    // const interval = setInterval(checkForUpdates, 300000);
    // return () => clearInterval(interval);
  }, []);

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
      recipients: [
        "raphael.tw22@gmail.com",
        "robson.lima@viaexpressa.com",
        "brendon.vieira@viaexpressa.com",
        "luccas.dantas@viaexpressa.com",
        "sidnei.oliveira@viaexpressa.com",
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

  const logoSource = isDarkMode
    ? require("./src/assets/images/logo-white.png")
    : require("./src/assets/images/logo.png");

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

  // Em builds standalone, utilize Constants.nativeAppVersion para capturar a versão
  const appVersion = Constants.nativeAppVersion || "N/A";

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
                <Image source={{ uri: image }} />
                <TouchableOpacity onPress={() => setImage(null)} style={dynamicStyles.trashButton}>
                  <Ionicons name="trash" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={dynamicStyles.button} onPress={enviarEmail}>
              <Text style={dynamicStyles.buttonText}>Enviar</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Text style={{ fontSize: 16, color: isDarkMode ? "#fff" : "#000" }}>
                Versão: {appVersion}
              </Text>
            </View>
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

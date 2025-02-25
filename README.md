# Operação Conferência

![Logo](./src/assets/images/logo.png)

Aplicativo móvel desenvolvido em React Native com Expo para facilitar a operação de conferência de cargas. O aplicativo permite que os usuários preencham um formulário com informações relevantes, tirem fotos e enviem os dados por e-mail.

## Funcionalidades

- **Formulário de Conferência**: Preencha os campos com o nome do funcionário, nome do cliente, número do CTE e número do patrimônio.
- **Captura de Foto**: Tire fotos diretamente do aplicativo para anexar ao formulário.
- **Envio por E-mail**: Envie os dados preenchidos e a foto capturada por e-mail para os destinatários configurados.
- **Modo Escuro**: Alternar entre o modo claro e escuro para melhorar a experiência do usuário.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **Expo**: Plataforma para desenvolvimento e deploy de aplicativos React Native.
- **Expo Image Picker**: Biblioteca para captura de imagens.
- **Expo Mail Composer**: Biblioteca para envio de e-mails.
- **React Native Animatable**: Biblioteca para animações no React Native.
- **Ionicons**: Biblioteca de ícones.

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- Yarn instalado
- Expo CLI instalado (`npm install -g expo-cli`)

### Instalação

1. Clone o repositório:

   ```
   git clone https://github.com/RaphaelTW/OperacaoConferencia.git
   ```
   ```
   cd OperacaoConferencia
   ```

2. Instale as dependências:
    ```
    yarn install
    ```

3. Inicie o servidor de desenvolvimento:
    ```
    npm start -- --reset-cache
    ```

Escaneie o QR code com o aplicativo Expo Go no seu dispositivo móvel ou execute em um emulador.

Estrutura do Projeto
App.tsx: Componente principal do aplicativo.

src/components/style/home/styles.ts: Estilos do aplicativo.

src/assets/images/: Diretório contendo as imagens do aplicativo.

Contribuição
Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

Faça um fork do projeto.

Crie uma nova branch (git checkout -b feature/nova-feature).

Commit suas alterações (git commit -m 'Adiciona nova feature').

Faça push para a branch (git push origin feature/nova-feature).

Abra um Pull Request.

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Contato
Raphael Laurentino - raphael.tw22@gmail.com

GitHub: RaphaelTW


### Explicação do Código

O código fornecido é um componente React Native que implementa um formulário de conferência de cargas. Aqui estão os principais pontos:

- **Estado**: O estado é gerenciado usando o hook `useState` para controlar os valores dos campos do formulário, a imagem capturada e o modo escuro.

- **Captura de Imagem**: A função `tirarFoto` usa a biblioteca `expo-image-picker` para capturar uma imagem usando a câmera do dispositivo.

- **Envio de E-mail**: A função `enviarEmail` usa a biblioteca `expo-mail-composer` para enviar os dados do formulário e a imagem capturada por e-mail.

- **Modo Escuro**: O modo escuro é alternado usando o estado `isDarkMode`, que ajusta os estilos dinamicamente.

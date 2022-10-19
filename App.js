import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from "expo-image-manipulator";
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    backgroundColor: #fff;
    alignItems: center;
    justifyContent: center;
`;
const Instructions = styled.Text`
    color: #000;
    font-size: 20px;
    text-align: center;
    margin: 15px;
`;
const Thumbnail = styled.Image`
    width: 300px;
    height: 300px;
    alignSelf: center;
`;
const Logo = styled.Image`
    width: 305;
    height: 159;
    marginBottom: 10;
`;
const MainButton = styled.TouchableOpacity`
    background-color: #c495ff;
    padding: 20px;
    borderRadius: 5px;
    margin-top: 20px;
`;

const ButtonText = styled.Text`
    fontSize: 20px;
    color: #fff;
`;

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  }

  let openShareDialogAsync = async () => {
    if (Platform.OS === 'web') {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    const imageTmp = await ImageManipulator.manipulateAsync(selectedImage.localUri);
    await Sharing.shareAsync(imageTmp.uri);
  };

  if (selectedImage !== null) {
    return (
      <Container>
        <Thumbnail
          source={{ uri: selectedImage.localUri }}
        />
        <MainButton onPress={openShareDialogAsync}>
          <ButtonText>Share this photo</ButtonText>
        </MainButton>
      </Container>
    );
  }
  
  return (
    <Container>
        <Logo source={{ uri: "https://i.imgur.com/TkIrScD.png" }} />
      <Instructions>
        To share a photo from your phone with a friend, just press the button below!
      </Instructions>
      <MainButton
        onPress={openImagePickerAsync}>
        <ButtonText>Pick a photo</ButtonText>
      </MainButton>
    </Container>
   );
}
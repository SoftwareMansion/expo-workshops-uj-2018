import React from "react";
import { View } from "react-native";
import { Foundation } from "@expo/vector-icons";


export default class GalleryScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Gallery',
      tabBarIcon: ({ tintColor }) => (
        <Foundation name="thumbnails" size={32} color={tintColor} />
      ),
    };
  };

  render() {
    return <View />;
  }
}


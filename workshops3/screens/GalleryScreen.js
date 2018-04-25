import React from "react";
import { Camera, Permissions, FileSystem } from "expo";
import { Foundation } from '@expo/vector-icons';
import { View, Image, StyleSheet, FlatList } from "react-native";

const PHOTO_DIR = `${FileSystem.documentDirectory}photos/`;

export default class GalleryScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Gallery',
      tabBarIcon: ({ tintColor }) => (
        <Foundation name="thumbnails" size={32} color={tintColor} />
      ),
    };
  };

  state = {
    photos: [],
  };

  async componentWillMount() {
      const dirInfo = await FileSystem.getInfoAsync(PHOTO_DIR);
      if (dirInfo.exists) {
        const photos = await FileSystem.readDirectoryAsync(PHOTO_DIR);
        this.setState({ photos });
      } 
  }

  async componentDidUpdate() {
    if (this.props.isFocused) {
      const dirInfo = await FileSystem.getInfoAsync(PHOTO_DIR);
      if (dirInfo.exists) {
        const photos = await FileSystem.readDirectoryAsync(PHOTO_DIR);
        this.setState({ photos });
      } 
    }
  }

  renderPhoto({ item }) {
    return (
      <Image
        style={styles.photo}
        source={{
          uri: `${FileSystem.documentDirectory}photos/${item}`,
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container} >
        <FlatList
          style={styles.list}
          data={this.state.photos}
          renderItem={this.renderPhoto}
          keyExtractor={item => item}
          numColumns={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 8,
  },
  list: {
    flex: 1,
  },
  photo: {
    margin: 5,
    width: 150,
    height: 150,
  }
});

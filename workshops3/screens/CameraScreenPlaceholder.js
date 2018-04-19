import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default class CameraScreenPlaceholder extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Take picture!',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-camera" size={32} color={tintColor} />
      ),
    };
  };
  
  componentDidUpdate() {
    if (this.props.isFocused) {
      this.props.navigation.goBack();
      this.props.navigation.navigate('CameraModal');
    }
  }

  render() {
    return (<View style={styles.container} />);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  }
});

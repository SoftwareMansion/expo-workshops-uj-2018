import React from 'react';
import { Constants } from 'expo';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Header</Text>
        </View>
        <View style={styles.content}>
          <Text>Content</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Text>Settings</Text>
          </View>
          <View style={styles.footerItem}>
            <Text>Search</Text>
          </View>
          <View style={styles.footerItem}>
            <Text>Home</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // root view has flexDirection: 'column',
  // so we need to tell the container to be flexible in y axis
  container: {
    flex: 1,
  },
  
  // header is inflexible, it takes as much space as its content + padding
  header: {
    paddingTop: Constants.statusBarHeight + 15,
    paddingBottom: 15,
    paddingHorizontal: 5,
    backgroundColor: 'green',
  },
  
  // we want content to take all available space in its parent, so we make it flexible using flex rule
  content: {
    flex: 1,
    padding: 10,
    backgroundColor: 'blue',
    
    // all elements have flexDirection: 'column' by default,
    // so to center text inside, we need to use justifyContent as it works in the same axis
    justifyContent: 'center',
    
    // alternatively, instead of justifyContent, we can change flexDirection to row and center using alignItems (effect is the same)
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  
  // footer is inflexible as well, so we let footer items take as much space as they need
  footer: {
    backgroundColor: 'red',
    
    // reverses rendering order, first element will be last and so on...
    flexDirection: 'row-reverse',
    
    // centers vertically, because flexDirection is horizontal
    alignItems: 'center',
    
    // aligns horizontally
    justifyContent: 'space-between',
  },
  
  // footer items cannot be flexible if we want to justify footer with space-between,
  // otherwise, they would take all available space
  footerItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'orange',
  },
});

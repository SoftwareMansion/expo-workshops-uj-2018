import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet } from "react-native";

import Post, { height as postHeight } from "../components/Post";
import { presentError, mergeImagesArrays } from "../services/utils";
import {
  getImages as rawGetImages,
  fetchNewerImages
} from "../services/photoRepository";

const pageSize = 10;
const getImages = before => rawGetImages(pageSize, before);

export default class HomeScreen extends React.Component {
  static navigationOptions = () => ({
    title: "Home",
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="md-home" size={32} color={tintColor} />
    )
  });

  state = {
    refreshing: false,
    images: [
      { webformatURL : 'https://cdn.pixabay.com/photo/2015/03/26/21/33/hot-air-balloon-693452__340.jpg', user: 'user1', id:1},
      { webformatURL : 'https://cdn.pixabay.com/photo/2015/06/22/08/39/child-817371__340.jpg', user: 'user2', id:2},
      { webformatURL : 'https://cdn.pixabay.com/photo/2015/06/16/16/46/meadow-811339__340.jpg', user: 'user3', id:3},
      { webformatURL : 'https://cdn.pixabay.com/photo/2018/03/05/15/45/nature-3201015__340.jpg', user: 'user4', id:4}
    ],
    loadingMore: false
  };

  // componentDidMount() {
  //   getImages(this.state.images.length)
  //     .then(this.handleFirstData)
  //     .catch(this.handleError);
  // }

  getItemLayout = (data, index) => ({
    length: postHeight,
    offset: postHeight * index,
    index
  });

  getItemKey = item => `${item.id}`;

  handleRefresh = () => this.setState({ refreshing: true }, this.refresh);

  handleEndReached = () =>
    !this.state.refreshing &&
    !this.state.loadingMore &&
    this.setState({ loadingMore: true }, this.loadMore);

  loadMore = () => {return;}


  handleFirstData = ({ images }) =>
    this.setState({
      images: mergeImagesArrays(images, this.state.images),
      refreshing: false
    });

  handleMoreData = ({ images }) =>
    this.setState({
      images: mergeImagesArrays(this.state.images, images),
      loadingMore: false
    });

  handleNewData = ({ images }) =>
    this.setState({
      images: mergeImagesArrays(images, this.state.images),
      refreshing: false
    });

  handleError = error =>{
  console.log(error);
    this.setState({ refreshing: false, loadingMore: false }, () =>
      presentError(error)
    );}

  refresh = () => {return; }

  renderItem = ({ item }) => <Post key={item.key} image={item} />;

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.images}
        onEndReachedThreshold={0.5}
        renderItem={this.renderItem}
        onRefresh={this.handleRefresh}
        keyExtractor={this.getItemKey}
        refreshing={this.state.refreshing}
        getItemLayout={this.getItemLayout}
        onEndReached={this.handleEndReached}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "white"
  }
});

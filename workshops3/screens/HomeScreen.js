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

  state = { refreshing: true, images: [], loadingMore: false };

  componentDidMount() {
    getImages(this.state.images.length)
      .then(this.handleFirstData)
      .catch(this.handleError);
  }

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

  loadMore = () =>
    getImages(this.state.images.length)
      .then(this.handleMoreData)
      .catch(this.handleError);

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

  refresh = () =>
    fetchNewerImages(this.state.images[0] && this.state.images[0].id)
      .then(this.handleNewData)
      .catch(this.handleError);

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

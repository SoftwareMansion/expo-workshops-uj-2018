import { Constants } from "expo";
import { Platform } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  withNavigationFocus
} from "react-navigation"; // Version can be specified in package.json

import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import CameraScreenPlaceholder from "./screens/CameraScreenPlaceholder";
import GalleryScreen from "./screens/GalleryScreen";

const expoColor = "#4830E5";

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    navigationOptions: {
      header: Platform.OS === "android" ? null : undefined
    }
  }
);

const Tabs = TabNavigator(
  {
    Home: { screen: MainStack },
    Camera: { screen: withNavigationFocus(CameraScreenPlaceholder) },
    Gallery: { screen: withNavigationFocus(GalleryScreen) }
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      iconStyle: {
        width: 28 // hardcoded value for icons /shrug
      },
      activeTintColor: Platform.OS === "android" ? undefined : expoColor,
      style:
        Platform.OS === "android"
          ? {
              paddingTop: Constants.statusBarHeight,
              backgroundColor: expoColor
            }
          : {},
      indicatorStyle: {
        backgroundColor: "white"
      }
    }
  }
);

export default StackNavigator(
  {
    Main: {
      screen: Tabs
    },
    CameraModal: {
      screen: CameraScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

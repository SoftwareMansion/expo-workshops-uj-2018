import { Platform, ToastAndroid, Alert } from "react-native";

export const presentError = error => {
  const errorMessage =
    error && error.message ? error.message : "An unexpected error occurred.";
  if (Platform.os === "android") {
    ToastAndroid.show(errorMessage, ToastAndroid.LONG);
  } else {
    Alert.alert("Error", errorMessage);
  }
};

// API sometimes responds with duplicate images,
// this function merges and deduplicates images.
export const mergeImagesArrays = (former, latter, reverse) => {
  if (former.length > latter.length) {
    return mergeImagesArrays(latter, former, true);
  }

  const idsHash = former.reduce(
    (acc, image) => ({ ...acc, [image.id]: true }),
    {}
  );
  const latterImagesFiltered = latter.filter(image => !idsHash[image.id]);

  if (reverse) {
    return [...latterImagesFiltered, ...former];
  } else {
    return [...former, ...latterImagesFiltered];
  }
};

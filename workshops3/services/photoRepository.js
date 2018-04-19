const KEY = "4441793-36a46550b17c6fcdbdacb8def";
const maximumNewItemsCount = 10;

const fetchImages = (pageSize, pageIndex) =>
  fetch(
    `https://pixabay.com/api/?key=${KEY}&per_page=${pageSize}&page=${pageIndex}&order=latest`
  );

export const getImages = async (last, before) => {
  const pageOffset = before % last;
  const pageSize = pageOffset + last;
  const pageIndex = before / last + 1; // Pages in API are 1-indexed.
  const response = await fetchImages(pageSize, pageIndex);

  if (response.status === 200) {
    const { hits } = await response.json();
    return { images: hits };
  } else {
    throw new Error(await response.text());
  }
};

export const fetchNewerImages = async newestId => {
  // We'll fetch at most `maximumNewItemsCount` new images,
  // API does not support selecting images newer than <id>.
  const response = await fetchImages(maximumNewItemsCount, 1);

  if (response.status === 200) {
    const json = await response.json();
    const newestKnownImageIndex = json.hits.findIndex(
      hit => hit.id === newestId
    );
    if (newestKnownImageIndex < 0) {
      // Newest known image id has not been found in the batch, all the images must be new.
      return { images: json.hits };
    }
    const newerImages = json.hits.slice(0, newestKnownImageIndex);
    return { images: newerImages };
  } else {
    throw new Error(await response.text());
  }
};

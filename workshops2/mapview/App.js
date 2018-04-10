import React from 'react';
import { MapView, Location, Permissions } from 'expo';
import { StyleSheet } from 'react-native';


export default class App extends React.Component {
  state = {
    region: null,
    office: null,
  };

  componentDidMount() {
    this.setupCurrentLocation();
    this.findOffice();
  }

  async setupCurrentLocation() {
    const permission = await Permissions.askAsync(Permissions.LOCATION);

    if (permission.status === 'granted') {
      const location = await Location.getCurrentPositionAsync();
      
      this.setState({
        region: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    }
  }

  async findOffice() {
    const locations = await Location.geocodeAsync('ul. Na Zjeździe 11');
    
    if (locations.length) {
      this.setState({ office: locations[0] });
    }
  }

  render() {
    if (!this.state.region) {
      return null;
    }
    
    const { region, office } = this.state;

    return (
      <MapView
        style={styles.map}
        // provider={MapView.PROVIDER_GOOGLE}
        region={region}>

        <MapView.Marker
          title="You're here"
          coordinate={region}
          pinColor="red" />
        
        { office &&
          <MapView.Marker
            title="Software Mansion"
            coordinate={office}
            pinColor="green" />
        }
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

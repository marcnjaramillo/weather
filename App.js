import React, { Component, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';

class App extends Component {

  state = {
    loading: false,
    error: false,
    location: '',
    temperature: 0,
    weather: ''
  }

  componentDidMount() {
    this.handleUpdateLocation('San Francisco');
  }

  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId,
        );

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  render() {

    const {
      loading,
      error,
      location,
      temperature,
      weather
    } = this.state

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='height'
      >
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator
              animating={loading}
              color="white"
              size="large"
            />

            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different
                    city.
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text
                      style={[styles.largeText, styles.textStyle]}
                    >
                      {location}
                    </Text>
                    <Text
                      style={[styles.smallText, styles.textStyle]}
                    >
                      {weather}
                    </Text>
                    <Text
                      style={[styles.largeText, styles.textStyle]}
                    >
                      {`${Math.round(temperature)}°`}
                    </Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
          </View>

        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

// const App = () => {

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState(false);

//   const [location, setLocation] = useState('');

//   const [weather, setWeather] = useState('');

//   const [temperature, setTemperature] = useState(0);



//   useEffect(() => {
//     handleUpdateLocation('San Francisco');
//     if (loading === true) {
//       async () => {
//         try {
//           const locationId = await fetchLocationId(city);
//           const { location, weather, temperature } = await fetchWeather(
//             locationId,
//           );

//           setLoading(false);
//           setError(false);
//           setLocation(location);
//           setWeather(weather);
//           setTemperature(temperature);
//         } catch (e) {
//           setLoading(false);
//           setError(true);
//         }
//       };
//     };
//   }, [location])

//   handleUpdateLocation = async city => {
//     if (!city) return;

//     setLoading(true);
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior='height'
//     >
//       <StatusBar barStyle="light-content" />
//       <ImageBackground
//         source={getImageForWeather(weather)}
//         style={styles.imageContainer}
//         imageStyle={styles.image}
//       >
//         <View style={styles.detailsContainer}>
//           <ActivityIndicator
//             animating={loading}
//             color="white"
//             size="large"
//           />

//           {!loading && (
//             <View>
//               {error && (
//                 <Text style={[styles.smallText, styles.textStyle]}>
//                   Could not load weather, please try a different
//                   city.
//                 </Text>
//               )}

//               {!error && (
//                 <View>
//                   <Text
//                     style={[styles.largeText, styles.textStyle]}
//                   >
//                     {location}
//                   </Text>
//                   <Text
//                     style={[styles.smallText, styles.textStyle]}
//                   >
//                     {weather}
//                   </Text>
//                   <Text
//                     style={[styles.largeText, styles.textStyle]}
//                   >
//                     {`${Math.round(temperature)}°`}
//                   </Text>
//                 </View>
//               )}

//               <SearchInput
//                 placeholder="Search any city"
//                 onSubmit={handleUpdateLocation}
//               />
//             </View>
//           )}
//         </View>

//       </ImageBackground>
//     </KeyboardAvoidingView>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});

export default App;
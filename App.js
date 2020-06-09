import React, { useState, useEffect } from 'react';
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


const App = () => {

  const [weatherData, setWeatherData] = useState({
    loading: false,
    error: false,
    location: '',
    weather: '',
    temperature: 0
  });

  const {
    loading,
    error,
    location,
    weather,
    temperature
  } = weatherData;



  useEffect(() => {
    handleUpdateLocation('San Francisco');
  }, [])

  handleUpdateLocation = async city => {
    if (!city) return;

    setWeatherData({ loading: true });

    async function fetchWeatherData() {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId,
        );

        setWeatherData({
          loading: false,
          error: false,
          location: location,
          weather: weather,
          temperature: temperature
        });
      } catch (e) {
        setWeatherData({
          loading: false,
          error: false
        });
      }
    };

    fetchWeatherData();
  };

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
                    {`${Math.round(temperature)}°C / ${Math.round((temperature * 1.8) + 32)}°F`}
                  </Text>
                </View>
              )}

              <SearchInput
                placeholder="Search any city"
                onSubmit={handleUpdateLocation}
              />
            </View>
          )}
        </View>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

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
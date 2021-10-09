import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground } from 'react-native';

const apiKey = 'd5fa01ce8dc05b7e1b28de0c4a1511fa';
const backgrounWeatherapp = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/496ecb14589707.562865d064f9e.png"

export default function App() {
  // const [count, setCount] = useState(0);
  const [cityName, setCityName] = useState('Hanoi');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  
  const dataWeather = async () => {
    try {
      const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
      setWeatherData(data);
      setLoading(false);
      console.log(data);
    }
    catch(err) {
      // setLoading(false);
      throw err;
    }
  }
  
  useEffect(() => {
    dataWeather();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={backgrounWeatherapp} resizeMode='cover' style={styles.bgImage}>
        <Text style={styles.header}>Weather App</Text>
        <View style={styles.input}>
          <TextInput style={ styles.textInput}placeholder='Enter city' onChangeText={(e) => setCityName(e)}></TextInput>
          <Button style={styles.btn} onPress={()=> dataWeather()} title='Search'/>
        </View>
        {
          isLoading ?
            <Text>No infomation</Text>
            :
            <>
              {
                weatherData !== null ?
                <View style={styles.dataWeather}>
                    <Text style={styles.country}>{weatherData.data.name} - {weatherData.data.sys.country}</Text>
                    <View style={styles.temp}>
                      <Text style={styles.info}>Temp(min): { parseFloat(weatherData.data.main.temp_min - 273.15).toFixed(2) }&deg;C</Text>
                      <Text style={styles.info}>Temp(max): { parseFloat(weatherData.data.main.temp_max - 273.15).toFixed(2) }&deg;C</Text>
                    </View>
                    <Text style={styles.temp}>Temp: {parseFloat(weatherData.data.main.temp - 273.15).toFixed(2)}&deg;C</Text>
                </View>
                :
                <Text>No Infomation</Text>
              }
            </>
        }
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    fontSize: 30,
    marginVertical: 20
  },

  input: {
    marginBottom: 20,
    paddingBottom: 50,
    // backgroundColor: '#fff'
  },

  textInput: {
    backgroundColor: '#fff',
    borderRadius: 3,
    height: 30,
    marginVertical:10,
  },

  btn: {
    width: 10,
    height: 20,
  },

  dataWeather: {
    alignItems: 'center',
  },

  country: {
    fontSize: 20
  },

  info: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },

  temp: {
    flexDirection: 'row',
    marginVertical: 5
  }

});

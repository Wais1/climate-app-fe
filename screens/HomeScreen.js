import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native'
import React from 'react'
// Tailwind styles
import tw from 'twrnc'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin} from "../slices/navSlice"
import NavFavourites from '../components/NavFavourites'

const HomeScreen = () => {
    // To push data into redux store
    const dispatch = useDispatch();

  return (
    //   White background (bg-white)
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
            <Image 
             style={{
                width: 100,
                height: 100, 
                resizeMode: 'contain',
            }}
             source={require("../images/logo2.png")}
            />

            {/* Search for places with Google Places */}
            <GooglePlacesAutocomplete
              placeholder='Pickup from where?'
              styles={{
                 //  container: flex: 0 to get searchbar on screen
                  container: {
                      flex: 0,
                  },
                //   Increased font size
                  textInput: {
                      fontSize: 18,
                  }
              }}
             //   Sets to data store, the location of origin, and reset destinatoin
              onPress={(data, details = null) => {
                  dispatch(setOrigin({
                    //   Will return an object with longitute and latitude of location chosen and pushes to data store (setOrigin).
                      location: details.geometry.location,
                      description: data.description,
                  }));

                //   Destination will be set to null each press
                  dispatch(setDestination(null))
              }}
              // Details include geometry location, coordinates.
              fetchDetails={true}
              returnKeyType={'search'}
              enablePoweredByContainer={false}
              minLength={2}
              //   Apply API key
              query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: 'en',
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
            />

            <NavOptions />
            <NavFavourites />
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, SafeAreaView, requireNativeComponent } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { Avatar } from 'react-native-elements';


const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [title, setTitle] = useState('Finding your driver...')
    const [subtitle, setSubtitle] = useState('Please wait while we find a driver and a nearby checkpoint')
    const [driverFound, setDriverFound] = useState(false)


    useEffect(() => {
        // Simulate driver found time as an API call, can remove if API is implemented
        const nearbyDrier = setTimeout(function() {
          setTitle('A nearby driver was found.')
          setSubtitle('Your driver is on the way...')
          setDriverFound(true)
        }, 6000)
        // Set extra timer for dev

        // Simulate driver arrived
        const arrivedDriver = setTimeout(function() {
          navigation.navigate('SuccessScreen')
        //   set origin to null. crashes
        //   dispatch(setOrigin(null))
        }, 13000)
        return ( ()=> {
            // On cancel, (when component is exited,) clear the request to navigate after driver arrives
            clearTimeout(nearbyDrier)
            clearTimeout(arrivedDriver)
        })
        
      },[])

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
        {/* Profile */}
        { driverFound && (
        <View style={tw`px-6 pt-4 pb-2 flex-row`}>
            <Avatar
            size="medium"
            rounded
            source={require('../images/driver-profile.jpg')}
            />
            <View style={tw`ml-4`}> 
                <Text style={tw`text-lg`}>Arif Susanto</Text>
                <Text>Arriving in approximately 10 minutes</Text>
            </View>
        </View>
         )}

        {/* Information details */}
        <View style={tw`px-6`}>
            <Text style={tw`pt-3 text-emerald-700 font-semibold text-xl`}>{title}</Text>
            <Text style={tw`pt-2 mb-2 text-sm text-gray-600`}>{subtitle}</Text>
        </View>

        {/* // Standard Avatar */}
        {/* Centered text with padding and large text */}
  
{/*
    //   Destination selection no longer being used. kept in case future development requires
      <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View>
              <GooglePlacesAutocomplete
                placeholder='Where to?'
                styles={toInputBoxStyles}
                fetchDetails={true}
                returnKeyType={"search"}
                minLength={2}
                // Set destination in the fields. change later to be origin...
                onPress={(data, details = null) => {
                    dispatch(
                        setDestination({
                        location: details.geometry.location,
                        description: data.description,
                    }))

                    navigation.navigate('RideOptionsCard')
                }}
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: "en",
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                // debounce restricts search for every 400ms, etc
                debounce={400}
              />
          </View>
      </View> */}
    {/* Bottom option cards
      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
          <TouchableOpacity onPress={()=> navigation.navigate('RideOptionsCard')} style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
              <Icon name="car" type="font-awesome" color="white" size={16} />
              <Text style={tw`text-white text-center`}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
              <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
              <Text style={tw`text-black text-center`}>Option 2</Text>
          </TouchableOpacity>
      </View> */}
      
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
})
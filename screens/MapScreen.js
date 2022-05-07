import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import Map from '../components/Map'
import MapView from 'react-native-maps'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const MapScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);


  // Cancel Button With Alert
  const handleCancel = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to cancel the delivery?",
      [
        {
          text: "Yes",
          onPress: () => {Alert.alert("Delivery cenceled"); navigation.navigate('HomeScreen')},
          style: "cancel"
        },
        { text: "No", onPress: () => console.log("Delivery not canceled") }
      ]
    );
  }


  return (
    // Remove this home nav. or ill sob.
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
        <Icon name="menu" />
      </TouchableOpacity>

      {/* //   Utilizes two views. First for map, and second for details. */}
      {/* Uses  h-1/2 to make both views half height of screen
       Does not use SafeAreaView since Map can look OK in dangerous areas around edges of screen */}
      <View style={tw`h-1/2`}>
          <Map />
      </View>

      {/* Remove most of these on the bottom, the stack navigation. instead navigate to another page. */}
      {/* Ride options is no longer being used. Kept in case for future development */}
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>

      </View>
            {/* Next */}
         <View style={[tw`mt-auto border-t border-gray-200 rounded-2x px-5 py-5`, {backgroundColor: '#f0f0f0'}]}>
          
          {/* Status of selection */}
          <View style={tw`mb-3 mx-2`}>
              <Text style={tw`text-gray-700 mb-2`}>
                  You are donating from
              </Text>
                       <View style={tw`flex-row`}>
            <Icon 
              style={tw`mr-2 max-w-10`}
              name={"location"} 
              type="ionicon" 
              color="green" 
              size={30} 
              />
              <Text style={tw`my-auto`}>{origin?.description}</Text>
            </View>
          </View>

          

 
    
  
          <TouchableOpacity onPress={()=> handleCancel()} style={tw`bg-red-500 rounded-5x py-3 m-3 mt-4 mb-7 `}>
            <Text style={tw`text-center text-white font-semibold text-xl`}>Cancel Delivery</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})
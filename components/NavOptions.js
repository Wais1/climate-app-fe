import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data = [
    {
        id: "123",
        title: "Donate Fruit",
        image: require('../images/apple.png'),
        screen: "FoodForm",
    },
    {
        id: "456",
        title: "Learn sustainability ",
        image:  require('../images/sustainability.png'),
        screen: "LearnScreen",
    },
]
const NavOptions = () => {
    // Navigation hook for react-navigation to change screens
    const navigation = useNavigation();

    // Pull origin information from data store
    const origin = useSelector(selectOrigin)

  return (
    //   Create a horizontal list to represent data. Can remove'horizontal' for vertical views here
    // Has key as item id for unique identifier
    // DISABLE the option if origin information is not updated. can change.

    // REMOVED horizontal, from Flatlist space area, and increased width on button style
      <FlatList data={data} keyExtractor={(item) => item.id}      renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate(item.screen)}
            style={tw`p-2 pl-6 pb-4 pt-2 ${!origin || item.id == 456? "bg-gray-200" : "bg-emerald-600"} m-2 w-400`}
            disabled={!origin && item.id=='123'}
          >
              {/* REDUCE opacity if origin information is not here 
              Receives 'unknown false utility warning because of !origin here*/}
              <View style={tw`${!origin && "opacity-20 "} flex-row ${item.id == 456 && "opacity-100"}`}>
                  {/* Image needs style to be viewable */}
                  <Image 
                    style={[tw``,{ width: 75, height: 130, resizeMode: "contain"}]}
                    source={item.image}/>
                    <View style={tw`flex-col ml-10 mt-4 `}>
                        <Text style={tw`mt-2 text-lg ${!origin || item.id == 456? "text-black" : "text-white"} `}>{item.title}</Text>
                        <Icon style={tw`p-2 ${!origin ? "bg-black" : "bg-emerald-800 "} rounded-full w-10 mt-4 items-end`}
                            name="arrowright"
                            color="white"
                            type="antdesign"
                        />
                    </View>
              </View>
          </TouchableOpacity>
      )}
      />
  )
}

export default NavOptions
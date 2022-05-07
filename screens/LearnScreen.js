import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'
import { SafeAreaView } from 'react-native-safe-area-context'

const data = [
    {
        id: "123",
        title: "Save Energy",
        image: require('../images/planet-earth.png'),
        screen: "Article",
    },
    {
        id: "456",
        title: "How To Reuse Fruit ",
        image:  require('../images/sustainability.png'),
        screen: "Article",
    },
]
const LearnScreen = () => {
    // Navigation hook for react-navigation to change screens
    const navigation = useNavigation();

    // Pull origin information from data store
    const origin = useSelector(selectOrigin)

  return (
    //   Create a horizontal list to represent data. Can remove'horizontal' for vertical views here
    // Has key as item id for unique identifier
    // DISABLE the option if origin information is not updated. can change.

    // REMOVED horizontal, from Flatlist space area, and increased width on button style
    <SafeAreaView style={tw`px-5`}>
        <Text style={tw`font-semibold text-3xl mt-10 mb-5`}>Learn</Text>
      <FlatList data={data} keyExtractor={(item) => item.id}      renderItem={({ item }) => (
        //   PASSES Article data in to the new screen through navigate, passes article ID.
          <TouchableOpacity onPress={() => navigation.navigate(item.screen, {id: item.id})}
            style={tw`p-2 pl-6 pb-4 pt-2 bg-gray-200 m-2 w-400`}
            disabled={false}
          >
              {/* REDUCE opacity if origin information is not here 
              Receives 'unknown false utility warning because of !origin here*/}
              <View style={tw`flex-row ${item.id == 456 && "opacity-100"}`}>
                  {/* Image needs style to be viewable */}
                  <Image 
                    style={[tw``,{ width: 75, height: 130, resizeMode: "contain"}]}
                    source={item.image}/>
                    <View style={tw`flex-col ml-10 mt-4 `}>
                        <Text style={tw`mt-2 text-lg font-semibold text-black`}>{item.title}</Text>
                        <View style={tw`flex-row py-2 pl-3 top-4 rounded-2x bg-emerald-700 min-w-40 max-w-40`}>
                            <Text style={tw`text-lg text-white font-semibold my-auto`}>Read Guide</Text>
                            <Icon style={tw`bg-emerald-700 rounded-full w-10 items-end my-auto`}
                                name="arrowright"
                                color="white"
                                type="antdesign"
                            />
                        </View>
                    </View>
              </View>
          </TouchableOpacity>
      )}
      
      />
    </SafeAreaView>
  )
}

export default LearnScreen
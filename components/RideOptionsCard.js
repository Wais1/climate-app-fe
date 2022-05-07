import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'
import 'intl';
import 'intl/locale-data/jsonp/en';

const data = [
  {
    id: "1",
    title: "Option 1",
    multiplier: 1,
    image: require('../images/logo2.png'),
  },
  {
    id: "2",
    title: "Option 2",
    multiplier: 1.2,
    image: require('../images/logo2.png'),
  },
  {
    id: "3",
    title: "Option 3",
    multiplier: 1.75,
    image: require('../images/logo2.png')
  },
];

// Surge pricing increases normal rates.
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = useState(null)

  // Pull travel time info from store
  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  return (
    <SafeAreaView st>
      <View >
        {/* Android bug, this text must be first otherwise navigation touchableopacity breaks. */}
        {/* optional travel time info since it may be loading or not available */}
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('NavigateCard') }style={tw`absolute top-3 left-5 p-3 rounded-full `}>
              <Icon name="chevron-left" type="fontawesome" />
          </TouchableOpacity>
      </View>

      <FlatList data={data}
       keyExtractor={(item) => item.id}
       renderItem={({item: { id, title, multiplier, image }, item }) => (
        //  Apply conditional style to cause selected item to highlight
        // TEMPORARY height value to fix android small screen bug
         <TouchableOpacity onPress={() => setSelected(item)} style={tw`flex-row h-17 justify-between items-center px-7 ${id === selected?.id && "bg-gray-300"}`}>
           <Image
           style={{
             width: 100,
             height: 100,
             resizeMode: "contain",
           }}
           source={{ uri: image }}
           />
           <View style={tw`-ml-6`}>
             <Text style={tw`text-xl font-semibold`}>{title}</Text>
             {/* Important that this info is optional as it may be loading */}
             <Text>{travelTimeInformation?.duration?.text}</Text>
           </View>
           <Text style={tw`text-xl`}>

             {new Intl.NumberFormat('id-ID', {
               style: 'currency',
               currency: 'IDR'
             }).format(

              (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100

             )}

           </Text>
         </TouchableOpacity>
       )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity disabled={!selected} style={tw`bg-green-900 rounded-5x py-3 m-3 mt-4 ${!selected && "bg-gray-300"}`}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
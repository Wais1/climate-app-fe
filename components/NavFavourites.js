import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';

const data = [
    {
        id: "456",
        icon: "heart",
        name: "Fruit Checker",
        description: "Check your fruits edibility.",
        link: "CameraScreen"
    },
    {
        id: "123",
        icon: "help",
        name: "About This App",
        description: "Learn how this works.",
        link: "About"
    },
];

const NavFavourites = () => {
    const navigate = useNavigation()
  return (
    <FlatList
     data={data} keyExtractor={(item) => item.id}
     ItemSeparatorComponent={() => (
         <View 
          style={[tw`bg-gray-200`, { height: 0.5 }]}
         
         />
     )}
     renderItem={({item: { name, description, icon, link } }) => (
        <TouchableOpacity onPress={() => navigate.navigate(link)} style={tw`flex-row items-center p-5`}>
            <Icon 
             style={tw`mr-4 rounded-full bg-gray-300 p-3`}
             name={icon} 
             type="ionicon" 
             color="white" 
             size={18} 
             />
            <View>
                <Text style={tw`font-semibold text-lg`}>{name}</Text>
                <Text style={tw`text-gray-500`}>{description}</Text>
            </View>
        </TouchableOpacity>
    )} 
    />
  )
}

export default NavFavourites

const styles = StyleSheet.create({})
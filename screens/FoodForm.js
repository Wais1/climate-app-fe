import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon, Input } from 'react-native-elements';
import NavFavourites from '../components/NavFavourites'
import tw from 'twrnc'
import { selectOrigin } from '../slices/navSlice';
import { useSelector } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BackComponent from '../components/BackComponent';
const FoodForm = () => {

    const navigate = useNavigation()
    const [validForm, setValidForm] = useState(false)
    const [description, setDescription] = useState(false)
    const origin = useSelector(selectOrigin);

    const [selectedDonation, setSelectedDonation] = useState({
        id: "1",
        title: "",
        image: require('../images/apple.png'),
    })

    // Donation selection options
    const data = [
        {
            id: "123",
            title: "Fresh Fruit",
            image: require('../images/apple.png'),
        },
        {
            id: "456",
            title: "Compost",
            image:  require('../images/sustainability.png'),
        },
    ]

    // Confirm submission With Alert
    const handleConfirm = () => {
        Alert.alert(
        "Confirm",
        "Would you like to confirm this submission?",
        [
            {
            text: "Confirm",
            onPress: () => navigate.navigate('MapScreen'),
            style: "cancel"
            },
            { text: "Cancel", onPress: () => console.log("Delivery not canceled") }
        ]
        );
    }

    useEffect(()=> {
        // Check form data if option is chosen
        const validity = selectedDonation?.id == '123' || selectedDonation?.id == '456' ? true : false
        setValidForm(validity)
    },[selectedDonation])
    
    return (
        //   Component ecomes huge becaue offlex-1, butn eeded for donation to be on bottom, or use aboslute
        <SafeAreaView style={tw`flex-1 px-8 py-5`}>
        {/* Nav BACK button. can separate into a different component*/}
        <BackComponent />
        
        <Text style={tw`text-md mt-3 mb-2 text-gray-600`}>Select a donation </Text> 
      {/* Food selection */}
      <FlatList style={tw`max-h-38 min-h-18`} data={data} keyExtractor={(item) => item.id} horizontal  renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedDonation(item)}
          //   applied max height to tackle flex-1 stretching component
          style={tw`pb-2 rounded-6x pt-2  ${selectedDonation.id != item.id? "bg-gray-200" : "bg-emerald-600"} m-2 w-40`}
          >
              {/* REDUCE opacity if origin information is not here 
              Receives 'unknown false utility warning because of !origin here*/}
              <View style={tw`${selectedDonation.id != item.id? "opacity-20" : "opacity-100"}`}>
                  {/* Image needs style to be viewable */}
                  <Image
                    style={[tw`mx-auto`,{ width: 50, height: 35, resizeMode: "contain"}]}
                    source={item.image}/>
                    <View style={tw`mx-auto`}>
                        <Text style={tw`mt-2 text-base ${selectedDonation.id != item.id? "text-black" : "text-white"} `}>{item.title}</Text>
                        <Icon style={tw`p-2 ${selectedDonation.id != item.id? "bg-black" : "bg-emerald-800 "} rounded-full w-10 mx-auto mt-3`}
                            name="check"
                            color="white"
                            type="antdesign"
                        />
                    </View>
              </View>
          </TouchableOpacity>
      )}
      />

      {/* Description */}
      <Text style={tw`mt-6  text-gray-700`}>Description  </Text>
      {/* <TextInput style={tw`mt-3 mb-6`} placeholder='Food Description (optional)'>
      </TextInput> */}
        <TextInput
            style={tw`py-5`}
            maxLength={150}
            onChangeText={(text) => setDescription(text)}
            placeholder="Food description (Optional)"
        />
      {/* Guidelines */}
       <TouchableOpacity onPress={() => navigate.navigate('Guidelines')}>
        <View style={tw`px-3 py-4 ${validForm? "bg-emerald-600" : "bg-gray-400"} rounded-3x flex-row`}>
            <Icon style={tw`p-2 ${validForm? "bg-emerald-800 " : "bg-gray-500 "}rounded-full w-10 mx-auto`}
                                name="bars"
                                color="white"
                                type="antdesign"
                            />
            <Text style={tw`ml-4 my-auto text-sm text-white`}>View guidelines on donating {selectedDonation?.title}</Text>
        </View>
      </TouchableOpacity>
      

    {/* Fruit Checker */}
      <NavFavourites />


      {/* Next */}
      <View style={[tw`mt-auto border-t border-gray-200 rounded-2x`, {backgroundColor: '#f0f0f0'}]}>
          
        {/* Status of selection */}
        <View style={tw`mt-3 mb-2`}>
          <View style={tw`flex-row`}>
            <Text style={tw`text-gray-600 mb-1`}>
                You are donating{" "}
            </Text>
            <Text style={tw`font-bold text-emerald-800 mb-1`}>
              {selectedDonation.title} 
            </Text>
          </View>
          <View style={tw`flex-row`}>
          <Icon 
              style={tw`mr-2 max-w-10`}
              name={"location"} 
              type="ionicon" 
              color="green" 
              size={30} 
              />
              <Text style={tw`my-auto`}>From {origin?.description.substring(0,40)}</Text>
            </View>
        </View>

        <TouchableOpacity onPress={()=> handleConfirm()} disabled={!validForm} style={tw`bg-emerald-600 rounded-5x py-3 m-3 mt-4 ${!validForm && "bg-neutral-300"}`}>
          <Text style={tw`text-center text-white font-semibold text-xl`}>Donate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default FoodForm

const styles = StyleSheet.create({})
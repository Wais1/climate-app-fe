import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import BackComponent from '../components/BackComponent'

const FoodCheckerResult = (props) => {
    const navigate = useNavigation()
    const [highlightFruit, setHighlightFruit] = useState(null)

    // console.log(props.route.params.data)

    // Finds highlight in the details
    const getFruitDetails = () => {
        const foodStat = props.route.params.data.detail

        let largestNum = 0;
        let probFruit = null;

        foodStat.forEach(fruitObj => {
            if(fruitObj.prob > largestNum) {
                probFruit = fruitObj
                largestNum = fruitObj.prob
            }
        })

        // Update state to highlights found
        setHighlightFruit(probFruit)
        console.log(`Biggest probability is ${probFruit.class} with a ${largestNum} possibility`)
    }

    // Gets fruit details and sets it into state
    useEffect(() => {
        // Get details and set them to state
        getFruitDetails()
    }, [props])

    // <Image>{props.route.params.data.gradcam}</Image>
    return (
    <View style={tw`mt-30 px-6 flex-1`}>
        <BackComponent />
        <Text style={tw`text-2xl text-emerald-800 mb-5 mt-5 ml-2 font-semibold`}>Fruit Scan Result</Text>
        <Image style={[styles.mediaPreview,tw`w-60 h-60 border-solid border-2 mx-auto border-green-800 mt-5 mb-5`]} source={{uri: `data:image/jpeg;base64,${props.route.params.data.gradcam}`}} />  
        {/* <Text style={tw`text-2xl mx-auto mb-5 text-gray-900 font-semibold`}>Result</Text> */}
            <Text style={tw`text-lg mx-auto text-3xl text-emerald-800 font-bold`}>{highlightFruit?.prob}{"%"}</Text>
            <Text style={tw`text-xl mb-5 mt-5 mx-auto max-w-60 text-gray-900`}>Probability of {highlightFruit?.class} </Text>
            <Text style={tw`text-md mb-5 mt-10 mx-auto px-5 text-gray-600`}>Please note this version only supports bananas, apples, and oranges. </Text>
        {/* Go Home button */}
        <TouchableOpacity onPress={() => navigate.navigate('HomeScreen')} style={tw`mx-auto mt-10 text flex-row bg-green-800 py-3 px-4 rounded `}>
                  <Icon style={tw`mr-3`} name="return-down-back-outline" type='ionicon' size={28} color="white"/>
                  <Text style={tw`text-xl font-semibold text-white`}>Finish</Text>
        </TouchableOpacity>      
    </View>
  )
}

export default FoodCheckerResult

const styles = StyleSheet.create({})
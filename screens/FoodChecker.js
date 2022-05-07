import { ActivityIndicator, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CameraScreen from './camera/CameraScreen'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import tw from 'twrnc'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import * as FileSystem from 'expo-file-system'
import * as ImageManipulator from 'expo-image-manipulator'
import BackComponent from '../components/BackComponent'

const FoodChecker = (props) => {
    const [description, setDescription] = useState('')
    // Show loading when post is saving
    const [requestRunning, setRequestRunning] = useState(false)
    const navigate = useNavigation()

    const dispatch = useDispatch()

    // Converts Image URI to base64 using expo file system
    // Perhaps the / in front shouldnt be present
    async function convertBase64(uri) {
        try {
           const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
        //    console.log(base64)

           return base64;
        } catch(error) {
            console.error(error)
        }
    }

    const handleSavePost = async () => {
        setRequestRunning(true)

        // Send URI of Image to convert to base64
        const uri = props.route.params.source
        console.log(uri)

        // Compress image first

        // Convert to base64
        const base64 = await convertBase64(uri)
        console.log(base64)
        const data = { data: base64 }
        const ENDPOINT = 'http://ec2-54-169-153-22.ap-southeast-1.compute.amazonaws.com/api/v1/fruit-app/image' 

        // POST req to API for rotten fruit
        await fetch(ENDPOINT, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
            // handle when fetch is complete
        }).then(response => response.json()).then(data => {
            console.log('Successful post request :D')
            console.log('Response:')
            console.log(data)
            console.info('=================')
            // Stop loading
            setRequestRunning(false)
            // Navigate to result page with data received from API
            navigate.navigate('FoodCheckerResult', {data: data})
        }).catch(err => {
            setRequestRunning(false)
            console.error(err)
         })
    }

    // Loading screen
    if(requestRunning) {
        return(
            <View style={styles.uploadingContainer}>
                <Text style={tw`mb-20 text-xl text-green-800 font-semibold`}>We're scanning your fruit...</Text>
                <ActivityIndicator color='green' size='large'/>

                <TouchableOpacity onPress={() => navigate.goBack()} style={[tw`mt-90`,styles.cancelButton]}>
                  <Icon name="close-outline" type='ionicon' size={28} color="black"/>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
        )
    }
  return (
      <View style={styles.container}>
          {/* Description form */}
          <View style={styles.formContainer}>
          <BackComponent />
              {/* <TextInput
                style={styles.inputText}
                maxLength={150}
                multiline
                onChangeText={(text) => setDescription(text)}
                placeholder="Describe your image"
              /> */}
              <Text>Confirm the correct image</Text>
              <Image style={styles.mediaPreview} source={{uri: props.route.params.source}}/>
          </View>
          {/* Buttons */}
          <View style={styles.spacer}/>
          <View style={[styles.buttonsContainer,tw`mx-auto mb-10`]}>
              <TouchableOpacity onPress={() => navigate.goBack()} style={styles.cancelButton}>
                  <Icon name="close-outline" type='ionicon' size={28} color="black"/>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleSavePost()} style={styles.postButton}>
                  <Icon name="arrow-up" type='ionicon' size={28} color="white"/>
                  <Text style={styles.postButtonText}>See Report</Text>
              </TouchableOpacity>
          </View>
      </View>
  )
}

export default FoodChecker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white'
    },
    uploadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    spacer: {
        flex: 1
    },
    formContainer: {
        margin: 20,
        flexDirection: 'row'
    },
    buttonsContainer: {
        flexDirection: 'row',
        margin: 0,
    },
    inputText: {
        paddingVertical: 10,
        marginRight: 20,
        flex: 1
    },
    mediaPreview: {
        aspectRatio: 9 / 16,
        backgroundColor: 'black',
        width: 90
    },
    cancelButton: {
        alignItems: 'center',
        flex: 0,
        borderColor: 'lightgray',
        borderWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    postButton: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#248a31',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    cancelButtonText: {
        marginLeft: 5,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    postButtonText: {
        marginLeft: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})
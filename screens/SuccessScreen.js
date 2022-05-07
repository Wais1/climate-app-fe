import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Audio } from 'expo-av';
import { setStatusBarBackgroundColor } from 'expo-status-bar'

const SuccessScreen = () => {
    const navigate = useNavigation()
    const [sound, setSound] = useState(null)

    // Play success sound
    async function playSound() {
        console.log('Loading sound')
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/success.wav')
        );
        setSound(sound);

        console.log('Play sound')
        await sound.playAsync(); 
    }

    // Unload sound if exit component
        useEffect(() => {
            // Play a sound
            playSound()
            
            return sound? () => {
                console.log('Unloading Sound');
                sound.unloadAsync(); 
            }: undefined;
            // used to depend on 'sound', no longer added due to recursive bug
        }, []);

  return (
    <View style={tw`bg-emerald-600 h-full flex-1 justify-center items-center px-15`}>
      {/* <Image></Image>     */}
      <Image
             style={[{
                width: 70,
                height: 70, 
                resizeMode: 'contain',
            },tw`mb-5`]}
             source={require("../images/logo2.png")}
            />
      <Text style={tw`text-center flex text-2xl text-white font-bold `}>Success!</Text>
      <Text style={tw`mt-2 text-center flex text-xl text-white`}>Thank you for your donation.</Text>  
      <TouchableOpacity onPress={() => navigate.navigate('HomeScreen')} style={tw`absolute bottom-10 py-3 w-full  rounded-3xl bg-emerald-900`}>
          <Text style={tw`text-white font-bold text-lg text-center`}>Finish</Text>
      </TouchableOpacity>


    </View>
  )
}

export default SuccessScreen

const styles = StyleSheet.create({})
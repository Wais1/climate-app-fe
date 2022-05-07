import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import tw from 'twrnc'

const CameraScreen = () => {
    const [hasCameraPermissions, setHasCameraPermissions] = useState(false)
    const [hasAudioPermissions, setHasAudioPermissions] = useState(false)
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false)

    const [galleryItems, setGalleryItems] = useState([])

    const [cameraRef, setCameraRef] = useState(null)

    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)

    const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off)

    // Handles state when camera is loaded.
    const [isCameraReady, setIsCameraReady] = useState(false)

    // Hook by react-navigation to know if the component is in view
    const isFocused = useIsFocused()

    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
            // Update camera, audio, gallery picker permissions to state
            // CHECK UPDATE requestPermissionsAsync to requestCameraPermissionsAsync
            const cameraStatus = await Camera.requestCameraPermissionsAsync()
            setHasCameraPermissions(cameraStatus.status === 'granted')
            
            // MUST CHECK is it Audio.requestPermissionsAsync new function
            const audioStatus = await Audio.requestPermissionsAsync()
            setHasAudioPermissions(audioStatus.status === 'granted')
            
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermissions(galleryStatus.status === 'granted')

            // Update 'video' to photo, get latest images from gallery
            if(galleryStatus.status == 'granted') {
                const userGalleryMedia = await MediaLibrary.getAssetsAsync({sortBy: ['creationTime'], mediaType: ['photo']})
                setGalleryItems(userGalleryMedia.assets)
            }

            // Parentheses return a promise. Necessary for function
        })()
    }, [])

    // Take a picture
    const takePicture = async () => {
      if(cameraRef) {
        try{
          const options = {base64: true, quality: 0.1}
          const photoPromise = await cameraRef.takePictureAsync(options)
          
          if(photoPromise) {
            // Video stored here. Data.URI points to where video is stored in the phone. called only after video is finished (after await is done)
            const data = await photoPromise;
            const source = data.uri
            navigation.navigate('FoodChecker', {source})
          }
        } catch(error) {
          console.warn(error)
        }
      }
    }

    // Record video
    const recordVideo = async () => {
      if(cameraRef) {
        try{
          const options = {maxDuration: 60, quality: Camera.Constants.VideoQuality['480']}
          const videoRecordPromise = cameraRef.recordAsync(options)
          if(videoRecordPromise) {
            // Video stored here. Data.URI points to where video is stored in the phone. called only after video is finished (after await is done)
            const data = await videoRecordPromise;
            const source = data.uri
            navigation.navigate('FoodChecker', {source})
          }
        } catch(error) {
          console.warn(error)
        }
      }
    }
    // Stop video recording
    const stopVideo = async () => {
      if(cameraRef) {
        cameraRef.stopRecording()
      }
    }

    // Gallery picker. Use this library in the other screen too. and have it automatically chosen when photo is taken.
    const pickFromGallery = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        // CAN change this to MediaTypeOptions.Videos for video results
        // Otherwise, currently restrict selection to images
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1
      })
      // If image picker is not canceled, AKA, user successfuly selects an image.
      if(!result.cancelled) {
        navigation.navigate('FoodChecker', {source: result.uri})
      }
    }

    // With no permissions granted, return an empty view.
    // Can also add || !hasAudioPermissions || !hasGalleryPermissions if needed
    // doesnt ask for gallery or mic yet
    if(!hasCameraPermissions) {
      return(
        <View></View>
      )
    }

  return (
    <View style={styles.container}>
       <Text style={[tw`absolute left-10 top-20 bg-green-900 py-2 px-4 font-semibold z-100 text-white text-lg `]}>Please take a photo of your fruit!</Text>
      { isFocused? 
      <Camera ref={ref => setCameraRef(ref)} style={styles.camera} ratio={'16:9'} type={cameraType} flashMode={cameraFlash} onCameraReady={() => setIsCameraReady(true)}/>
    : null}

    {/* Sidebar menu items */}
    {/* Flip camera */}
      <View style={styles.sideBarContainer}>
        <TouchableOpacity style={styles.sideBarButton} onPress={() => setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
          <Icon name="camera-reverse-outline" type='ionicon' size={34} color={'white'} />
          <Text style={styles.iconText}>Flip</Text>
         
        </TouchableOpacity>
    {/* Flash */}
        <TouchableOpacity style={styles.sideBarButton} onPress={() => setCameraFlash(cameraFlash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off)}>
          <Icon name="flash" type='ionicon' size={34} color={'white'} />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBarContainer}>
        <View style={{flex: 1}}>
        </View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity disabled={!isCameraReady} onPress={() => takePicture()} onLongPress={() => recordVideo()} onPressOut={() => stopVideo()} style={styles.recordButton} />
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity 
          onPress={() => pickFromGallery()}
          style={styles.galleryButton}>
            {galleryItems[0] == undefined ? 
            <></>
          :
          <Image
           style={styles.galleryButtonImage}
           source={{uri: galleryItems[0].uri }}
          />}
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default CameraScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0
  },
  camera: {
    flex: 1,
    backgroundColor: 'black',
    aspectRatio: 9 / 16,
  },
  bottomBarContainer: {
    alignItems: 'center',
    // Absolute is required to overlay the camera screen
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    marginBottom: 30,
  },
  recordButtonContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  recordButton: {
    borderWidth: 8,
    borderColor: '#64b57a',
    backgroundColor: '#52a869',
    borderRadius: 100,
    height: 80,
    width: 80,
    alignSelf: 'center'
  },
  galleryButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: 50,
    height: 50,
  },
  galleryButtonImage: {
    width: 50,
    height: 50,
  },
  sideBarContainer: {
    top: 150,
    right: 0,
    marginHorizontal: 20,
    position: 'absolute'
  },
  iconText: {
    color: "white",
    fontSize: 12,
    marginTop: 5
  },
  sideBarButton: {
    alignItems: 'center',
    marginBottom: 25
  }
});
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import tw from 'twrnc'
import * as theme from '../theme'
import { useNavigation } from '@react-navigation/native';

const BackComponent = () => {
    const navigate = useNavigation()
    
  return (
    <View>
    <TouchableOpacity
      style={tw`mb-2`}
      onPress={() => navigate.goBack()}
    >
      <FontAwesome
        name="chevron-left"
        color='green'
        size={theme.sizes.font * 1.4}
      />
    </TouchableOpacity>
  </View>
  )
}

export default BackComponent

const styles = StyleSheet.create({})
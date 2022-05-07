import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import BackComponent from '../components/BackComponent'

const Guidelines = () => {
  return (
    <ScrollView style={tw`bg-gray-200`}> 
    <SafeAreaView style={tw``}>
      {/* Container */}
      <View style={tw`px-5 py-5`}>
    <BackComponent />
        <Text style={tw`text-2xl text-emerald-800 font-semibold my-4 mb-10`}>Guidelines on Food Donations</Text>
        {/* Guideline max height 1/3*/}
        <View style={tw`flex-row mb-3 h-1/4  bg-gray-300 py-3 px-3 rounded-3x`}>
          <Text style={tw`text-6xl text-emerald-800 font-semibold text-decoration-line: underline mx-2 my-auto`}>1</Text>
          <View style={tw`ml-3`}>
             <Text style={tw`text-2xl text-emerald-800 mx-5 pt-2 font-bold`}>Packaging</Text>
             <Text style={tw`text-lg text-gray-800 mx-5 `}>If possible, try to use...</Text>
          </View>
        </View>
        <View style={tw`flex-row mb-3 h-1/4  bg-gray-300 py-3 px-3 rounded-3x`}>
          <Text style={tw`text-6xl text-emerald-800 font-semibold text-decoration-line: underline mx-2 my-auto`}>1</Text>
          <View style={tw`ml-3`}>
             <Text style={tw`text-2xl text-emerald-800 mx-5 pt-2 font-bold`}>Packaging</Text>
             <Text style={tw`text-lg text-gray-800 mx-5 `}>If possible, try to use...</Text>
          </View>
        </View>
        <View style={tw`flex-row mb-3 h-1/4  bg-gray-300 py-3 px-3 rounded-3x`}>
          <Text style={tw`text-6xl text-emerald-800 font-semibold text-decoration-line: underline mx-2 my-auto`}>1</Text>
          <View style={tw`ml-3`}>
             <Text style={tw`text-2xl text-emerald-800 mx-5 pt-2 font-bold`}>Packaging</Text>
             <Text style={tw`text-lg text-gray-800 mx-5 `}>If possible, try to use...</Text>
          </View>
        </View>

      {/* Thank you message */}
        <View style={tw`flex-row mb-3 `}>
          <Text style={tw`text-3xl`}>Lastly,</Text>
          <View>
             <Text style={tw`text-2xl mx-5 font-bold`}>Thank you for donating.</Text>
             <Text style={tw`text-xl mx-5 `}></Text>
          </View>
        </View>





      </View>
    </SafeAreaView>
    </ScrollView>
  )
}

export default Guidelines

const styles = StyleSheet.create({})
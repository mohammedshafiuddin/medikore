import React from 'react';
import { View, ScrollView } from 'react-native';
import { MyText } from "@common_ui";
import { tw } from "@common_ui";
import { ThemedView } from '@/components/ThemedView';
import AppContainer from '@/components/app-container';

export default function AddTokenScreen() {
  return (
    <AppContainer>
      <View style={tw`flex-1 p-4`}>
        <MyText style={tw`text-2xl font-bold mb-6`}>Add Token</MyText>
        
        <ThemedView style={tw`p-4 rounded-lg mb-4`}>
          <MyText style={tw`text-lg mb-2`}>Token Information</MyText>
          <MyText style={tw`text-base`}>
            This is the screen where users can add a new token.
          </MyText>
        </ThemedView>
        
        <ScrollView style={tw`flex-1`}>
          {/* Add token form components would go here */}
          <View style={tw`mb-4 p-4 bg-gray-100 rounded-lg`}>
            <MyText>Token creation functionality would be implemented here</MyText>
          </View>
        </ScrollView>
      </View>
    </AppContainer>
  );
}
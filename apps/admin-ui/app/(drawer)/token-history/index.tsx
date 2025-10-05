import React from 'react';
import { View } from 'react-native';
import { MyText, tw } from '@common_ui';
import AppContainer from '@/components/app-container';
import { ThemedView } from '@/components/ThemedView';

export default function TokenHistoryScreen() {
  return (
    <AppContainer>
      <ThemedView style={tw`flex-1 items-center justify-center`}>
        <MyText style={tw`text-2xl font-bold`}>Token History Page</MyText>
        <MyText style={tw`mt-4 text-gray-600`}>Content coming soon!</MyText>
      </ThemedView>
    </AppContainer>
  );
}
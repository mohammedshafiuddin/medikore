import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@common_ui';

export default function MyTokensLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: colors.blue1,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'My Tokens',
          headerShown: false
        }} 
      />
    </Stack>
  );
}

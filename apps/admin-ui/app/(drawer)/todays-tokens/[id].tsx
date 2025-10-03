import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import AppContainer from '@/components/app-container';
import { MyText } from "@common_ui";
import { useDoctorTodaysTokens } from '@/api-hooks/token.api';
import { DoctorTodayToken } from 'shared-types';
import tw from '@/app/tailwind';
import { Ionicons } from '@expo/vector-icons';
import DoctorTokenCard from './DoctorTokenCard';
import { LinearGradient } from 'expo-linear-gradient';

export default function DoctorTokensPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const doctorId = typeof id === 'string' ? parseInt(id) : 0;

  const { data, isLoading, isError, error, refetch } = useDoctorTodaysTokens(doctorId);

  return (
    <AppContainer>
      <ScrollView style={tw`flex-1 bg-gray-50`}>
        <View style={tw`p-5`}>
          <LinearGradient 
            colors={['#4361ee', '#3a0ca3']} 
            style={tw`p-5 rounded-2xl shadow-lg mb-6`}
          >
            <MyText style={tw`text-white text-2xl font-bold mb-1`}>
              {data?.doctorName || 'Doctor'}'s Tokens
            </MyText>
            <MyText style={tw`text-blue-100`}>
              {data?.date}
            </MyText>
          </LinearGradient>

          {isLoading ? (
            <View style={tw`items-center justify-center py-12`}>
              <ActivityIndicator size="large" color="#4361ee" />
              <MyText style={tw`mt-4 text-gray-600`}>Loading tokens...</MyText>
            </View>
          ) : isError ? (
            <View style={tw`bg-red-50 p-5 rounded-2xl shadow mb-4 border border-red-200`}>
              <MyText style={tw`text-red-700 font-medium`}>
                Error loading tokens: {error instanceof Error ? error.message : 'Unknown error'}
              </MyText>
              <TouchableOpacity style={tw`bg-blue-600 px-5 py-3 rounded-xl mt-4 self-start`} onPress={() => refetch()}>
                <MyText style={tw`text-white font-bold`}>Retry</MyText>
              </TouchableOpacity>
            </View>
          ) : data?.tokens && data.tokens.length > 0 ? (
            data.tokens.map((token: DoctorTodayToken) => (
              <DoctorTokenCard key={token.id} token={token} />
            ))
          ) : (
            <View style={tw`bg-white p-8 rounded-2xl shadow-lg items-center`}>
              <Ionicons name="calendar-outline" size={56} color="#9ca3af" />
              <MyText style={tw`text-center text-gray-500 mt-4 text-lg`}>
                No tokens available for this doctor today.
              </MyText>
            </View>
          )}
        </View>
      </ScrollView>
    </AppContainer>
  );
}

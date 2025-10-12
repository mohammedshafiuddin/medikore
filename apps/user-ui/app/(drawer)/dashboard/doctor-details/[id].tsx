import React from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import tw from '@/app/tailwind';
import { ThemedView } from '@/components/ThemedView';
import { MyText } from 'common-ui';
import { useRouter } from 'expo-router';
import useHideDrawerHeader from '@/hooks/useHideDrawerHeader';
import { useRoles } from '@/components/context/roles-context';
import { ROLE_NAMES } from '@/lib/constants';
import { useThemeColor } from '@/hooks/useThemeColor';
import UserDetailsUserPov from '@/components/user-details-user-pov';
import { Ionicons } from '@expo/vector-icons';

export default function DoctorDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctorId = parseInt(id as string);
  const router = useRouter();
  useHideDrawerHeader();
  const roles = useRoles();
  const accentColor = useThemeColor({ light: '#4f46e5', dark: '#818cf8' }, 'tint');
  
  // Check for admin privileges
  const isAdmin = roles?.includes(ROLE_NAMES.ADMIN);
  const isHospitalAdmin = roles?.includes(ROLE_NAMES.HOSPITAL_ADMIN);
  
  // If roles are still loading, show a loading indicator
  if (!roles) {
    return (
      <ThemedView style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color={accentColor} />
        <MyText style={tw`mt-4`}>Loading...</MyText>
      </ThemedView>
    );
  }

  // Handle invalid doctor ID
  if (isNaN(doctorId)) {
    return (
      <ThemedView style={tw`flex-1 p-4 justify-center items-center`}>
        <View style={tw`bg-white dark:bg-gray-800 rounded-2xl p-6 items-center shadow-md`}>
          <Ionicons name="alert-circle" size={48} color="#ef4444" />
          <MyText style={tw`text-red-500 text-lg font-bold mt-4 mb-2`}>Invalid Doctor ID</MyText>
          <MyText style={tw`text-gray-600 dark:text-gray-400 text-center mb-6`}>
            The doctor ID provided is not valid. Please check and try again.
          </MyText>
          <View style={tw`bg-blue-500 px-6 py-3 rounded-full`}>
            <MyText 
              style={tw`text-white font-bold text-center`}
              onPress={() => router.back()}
            >
              Go Back
            </MyText>
          </View>
        </View>
      </ThemedView>
    );
  }

    return <UserDetailsUserPov doctorId={doctorId} />;
}

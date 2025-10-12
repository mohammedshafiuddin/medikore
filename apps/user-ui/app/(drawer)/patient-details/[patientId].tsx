import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useGetPatientDetails } from '@/api-hooks/user.api';
import tw from '../../tailwind';

export default function PatientDetailsPage() {
  const { patientId } = useLocalSearchParams();
  const { data: patient, isLoading, error } = useGetPatientDetails(patientId as string);

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Error loading patient details</Text>
      </View>
    );
  }

  if (!patient) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Patient not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Patient Details</Text>
      <Text style={tw`text-lg mb-2`}>Name: {patient.name}</Text>
      <Text style={tw`text-lg mb-2`}>Age: {patient.age}</Text>
      <Text style={tw`text-lg mb-2`}>Gender: {patient.gender}</Text>
      <Text style={tw`text-lg mb-4`}>Last Consultation: {patient.last_consultation}</Text>

      <Text style={tw`text-xl font-bold mb-2`}>Consultation History</Text>
      {patient.consultationHistory.map((consultation, index) => (
        <View key={index} style={tw`mb-4 p-4 border border-gray-300 rounded`}>
          <Text>Date: {consultation.date}</Text>
          <Text>Doctor ID: {consultation.doctorId}</Text>
          <Text>Notes: {consultation.notes}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
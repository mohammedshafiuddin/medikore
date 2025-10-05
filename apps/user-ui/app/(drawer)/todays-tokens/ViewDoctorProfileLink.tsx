import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MyText, tw } from '@common_ui';
import { useRouter } from 'expo-router';

interface ViewDoctorProfileLinkProps {
  doctorId: number;
}

const ViewDoctorProfileLink: React.FC<ViewDoctorProfileLinkProps> = ({ doctorId }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={tw`bg-blue-100 px-5 py-3 rounded-xl mt-6`}
      onPress={() => router.replace(`/(drawer)/doctors/${doctorId}`)}
    >
      <MyText style={tw`text-blue-600 font-bold`}>View Doctor Profile</MyText>
    </TouchableOpacity>
  );
};

export default ViewDoctorProfileLink;
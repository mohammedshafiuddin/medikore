import React, { useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { MyText, tw } from '@common_ui';
import AppContainer from '@/components/app-container';
import { ThemedView } from '@/components/ThemedView';
import { DataTable } from 'react-native-paper';
import { useGetHospitalTokenHistory } from '@/api-hooks/token.api';
import { Ionicons } from '@expo/vector-icons';

export default function TokenHistoryScreen() {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 20]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const { data, isLoading, isError, error } = useGetHospitalTokenHistory(page + 1, itemsPerPage);
  console.log({ error });
  

  const tokens = data?.tokens || [];
  const totalCount = data?.totalCount || 0;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, totalCount);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  if (isLoading) {
    return (
      <AppContainer>
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color={tw.color("blue-500")} />
          <MyText style={tw`mt-4 text-lg`}>Loading token history...</MyText>
        </View>
      </AppContainer>
    );
  }

  if (isError) {
    return (
      <AppContainer>
        <View style={tw`flex-1 justify-center items-center p-4`}>
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={tw.color("red-500")}
          />
          <MyText style={tw`text-red-500 text-center mt-4 text-lg`}>
            Failed to load token history. Please try again later.
          </MyText>
        </View>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <ThemedView style={tw`flex-1`}>
        <View style={tw`bg-blue-600 p-6 rounded-b-3xl mb-6`}>
          <MyText style={tw`text-2xl font-bold text-white mb-2`}>
            Token History
          </MyText>
          <MyText style={tw`text-white text-opacity-90`}>
            View past and upcoming token details
          </MyText>
        </View>

        <ScrollView style={tw`flex-1 px-4`} showsVerticalScrollIndicator={false}>
          <ThemedView style={tw`p-5 rounded-2xl shadow-md mb-6 border border-gray-200`}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Queue No.</DataTable.Title>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Doctor</DataTable.Title>
                <DataTable.Title>Patient</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
              </DataTable.Header>

              {tokens.map((token) => (
                <DataTable.Row key={token.id}>
                  <DataTable.Cell>{token.queueNum}</DataTable.Cell>
                  <DataTable.Cell>{token.tokenDate}</DataTable.Cell>
                  <DataTable.Cell>{token.doctorName}</DataTable.Cell>
                  <DataTable.Cell>{token.patientName}</DataTable.Cell>
                  <DataTable.Cell>{token.status}</DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(totalCount / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${totalCount}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Rows per page'}
              />
            </DataTable>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </AppContainer>
  );
}
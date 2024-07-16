import React from 'react';
import {ScrollView, Text, View} from 'react-native';

type PaginationProps = {
  data: {
    cohortList: number[];
    cohort: number;
  };
};

function Pagination({data}: PaginationProps): React.JSX.Element {
  return (
    <ScrollView horizontal={true}>
      {data?.cohortList?.map((el, index) => (
        <View key={index}>
          <Text>{el}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default Pagination;

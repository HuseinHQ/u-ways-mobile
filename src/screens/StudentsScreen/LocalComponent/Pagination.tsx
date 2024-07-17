import {RootState} from '@/store/store';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

type PaginationProps = {
  data: {
    cohortList: number[];
    cohort: number | null;
  };
  onClick: (value: number) => void;
};

function Pagination({
  data,
  onClick = () => {},
}: PaginationProps): React.JSX.Element {
  const loading = useSelector((state: RootState) => state.student.loading);

  return (
    <ScrollView horizontal={true}>
      {data?.cohortList?.map((el, index) => (
        <TouchableOpacity
          disabled={loading}
          key={index}
          style={[
            styles.button,
            el === data.cohort ? styles.bgRed : styles.bgWhite,
          ]}
          onPress={() => onClick(el)}>
          <Text
            style={[
              styles.text,
              el === data?.cohort ? styles.textWhite : styles.textRed,
            ]}>
            {el}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginRight: 5,
    ...GlobalStyles.shadow,
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    ...GlobalStyles.textShadow,
  },
  bgRed: {
    backgroundColor: Colors.primary,
  },
  bgWhite: {
    backgroundColor: Colors.white.default,
  },
  textWhite: {
    color: Colors.white.default,
  },
  textRed: {
    color: Colors.primary,
  },
});

export default Pagination;

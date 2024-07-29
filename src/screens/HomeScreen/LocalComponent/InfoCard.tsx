import {getDashboardData} from '@/store/adminSlice';
import {RootState, useAppDispatch} from '@/store/store';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';

function InfoCard(): React.JSX.Element {
  const studentCount = useSelector(
    (state: RootState) => state.admin.studentCount,
  );
  const lecturerCount = useSelector(
    (state: RootState) => state.admin.lecturerCount,
  );
  const access_token = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDashboardData({access_token}));
  }, [access_token, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.count}>{studentCount}</Text>
        <Text style={styles.text}>Mahasiswa</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.count}>{lecturerCount}</Text>
        <Text style={styles.text}>Dosen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    marginHorizontal: 2,
  },
  card: {
    flex: 1,
    ...GlobalStyles.shadow,
    backgroundColor: Colors.white.default,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});

export default InfoCard;

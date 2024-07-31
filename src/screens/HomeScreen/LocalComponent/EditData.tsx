import Spacer from '@/components/Spacer';
import Fonts from '@/styles/Fonts';
import Colors from '@/utils/Colors';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import feature_1 from '@/assets/images/feature_1.png';
import feature_2 from '@/assets/images/feature_2.png';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerParamList} from '@/navigator/DrawerNavigator';

type DataList = {
  id: number;
  name: string;
  image: ImageSourcePropType;
  goToScreen: keyof DrawerParamList;
};

const dataList: DataList[] = [
  {id: 1, name: 'Fakultas', image: feature_1, goToScreen: 'FacultyScreen'},
  {id: 2, name: 'Program Studi', image: feature_2, goToScreen: 'MajorScreen'},
  {id: 3, name: 'Dosen', image: feature_1, goToScreen: 'LecturerScreen'},
  {id: 4, name: 'Mahasiswa', image: feature_2, goToScreen: 'StudentScreen'},
];

function EditData(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();

  return (
    <View>
      <Text style={Fonts.subtitle}>Edit Data</Text>

      <Spacer height={10} />

      <View style={styles.container}>
        {dataList?.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate(item.goToScreen)}>
            <View style={styles.topContent}>
              <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.bottomContent}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
  },
  card: {
    flex: 1,
    minHeight: 150,
    minWidth: Dimensions.get('screen').width / 3,
    maxWidth: 200,
    borderRadius: 10,
    backgroundColor: Colors.white.default,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  topContent: {
    flex: 1,
  },
  bottomContent: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 5,
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: Colors.white.default,
  },
});

export default EditData;

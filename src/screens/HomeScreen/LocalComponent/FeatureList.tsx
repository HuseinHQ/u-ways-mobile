import React from 'react';
import Spacer from '@/components/Spacer';
import Fonts from '@/styles/Fonts';
import Colors from '@/utils/Colors';
import image1 from '@/assets/images/feature_1.png';
import image2 from '@/assets/images/feature_2.png';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/navigator/StackNavigator';

function FeatureList(): React.JSX.Element {
  const selectRole = useSelector((state: RootState) => state.user.role);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const featureListData = [
    {
      title: 'My Health',
      image: image1,
      show: selectRole === 'mahasiswa',
      // @ts-ignore
      onPress: () => navigation.navigate('MyHealth'),
    },
    {
      title: 'Mahasiswa',
      image: image1,
      show: selectRole === 'dosen',
      onPress: () => {},
    },
    {
      title: 'Konseling',
      image: image2,
      show: true,
      onPress: () => navigation.navigate('Main', {screen: 'Chat'}),
    },
  ];

  return (
    <View>
      <Text style={Fonts.subtitle}>Apa yang kamu butuhkan?</Text>
      <Spacer height={10} />
      <View style={styles.featureContainer}>
        {featureListData
          ?.filter(item => item.show)
          ?.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                onPress={item.onPress}
                style={styles.featureItem}>
                <View style={styles.topContent}>
                  <Image source={item.image} style={styles.image} />
                </View>
                <View style={styles.bottomContent}>
                  <Text style={styles.featureItemText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
              {index === featureListData?.length - 1 &&
                featureListData?.length % 2 === 1 && (
                  <TouchableOpacity disabled style={styles.featureItem}>
                    <View style={styles.topContent}>
                      <Image source={item.image} style={styles.image2} />
                    </View>
                    <View style={[styles.bottomContent, styles.bottomContent2]}>
                      <Text style={styles.featureItemText2}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                )}
            </React.Fragment>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  featureContainer: {
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
  },
  featureItem: {
    flex: 1,
    minHeight: 180,
    minWidth: Dimensions.get('screen').width / 3,
    maxWidth: 200,
    borderRadius: 10,
    backgroundColor: Colors.white.default,
  },
  topContent: {
    flex: 0.9,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  image2: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  bottomContent: {
    flex: 0.1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContent2: {
    backgroundColor: 'transparent',
  },
  featureItemText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: Colors.white.default,
  },
  featureItemText2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: 'transparent',
  },
});

export default FeatureList;

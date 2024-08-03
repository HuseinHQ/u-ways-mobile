import Spacer from '@/components/Spacer';
import Fonts from '@/styles/Fonts';
import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import React, {useRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import BottomSheetPickImage from '../BottomSheetPickImage';

type InputBoxProps = {
  label?: string;
  image: ImageOrVideo | null;
  setImage: (value: any) => void;
};

function ImageInput({
  label = 'Gambar',
  image,
  setImage,
}: InputBoxProps): React.JSX.Element {
  const refRBSheet = useRef();

  const openSheet = () => {
    if (refRBSheet.current) {
      // @ts-ignore
      refRBSheet.current.open();
    }
  };

  return (
    <View style={styles.container}>
      <View>{label && <Text style={styles.label}>{label}:</Text>}</View>
      {image && (
        <>
          <Spacer height={5} />
          <Image source={{uri: image.path}} style={styles.image} />
          <Spacer height={5} />
        </>
      )}
      <TouchableOpacity style={styles.addImage} onPress={openSheet}>
        <Text style={[Fonts.small, Fonts.montserratSemiBold]}>
          {image ? 'Ganti' : 'Tambah'}
        </Text>
      </TouchableOpacity>
      <Spacer height={15} />

      <BottomSheetPickImage refRBSheet={refRBSheet} setImage={setImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    gap: 7,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  addImage: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.grey.default,
    borderRadius: 10,
    ...GlobalStyles.shadow,
  },
  sheetContainer: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  sheetTitle: {
    ...Fonts.title,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    borderRadius: 100,
    borderWidth: 2,
    padding: 15,
    borderColor: Colors.primary,
  },
  buttonTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  image: {
    width: '100%',
    height: Dimensions.get('screen').width * (12 / 18),
    borderRadius: 10,
  },
});

export default ImageInput;

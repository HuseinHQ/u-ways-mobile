import Colors from '@/utils/Colors';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Spacer from '../Spacer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '@/styles/Fonts';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {useAppDispatch} from '@/store/store';

type BottomSheetPickImageProps = {
  setImage?: (value: any) => void;
  refRBSheet: any;
  directFetch?: boolean;
  dispatchFunction?: (value: any) => any;
};

function BottomSheetPickImage({
  setImage,
  refRBSheet,
  directFetch = false,
  dispatchFunction = () => {},
}: BottomSheetPickImageProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const checkCameraPermission = async () => {
    const camera = await check(PERMISSIONS.ANDROID.CAMERA);
    if (camera === RESULTS.GRANTED) {
      return;
    }

    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      openCamera();
    } else {
      throw {code: 'E_NO_CAMERA_PERMISSION'};
    }
  };

  const openGallery = async () => {
    try {
      const newImage = await ImageCropPicker.openPicker({
        width: 400,
        height: 300,
        cropping: true,
      });

      if (directFetch) {
        dispatch(dispatchFunction(newImage));
      } else {
        if (setImage) {
          setImage(newImage);
        }
      }
      if (refRBSheet.current) {
        refRBSheet.current.close();
      }
    } catch (err: any) {
      if (refRBSheet.current) {
        refRBSheet.current.close();
      }
      Toast.show({
        type: 'error',
        text1: 'Gagal',
        text2:
          err.code === 'E_PICKER_CANCELLED'
            ? 'Pengguna membatalkan pemilihan gambar'
            : err.message,
      });
    }
  };

  const openCamera = async () => {
    try {
      await checkCameraPermission();

      const newImage = await ImageCropPicker.openCamera({
        width: 400,
        height: 300,
        cropping: true,
      });

      if (directFetch) {
        dispatch(dispatchFunction(newImage));
      } else {
        if (setImage) {
          setImage(newImage);
        }
      }
      if (refRBSheet.current) {
        refRBSheet.current.close();
      }
    } catch (err: any) {
      if (refRBSheet.current) {
        refRBSheet.current.close();
      }
      Toast.show({
        type: 'error',
        text1: 'Gagal',
        text2:
          err.code === 'E_PICKER_CANCELLED'
            ? 'Pengguna membatalkan pemilihan gambar'
            : err.code === 'E_NO_CAMERA_PERMISSION'
            ? 'Pengguna tidak memberikan izin kamera'
            : err.message,
      });
    }
  };

  return (
    <RBSheet
      height={200}
      // @ts-ignore
      ref={refRBSheet}
      customStyles={{
        wrapper: {
          backgroundColor: Colors.black.halfOpacity,
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
      customModalProps={{
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}>
      <View style={styles.sheetContainer}>
        <Text style={styles.sheetTitle}>Foto Artikel</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={openCamera}>
            <View style={styles.button}>
              <Ionicons name="camera" size={35} color={Colors.primary} />
            </View>
            <Spacer height={5} />
            <Text style={styles.buttonTitle}>Kamera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery}>
            <View style={styles.button}>
              <FontAwesome5 name="image" size={35} color={Colors.primary} />
            </View>
            <Spacer height={5} />
            <Text style={styles.buttonTitle}>Galeri</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
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
    height: Dimensions.get('screen').width * (9 / 18),
    borderRadius: 10,
  },
});

export default BottomSheetPickImage;

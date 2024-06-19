import Colors from '@/utils/Colors';
import React, {useEffect, useState} from 'react';
import {Image, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import image from '@/assets/images/logo_dark.png';
import Fonts from '@/styles/Fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import GlobalStyles from '@/styles/GlobalStyles';
import {validateEmailUPN} from '@/helpers';
import CustomInput from '@/components/CustomInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

function RegisterScreen(): React.JSX.Element {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [isEmailUPN, setIsEmailUPN] = useState(false);
  const navigation = useNavigation();

  const onChangeText = (name: string) => (value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const goToLoginScreen = () => {
    // @ts-ignore
    navigation.goBack();
  };

  const onSubmitHandler = () => {};

  useEffect(() => {
    setIsEmailUPN(validateEmailUPN(form.email));
  }, [form.email]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <Text style={[Fonts.title, styles.title]}>U-WAYS</Text>
      <Image source={image} style={styles.image} />

      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={[Fonts.title, styles.textRed]}>Selamat Datang</Text>
          <Text style={Fonts.text}>
            Silahkan daftar menggunakan email UPN anda!
          </Text>
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            value={form.name}
            placeholder="Nama"
            setValue={onChangeText('name')}
            leftIcon={
              <FontAwesome6
                name="user-large"
                size={20}
                color={Colors.white.default}
              />
            }
            rightIcon={
              <FontAwesome
                name="check-circle"
                size={20}
                color={Colors.green.default}
              />
            }
            keyboardType="default"
            textContentType="name"
          />

          <CustomInput
            value={form.email}
            placeholder="NPM@student.upnjatim.ac.id"
            setValue={onChangeText('email')}
            leftIcon={
              <FontAwesome
                name="envelope"
                size={20}
                color={Colors.white.default}
              />
            }
            rightIcon={
              <FontAwesome
                name="check-circle"
                size={20}
                color={Colors.green.default}
              />
            }
            keyboardType="email-address"
            textContentType="emailAddress"
            validation={isEmailUPN}
          />

          <CustomInput
            value={form.password}
            placeholder="Password"
            setValue={onChangeText('password')}
            leftIcon={
              <FontAwesome name="lock" size={20} color={Colors.white.default} />
            }
            secureTextEntry={true}
            textContentType="password"
          />

          <CustomInput
            value={form.confirm_password}
            placeholder="Konfirmasi Password"
            setValue={onChangeText('confirm_password')}
            leftIcon={
              <FontAwesome name="lock" size={20} color={Colors.white.default} />
            }
            secureTextEntry={true}
            textContentType="password"
          />

          <TouchableOpacity
            onPress={onSubmitHandler}
            style={[GlobalStyles.shadow, styles.loginButton]}>
            <Text style={styles.login}>DAFTAR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={[Fonts.text, styles.textRed]}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={goToLoginScreen}>
            <Text style={styles.daftar}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RegisterScreen;

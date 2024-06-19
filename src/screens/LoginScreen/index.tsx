import Colors from '@/utils/Colors';
import React, {useEffect, useState} from 'react';
import {Image, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import image from '@/assets/images/logo_dark.png';
import Fonts from '@/styles/Fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '@/styles/GlobalStyles';
import {validateEmailUPN} from '@/helpers';
import CustomInput from '@/components/CustomInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

function LoginScreen(): React.JSX.Element {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isEmailUPN, setIsEmailUPN] = useState(false);
  const navigation = useNavigation();

  const onChangeText = (name: string) => (value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const goToRegisterScreen = () => {
    // @ts-ignore
    navigation.navigate('RegisterScreen');
  };

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
            Silahkan login menggunakan email UPN anda!
          </Text>
        </View>

        <View style={styles.formContainer}>
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

          <View>
            <CustomInput
              value={form.password}
              placeholder="Password"
              setValue={onChangeText('password')}
              leftIcon={
                <FontAwesome
                  name="lock"
                  size={20}
                  color={Colors.white.default}
                />
              }
              secureTextEntry={true}
              textContentType="password"
            />

            <View style={GlobalStyles.alignCenter}>
              <TouchableOpacity>
                <Text style={[Fonts.text, styles.forgotPassword]}>
                  Lupa Sandi?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={[GlobalStyles.shadow, styles.loginButton]}>
            <Text style={styles.login}>LOGIN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={[Fonts.text, styles.textRed]}>Belum punya akun? </Text>
          <TouchableOpacity onPress={goToRegisterScreen}>
            <Text style={styles.daftar}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

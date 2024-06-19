import Colors from '@/utils/Colors';
import React, {useEffect, useState} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import image from '@/assets/images/logo_dark.png';
import Fonts from '@/styles/Fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '@/styles/GlobalStyles';
import {validateEmailUPN} from '@/helpers';
import CustomInput from '@/components/CustomInput';
import {TouchableOpacity} from 'react-native-gesture-handler';

function LoginScreen(): React.JSX.Element {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isEmailUPN, setIsEmailUPN] = useState(false);

  const onChangeText = (name: string) => (value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
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
            Silahkan login menggunakan akun UPN anda!
          </Text>
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            value={form.email}
            placeholder="Email"
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
          <TouchableOpacity>
            <Text style={styles.daftar}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  innerContainer: {
    flex: 0.9,
    backgroundColor: Colors.white.default,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    width: '100%',
  },
  title: {
    color: Colors.white.default,
    marginTop: 20,
  },
  image: {
    margin: 'auto',
    width: 140,
    height: 140,
  },
  textContainer: {
    gap: 10,
    marginBottom: 20,
  },
  textRed: {
    color: Colors.primary,
  },
  formContainer: {
    marginTop: 10,
    gap: 15,
  },
  forgotPassword: {
    color: Colors.primary,
    marginTop: 5,
    marginBottom: 10,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 15,
  },
  login: {
    color: Colors.white.default,
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 20,
  },
  daftar: {
    color: Colors.primary,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default LoginScreen;

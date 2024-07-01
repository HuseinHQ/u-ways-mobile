import * as Keychain from 'react-native-keychain';

export async function storeAccessToken(token: string) {
  try {
    await Keychain.setGenericPassword('accessToken', token);
    console.log('Token stored successfully');
  } catch (error) {
    console.log('Could not store token', error);
  }
}

export async function retrieveAccessToken() {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log('Token retrieved successfully:', credentials.password);
      return credentials.password;
    } else {
      console.log('No token found');
      return null;
    }
  } catch (error) {
    console.log('Could not retrieve token', error);
    return null;
  }
}

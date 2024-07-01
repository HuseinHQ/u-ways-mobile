import axios from 'axios';

export default async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const {data} = await axios.post(
      'https://3h5hsg96-3001.asse.devtunnels.ms/auth/login',
      {
        email,
        password,
      },
      {headers: {'Content-Type': 'application/json'}},
    );
  } catch (error) {
    console.log(error.response);
  }
}

import axios from 'axios';
import {BACKEND_URL} from '@env';

export default async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const {data} = await axios.post(
      `${process.env.BACKEND_URL}/auth/login`,
      {
        email,
        password,
      },
      {headers: {'Content-Type': 'application/json'}},
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

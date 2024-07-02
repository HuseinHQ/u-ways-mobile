import axios from 'axios';

export default async function refreshToken({
  refresh_token,
}: {
  refresh_token: string;
}) {
  try {
    const {data} = await axios.get(
      `${process.env.BACKEND_URL}/auth/refresh-token`,
      {
        headers: {refresh_token},
      },
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

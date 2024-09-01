import Toast from 'react-native-toast-message';

function countScore(values: number[] | null[]): number | boolean {
  let totalScore = 0;

  for (const num of values) {
    if (num === null) {
      Toast.show({
        type: 'error',
        text1: 'Mohon isi semua pertanyaan',
        text2: 'Tidak boleh ada jawaban yang kosong!',
      });
      return false;
    }
    totalScore += num;
  }

  return totalScore;
}

export default countScore;

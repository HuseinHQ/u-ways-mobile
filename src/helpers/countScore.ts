import Toast from 'react-native-toast-message';

function countScore(values: number[][]): number | boolean {
  let totalScore = 0;
  let maxScore = 0;

  for (const subArray of values) {
    for (const num of subArray) {
      if (num === 0) {
        Toast.show({
          text1: 'Mohon isi semua pertanyaan',
          text2: 'Tidak boleh ada jawaban yang kosong!',
        });
        return false;
      }
      totalScore += num;
      maxScore += 5; // Each number's maximum value is 5
    }
  }

  const percentageScore = (totalScore / maxScore) * 100;
  return percentageScore;
}

export default countScore;

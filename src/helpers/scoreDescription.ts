function scoreDescription(score: number) {
  if (score >= 0 && score <= 4) {
    return 'Tidak ada gejala depresi';
  } else if (score >= 5 && score <= 9) {
    return 'Gejala gangguan kesehatan mental ringan, dianjurkan terapi adalah psikoedukasi bila ada perburukan gejala';
  } else if (score >= 10 && score <= 14) {
    return 'Gangguan kesehatan mental ringan, dianjurkan terapi adalah observasi gejala yang ada dalam 1 bulan (perbaikan atau perburukan) dan pertimbangan pemberian antidepresan atau psikoterapi singkat';
  } else if (score >= 15 && score <= 19) {
    return 'Gangguan kesehatan mental sedang, dianjurkan untuk memberikan antidepresan atau psikoterapi';
  } else {
    return 'Gangguan kesehatan mental berat, dianjurkan untuk memberikan antidepresan secara tunggal atau kombinasikan dengan psikoterapi intensif';
  }
}

export default scoreDescription;

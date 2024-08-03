const id = {
  email: {
    NULL: 'Email tidak boleh kosong',
    EMPTY: 'Email tidak boleh kosong',
    INVALID: 'Pastikan email yang Anda gunakan dari UPN',
    'email must be unique': 'Email sudah terdaftar, silakan gunakan email lain',
  },
  password: {
    NULL: 'Password tidak boleh kosong',
    EMPTY: 'Password tidak boleh kosong',
    LENGTH: 'Minimal dan maksimal karakter password adalah 8 dan 255',
    NOT_SAME: 'Password dan konfirmasi password tidak sama',
  },
  name: {
    NULL: 'Nama tidak boleh kosong',
    EMPTY: 'Nama tidak boleh kosong',
    LENGTH: 'Minimal dan maksimal karakter nama adalah 8 dan 255',
  },
  semester: {
    NULL: 'Semester tidak boleh kosong',
    MIN: 'Minimal semester adalah 1 dan maksimal 14',
    MAX: 'Minimal semester adalah 1 dan maksimal 14',
  },
  MajorId: {
    NULL: 'Program studi tidak boleh kosong',
  },
  FacultyId: {
    NULL: 'Fakultas tidak boleh kosong',
  },
  LecturerId: {
    NULL: 'Dosen wali tidak boleh kosong',
  },
  nip: {
    NULL: 'NIP tidak boleh kosong',
    EMPTY: 'NIP tidak boleh kosong',
  },
  npm: {
    NULL: 'NPM tidak boleh kosong',
    EMPTY: 'NPM tidak boleh kosong',
  },
  cohort: {
    NULL: 'Cohort tidak boleh kosong',
    EMPTY: 'Cohort tidak boleh kosong',
  },
  score: {
    MIN: 'Minimal Score adalah 0',
    MAX: 'Maximal Score adalah 100',
  },
  title: {
    LENGTH: 'Minimal dan maksimal karakter judul adalah 8 dan 255',
    NULL: 'Judul tidak boleh kosong',
    EMPTY: 'Judul tidak boleh kosong',
  },
  abstract: {
    LENGTH: 'Minimal dan maksimal karakter abstrak adalah 8 dan 255',
    NULL: 'Abstrak tidak boleh kosong',
    EMPTY: 'Abstrak tidak boleh kosong',
  },
  description: {
    NULL: 'Deskripsi tidak boleh kosong',
    EMPTY: 'Deskripsi tidak boleh kosong',
  },
  author: {
    NULL: 'Penulis tidak boleh kosong',
    EMPTY: 'Penulis tidak boleh kosong',
  },
  Lecturers_MajorId_fkey: 'Fakultas/Prodi ini sedang digunakan!',
  Students_LecturerId_fkey: 'Dosen masih memiliki mahasiswa aktif',
};

export type ErrorKey = keyof typeof id;
export type SubErrorKey<K extends ErrorKey> = keyof (typeof id)[K];

export default id;

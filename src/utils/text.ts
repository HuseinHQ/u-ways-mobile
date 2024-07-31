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
  Lecturers_MajorId_fkey: 'Fakultas/Prodi ini sedang digunakan!',
};

export type ErrorKey = keyof typeof id;
export type SubErrorKey<K extends ErrorKey> = keyof (typeof id)[K];

export default id;

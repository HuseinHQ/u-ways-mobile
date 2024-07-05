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
    LENGTH: 'Minimal dan maksimal karakter password adalah 8 dan 255',
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
};

export default id;

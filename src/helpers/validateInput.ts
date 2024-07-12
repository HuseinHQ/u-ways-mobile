import id from '@/utils/text';
import Toast from 'react-native-toast-message';

const text1 = 'Validasi Error';

function validateInput(
  data: {
    name: string;
    semester?: number;
    MajorId: number;
    LecturerId?: number;
    nip?: string;
  },
  role: string,
): boolean {
  const {name, semester, MajorId, LecturerId, nip} = data;
  // Validate name
  if (!name) {
    Toast.show({type: 'error', text1, text2: id.name.NULL});
    return false;
  }
  if (name.length < 8 || name.length > 255) {
    Toast.show({type: 'error', text1, text2: id.name.LENGTH});
    return false;
  }

  // Validate semester
  if (!semester && role === 'mahasiswa') {
    Toast.show({type: 'error', text1, text2: id.semester.NULL});
    return false;
  }
  if (semester && (semester < 1 || semester > 14)) {
    Toast.show({type: 'error', text1, text2: id.semester.MIN});
    return false;
  }

  // Validate NIP
  if (!nip && role === 'dosen') {
    Toast.show({type: 'error', text1, text2: id.nip.NULL});
    return false;
  }

  // Validate Major
  if (!MajorId) {
    Toast.show({type: 'error', text1, text2: id.MajorId.NULL});
    return false;
  }
  if (!LecturerId && role === 'mahasiswa') {
    Toast.show({type: 'error', text1, text2: id.LecturerId.NULL});
    return false;
  }

  return true;
}

export default validateInput;

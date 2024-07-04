import id from '@/utils/text';
import Toast from 'react-native-toast-message';

const text1 = 'Validasi Error';

function validateInput(data: {
  name: string;
  semester: number;
  MajorId: number;
  LecturerId: number;
}): boolean {
  const {name, semester, MajorId, LecturerId} = data;
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
  if (!semester) {
    Toast.show({type: 'error', text1, text2: id.semester.NULL});
    return false;
  }
  if (semester < 1 || semester > 14) {
    Toast.show({type: 'error', text1, text2: id.semester.MIN});
    return false;
  }
  if (!MajorId) {
    Toast.show({type: 'error', text1, text2: id.MajorId.NULL});
    return false;
  }
  if (!LecturerId) {
    Toast.show({type: 'error', text1, text2: id.LecturerId.NULL});
    return false;
  }

  return true;
}

export default validateInput;

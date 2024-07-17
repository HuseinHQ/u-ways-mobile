import GlobalStyles from '@/styles/GlobalStyles';
import Colors from '@/utils/Colors';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type StudentItemProps = {
  student: {
    id: number;
    name: string;
    npm: string;
  };
};

function StudentItem({student}: StudentItemProps): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {student.name}
      </Text>
      <Text style={styles.npm}>{student.npm}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white.default,
    borderWidth: 1,
    ...GlobalStyles.shadow,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    maxWidth: '70%',
  },
  npm: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
  },
});

export default StudentItem;

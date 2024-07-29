import Colors from '@/utils/Colors';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Spacer from '../Spacer';

type DataListProp = {
  name: string;
};

function DataList({name}: DataListProp): React.JSX.Element {
  const [search, setSearch] = useState('');

  const onChangeSearchText = () => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBox}>
        <AntDesign name="plussquareo" color={Colors.primary} size={40} />
        <Spacer height={5} />
        <Text style={styles.tambah}>Tambah {name}</Text>
      </TouchableOpacity>

      <Spacer height={20} />
      <View style={styles.inputBox}>
        <AntDesign name="search1" color={Colors.black.halfOpacity} size={18} />
        <TextInput
          style={styles.input}
          placeholder="Pencarian"
          placeholderTextColor={Colors.black.halfOpacity}
          value={search}
          onChangeText={onChangeSearchText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  addBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    color: Colors.primary,
    fontSize: 30,
  },
  tambah: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  inputBox: {
    flexDirection: 'row',
    backgroundColor: Colors.grey.lightest,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: Colors.black.halfOpacity,
  },
});

export default DataList;

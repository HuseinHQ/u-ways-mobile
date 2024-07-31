import Colors from '@/utils/Colors';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  BackHandler,
  Keyboard,
  ActivityIndicator,
  Vibration,
  RefreshControl,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spacer from '../Spacer';
import GlobalStyles from '@/styles/GlobalStyles';
import Fonts from '@/styles/Fonts';

type DataListProp = {
  name: string;
  data: any[];
  search?: string;
  setSearch?: (newValue: any) => void;
  loading: boolean;
  onPressAddData?: () => void;
  onPressDelete?: (value: number[], cb: () => void) => void;
  onPressDetail?: (value: any) => void;
  onRefresh?: () => void;
};

function DataList({
  name,
  data = [],
  search,
  setSearch,
  loading = false,
  onPressAddData,
  onPressDelete = () => {},
  onPressDetail = () => {},
  onRefresh = () => {},
}: DataListProp): React.JSX.Element {
  const [multipleSelect, setMultipleSelect] = useState(false);
  const [selectedData, setSelectedData] = useState<number[]>([]);
  const onChangeSearchText = (value: string) => {
    if (setSearch) {
      setSearch(value);
    }
  };
  const inputRef = useRef(null);

  const toggleMultipleSelect = (id: number) => {
    if (!multipleSelect) {
      Vibration.vibrate(10);
      setSelectedData([id]);
      setMultipleSelect(true);
    }
  };

  const handleDelete = () => {
    onPressDelete(selectedData, () => setMultipleSelect(false));
  };

  const selectOrDeselectData = (id: number) => {
    if (selectedData.includes(id)) {
      const newData = selectedData.filter(item => item !== id);
      setSelectedData(newData);
    } else {
      const newData = [...selectedData, id];
      setSelectedData(newData);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (multipleSelect) {
        setMultipleSelect(false);
        return true; // Prevent default behavior
      } else {
        return false; // Allow default behavior
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    if (!multipleSelect) {
      setSelectedData([]);
    }

    return () => backHandler.remove();
  }, [multipleSelect]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setMultipleSelect(false);
        Keyboard.dismiss();
        // @ts-ignore
        inputRef.current?.blur();
      }}>
      {onPressAddData && (
        <>
          <TouchableOpacity style={styles.addBox} onPress={onPressAddData}>
            <AntDesign name="plussquareo" color={Colors.primary} size={40} />
            <Spacer height={5} />
            <Text style={styles.tambah}>Tambah {name}</Text>
          </TouchableOpacity>

          <Spacer height={20} />
        </>
      )}

      {setSearch && (
        <>
          <View style={styles.inputBox}>
            <AntDesign
              name="search1"
              color={Colors.black.halfOpacity}
              size={18}
            />
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Pencarian"
              placeholderTextColor={Colors.black.halfOpacity}
              value={search}
              onChangeText={onChangeSearchText}
              onPress={() => setMultipleSelect(false)}
            />
          </View>
          <Spacer height={20} />
        </>
      )}

      {loading ? (
        <View style={GlobalStyles.fullCenter}>
          <ActivityIndicator size={40} color={Colors.primary} />
        </View>
      ) : data.length ? (
        <View style={styles.dataContainer}>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={data}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
            renderItem={({item}) => (
              <View key={item.id} style={styles.dataListContainer}>
                {multipleSelect && (
                  <TouchableOpacity
                    style={styles.checkContainer}
                    onPress={() => selectOrDeselectData(item.id)}>
                    {selectedData.includes(item.id) ? (
                      <FontAwesome name="check-square" size={35} />
                    ) : (
                      <FontAwesome name="square-o" size={35} />
                    )}
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.listItem}
                  onLongPress={() => toggleMultipleSelect(item.id)}
                  onPress={
                    multipleSelect
                      ? () => selectOrDeselectData(item.id)
                      : () => onPressDetail(item)
                  }>
                  <Text style={styles.text}>
                    {item.email || item.name || item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={GlobalStyles.fullCenter}>
          <Text style={[styles.text, Fonts.black]}>Tidak ada data</Text>
        </View>
      )}

      {multipleSelect && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          {loading ? (
            <ActivityIndicator color={Colors.white.default} size={25} />
          ) : (
            <Text style={styles.text}>Hapus</Text>
          )}
        </TouchableOpacity>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 10,
  },
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
  dataContainer: {
    width: '100%',
    flex: 1,
  },
  dataListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  checkContainer: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    gap: 15,
    paddingBottom: 20,
    paddingHorizontal: 2,
  },
  listItem: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 10,
    ...GlobalStyles.shadow,
    flex: 1,
  },
  text: {
    ...Fonts.subtitle,
    textAlign: 'center',
    color: Colors.white.default,
  },
  deleteButton: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 10,
    ...GlobalStyles.shadow,
    width: '100%',
    marginVertical: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DataList;

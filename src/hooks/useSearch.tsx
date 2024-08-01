import {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

const useSearch = () => {
  const [search, setSearch] = useState('');

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearch('');
      };
    }, []),
  );

  return [search, setSearch] as const;
};

export default useSearch;

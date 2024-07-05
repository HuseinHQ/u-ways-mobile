import {useAppDispatch} from '@/store/store';
import id from '@/utils/text';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import Toast from 'react-native-toast-message';

type useErrorToastProps = {
  errors: any;
  dispatchFunction: any;
  title?: string;
};

const useErrorToast = (data: useErrorToastProps) => {
  const {errors, dispatchFunction, title} = data;
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      if (errors) {
        const key = Object.keys(errors)[0];
        let errorMessage = key.includes('message')
          ? errors[key]
          : // @ts-ignore
            id[key][errors[key]];
        console.log(errors.email);
        Toast.show({
          type: 'error',
          text1: title,
          text2: errorMessage,
        });
        dispatch(dispatchFunction());
      }
    }, [errors, dispatch, dispatchFunction, title]),
  );
};

export default useErrorToast;

import {createTransform} from 'redux-persist';

type AuthState = {
  loading: boolean;
  errors: any | null;
  [key: string]: any;
};

const authTransform = createTransform(
  (inboundState: AuthState) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {loading, _errors, ...rest} = inboundState;
    return rest;
  },
  (outboundState: Partial<AuthState>) => {
    return {...outboundState, loading: false, errors: null};
  },
  {whitelist: ['auth']},
);

export default authTransform;

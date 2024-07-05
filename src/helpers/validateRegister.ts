import id from '@/utils/text';
import {validateEmailUPN} from '.';

type form = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

function validateRegister(form: form) {
  const errors: {[key: string]: string} = {};

  if (!form.name) {
    errors.name = id.name.EMPTY;
  } else if (form.name.length < 8 || form.name.length > 255) {
    errors.name = id.name.LENGTH;
  }

  if (!form.email) {
    errors.email = id.email.EMPTY;
  } else if (!validateEmailUPN(form.email)) {
    errors.email = id.email.INVALID;
  }

  if (!form.password) {
    errors.password = id.password.EMPTY;
  } else if (form.password.length < 8 || form.password.length > 255) {
    errors.password = id.password.LENGTH;
  }

  if (!form.confirm_password) {
    errors.confirm_password = id.password.EMPTY;
  } else if (
    form.confirm_password.length < 8 ||
    form.confirm_password.length > 255
  ) {
    errors.confirm_password = id.password.LENGTH;
  }

  if (form.password !== form.confirm_password) {
    errors.password = id.password.NOT_SAME;
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
}

export default validateRegister;

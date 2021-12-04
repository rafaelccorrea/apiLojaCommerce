import * as yup from 'yup';
import { MessagesValidations as messages } from '../constants';

const User = {
  updateUser: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    name: yup.string().required(messages.required),
    email: yup.string().required(messages.required),
    cpf: yup.string().required(messages.required).length(11, messages.length),
    cellphone: yup
      .string()
      .required(messages.required)
      .length(11, messages.length),
    extension: yup
      .string()
      .lowercase(messages.lowercase)
      .oneOf(['jpeg', 'png', 'jpg'], messages.oneOf),
  }),
};

export default User;

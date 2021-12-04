import * as yup from 'yup';
import { MessagesValidations as messages } from '../constants';

const Store = {
  getAllStores: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  addStore: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    name: yup.string().required(messages.required),
    social_reason: yup.string().required(messages.required),
    cnpj: yup.string().required(messages.required).length(14, messages.length),
    modality: yup
      .string()
      .required(messages.required)
      .lowercase(messages.lowercase)
      .oneOf(['prepaid', 'post-paid'], messages.oneOf),
    type_sale: yup
      .array()
      .min(1, messages.min)
      .max(2, messages.max)
      .of(
        yup
          .string()
          .required(messages.required)
          .lowercase(messages.lowercase)
          .oneOf(['physic', 'virtual'], messages.oneOf)
      ),
  }),
  updateStore: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    name: yup.string().required(messages.required),
    social_reason: yup.string().required(messages.required),
    cnpj: yup.string().required(messages.required).length(14, messages.length),
    modality: yup
      .string()
      .required(messages.required)
      .lowercase(messages.lowercase)
      .oneOf(['prepaid', 'post-paid'], messages.oneOf),
    type_sale: yup
      .array()
      .min(1, messages.min)
      .max(2, messages.max)
      .of(
        yup
          .string()
          .required(messages.required)
          .lowercase(messages.lowercase)
          .oneOf(['physic', 'virtual'], messages.oneOf)
      ),
  }),
  deleteStore: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
};

export default Store;

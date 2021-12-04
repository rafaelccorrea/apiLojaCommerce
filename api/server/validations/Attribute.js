import * as yup from 'yup';
import { MessagesValidations as messages } from '../constants';

const Attribute = {
  getAttributeById: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  addAttribute: yup.object({
    name: yup.string().required(messages.required),
    value: yup.string(),
    type: yup
      .string()
      .lowercase(messages.lowercase)
      .oneOf(['hexadecimal', 'text'], messages.oneOf),
    variation: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  updateAttribute: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    value: yup.string(),
    name: yup.string().required(messages.required),
    type: yup
      .string()
      .lowercase(messages.lowercase)
      .oneOf(['hexadecimal', 'text'], messages.oneOf),
    approved: yup
      .boolean()
      .oneOf([true, false], messages.oneOf)
      .required(messages.required),
    variation: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  deleteAttribute: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
};

export default Attribute;

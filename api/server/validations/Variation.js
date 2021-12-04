import * as yup from 'yup';
import { MessagesValidations as messages } from '../constants';

const Variation = {
  getVariationById: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  addVariation: yup.object({
    name: yup.string().required(messages.required),
  }),
  updateVariation: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    name: yup.string().required(messages.required),
    approved: yup.boolean().oneOf([true, false], messages.oneOf),
  }),
  deleteVariation: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
};

export default Variation;

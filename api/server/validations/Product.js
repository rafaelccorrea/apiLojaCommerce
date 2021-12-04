import * as yup from 'yup';
import { MessagesValidations as messages } from '../constants';

const Product = {
  getProductById: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  addProduct: yup.object({
    title: yup.string().required(messages.required),
    description: yup.string().required(messages.required),
    slug: yup.string().required(messages.required),
    image: yup.string(),
    type: yup
      .string()
      .required(messages.required)
      .lowercase(messages.lowercase)
      .oneOf(['physic', 'virtual'], messages.oneOf),
    technicalSpecifications: yup.string().required(messages.required),
    category: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  updateProduct: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    title: yup.string().required(messages.required),
    description: yup.string().required(messages.required),
    slug: yup.string().required(messages.required),
    image: yup.string(),
    type: yup
      .string()
      .required(messages.required)
      .lowercase(messages.lowercase)
      .oneOf(['physic', 'virtual'], messages.oneOf),
    technicalSpecifications: yup.string().required(messages.required),
    category: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  deleteProduct: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
};

export default Product;

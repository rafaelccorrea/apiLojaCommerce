import * as yup from 'yup';
import { MessagesValidations as messages } from '../constants';

const Category = {
  getCategoryById: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  addCategory: yup.object({
    title: yup.string().required(messages.required),
    description: yup.string().required(messages.required),
    slug: yup.string().required(messages.required),
    categoryLevelTwoId: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  updateCategory: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    title: yup.string().required(messages.required),
    description: yup.string().required(messages.required),
    slug: yup.string().required(messages.required),
    categoryLevelTwoId: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  deleteCategory: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
};

export default Category;

import * as yup from 'yup';
import { MessagesValidations as messages } from '../constants';

const Advertisement = {
  getAdvertisementById: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  addAdvertisement: yup.object({
    price: yup
      .number()
      .required(messages.required)
      .test('is-decimal', messages.decimal, value => (`${value}`).match(/^(?!0\d)\d*/)),
    promotionalPrice: yup
      .number()
      .test('is-decimal', messages.decimal, value => (`${value}`).match(/^(?!0\d)\d*/)),
    initialDatePromotion: yup.date(),
    finalDatePromotion: yup
      .date()
      .min(
        yup.ref('initialDatePromotion'),
        messages.endDate
      ),
    type: yup
      .string()
      .required(messages.required)
      .lowercase(messages.lowercase)
      .oneOf(['product', 'service'], messages.oneOf),
    product: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    store: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  updateAdvertisement: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    price: yup
      .number()
      .required(messages.required)
      .test('is-decimal', messages.decimal, value => (`${value}`).match(/^(?!0\d)\d*/)),
    promotionalPrice: yup
      .number()
      .test('is-decimal', messages.decimal, value => (`${value}`).match(/^(?!0\d)\d*/)),
    initialDatePromotion: yup.date(),
    finalDatePromotion: yup
      .date()
      .min(
        yup.ref('initialDatePromotion'),
        messages.endDate
      ),
    type: yup
      .string()
      .required(messages.required)
      .lowercase(messages.lowercase)
      .oneOf(['product', 'service'], messages.oneOf),
    product: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    store: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
  deleteAdvertisement: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),
};

export default Advertisement;

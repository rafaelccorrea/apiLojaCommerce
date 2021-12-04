import * as yup from 'yup';
import { MessagesValidations as messages } from '../constants';

const Address = {

  getAddressById: yup.object({
    id: yup
    .number()
    .integer(messages.integer)
    .positive(messages.positive)
    .required(messages.required),

  }),

  AddAddress: yup.object({
    address: yup.object().shape({
      titleAddress: yup.string().required(messages.required),
      country: yup.string().required(messages.required),
      state: yup.string().required(messages.required),
      city: yup.string().required(messages.required),
      neighborhood: yup.string().required(messages.required),
      street: yup.string().required(messages.required),
      street_number: yup.string().required(messages.required),
      zipcode: yup.string().required(messages.required),
    })
  }),

  deleteAddress: yup.object({

    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),

  }),

  updateAddress: yup.object({

      titleAddress: yup.string().required(messages.required),
      country: yup.string().required(messages.required),
      state: yup.string().required(messages.required),
      city: yup.string().required(messages.required),
      neighborhood: yup.string().required(messages.required),
      street: yup.string().required(messages.required),
      street_number: yup.string().required(messages.required),
      zipcode: yup.string().required(messages.required),

  })



}

export default Address;

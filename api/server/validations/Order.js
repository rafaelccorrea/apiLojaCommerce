import * as yup from 'yup';
import { MessagesValidations as messages } from '../constants';


const Order = {

  getOrderById: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),

  addOrder: yup.object({


  }),

  deleteOrder: yup.object({
    id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
  }),

  updateOrder: yup.object({
    valueOrder: yup.string().required(messages.required),
    partialOrderValue: yup.string().required(messages.required),
    discountValue: yup.string().required(messages.required),
    discountCoupon: yup.string().required(messages.required),
    paymentValue: yup.string().required(messages.required),
    redemptionCoupon: yup.string().required(messages.required),

  })

}


export default Order;

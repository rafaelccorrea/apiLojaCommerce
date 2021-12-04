import * as yup from 'yup';
import { MessagesValidations as messages } from '../constants';

const Points = {
  givePoints: yup.object({
    store: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    amount: yup
      .number()
      .required(messages.required)
      .test('is-decimal', messages.decimal, (value) =>
        `${value}`.match(/^(?!0\d)\d*/)
      ),
    cpf: yup.string().required(messages.required).length(11, messages.length),
  }),
};

export default Points;

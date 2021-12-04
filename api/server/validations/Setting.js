import * as yup from 'yup';
import { MessagesValidations as messages } from '../constants';

const Setting = {
  updateSettings: yup.object({
    multiPoints: yup
      .number()
      .test('is-decimal', messages.decimal, (value) =>
        `${value}`.match(/^(?!0\d)\d*/)
      ),
    pricePerPoint: yup
      .number()
      .test('is-decimal', messages.decimal, (value) =>
        `${value}`.match(/^(?!0\d)\d*/)
      ),
  }),
};

export default Setting;

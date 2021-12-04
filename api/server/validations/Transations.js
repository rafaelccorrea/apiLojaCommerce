import * as yup from 'yup';
import { MessagesValidations as messages } from '../constants';

const Pagarme = {

  createRecipient: yup.object({
    bank_account: yup.object().shape({
      bank_code: yup.string().required(messages.required),
      agencia: yup.string().required(messages.required),
      agencia_dv: yup.string().required(messages.required),
      conta: yup.string().required(messages),
      conta_dv: yup.string().required(messages.required),
      type: yup.string().required(messages.required).oneOf(['conta_corrente', 'conta_poupanca', 'conta_corrente_conjunta', 'conta_poupanca_conjunta']),
      document_type: yup.string().required(messages.required),
      document_number: yup.string().length(11, messages.length).required(messages),
      legal_name: yup.string().required(messages.required),
    }).required(messages.required),
  }),

  Transaction: yup.object({

  })

}

export default Pagarme;

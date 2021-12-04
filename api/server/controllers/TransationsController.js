import { Request } from "../utils";
import {
  TransationsService,
  StoreService,
  AddressService,
  AdvertisementService,
  OrderServices,
  ProductOrderService,
  HistoricServices,
  ProductService,
  AuthService,
} from "../services";
import { TransationsValidation } from "../validations";
import { api_key, recipientId } from "../src/data/keys.js";
const pagarme = require("pagarme");
const request = new Request();

class TransationsController {
  static async createRecipients(req, res) {
    try {
      await TransationsValidation.createRecipient.validate(req.body, {
        abortEarly: false,
      });

      const connect = await pagarme.client.connect({ api_key: api_key });
      const recipient = await connect.recipients.create(req.body);
      const { id: storeId } = req.params;

      await StoreService.updateStore(storeId, { recipient_id: recipient.id });

      await TransationsService.TransationsAdd({
        ...req.body.bank_account,
        storeId,
      });

      if (recipient) {
        request.setSuccess(200, "Recipient Cadastrado com sucesso", recipient);
      } else request.setError("Erro ao Cadastrar Recipient", 400);

      return request.send(res);
    } catch (error) {
      console.log(error);
      request.setError(error);
      return request.send(res);
    }
  }

  static async createTransations(req, res) {
    try {
      const { id: orderId } = req.params;
      const userId = req.dataReq.id;
      const requestBilling = await AddressService.getAddressByUser(userId);
      const requestOrder = await OrderServices.getOrderById(orderId);
      const requestProductOrder = await ProductOrderService.getOrderById(
        orderId
      );

      const reqAdvertisement = await AdvertisementService.getAdvertisementById(
        requestProductOrder.adverseId
      );

      const productId = reqAdvertisement;
      const storeId = reqAdvertisement.storeId;
      const requestStore = await StoreService.getStoreById(storeId);
      const requestProduct = await ProductService.getProductById(productId);

      const value = requestProductOrder.map((qts) => {
        const sale = requestOrder.valueOrder * qts.quantity;
        return sale;
      });

      const price = value.reduce((a, b) => a + b, 0);

      const amount = price;

      const customer = {
        external_id: userId.toString(),
        name: req.dataReq.name,
        type: "individual",
        country: requestBilling.country.toString(),
        email: req.dataReq.email,
        documents: [
          {
            type: "cpf",
            number: req.dataReq.cpf,
          },
        ],
        phone_numbers: ["+55" + req.dataReq.cellphone],
        birthday: "1965-01-01",
      };

      const billing = {
        name: req.dataReq.name,
        address: {
          country: requestBilling.country,
          state: requestBilling.state,
          city: requestBilling.city,
          neighborhood: requestBilling.neighborhood,
          street: requestBilling.street,
          street_number: requestBilling.street_number,
          zipcode: requestBilling.zipcode,
        },
      };

      const shipping = {
        name: req.dataReq.name,
        fee: 1000,
        delivery_date: new Date()
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-"),
        expedited: true,
        address: {
          country: requestBilling.country,
          state: requestBilling.state,
          city: requestBilling.city,
          neighborhood: requestBilling.neighborhood,
          street: requestBilling.street,
          street_number: requestBilling.street_number,
          zipcode: requestBilling.zipcode,
        },
      };

      const items = requestProductOrder.map(async (itemsToPagarme) => {

        const id = itemsToPagarme.ProductId.toString();
        const quantity = itemsToPagarme.quantity;
        const unit_price = requestOrder.valueOrder;
        const title = requestProduct.title;
        const tangible = req.body.tangible;
        return { quantity, id, title, unit_price, tangible };
      });

      const recipientStore = requestStore.recipient_id;

      const split_rules = [
        {
          recipient_id: recipientStore,
          liable: true,
          percentage: 75,
        },
        {
          recipient_id: recipientId,
          liable: true,
          percentage: 25,
        },
      ];

      const connect = await pagarme.client.connect({ api_key: api_key });

      const send = {
        ...req.body,
        billing,
        items,
        split_rules,
        shipping,
        customer,
        amount,
      };

      const transaction = await connect.transactions.create(send);

      // console.log(transaction)

      const update = transaction.items.map((items) => ({
        title: items.title,
        price: items.unit_price,
        quantity: items.quantity,
        userId,
        productId: items.id,
        tangible: items.tangible,
      }));

      const historic = update.map((items) => ({
        name: items.title,
        price: items.price,
        quantity: items.quantity,
        userId,
        productId: items.productId,
        tangible: items.tangible,
        orderId,
      }));

      if (transaction.status === "paid") {
        await HistoricServices.updateHistory(userId, historic);
      }

      if (transaction.status === "paid") {
        request.setSuccess(200, "Pagamento efetuado com sucesso", transaction);
      } else request.setError("Erro ao efetuar o pagamento", 400);

      return request.send(res);
    } catch (error) {
      console.log(error);
      request.setError(error);
      return request.send(res);
    }
  }
}

export default TransationsController;

import {
  OrderServices,
  ProductService,
  ProductOrderService,
  AddressService,
  AdvertisementService,
} from "../services";
import { Request } from "../utils";
import { OrderValidation } from "../validations";
import { v4 as uuidv4 } from "uuid";

const request = new Request();

class OrderController {
  static async getAllOrders(req, res) {
    try {
      const order = await OrderServices.getAllOrders();

      const orders = order.map((o) => ({
        ...o.toJSON(),
        produtos: o.produtos.map((product) => ({
          title: product.title,
          description: product.description,
          slug: product.slug,
          quantity: product.ProductOrders.quantity,
        })),
      }));

      if (orders) {
        request.setSuccess(200, "Pedidos consultados com sucesso", orders);
      } else request.setError("Não foi possível consultar as Compras");
      return request.send(res);
    } catch (error) {
      console.log(error);
      request.setError(error);
      return request.send(res);
    }
  }

  static async getOrderById(req, res) {
    try {
      await OrderValidation.getOrderById.validate({
        id: req.params.id,
      });

      const requestOrder = await OrderServices.getOrderById(req.params.id);

      const order = {
        ...requestOrder.toJSON(),
        produtos: requestOrder.produtos.map((product) => ({
          title: product.title,
          description: product.description,
          slug: product.slug,
          quantity: product.ProductOrders.quantity,
        })),
      };

      if (order) {
        request.setSuccess(200, "Pedido consultado com sucesso", order);
      } else request.setError("Pedido inexistente", 400);

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async addOrder(req, res) {
    try {
      const { adverts } = req.body;
      const advertisement = await AdvertisementService.getAdvertisementsByIds(
        adverts.map((adv) => adv.id)
      );

      const total = advertisement.reduce(
        (accumulator, current) =>
          accumulator +
          current.price * adverts.find((a) => a.id === current.id).quantity,
        0
      );

      const { id: userId } = req.dataReq;

      await OrderValidation.addOrder.validate(req.body, {
        abortEarly: false,
      });

      const bytes = uuidv4();

      function run() {
        var date = new Date();
        return date.getFullYear() + Math.floor(1000 + Math.random() * 999999);
      }

      const number = run();
      const year = new Date().getFullYear().toString();
      const code = year + number;

      const address = await AddressService.getAddressByUser(userId);

      if (advertisement) {
        const order = await OrderServices.addOrder({
          userId,
          codeOrder: code,
          hashCart: bytes,
          partialOrderValue: null,
          trackingCode: "fdsfds5fs6f4s65",
          valueOrder: total,
          discountValue: null,
          ...req.body,
        });

        const products = adverts.map((advertsItem) => {
          const orderObj = {
            OrderId: order.id,
            quantity: advertsItem.quantity,
            adverseId: advertsItem.id,
          };
          return orderObj;
        });

        await ProductOrderService.addProductOrder(products);

        if (order) {
          request.setSuccess(200, "Pedido efetuado com sucesso!", {
            order,
            address,
          });
        }
      } else request.setError("Erro ao efetuar o Pedido", 400);
      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async deleteOrder(req, res) {
    try {
      const { id: OrderId } = req.params;

      await OrderValidation.deleteOrder.validate(
        { id: OrderId },
        {
          abortEarly: false,
        }
      );

      const order = await OrderServices.deleteOrder(OrderId);

      if (order) {
        request.setSuccess(200, "Pedido deletado com sucesso");
      } else request.setError("Não foi possível deletar o Pedido");

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async updateOrder(req, res) {
    try {
      const { id: orderId } = req.params;

      await OrderValidation.updateOrder.validate(
        { ...req.body, id: orderId },
        {
          abortEarly: false,
        }
      );

      const order = await OrderServices.updateOrders(orderId, req.body);

      if (order) {
        request.setSuccess(200, "Pedido atualizado com sucesso", order);
      } else request.setError("Não foi possível atualizar o Pedido");

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }
}

export default OrderController;

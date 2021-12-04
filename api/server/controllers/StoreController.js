import { StoreService, UserStoreService } from '../services';
import { Request } from '../utils';
import { StoreValidation } from '../validations';

const request = new Request();

class StoreController {
  static async getAllStores(req, res) {
    try {
      const { id: userId } = req.dataReq;

      await StoreValidation.getAllStores.validate(
        {
          id: userId,
        },
        { abortEarly: false }
      );

      const stores = (await StoreService.getAllStores(userId)).stores;

      if (stores) { request.setSuccess(200, 'Lojas consultadas com sucesso', stores); } else request.setError('Não foi possível consultar as lojas');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async addStore(req, res) {
    try {
      const { id: userId } = req.dataReq;

      await StoreValidation.addStore.validate(
        {
          ...req.body,
          id: userId,
        },
        { abortEarly: false }
      );

      const store = (
        await StoreService.addStore({
          ...req.body,
          active: false,
          approved: false,
        })
      ).get({
        plain: true,
      });

      await UserStoreService.addUserStore({
        userId,
        storeId: store.id,
        permissions: ['create', 'read', 'update', 'delete'],
      });

      if (store) request.setSuccess(200, 'Loja cadastrada com sucesso!', store);
      else request.setError('Não foi possível cadastrar a loja');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async updateStore(req, res) {
    try {
      const { id: storeId } = req.params;

      await StoreValidation.updateStore.validate(
        {
          ...req.body,
          id: storeId,
        },
        { abortEarly: false }
      );

      const store = await StoreService.updateStore(storeId, req.body);

      if (store) request.setSuccess(200, 'Loja atualizada com sucesso', store);
      else request.setError('Não foi possível atualizar a loja');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async deleteStore(req, res) {
    try {
      const { id: storeId } = req.params;

      await StoreValidation.deleteStore.validate(
        {
          id: storeId,
        },
        { abortEarly: false }
      );

      const store = await StoreService.deleteStore(storeId);

      if (store) request.setSuccess(200, 'Loja deletada com sucesso');
      else request.setError('Não foi possível deletar a loja');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async getHistoric(req, res) {
    try {
      const { id: storeId } = req.params;

      const historic = await StoreService.getHistoric(storeId);

      if (historic)
        request.setSuccess(200, "Histórico consultado com sucesso", historic);
      else request.setError("Não foi possível consultar o histórico");

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

}

export default StoreController;

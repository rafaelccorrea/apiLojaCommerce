import {
  AdvertisementService,
  ProductService,
  StoreService,
} from '../services';
import { Request } from '../utils';
import { AdvertisementValidation } from '../validations';

const request = new Request();

class AdvertisementController {
  static async getAllAdverts(req, res) {
    try {
      const adverts = await AdvertisementService.getAllAdverts();

      if (adverts) { request.setSuccess(200, 'Anúncios consultados com sucesso', adverts); } else request.setError('Não foi possível consultar os anúncios');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async getAdvertisementById(req, res) {
    try {
      await AdvertisementValidation.getAdvertisementById.validate(
        {
          id: req.params.id,
        },
        { abortEarly: false }
      );

      const advertisement = await AdvertisementService.getAdvertisementById(
        req.params.id
      );

      if (advertisement) {
        request.setSuccess(
          200,
          'Anúncio consultado com sucesso',
          advertisement
        );
      } else request.setError('Anúncio inexistente', 400);

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async addAdvertisement(req, res) {
    try {
      await AdvertisementValidation.addAdvertisement.validate(req.body, {
        abortEarly: false,
      });

      const product = await ProductService.getProductById(req.body.product);

      const store = await StoreService.getStoreById(req.body.store);

      let advertisement = null;
      if (product && store) {
        advertisement = (
          await AdvertisementService.addAdvertisement({
            ...req.body,
            productId: req.body.product,
            storeId: req.body.store,
            active: false,
            approved: false,
          })
        ).get({
          plain: true,
        });
      }

      if (advertisement) {
        request.setSuccess(
          200,
          'Anúncio cadastrado com sucesso!',{
            advertisement,
            product
          }
        );
      } else request.setError('Produto ou Loja inexistente', 400);

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async updateAdvertisement(req, res) {
    try {
      const { id: advertisementId } = req.params;

      await AdvertisementValidation.updateAdvertisement.validate(
        { ...req.body, id: advertisementId },
        {
          abortEarly: false,
        }
      );

      const advertisement = await AdvertisementService.updateAdvertisement(
        advertisementId,
        req.body
      );

      if (advertisement) {
        request.setSuccess(
          200,
          'Anúncio atualizado com sucesso',
          advertisement
        );
      } else request.setError('Não foi possível atualizar o anúncio');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async deleteAdvertisement(req, res) {
    try {
      const { id: advertisementId } = req.params;

      await AdvertisementValidation.deleteAdvertisement.validate(
        { id: advertisementId },
        {
          abortEarly: false,
        }
      );

      const advertisement = await AdvertisementService.deleteAdvertisement(
        advertisementId
      );

      if (advertisement) { request.setSuccess(200, 'Anúncio deletado com sucesso'); } else request.setError('Não foi possível deletar o anúncio');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }
}

export default AdvertisementController;

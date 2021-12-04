import {
  AddressService,
  UserService
} from '../services';
import { Request } from '../utils';
import { AddressValidation } from '../validations';

const request = new Request();

class AddressController{

  static async addAddress(req, res){

    try{

      await AddressValidation.AddAddress.validate(
        req.body, {
          abortEarly: false,
        }
      )

      const { id: userId } = req.params;

      const existAddress = await AddressService.getAddressByUser(userId)

      if(existAddress) {
        request.setSuccess(200, 'Este usuário já tem endereço cadastrado')
        return request.send(res);
      }
      const address = await AddressService.addAddress({
        ...req.body.address,
        userId,
      })

      if (address) { request.setSuccess(200, 'Endereço adicionado com sucesso', address); } else request.setError('Não foi possível adicionar o Endereço');

      return request.send(res);

    }catch (error) {
      request.setError(error);
      return request.send(res);
    }

  }

  static async deleteAddress(req, res){
    try{

      const { id: AddressId} = req.params;

      await AddressValidation.deleteAddress.validate(
        { id: AddressId },
        {
          abortEarly: false,
        }
      );

      const address = await AddressService.deleteAddress(
        AddressId
      );

      if (address) { request.setSuccess(200, 'Endereço deletado com sucesso', address); } else request.setError('Não foi possível deletar o Endereço');

      return request.send(res);
    }catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async updateAddress(req, res){

    try {
      const { id: addressId } = req.params;

      await AddressValidation.updateAddress.validate(
        { ...req.body.address, id: addressId },
        {
          abortEarly: false,
        }
      );

      const address = await AddressService.updateAddress(
        addressId, req.body.address);

      if (address) { request.setSuccess(200, 'Endereço atualizado com sucesso', address); } else request.setError('Não foi possível atualizar o Endereço');

      return request.send(res);

    }catch (error) {
      request.setError(error);
      return request.send(res);
    }

  }


  static async getAddressByUser (req, res) {

    try {
      await AddressValidation.getAddressById.validate(
        {
          id: req.params.id
        }
        )

        const address = await AddressService.getAddressByUser(req.params.id);

        if (address) { request.setSuccess(200, 'Endereço consultado com sucesso', address); } else request.setError('Endereço inexistente', 400);

        return request.send(res);
      } catch (error) {
        request.setError(error);
        return request.send(res);
      }

  }

  static async getAllAddress(req, res){

    try{

      const address = await AddressService.getAllAddress();

      if (address) { request.setSuccess(200, 'Endereços consultados com sucesso!', address); } else request.setError('Nenhum Endereço Encontrado!', 400);

      return request.send(res);

    }catch(error){
      request.setError(error);
      return request.send(res);
    }

  }


}

export default AddressController;

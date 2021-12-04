import { AttributeService } from '../services';
import { Request } from '../utils';
import { AttributeValidation } from '../validations';

const request = new Request();

class AttributeController {
  static async getAllAttributes(req, res) {
    try {
      const attributes = await AttributeService.getAllAttributes();

      if (attributes)
        request.setSuccess(
          200,
          'Atributos consultados com sucesso',
          attributes
        );
      else request.setError('Não foi possível consultar os atributos');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async getAttributeById(req, res) {
    try {
      await AttributeValidation.getAttributeById.validate(
        {
          id: req.params.id,
        },
        { abortEarly: false, stripUnknown: true }
      );

      const attribute = await AttributeService.getAttributeById(req.params.id);

      if (attribute)
        request.setSuccess(200, 'Atributo consultado com sucesso', attribute);
      else request.setError('Atributo inexistente', 400);

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async addAttribute(req, res) {
    try {
      await AttributeValidation.addAttribute.validate(
        {
          ...req.body,
        },
        { abortEarly: false, stripUnknown: true }
      );

      const attribute = (
        await AttributeService.addAttribute({
          ...req.body,
          variationId: req.body.variation,
          approved: false,
        })
      ).get({
        plain: true,
      });

      if (attribute)
        request.setSuccess(200, 'Atributo cadastrado com sucesso!', attribute);
      else request.setError('Não foi possível cadastrar o atributo');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async updateAttribute(req, res) {
    try {
      const { id: attributeId } = req.params;

      await AttributeValidation.updateAttribute.validate(
        {
          ...req.body,
          id: attributeId,
        },
        { abortEarly: false, stripUnknown: true }
      );

      const attribute = await AttributeService.updateAttribute(
        attributeId,
        req.body
      );

      if (attribute)
        request.setSuccess(200, 'Atributo atualizado com sucesso', attribute);
      else request.setError('Não foi possível atualizar o atributo');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async deleteAttribute(req, res) {
    try {
      const { id: attributeId } = req.params;

      await AttributeValidation.deleteAttribute.validate(
        {
          id: attributeId,
        },
        { abortEarly: false, stripUnknown: true }
      );

      const attribute = await AttributeService.deleteAttribute(attributeId);

      if (attribute) request.setSuccess(200, 'Atributo deletado com sucesso');
      else request.setError('Não foi possível deletar o atributo');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }
}

export default AttributeController;

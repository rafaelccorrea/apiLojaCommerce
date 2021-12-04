import { VariationService } from '../services';
import { Request } from '../utils';
import { VariationValidation } from '../../../validations';

const request = new Request();

class VariationController {
  static async getAllVariations(req, res) {
    try {
      const variations = await VariationService.getAllVariations();

      if (variations)
        request.setSuccess(
          200,
          'Variações consultadas com sucesso',
          variations
        );
      else request.setError('Não foi possível consultar as variações');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async getVariationById(req, res) {
    try {
      await VariationValidation.getVariationById.validate(
        {
          id: req.params.id,
        },
        { abortEarly: false, stripUnknown: true }
      );

      const variation = await VariationService.getVariationById(req.params.id);

      if (variation)
        request.setSuccess(200, 'Variação consultada com sucesso', variation);
      else request.setError('Variação inexistente', 400);

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async addVariation(req, res) {
    try {
      await VariationValidation.addVariation.validate(
        {
          ...req.body,
        },
        { abortEarly: false, stripUnknown: true }
      );

      const variation = (
        await VariationService.addVariation({
          ...req.body,
          approved: false,
        })
      ).get({
        plain: true,
      });

      if (variation)
        request.setSuccess(200, 'Variação cadastrada com sucesso!', variation);
      else request.setError('Não foi possível cadastrar a variação');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async updateVariation(req, res) {
    try {
      const { id: variationId } = req.params;

      await VariationValidation.updateVariation.validate(
        {
          ...req.body,
          id: variationId,
        },
        { abortEarly: false, stripUnknown: true }
      );

      const variation = await VariationService.updateVariation(
        variationId,
        req.body
      );

      if (variation)
        request.setSuccess(200, 'Variação atualizada com sucesso', variation);
      else request.setError('Não foi possível atualizar a variação');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async deleteVariation(req, res) {
    try {
      const { id: variationId } = req.params;

      await VariationValidation.deleteVariation.validate(
        {
          id: variationId,
        },
        { abortEarly: false, stripUnknown: true }
      );

      const variation = await VariationService.deleteVariation(variationId);

      if (variation) request.setSuccess(200, 'Variação deletada com sucesso');
      else request.setError('Não foi possível deletar a variação');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }
}

export default VariationController;

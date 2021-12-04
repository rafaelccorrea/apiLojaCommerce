import { CategoryThreeService, CategoryTwoService } from '../services';
import { Request } from '../utils';
import { CategoryThreeValidation } from '../validations';

const request = new Request();

class CategoryThreeController {
  static async getAllCategories(req, res) {
    try {
      const categories = await CategoryThreeService.getAllCategories();

      if (categories) {
        request.setSuccess(
          200,
          'Categorias consultadas com sucesso',
          categories
        );
      } else request.setError('Não foi possível consultar as categorias');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async getCategoryById(req, res) {
    try {
      await CategoryThreeValidation.getCategoryById.validate(
        {
          id: req.params.id,
        },
        { abortEarly: false }
      );

      const category = await CategoryThreeService.getCategoryById(req.params.id);

      if (category) { request.setSuccess(200, 'Categoria consultada com sucesso', category); } else request.setError('Categoria inexistente', 400);

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async addCategory(req, res) {
    try {
      await CategoryThreeValidation.addCategory.validate(req.body, {
        abortEarly: false,
      });

      const categoryParent = await CategoryTwoService.getCategoryById(
        req.body.categoryLevelTwoId
      );

      let category = null;
      if (categoryParent) {
        category = (await CategoryThreeService.addCategory(req.body)).get({
          plain: true,
        });
      }

      if (category) { request.setSuccess(200, 'Categoria cadastrada com sucesso!', category); } else request.setError('Categoria pai inexistente', 400);

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id: categoryId } = req.params;

      await CategoryThreeValidation.addCategory.validate(
        { ...req.body, id: categoryId },
        {
          abortEarly: false,
        }
      );

      const category = await CategoryThreeService.updateCategory(
        categoryId,
        req.body
      );

      if (category) { request.setSuccess(200, 'Categoria atualizada com sucesso', category); } else request.setError('Não foi possível atualizar a categoria');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { id: categoryId } = req.params;

      await CategoryThreeValidation.deleteCategory.validate(
        { id: categoryId },
        {
          abortEarly: false,
        }
      );

      const category = await CategoryThreeService.deleteCategory(categoryId);

      if (category) request.setSuccess(200, 'Categoria deletada com sucesso');
      else request.setError('Não foi possível deletar a categoria');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }
}

export default CategoryThreeController;

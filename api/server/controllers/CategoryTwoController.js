import { CategoryTwoService, CategoryOneService } from '../services';
import { Request } from '../utils';
import { CategoryTwoValidation } from '../validations';

const request = new Request();

class CategoryTwoController {
  static async getAllCategories(req, res) {
    try {
      const categories = await CategoryTwoService.getAllCategories();

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
      await CategoryTwoValidation.getCategoryById.validate(
        {
          id: req.params.id,
        },
        { abortEarly: false }
      );

      const category = await CategoryTwoService.getCategoryById(req.params.id);

      if (category) { request.setSuccess(200, 'Categoria consultada com sucesso', category); } else request.setError('Categoria inexistente', 400);

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async addCategory(req, res) {
    try {
      await CategoryTwoValidation.addCategory.validate(req.body, {
        abortEarly: false,
      });

      const categoryParent = await CategoryOneService.getCategoryById(
        req.body.categoryLevelOneId
      );

      let category = null;
      if (categoryParent) {
        category = (await CategoryTwoService.addCategory(req.body)).get({
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

      await CategoryTwoValidation.addCategory.validate(
        { ...req.body, id: categoryId },
        {
          abortEarly: false,
        }
      );

      const category = await CategoryTwoService.updateCategory(
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

      await CategoryTwoValidation.deleteCategory.validate(
        { id: categoryId },
        {
          abortEarly: false,
        }
      );

      const category = await CategoryTwoService.deleteCategory(categoryId);

      if (category) request.setSuccess(200, 'Categoria deletada com sucesso');
      else request.setError('Não foi possível deletar a categoria');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }
}

export default CategoryTwoController;

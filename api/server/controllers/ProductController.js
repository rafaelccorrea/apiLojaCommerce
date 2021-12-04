import { ProductService, CategoryFourService, StoreService } from '../services';
import { Request } from '../utils';
import { ProductValidation } from '../validations';

const request = new Request();

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();

      if (products) { request.setSuccess(200, 'Produtos consultados com sucesso', products); } else request.setError('Não foi possível consultar os produtos');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async getProductById(req, res) {
    try {
      await ProductValidation.getProductById.validate(
        {
          id: req.params.id,
        },
        { abortEarly: false }
      );

      const product = await ProductService.getProductById(req.params.id);

      if (product) { request.setSuccess(200, 'Produto consultado com sucesso', product); } else request.setError('Produto inexistente', 400);

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async addProduct(req, res) {
    try {
      await ProductValidation.addProduct.validate(req.body, {
        abortEarly: false,
      });

      const category = await CategoryFourService.getCategoryById(
        req.body.category
      );

      const { id: storeId } = req.params;

      const store = await StoreService.getStoreById(storeId)

      let product = null;
      if (category && store) {
        product = (
          await ProductService.addProduct({
            ...req.body,
            categoryLevelFourId: req.body.category,
            storeId,
            active: 0,
            approved: 0,
          })
        ).get({
          plain: true,
        });
      }

      if (product) { request.setSuccess(200, 'Produto cadastrado com sucesso!', product); } else request.setError('Categoria ou Loja inexistente', 400);

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id: productId } = req.params;

      await ProductValidation.updateProduct.validate(
        { ...req.body, id: productId },
        {
          abortEarly: false,
        }
      );

      const product = await ProductService.updateProduct(productId, req.body);

      if (product) { request.setSuccess(200, 'Produto atualizado com sucesso', product); } else request.setError('Não foi possível atualizar o produto');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id: productId } = req.params;

      await ProductValidation.deleteProduct.validate(
        { id: productId },
        {
          abortEarly: false,
        }
      );

      const product = await ProductService.deleteProduct(productId);

      if (product) request.setSuccess(200, 'Produto deletado com sucesso');
      else request.setError('Não foi possível deletar o produto');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }
}

export default ProductController;

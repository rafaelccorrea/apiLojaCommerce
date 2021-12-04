import database from '../src/models';

class ProductService {
  static async getAllProducts() {
    try {
      return await database.Product.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(product) {
    try {
      return await database.Product.findByPk(product);
    } catch (error) {
      throw error;
    }
  }

  static async addProduct(product) {
    try {
      return await database.Product.create(product);
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(id, updateProduct) {
    try {
      const product = await database.Product.findByPk(id);

      if (product) {
        const updatedProduct = await database.Product.update(
          updateProduct,
          {
            where: { id: Number(id) },
            returning: true,
            plain: true,
          }
        );

        return updatedProduct[1];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(id) {
    try {
      const product = await database.Product.findByPk(id);

      if (product) {
        const deletedProduct = await database.Product.destroy({
          where: { id: Number(id) },
        });
        return deletedProduct;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAll(id){

    try{

      const all = await database.Product.findByPk(id)

      if(all){
        const allProduct = await database.Product.findOne({
          where:{
            [Op.or]: [{title, description, slug, image, type, technicalSpecifications}]
          },
          raw: true,
        });
        return allProduct
      }
    }catch(error){
      throw error;
    }
  }

  static async getAllProductsTransactions(id) {
    try {
      return await database.Product.findAll({
        where: {id: id},
      });
    } catch (error) {
      throw error;
    }
  }

}

export default ProductService;

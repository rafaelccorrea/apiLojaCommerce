import database from '../src/models';

class ProductOrderService{

  static async addProductOrder(adverse){
    try {
      return await database.ProductOrders.bulkCreate(adverse);
    } catch (error) {
      throw error;
    }

  }

  static async getProductOrderById(id) {
    try {
      return await database.ProductOrders.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  static async getOrderById(id) {
    try {
      return await database.ProductOrders.findAll({where: { OrderId: id},  raw: true});
    } catch (error) {
      throw error;
    }
  }


}

export default ProductOrderService;

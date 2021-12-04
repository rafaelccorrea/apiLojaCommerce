import database from '../src/models';

class OrderServices {

  static async getAllOrders() {
    return database.Orders.findAll({
      include: [
        {
          model: database.Product,
          as: 'produtos',
        }
      ]
    });
  }

  static async getOrderById(id) {
    try {
      return await database.Orders.findByPk(id, {
        // include: [
        //   {
        //     model: database.Product,
        //     as: 'produtos',
        //   }
        // ]
      });
    } catch (error) {
      throw error;
    }
  }

  static async addOrder(order){
    try{
      return await database.Orders.create(order);
    }catch (error) {
      throw error;
    }
  }

  static async deleteOrder(id){
    try{
      const order = await database.Orders.findByPk(id);
      if(order){
        const deleteOrder = await database.Orders.destroy({
          where: { id: Number(id) },
        });
        return deleteOrder;
      }
    }catch (error){
      throw error;
    }
  }

  static async updateOrders(id, updateOrders){

    try{
      const order = await database.Orders.findByPk(id);

      if (order) {

        const updateOrder = await database.Orders.update(
          updateOrders,
          {
            where: { id: Number(id) },
            returning: true,
            plain: true,
          }
        );
        return updateOrder[1];
      }
      return null;
    }catch (error) {
      throw error;
    }

  }

}
export default OrderServices;

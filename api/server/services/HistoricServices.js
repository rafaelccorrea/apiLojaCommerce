import database from '../src/models';

class HistoricServices {

  static async updateHistory(id, update){

    try{
      const historic = await database.HistoricOrder.bulkCreate(update);

    }catch (error) {
      throw error;
    }

  }

}

export default HistoricServices;

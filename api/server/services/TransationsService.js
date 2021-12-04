import database from '../src/models';

class Transations {

  static async TransationsAdd(data){
    try{
      return await database.Transations.create(data);
    }catch (error) {
      throw error;
    }
  }

  static async getTransationsById(id) {
    try {
      return await database.Transations.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  // static async getAllInfoBank() {
  //   try {
  //     return await database.InfoBankAccounts.findAll();
  //   } catch (error) {
  //     throw error;
  //   }
  // }

}

export default Transations;

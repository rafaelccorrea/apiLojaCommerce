import database from '../src/models';

class AddressService{

  static async getAllAddress(){

    try{
      return await database.Address.findAll();
    }catch(error){
      throw error;
    }

  }

  static async addAddress(addAddress){

    try{

      return await database.Address.create(addAddress)

    }catch (error) {
      throw error;
    }

  }

  static async getAddressByUser(user){

    try{

      return await database.Address.findOne({where: { userId: Number(user) }})

    }catch (error) {
      throw error;
    }

  }

  static async deleteAddress(id){
    try{
      const address = await database.Address.findByPk(id);
      if(address){
        const deleteAddress = await database.Address.destroy({
          where: { id: Number(id) },
        });
        return deleteAddress;
      }
    }catch (error){
      throw error;
    }
  }

  static async updateAddress(id, update){

    try{
      const address = await database.Address.findByPk(id);

      if (address) {

        const updateAddress = await database.Address.update(
          update,
          {
            where: { id: Number(id) },
            returning: true,
            plain: true,
          }
        );
        return updateAddress[1];
      }
      return null;
    }catch (error) {
      throw error;
    }
  }

}

export default AddressService;

import database from '../src/models';

class UserStoreService {
  static async addUserStore(contribuitor) {
    try {
      return await database.UserStore.create(contribuitor);
    } catch (error) {
      throw error;
    }
  }

  static async getStoresByUser(user) {
    try {
      return await database.UserStore.findAll({where: { userId: Number(user) },});
    } catch (error) {
      throw error;
    }
  }
}

export default UserStoreService;

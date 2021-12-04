import database from '../src/models';

class StoreService {
  static async getAllStores(userId) {
    try {
      return await database.User.findByPk(userId, {
        include: [
          { model: database.Store, as: 'stores', through: { attributes: [] } },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  static async getStoreById(store) {
    try {
      return await database.Store.findByPk(store);
    } catch (error) {
      throw error;
    }
  }

  static async addStore(store) {
    try {
      return await database.Store.create(store);
    } catch (error) {
      throw error;
    }
  }

  static async updateStore(id, updateStore) {
    try {
      const store = await database.Store.findByPk(id);

      if (store) {
        const updatedStore = await database.Store.update(updateStore, {
          where: { id: Number(id) },
          returning: true,
          plain: true,
        });

        return updatedStore[1];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async deleteStore(id) {
    try {
      const store = await database.Store.findByPk(id);

      if (store) {
        const deletedStore = await database.Store.destroy({
          where: { id: Number(id) },
        });
        return deletedStore;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async createWallet(store) {
    return database.WalletStores.create({ storeId: store });
  }

  static async getHistoric(storeId) {
    return database.HistoricStores.findAll({
      where: { storeId: Number(storeId) },
    });
  }

}

export default StoreService;

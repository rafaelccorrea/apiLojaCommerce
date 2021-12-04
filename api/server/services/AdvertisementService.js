import {Op} from "sequelize";
import database from '../src/models';

class AdvertisementService {
  static async getAllAdverts() {
    try {
      return await database.Advertisement.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async getAdvertisementById(advertisement) {
    try {
      return await database.Advertisement.findByPk(advertisement);
    } catch (error) {
      throw error;
    }
  }

  static async getAdvertisementsByIds(adverts) {
    try {
      return await database.Advertisement.findAll({
        where: {
          id: {
            [Op.in]: adverts
          }
        },
        include: [{
          model: database.Product,
          as: 'product',
        }]
      });
    } catch (error) {
      throw error;
    }
  }

  static async addAdvertisement(addAdvertisement) {
    try {
      return await database.Advertisement.create(addAdvertisement);
    } catch (error) {
      throw error;
    }
  }

  static async updateAdvertisement(id, updateAdvertisement) {
    try {
      const advertisement = await database.Advertisement.findByPk(id);

      if (advertisement) {
        const updatedAdvertisement = await database.Advertisement.update(
          updateAdvertisement,
          {
            where: { id: Number(id) },
            returning: true,
            plain: true,
          }
        );

        return updatedAdvertisement[1];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAdvertisement(id) {
    try {
      const advertisement = await database.Advertisement.findByPk(id);

      if (advertisement) {
        const deletedAdvertisement = await database.Advertisement.destroy({
          where: { id: Number(id) },
        });
        return deletedAdvertisement;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default AdvertisementService;

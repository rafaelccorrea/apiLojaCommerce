import database from '../src/models';

class AdvertisementAttributeService {
  static async addAdvertisementAttribute(attributes) {
    return database.AdvertisementAttribute.bulkCreate(attributes);
  }

  static async removeAllAdvertisementAttribute(advertisement) {
    return database.AdvertisementAttribute.destroy({
      where: { advertisementId: Number(advertisement) },
    });
  }
}

export default AdvertisementAttributeService;

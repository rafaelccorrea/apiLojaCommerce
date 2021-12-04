import database from '../src/models';
import { upload } from '../utils';

class SettingService {
  static async getSettings() {
    return database.Setting.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
    });
  }

  static async getHistoric() {
    return database.Setting.findAll({ order: [['createdAt', 'DESC']] });
  }

  static async updateSettings(settings, images) {
    const lastSetting = (
      await database.Setting.findAll({
        limit: 1,
        order: [['createdAt', 'DESC']],
      })
    )[0];

    const fullBannersRequest = images.fullBanners
      ? images.fullBanners.map(
          async (banner) => await upload(banner.buffer, 'banners', banner.name)
        )
      : null;

    const fullBanners = fullBannersRequest
      ? (await Promise.all(fullBannersRequest)).map((fullBanner) =>
          fullBanner && fullBanner.Location ? fullBanner.Location : null
        )
      : null;

    const miniBannerOne = images.miniBannerOne
      ? await upload(
          images.miniBannerOne.buffer,
          'banners',
          images.miniBannerOne.name
        )
      : null;

    const miniBannerTwo = images.miniBannerTwo
      ? await upload(
          images.miniBannerTwo.buffer,
          'banners',
          images.miniBannerTwo.name
        )
      : null;

    const miniBannerThree = images.miniBannerThree
      ? await upload(
          images.miniBannerThree.buffer,
          'banners',
          images.miniBannerThree.name
        )
      : null;

    const updatedSetting = await database.Setting.create(
      {
        ...settings,
        multiPoints: settings.multiPoints
          ? settings.multiPoints
          : lastSetting.multiPoints,
        pricePerPoint: settings.pricePerPoint
          ? settings.pricePerPoint
          : lastSetting.pricePerPoint,
        fullBanners: fullBanners
          ? fullBanners
          : lastSetting
          ? lastSetting.fullBanners
          : null,
        miniBannerOne:
          miniBannerOne && miniBannerOne.Location
            ? miniBannerOne.Location
            : lastSetting
            ? lastSetting.miniBannerOne
            : null,
        miniBannerTwo:
          miniBannerTwo && miniBannerTwo.Location
            ? miniBannerTwo.Location
            : lastSetting
            ? lastSetting.miniBannerTwo
            : null,
        miniBannerThree:
          miniBannerThree && miniBannerThree.Location
            ? miniBannerThree.Location
            : lastSetting
            ? lastSetting.miniBannerThree
            : null,
      },
      {
        returning: true,
        plain: true,
      }
    );

    return updatedSetting;
  }
}

export default SettingService;

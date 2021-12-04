import mime from 'mime-types';
import { SettingService } from '../services';
import { Request } from '../utils';
import { SettingValidation } from '../validations';

const request = new Request();
class SettingController {
  static async getSettings(req, res) {
    try {
      const settings = await SettingService.getSettings();

      if (settings)
        request.setSuccess(
          200,
          'Configurações consultadas com sucesso',
          settings[0]
        );
      else request.setError('Não foi possível consultar as configurações');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async updateSettings(req, res) {
    try {
      const fullBanners = req.files.fullBanner
        ? req.files.fullBanner.map((file, index) => ({
            name: `full_banner_${index}.${mime.extension(file.mimetype)}`,
            buffer: file.buffer,
          }))
        : null;

      const miniBannerOne = req.files.miniBannerOne
        ? req.files.miniBannerOne.map((file) => ({
            name: `mini_banner_one.${mime.extension(file.mimetype)}`,
            buffer: file.buffer,
          }))[0]
        : null;

      const miniBannerTwo = req.files.miniBannerTwo
        ? req.files.miniBannerTwo.map((file) => ({
            name: `mini_banner_two.${mime.extension(file.mimetype)}`,
            buffer: file.buffer,
          }))[0]
        : null;

      const miniBannerThree = req.files.miniBannerThree
        ? req.files.miniBannerThree.map((file) => ({
            name: `mini_banner_three.${mime.extension(file.mimetype)}`,
            buffer: file.buffer,
          }))[0]
        : null;

      await SettingValidation.updateSettings.validate(req.body, {
        abortEarly: false,
      });

      const settings = (
        await SettingService.updateSettings(
          { ...req.body, updatedBy: req.dataReq.id },
          {
            fullBanners,
            miniBannerOne,
            miniBannerTwo,
            miniBannerThree,
          }
        )
      ).get({
        plain: true,
      });

      delete settings.id;
      delete settings.createdAt;
      delete settings.updatedAt;

      if (settings)
        request.setSuccess(
          200,
          'Configurações atualizadas com sucesso',
          settings
        );
      else request.setError('Não foi possível atualizar as configurações');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }

  static async getHistoric(req, res) {
    try {
      const settings = await SettingService.getHistoric();

      if (settings)
        request.setSuccess(
          200,
          "Histórico de configurações consultado com sucesso",
          settings
        );
      else
        request.setError(
          "Não foi possível consultar o histórico de configurações"
        );

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }
}

export default SettingController;

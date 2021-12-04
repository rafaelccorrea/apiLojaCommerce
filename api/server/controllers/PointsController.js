import { PointsService } from '../services';
import { Request } from '../utils';
import { PointsValidation } from '../validations';

const request = new Request();

class PointsController {
  static async givePoints(req, res) {
    try {
      await PointsValidation.givePoints.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const points = (req.dataStore.quotation / 100) * req.body.amount;

      if (
        req.dataStore.wallet.points > 0 &&
        req.dataStore.wallet.points >= points
      ) {
        const response = req.dataUser
          ? await PointsService.givePoints({
              user: req.dataUser,
              points,
              store: req.dataStore,
              amount: req.body.amount,
            })
          : await PointsService.createPendingPoints({
              cpf: req.body.cpf,
              points,
              store: req.dataStore,
              amount: req.body.amount,
            });

        if (response) {
          request.setSuccess(200, 'Pontos enviados com sucesso', response);
        } else {
          request.setError('Não foi possível enviar os pontos');
        }
      } else {
        request.setError('Pontos insuficientes');
      }

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }
}

export default PointsController;

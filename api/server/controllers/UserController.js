import mime from 'mime-types';
import { UserService } from '../services';
import { Request } from '../utils';
import { UserValidation } from '../validations';

const request = new Request();
class UserController {
  static async updateUser(req, res) {
    try {
      const { id: userId } = req.dataReq;
      const extension = req.file
        ? mime.extension(req.file.mimetype)
        : undefined;

      await UserValidation.updateUser.validate(
        { ...req.body, extension, id: userId },
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      const user = (
        await UserService.updateUser({
          id: userId,
          updateUser: req.body,
          extension,
          buffer: req.file ? req.file.buffer : null,
        })
      ).get({
        plain: true,
      });

      delete user.password;

      if (user) request.setSuccess(200, 'Usuário atualizado com sucesso', user);
      else request.setError('Não foi possível atualizar o usuário');

      return request.send(res);
    } catch (error) {
      request.setError(error);
      return request.send(res);
    }
  }
}

export default UserController;

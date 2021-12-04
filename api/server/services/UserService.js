import database from '../src/models';
import { upload } from '../utils';

class UserService {
  static async getUserByCpf(cpf) {
    return database.User.findOne({
      include: [
        {
          model: database.WalletUsers,
          as: 'wallet',
        },
      ],
      where: {
        cpf: cpf,
      },
    });
  }

  static async createWallet(user) {
    return database.WalletUsers.create({ userId: user });
  }

  static async updateUser({ id, updateUser, extension, buffer }) {
    const t = await database.sequelize.transaction();

    try {
      const user = await database.User.findByPk(id);

      const image =
        user && buffer
          ? await upload(buffer, 'user', `${user.id}.${extension}`)
          : null;

      if (user) {
        const updatedUser = await database.User.update(
          { ...updateUser, image: image ? image.Location : user.image },
          {
            where: { id: Number(id) },
            transaction: t,
            returning: true,
            plain: true,
          }
        );

        await t.commit();
        return updatedUser[1];
      }
      await t.rollback();
      return null;
    } catch (error) {
      await t.rollback();
      return null;
    }
  }

  static async updateAddress(id, address) {

    try{
      const user = await database.User.findByPk(id);

      if (user) {

        const updateUser = await database.User.update(
          address,
          {
            where: { id: Number(id) },
            returning: true,
            plain: true,
          }
        );
        return updateUser[1];
      }
      return null;

    }catch (error) {
      throw error;
    }

  }

}

export default UserService;

import database from '../src/models';

class PointsService {
  static async givePoints({ store, user, points, amount }) {
    const t = await database.sequelize.transaction();
    try {
      await database.WalletUsers.update(
        { points: parseFloat(user.wallet.points) + parseFloat(points) },
        {
          where: { id: Number(user.wallet.id) },
          transaction: t,
        }
      );

      await database.WalletStores.update(
        { points: parseFloat(store.wallet.points) - parseFloat(points) },
        {
          where: { id: Number(store.wallet.id) },
          transaction: t,
          returning: true,
          plain: true,
        }
      );

      const transaction = await database.PointTransaction.create(
        {
          receiver: user.cpf,
          points,
          amount,
          quotation: store.quotation,
          storeId: store.id,
        },
        { transaction: t }
      );

      await t.commit();
      return transaction;
    } catch (error) {
      await t.rollback();
      return null;
    }
  }

  static async createPendingPoints({ store, cpf, points, amount }) {
    const t = await database.sequelize.transaction();
    try {
      await database.WalletStores.update(
        { points: parseFloat(store.wallet.points) - parseFloat(points) },
        {
          where: { id: Number(store.wallet.id) },
          transaction: t,
          returning: true,
          plain: true,
        }
      );

      const transaction = await database.PointTransaction.create(
        {
          receiver: cpf,
          points,
          amount,
          quotation: store.quotation,
          storeId: store.id,
        },
        { transaction: t }
      );

      await database.PendingPoint.create(
        {
          receiver: cpf,
          points,
        },
        { transaction: t }
      );

      await t.commit();
      return transaction;
    } catch (error) {
      await t.rollback();
      return null;
    }
  }

  static async givePendingPoints(receiver, wallet) {
    const t = await database.sequelize.transaction();
    try {
      const pending = await database.PendingPoint.findAll(
        {
          where: { receiver },
        },
        { transaction: t }
      );

      const points = pending.reduce(
        (total, value) => parseFloat(total) + parseFloat(value.points),
        0
      );

      const walletResponse = await database.WalletUsers.update(
        { points: parseFloat(wallet.points) + parseFloat(points) },
        {
          where: { id: Number(wallet.id) },
          transaction: t,
          returning: true,
          plain: true,
        }
      );

      await database.PendingPoint.destroy(
        {
          where: { receiver },
        },
        { transaction: t }
      );

      await t.commit();
      return walletResponse[1];
    } catch (error) {
      await t.rollback();
      return null;
    }
  }
}

export default PointsService;

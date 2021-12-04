import { UserService, StoreService, PointsService } from '../services';

export default async (req, res, next) => {
  const storeRequest = await StoreService.getStoreById(req.body.store);
  if (!storeRequest) {
    return res
      .status(404)
      .send({ status: 'error', message: 'Loja não encontrada.' });
  }

  const userRequest = await UserService.getUserByCpf(req.body.cpf);

  let store;
  if (storeRequest) {
    store = storeRequest.get({
      plain: true,
    });
  }
  if (store && store.wallet) {
    req.dataStore = store;
  } else if (store) {
    const wallet = (await StoreService.createWallet(store.id)).get({
      plain: true,
    });
    req.dataStore = { ...store, wallet };
  }

  let user;
  if (userRequest) {
    user = userRequest.get({
      plain: true,
    });
  }
  if (user && user.wallet) {
    req.dataUser = user;
  } else if (user) {
    const wallet = (await UserService.createWallet(user.id)).get({
      plain: true,
    });
    await PointsService.givePendingPoints(req.body.cpf, wallet);
    req.dataUser = { ...user, wallet };
  }

  next();
};

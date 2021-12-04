import { Router } from 'express';
import { AddressController } from '../controllers';
import { AdminMiddleware } from '../middlewares';

const router = Router();

router.post('/:id', AddressController.addAddress);
router.get('/', AdminMiddleware, AddressController.getAllAddress);
router.get('/:id', AddressController.getAddressByUser);
router.delete('/:id', AddressController.deleteAddress);
router.put('/:id', AddressController.updateAddress);

export default router;

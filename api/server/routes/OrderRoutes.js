import { Router } from 'express';
import { OrderController } from '../controllers';

const router = Router();

router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.post('/', OrderController.addOrder);
router.delete('/:id', OrderController.deleteOrder);
router.put('/:id', OrderController.updateOrder);
// router.get('/:id/hash', OrderController.getAllHash);

export default router;

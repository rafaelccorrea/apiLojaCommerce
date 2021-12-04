import { Router } from 'express';
import { TransationsController } from '../controllers'
import { TokenMiddleware } from '../middlewares';

const router = Router();

router.post('/:id/create', TransationsController.createRecipients)
router.post('/:id/split/', TokenMiddleware, TransationsController.createTransations)

export default router;

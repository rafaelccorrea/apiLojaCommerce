import { Router } from 'express';
import { PointsController } from '../controllers';

const router = Router();

router.post('/give', PointsController.givePoints);

export default router;

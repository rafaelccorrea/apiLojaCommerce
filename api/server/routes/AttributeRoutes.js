import { Router } from 'express';
import { AttributeController } from '../controllers';
import { AdminMiddleware } from '../middlewares';

const router = Router();

router.get('/', AttributeController.getAllAttributes);
router.get('/:id', AttributeController.getAttributeById);
router.post('/', AttributeController.addAttribute);
router.put('/:id', AdminMiddleware, AttributeController.updateAttribute);
router.delete('/:id', AdminMiddleware, AttributeController.deleteAttribute);

export default router;

import { Router } from 'express';
import { VariationController } from '../controllers';
import { AdminMiddleware } from '../middlewares';

const router = Router();

router.get('/', VariationController.getAllVariations);
router.get('/:id', VariationController.getVariationById);
router.post('/', VariationController.addVariation);
router.put('/:id', AdminMiddleware, VariationController.updateVariation);
router.delete('/:id', AdminMiddleware, VariationController.deleteVariation);

export default router;


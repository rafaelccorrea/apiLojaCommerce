import { Router } from 'express';
import { AdvertisementController } from '../controllers';

const router = Router();

router.get('/', AdvertisementController.getAllAdverts);
router.get('/:id', AdvertisementController.getAdvertisementById);
router.post('/', AdvertisementController.addAdvertisement);
router.put('/:id', AdvertisementController.updateAdvertisement);
router.delete('/:id', AdvertisementController.deleteAdvertisement);

export default router;

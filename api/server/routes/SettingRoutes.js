import { Router } from 'express';
import multer from 'multer';

import { SettingController } from '../controllers';

const uploadMulter = multer();

const router = Router();

router.get('/', SettingController.getSettings);
router.put(
  '/',
  uploadMulter.fields([
    { name: 'fullBanner', maxCount: 5 },
    { name: 'miniBannerOne', maxCount: 1 },
    { name: 'miniBannerTwo', maxCount: 1 },
    { name: 'miniBannerThree', maxCount: 1 },
  ]),
  SettingController.updateSettings
);
router.get("/historic", SettingController.getHistoric);
export default router;

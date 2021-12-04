import { Router } from 'express';
import multer from 'multer';

import { StoreController } from '../controllers';

const uploadMulter = multer();

const router = Router();

router.get("/", StoreController.getAllStores);
router.post("/", uploadMulter.single("image"), StoreController.addStore);
router.put("/:id", uploadMulter.single("image"), StoreController.updateStore);
router.delete("/:id", StoreController.deleteStore);
router.get("/:id/historic", StoreController.getHistoric);

export default router;

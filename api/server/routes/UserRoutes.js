import { Router } from 'express';
import multer from 'multer';

import { UserController } from '../controllers';

const uploadMulter = multer();

const router = Router();

router.put('/', uploadMulter.single('image'), UserController.updateUser);

export default router;

import { Router } from 'express';
import {
  CategoryOneController,
  CategoryTwoController,
  CategoryThreeController,
  CategoryFourController,
} from '../controllers';
import { AdminMiddleware } from '../middlewares';

const router = Router();

router.get('/one', CategoryOneController.getAllCategories);
router.get('/one/:id', CategoryOneController.getCategoryById);
router.post('/one', AdminMiddleware, CategoryOneController.addCategory);
router.put('/one/:id', AdminMiddleware, CategoryOneController.updateCategory);
router.delete(
  '/one/:id',
  AdminMiddleware,
  CategoryOneController.deleteCategory
);

router.get('/two', CategoryTwoController.getAllCategories);
router.get('/two/:id', CategoryTwoController.getCategoryById);
router.post('/two', AdminMiddleware, CategoryTwoController.addCategory);
router.put('/two/:id', AdminMiddleware, CategoryTwoController.updateCategory);
router.delete(
  '/two/:id',
  AdminMiddleware,
  CategoryTwoController.deleteCategory
);

router.get('/three', CategoryThreeController.getAllCategories);
router.get('/three/:id', CategoryThreeController.getCategoryById);
router.post('/three', AdminMiddleware, CategoryThreeController.addCategory);
router.put(
  '/three/:id',
  AdminMiddleware,
  CategoryThreeController.updateCategory
);
router.delete(
  '/three/:id',
  AdminMiddleware,
  CategoryThreeController.deleteCategory
);

router.get('/four', CategoryFourController.getAllCategories);
router.get('/four/:id', CategoryFourController.getCategoryById);
router.post('/four', AdminMiddleware, CategoryFourController.addCategory);
router.put('/four/:id', AdminMiddleware, CategoryFourController.updateCategory);
router.delete(
  '/four/:id',
  AdminMiddleware,
  CategoryFourController.deleteCategory
);

export default router;

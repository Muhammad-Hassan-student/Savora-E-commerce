import express from 'express'
import { allCategories, createCategory, deleteCat, singleCategory, update } from '../controllers/category.controller.js';
import adminAuth from '../middleware/admin.auth.js';

const router = express.Router();

router.post('/create',adminAuth,createCategory);
router.put('/update-category/:id',adminAuth,update);
router.get('/all-categories',adminAuth,allCategories);
router.get('/single-category/:slug',adminAuth,singleCategory)
router.delete('/delete-category/:id',adminAuth,deleteCat)

export default router;
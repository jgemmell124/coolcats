import express from 'express';
import userRoutes from './userRoutes.js';
import sandwichRoutes from './sandwichRoutes.js';
import ratingRoutes from './ratingRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/sandwiches', sandwichRoutes);
router.use('/ratings', ratingRoutes);

export default router;

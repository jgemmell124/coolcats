import express from 'express';
import userRoutes from './userRoutes.js';
import sandwichRoutes from './sandwichRoutes.js';
import ratingRoutes from './ratingRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/sandwiches', sandwichRoutes);
router.use('/ratings', ratingRoutes);
router.use('/auth', authRoutes);

export default router;

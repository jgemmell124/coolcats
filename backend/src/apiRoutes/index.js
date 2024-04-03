import express from 'express';
import userRoutes from './userRoutes.js';
import sandwichRoutes from './sandwichRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/sandwiches', sandwichRoutes);

export default router;

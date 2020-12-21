import { Router } from 'express';
import KycRouter from './KycCheck';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/kyc', KycRouter);

// Export the base-router
export default router;

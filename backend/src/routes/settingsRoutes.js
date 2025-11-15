import express from 'express';
import { getSystemSettings, updateSystemLanguage } from '../controllers/settingsController.js';
import { verifyToken as authenticate } from '../middlewares/authMiddleware.js';
import { checkRole } from '../middlewares/checkRole.js';

const router = express.Router();

// Public route - anyone can get system settings (for language)
router.get('/system', getSystemSettings);

// Protected route - only ADMIN can update system language
router.put('/system/language', authenticate, checkRole(['ADMIN']), updateSystemLanguage);

export default router;

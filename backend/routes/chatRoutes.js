// routes/chatRoutes.js
import express from 'express';
import { getChatHistory, sendMessage } from '../controllers/chatController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/history/:userId', authenticate, getChatHistory); // for direct chat
router.get('/history/:userId/room/:room', authenticate, getChatHistory); // for room chat
router.post('/send', authenticate, sendMessage);

export default router;

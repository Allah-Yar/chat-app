// // routes/chatRoutes.js
// import express from 'express';
// import { getChatHistory, sendMessage } from '../controllers/chatController.js';
// import { authenticate } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// router.get('/history/:userId', authenticate, getChatHistory); // for direct chat
// router.get('/history/:userId/room/:room', authenticate, getChatHistory); // for room chat
// router.post('/send', authenticate, sendMessage);

// export default router;

// routes/chatRoutes.js
// import express from 'express';
// import { getChatHistory, sendMessage } from '../controllers/chatController.js';
// import { authenticate } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Get chat history
// // For private chat: /history/:userId
// // For room chat: /history/:userId/room/:room
// router.get('/history/:userId', authenticate, getChatHistory); // private chat
// router.get('/history/:userId/room/:room', authenticate, getChatHistory); // room chat

// // Send message (either private or room)
// router.post('/send', authenticate, sendMessage);

// export default router;

// routes/chatRoutes.js
import express from 'express';
import { getPrivateChatHistory, getRoomChatHistory, sendMessage } from '../controllers/chatController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Fetch private chat history
router.get('/history/:userId', authenticate, getPrivateChatHistory); // for direct chat
router.get('/history/:userId/room/:room', authenticate, getRoomChatHistory); // for room chat
router.post('/send', authenticate, sendMessage); // for sending a message

export default router;

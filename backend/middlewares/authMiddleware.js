// // middlewares/authMiddleware.js
// import jwt from 'jsonwebtoken';

// export const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   try {
//     const user = jwt.verify(token, 'secretkey');
//     req.user = user;
//     next();
//   } catch {
//     res.status(401).json({ message: 'Invalid Token' });
//   }
// };

import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);  // Use JWT_SECRET from environment
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

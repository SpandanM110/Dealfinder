// src/middleware/auth.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import admin from '../utils/firebaseAdmin';

interface AuthenticatedNextApiRequest extends NextApiRequest {
  user: admin.auth.DecodedIdToken;
}

const withAuth = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as AuthenticatedNextApiRequest).user = decodedToken;
    return handler(req, res);
  } catch (error) {
    console.error('Authentication Error:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default withAuth;

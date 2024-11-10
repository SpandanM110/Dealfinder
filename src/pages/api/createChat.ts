// src/pages/api/createChat.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../utils/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import withAuth from '../../middleware/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId } = req.body; // The ID of the user to chat with
  interface AuthenticatedRequest extends NextApiRequest {
    user: {
      uid: string;
    };
  }

  const currentUser = (req as AuthenticatedRequest).user.uid; // Sender's user ID from middleware

  if (!currentUser || !userId) {
    return res.status(400).json({ message: 'Invalid Request' });
  }

  try {
    // Check if a chat between these users already exists
    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', currentUser),
      where('participants', 'array-contains', userId)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Chat already exists
      const chat = querySnapshot.docs[0];
      return res.status(200).json({ chatId: chat.id });
    }

    // Create new chat
    const newChat = await addDoc(chatsRef, {
      participants: [currentUser, userId],
    });

    res.status(201).json({ chatId: newChat.id });
  } catch (error) {
    console.error('Create Chat Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default withAuth(handler);

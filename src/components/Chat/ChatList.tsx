// src/components/Chat/ChatList.tsx
import { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import { collection, where, query, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useAuth } from '../Auth/AuthProvider';
import { getIdToken } from 'firebase/auth';

const ChatList = () => {
  const { user } = useAuth();
  interface Chat {
    id: string;
    participants: string[];
    lastMessage: string;
    timestamp: number;
  }
  
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      if (!user) return;
      const chatsRef = collection(db, 'chats');
      const q = query(chatsRef, where('participants', 'array-contains', user.uid));
      const querySnapshot = await getDocs(q);
      const userChats = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          participants: data.participants,
          lastMessage: data.lastMessage,
          timestamp: data.timestamp,
        };
      });
      setChats(userChats);
    };

    fetchChats();
  }, [user]);

  const createChat = async () => {
    if (searchEmail.trim() === '') {
      setError('Please enter a valid email.');
      return;
    }

    try {
      // Fetch the user ID based on email
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', searchEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('No user found with that email.');
        return;
      }

      const otherUser = querySnapshot.docs[0].data();

      // Get the ID token
      if (!user) {
        setError('User is not authenticated.');
        return;
      }
      const token = await getIdToken(user);

      // Call API to create or get existing chat
      const response = await fetch('/api/createChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: otherUser.uid }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to chat page
        window.location.href = `/chat/${data.chatId}`;
      } else {
        setError(data.message || 'Failed to create chat.');
      }
    } catch (err) {
      console.error('Create Chat Error:', err);
      setError('An error occurred while creating the chat.');
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl mb-4">Your Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} className="mb-2">
            <Link href={`/chat/${chat.id}`}>
              <a className="text-blue-500">Chat ID: {chat.id}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3 className="text-lg mb-2">Start a New Chat</h3>
        <input
          type="email"
          className="w-full p-2 border mb-2"
          placeholder="Enter user's email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button
          onClick={createChat}
          className="w-full p-2 bg-purple-500 text-white rounded"
        >
          Create Chat
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default ChatList;

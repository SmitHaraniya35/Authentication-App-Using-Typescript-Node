import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "./contexts/AuthContext";

export const socket = io("http://localhost:5000");

const useSocket = (userId: string, recipientId: string) => {

  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);

  const { user } = useContext(AuthContext)!;

  const roomId = userId && recipientId ? [userId, recipientId].sort().join(":") : "";

  // Load history
  useEffect(() => {
    if (!roomId) return;
    const saved = localStorage.getItem(`chat-${roomId}`);
    if (saved) setMessages(JSON.parse(saved));
  }, [roomId]);

  // Join room + receive
  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", { roomId, userId, recipientId });

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("loadMessages", (pending: { senderUsername: string; message: string }[]) => {
      const formatted = pending.map(m => ({
        sender: m.senderUsername,
        message: m.message
      }));
      setMessages((prev) => [...prev, ...formatted]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [roomId]);

  // Save history
  useEffect(() => {
    if (!roomId) return;
    localStorage.setItem(
      `chat-${roomId}`,
      JSON.stringify(messages)
    );
  }, [messages, roomId]);

  // Send message
  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    socket.emit("send-message", {
      senderId: userId,
      recipientId,
      roomId,
      username: user!.username,
      msg: message,
    });
  };

  return { messages, sendMessage };
};

export default useSocket;

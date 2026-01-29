import { useNavigate, useParams } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useSocket from "../socket";

export default function ChatRoom() {
  const { userId, recipientId } = useParams();
  const { user } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const { messages, sendMessage } = useSocket(userId!, recipientId!);

  const handleSendMessage = () => {
    sendMessage(msg);
    setMsg("");
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <hr />
      { user ? (
        <div>
          <h2>User: {user?.username}</h2> 
          {/* <hr /> <hr /> */}

          <div>
            {messages.map((m, i) => (
              <p key={i}>
                <strong>{m.sender === user?.username ? "You" : m.sender}:</strong>{" "}
                {m.message}
              </p>
            ))}
          </div>

            {/* <hr /> <hr /> */}
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
    ) : ( 
      <div>
        <p>Access Token is Expired!!</p>
        <p style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            onClick={() => navigate('/')}>
            Please login again or go to login and refresh token!!
        </p>
      </div>
     )}
    </div>
  );
}

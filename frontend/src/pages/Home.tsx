import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { User } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { socket } from "../socket";

export default function Home() {
    const { user } = useContext(AuthContext)!;
    const [userList, setUserList] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user list from backend or use dummy data
        if(user!=null){
            socket.emit("goingToHome", user!.id);
        }
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        const token = localStorage.getItem("token");
        console.log("Fetching user list with token:", token);
        try{
            const res = await axios.get(
                "http://localhost:5000/api/user/get-all-users",
                {
                    headers: { Authorization: `Bearer ${token}` }, 
                    withCredentials: true 
                }
            )
            console.log("User list response:", res);
            const usersData: User[] = res.data.data;
            // Exclude the current user from the list
            const filteredUsers = usersData.filter(u => u.id !== user!.id); 
            setUserList(filteredUsers);
        } catch (err){
            console.error("Error fetching user list:", err);
        }
    }

    const handleChatStart = (event: React.MouseEvent<HTMLLIElement>) => {
        const selectedUserId = (event.target as HTMLLIElement).getAttribute("value");
        // console.log("Starting chat with user ID:", selectedUserId);
        // console.log("Current User ID:", user!.id);
        navigate(`/chat/${user!.id}/${selectedUserId}`);
    }

    return (
        <div>
            <h1>Home Page</h1>
            <hr />
            {
                user ? (
                    <div>
                        <h2>User Info</h2>
                        <ul>
                            <li><b>Username:</b> {user!.username}</li>
                            <li><b>Email:</b> {user!.email}</li>
                            <li><b>Id:</b> {user!.id}</li>
                        </ul>
                        
                        <hr />
                        {
                            userList.length === 0 ?( 
                                <p>Loading user list...</p>
                            ) : ( 
                                <div>
                                    <h2>User List</h2>
                                    <ul>
                                        {userList.map((u, index) => (
                                            <li key={index} value={u.id} onClick={handleChatStart}>{u.username}</li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div>
                        <p>Access Token is Expired!!</p>
                        <p style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                            onClick={() => navigate('/')}>
                            Please login again or go to login and refresh token!!
                        </p>
                    </div>
                )
            }
        </div>
    );
}


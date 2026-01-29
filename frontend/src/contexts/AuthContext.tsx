import axios from "axios";
import { createContext, useState, type ReactNode, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  // loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token){
      fetchUser();
    } else {
      setUser(null);
    }
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/me",
          { 
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          }
        );

        if (res.status === 200) {
          const userData = res.data.data;
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  );
}

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({
  user: null,
  setUser: () => {},
  refreshUser: () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = async () => {
    try {
      const res = await fetch("http://localhost:3001/users/1");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

// context/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  id: 1;
  name: 'john';
  email: 'kklv';
  role: 'admin';
}

interface UserContextType {
  user: User | null; // Le type peut être `null` si l'utilisateur n'est pas connecté
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

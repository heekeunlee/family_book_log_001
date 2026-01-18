import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const USERS = [
  { id: 'dawon', name: '이다원', grade: 4, color: 'var(--color-dawon)', theme: 'dawon' },
  { id: 'sechan', name: '이세찬', grade: 2, color: 'var(--color-sechan)', theme: 'sechan' }
];

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Persist user selection if desired, or reset on load. 
  // For now, we'll keep it in state.

  const login = (userId) => {
    const user = USERS.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, USERS, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

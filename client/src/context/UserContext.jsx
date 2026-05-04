import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizResults, setQuizResults] = useState(null);
  const [preferences, setPreferences] = useState({
    location: '',
    stream: '',
    interests: [],
  });

  // Derived state
  const isAuthenticated = !!user;

  // On mount: try to restore session from localStorage, then validate with backend
  useEffect(() => {
    const restoreSession = async () => {
      const savedUser = localStorage.getItem('careersync-user');
      const accessToken = localStorage.getItem('accessToken');

      if (savedUser && accessToken) {
        // Optimistically set the user from localStorage
        setUser(JSON.parse(savedUser));

        // Validate the token with the backend
        try {
          const data = await api.get('/users/current-user');
          setUser(data.data);
          localStorage.setItem('careersync-user', JSON.stringify(data.data));
        } catch {
          // Token expired or invalid — clear session
          setUser(null);
          localStorage.removeItem('careersync-user');
          localStorage.removeItem('accessToken');
        }
      }

      // Restore saved preferences
      const savedPrefs = localStorage.getItem('careersync-preferences');
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }

      // Restore saved quiz results
      const savedQuiz = localStorage.getItem('careersync-quiz');
      if (savedQuiz) {
        setQuizResults(JSON.parse(savedQuiz));
      }

      setLoading(false);
    };

    restoreSession();
  }, []);

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('careersync-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('careersync-user');
    }
  }, [user]);

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('careersync-preferences', JSON.stringify(preferences));
  }, [preferences]);

  // Persist quiz results
  useEffect(() => {
    if (quizResults) {
      localStorage.setItem('careersync-quiz', JSON.stringify(quizResults));
    }
  }, [quizResults]);

  const login = (userData, accessToken) => {
    setUser(userData);
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
  };

  const logout = async () => {
    try {
      await api.post('/users/logout');
    } catch {
      // Even if the backend call fails, still clear local state
    }
    setUser(null);
    localStorage.removeItem('careersync-user');
    localStorage.removeItem('accessToken');
  };

  const updateUser = (userData) => setUser(userData);

  const updatePreferences = (newPrefs) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  return (
    <UserContext.Provider value={{
      user, login, logout, updateUser,
      loading, setLoading,
      quizResults, setQuizResults,
      isAuthenticated,
      preferences, updatePreferences,
    }}>
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

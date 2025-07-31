import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '@services/authService.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes from Firebase
    const unsubscribe = authService.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Check if user is admin based on email (in production, use Firebase custom claims)
        const adminEmails = ['admin@bakerzbite.com', 'admin@example.com'];
        const isAdminUser = adminEmails.includes(firebaseUser.email?.toLowerCase());
        
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email,
          role: isAdminUser ? 'admin' : 'customer',
          avatar: firebaseUser.photoURL || null,
          emailVerified: firebaseUser.emailVerified
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Unified authentication method that handles both email and Google sign-in
  const authenticate = async (method, credentials = null) => {
    try {
      let response;
      
      switch (method) {
        case 'email':
          response = await authService.signInWithEmail(credentials.email, credentials.password);
          break;
        case 'google':
          response = await authService.signInWithGoogle();
          break;
        default:
          return { success: false, error: 'Invalid authentication method.' };
      }
      
      return response;
    } catch (error) {
      return { 
        success: false, 
        error: method === 'google' 
          ? 'Google sign-in failed. Please try again.' 
          : 'Login failed. Please try again.' 
      };
    }
  };

  // Unified registration method that handles both email and Google sign-up
  const createAccount = async (method, userData = null) => {
    try {
      let response;
      
      switch (method) {
        case 'email':
          response = await authService.signUpWithEmail(userData.email, userData.password, userData.name);
          break;
        case 'google':
          response = await authService.signInWithGoogle(); // Google handles both sign-in and sign-up
          break;
        default:
          return { success: false, error: 'Invalid registration method.' };
      }
      
      return response;
    } catch (error) {
      return { 
        success: false, 
        error: method === 'google' 
          ? 'Google sign-up failed. Please try again.' 
          : 'Registration failed. Please try again.' 
      };
    }
  };

  // Legacy methods for backward compatibility
  const login = async (credentials) => {
    return authenticate('email', credentials);
  };

  const loginWithGoogle = async () => {
    return authenticate('google');
  };

  const register = async (userData) => {
    return createAccount('email', userData);
  };

  const registerWithGoogle = async () => {
    return createAccount('google');
  };

  const logout = async () => {
    try {
      await authService.signOut();
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed. Please try again.' };
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  const value = {
    user,
    loading,
    // Unified methods
    authenticate,
    createAccount,
    // Legacy methods for backward compatibility
    login,
    loginWithGoogle,
    register,
    registerWithGoogle,
    logout,
    isAdmin,
    isLoggedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


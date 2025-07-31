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
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get the user's ID token to access custom claims
          const idTokenResult = await firebaseUser.getIdTokenResult();
          const customClaims = idTokenResult.claims;
          
          // Check user role from custom claims
          const userRole = customClaims.role || 'customer';
          const isAdminUser = customClaims.admin === true || userRole === 'admin';
          const isStaffUser = customClaims.staff === true || userRole === 'staff';
          
          // Fallback to email-based check for backward compatibility
          const adminEmails = ['admin@bakerzbite.com', 'admin@example.com'];
          const staffEmails = ['staff@bakerzbite.com', 'staff@example.com'];
          const isAdminByEmail = adminEmails.includes(firebaseUser.email?.toLowerCase());
          const isStaffByEmail = staffEmails.includes(firebaseUser.email?.toLowerCase());
          
          // Determine final role with fallback logic
          let finalRole = userRole;
          if (isAdminUser || isAdminByEmail) {
            finalRole = 'admin';
          } else if (isStaffUser || isStaffByEmail) {
            finalRole = 'staff';
          } else {
            finalRole = 'customer';
          }
          
          const userData = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email,
            role: finalRole,
            isAdmin: finalRole === 'admin',
            isStaff: finalRole === 'staff' || finalRole === 'admin',
            isCustomer: true, // Everyone is a customer at base level
            avatar: firebaseUser.photoURL || null,
            emailVerified: firebaseUser.emailVerified,
            customClaims: customClaims || {}
          };
          
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error getting user token:', error);
          
          // Fallback to email-based role check if token fails
          const adminEmails = ['admin@bakerzbite.com', 'admin@example.com'];
          const staffEmails = ['staff@bakerzbite.com', 'staff@example.com'];
          const isAdminUser = adminEmails.includes(firebaseUser.email?.toLowerCase());
          const isStaffUser = staffEmails.includes(firebaseUser.email?.toLowerCase());
          
          let fallbackRole = 'customer';
          if (isAdminUser) {
            fallbackRole = 'admin';
          } else if (isStaffUser) {
            fallbackRole = 'staff';
          }
          
          const userData = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email,
            role: fallbackRole,
            isAdmin: fallbackRole === 'admin',
            isStaff: fallbackRole === 'staff' || fallbackRole === 'admin',
            isCustomer: true,
            avatar: firebaseUser.photoURL || null,
            emailVerified: firebaseUser.emailVerified,
            customClaims: {}
          };
          
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
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
    return user?.role === 'admin' || user?.isAdmin === true;
  };

  const isStaff = () => {
    return user?.role === 'staff' || user?.role === 'admin' || user?.isStaff === true;
  };

  const isCustomer = () => {
    return user !== null; // All authenticated users are customers at base level
  };

  const hasRole = (role) => {
    if (!user) return false;
    
    switch (role) {
      case 'admin':
        return isAdmin();
      case 'staff':
        return isStaff();
      case 'customer':
        return isCustomer();
      default:
        return false;
    }
  };

  const hasAnyRole = (roles) => {
    if (!Array.isArray(roles)) return false;
    return roles.some(role => hasRole(role));
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
    // Role checking methods
    isAdmin,
    isStaff,
    isCustomer,
    hasRole,
    hasAnyRole,
    isLoggedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


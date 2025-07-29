import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Simulate API call - replace with actual auth API
      const response = await mockLogin(credentials);
      
      if (response.success) {
        const userData = {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          role: response.user.role, // 'customer' or 'admin'
          avatar: response.user.avatar || null,
          token: response.token
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, user: userData };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call - replace with actual registration API
      const response = await mockRegister(userData);
      
      if (response.success) {
        return { success: true, message: 'Registration successful! Please log in.' };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
    login,
    register,
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

// Mock authentication functions - replace with actual API calls
const mockLogin = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock users database
  const users = [
    {
      id: 1,
      email: 'admin@bakerzbite.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin'
    },
    {
      id: 2,
      email: 'customer@example.com',
      password: 'customer123',
      name: 'John Doe',
      role: 'customer'
    }
  ];
  
  const user = users.find(u => 
    u.email === credentials.email && u.password === credentials.password
  );
  
  if (user) {
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token: 'mock-jwt-token-' + user.id
    };
  } else {
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }
};

const mockRegister = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Basic validation
  if (!userData.email || !userData.password || !userData.name) {
    return {
      success: false,
      error: 'All fields are required'
    };
  }
  
  if (userData.password.length < 6) {
    return {
      success: false,
      error: 'Password must be at least 6 characters long'
    };
  }
  
  // Check if user already exists (mock check)
  if (userData.email === 'admin@bakerzbite.com' || userData.email === 'customer@example.com') {
    return {
      success: false,
      error: 'User with this email already exists'
    };
  }
  
  return {
    success: true,
    message: 'Registration successful'
  };
};
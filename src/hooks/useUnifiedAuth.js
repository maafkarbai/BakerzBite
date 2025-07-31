import { useState } from 'react';
import { useAuth } from '@context/AuthContext';
import { useAccessibility } from '@context/AccessibilityContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const useUnifiedAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { authenticate, createAccount } = useAuth();
  const { announceToScreenReader } = useAccessibility();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleAuthResult = (result, isRegistration = false, redirectPath = from) => {
    if (result.success) {
      const message = isRegistration 
        ? `Account ${result.isNewUser ? 'created' : 'already exists, signed in'} successfully. Redirecting...`
        : 'Sign-in successful. Redirecting...';
      
      setSuccess(message);
      announceToScreenReader(message);
      
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 1500);
      
      return true;
    } else {
      setError(result.error);
      announceToScreenReader(`Error: ${result.error}`);
      return false;
    }
  };

  const signIn = async (method, credentials = null) => {
    setIsLoading(true);
    clearMessages();

    try {
      const result = await authenticate(method, credentials);
      return handleAuthResult(result, false);
    } catch (err) {
      const errorMessage = `Sign-in failed. Please try again.`;
      setError(errorMessage);
      announceToScreenReader(`Error: ${errorMessage}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (method, userData = null) => {
    setIsLoading(true);
    clearMessages();

    try {
      const result = await createAccount(method, userData);
      return handleAuthResult(result, true);
    } catch (err) {
      const errorMessage = `Registration failed. Please try again.`;
      setError(errorMessage);
      announceToScreenReader(`Error: ${errorMessage}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Convenience methods for specific auth types
  const signInWithEmail = (email, password) => signIn('email', { email, password });
  const signInWithGoogle = () => signIn('google');
  const signUpWithEmail = (userData) => signUp('email', userData);
  const signUpWithGoogle = () => signUp('google');

  return {
    isLoading,
    error,
    success,
    clearMessages,
    signIn,
    signUp,
    signInWithEmail,
    signInWithGoogle,
    signUpWithEmail,
    signUpWithGoogle,
    setError,
    setSuccess
  };
};
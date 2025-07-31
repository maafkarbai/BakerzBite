import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUnifiedAuth } from '@hooks/useUnifiedAuth';
import AccessibleInput from '@components/AccessibleInput';
import AccessibleButton from '@components/AccessibleButton';
import GoogleSignInButton from '@components/GoogleSignInButton';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { 
    isLoading, 
    error, 
    success, 
    signInWithEmail, 
    signInWithGoogle, 
    clearMessages 
  } = useUnifiedAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    clearMessages(); // Clear messages when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmail(formData.email, formData.password);
  };

  const handleGoogleSuccess = (result) => {
    // Success is handled by useUnifiedAuth
  };

  const handleGoogleError = (errorMessage) => {
    // Error is handled by useUnifiedAuth
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <img
            className="h-12 w-auto"
            src="/Images/CROISSANT LOGO (1).png"
            alt="BakerzBite"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link
            to="/register"
            className="font-medium text-[#D65A31] hover:text-[#C54A21] transition-colors"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Admin:</strong> admin@bakerzbite.com / admin123</p>
              <p><strong>Customer:</strong> customer@example.com / customer123</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
{error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">{success}</p>
                  </div>
                </div>
              </div>
            )}

            <AccessibleInput
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              helpText="Use the email address you registered with"
            />

            <AccessibleInput
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              helpText="Enter your account password"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#D65A31] focus:ring-[#D65A31]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-[#D65A31] hover:text-[#C54A21] transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <AccessibleButton
                type="submit"
                loading={isLoading}
                loadingText="Signing in..."
                disabled={isLoading}
                className="w-full justify-center"
                aria-label="Sign in to your account"
              >
                Sign in
              </AccessibleButton>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <GoogleSignInButton
                variant="signin"
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                disabled={isLoading}
                onClick={signInWithGoogle}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">New to BakerzBite?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:ring-offset-2 transition-colors"
              >
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
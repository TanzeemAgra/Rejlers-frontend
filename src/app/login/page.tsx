'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, Mail, ArrowRight, Shield, Building2, Bug, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/Header';
import { authService } from '@/lib/auth';
import { enhancedAuthService } from '@/lib/enhancedAuth';
import Logo from '@/components/ui/Logo';
import LoginDebugger from '@/components/ui/LoginDebugger';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [mounted, setMounted] = useState(false);
  const [showDebugger, setShowDebugger] = useState(false);
  const [isProduction, setIsProduction] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setIsProduction(process.env.NODE_ENV === 'production');
    
    // Check if user is already authenticated
    if (enhancedAuthService.isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Use Enhanced AuthService for better error handling and production support
      const loginResponse = await enhancedAuthService.login({
        email: formData.email,
        password: formData.password
      });
      
      if (loginResponse.access) {
        console.log('✅ Login successful', {
          user: loginResponse.email,
          role: loginResponse.role,
          isAdmin: loginResponse.is_superuser || loginResponse.is_staff,
          environment: process.env.NODE_ENV
        });
        
        // Store remember me preference
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
        
        // All users redirect to the main dashboard
        // The dashboard will adapt based on user role (super admin, staff, regular user)
        const redirectPath = '/dashboard';
        
        console.log('🎯 Redirecting to dashboard for user:', {
          email: loginResponse.email,
          role: loginResponse.role,
          is_superuser: loginResponse.is_superuser,
          is_staff: loginResponse.is_staff,
          path: redirectPath
        });
        
        // Use Next.js router for better navigation in production
        router.push(redirectPath);
        
      } else {
        setErrors({ email: 'Invalid response from server. Please try again.' });
      }
      
    } catch (error) {
      console.error('❌ Login error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during login.';
      
      // Show more helpful errors in production
      if (errorMessage.includes('Network error') || errorMessage.includes('timeout')) {
        setErrors({ 
          email: 'Connection problem. Please check your internet connection and try again.',
          password: 'If the problem persists, the server may be temporarily unavailable.'
        });
      } else if (errorMessage.includes('Invalid email or password')) {
        setErrors({ email: 'Invalid email or password. Please check your credentials.' });
      } else if (errorMessage.includes('CORS') || errorMessage.includes('fetch')) {
        setErrors({ 
          email: 'Unable to connect to the server. Please try again or contact support.',
          password: 'This may be a temporary connectivity issue.'
        });
      } else {
        setErrors({ email: errorMessage });
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      {/* Header Navigation */}
      <Header />
      
      <div className="pt-2">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Branding & Info */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white flex flex-col justify-center px-8 lg:px-16 py-12">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                <Logo context="login" priority={true} />
              </div>
            </Link>
          </div>

          {/* Hero Content */}
          <div className="max-w-md">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Welcome Back to
              <span className="block text-orange-400">REJLERS Portal</span>
            </h1>
            
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Access your engineering dashboard, project management tools, and collaborate with your team on industrial solutions that shape the future.
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600/30 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-blue-100">Secure Access Management</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600/30 rounded-full flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-blue-100">Project Management Hub</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600/30 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-blue-100">Team Collaboration Tools</span>
              </div>
            </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute bottom-0 right-0 opacity-10">
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
              <circle cx="350" cy="350" r="200" stroke="currentColor" strokeWidth="2"/>
              <circle cx="350" cy="350" r="150" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="350" cy="350" r="100" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h2>
              <p className="text-slate-600">Enter your credentials to access your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <span className="ml-2 text-sm text-slate-700">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-50 text-slate-500">New to REJLERS?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link 
                href="/register" 
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <span>Create your account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-600">
                <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
                <Link href="/support" className="hover:text-slate-900 transition-colors">Support</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Production Debug Tools */}
      {isProduction && (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            onClick={() => setShowDebugger(true)}
            className="flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-colors text-sm"
            title="Open login diagnostics"
          >
            <Bug className="w-4 h-4" />
            <span>Debug Login</span>
          </button>
        </div>
      )}

      {/* Global Error Banner */}
      {(errors.email || errors.password) && (
        <div className="fixed top-4 left-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-50 mx-auto max-w-md">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-red-900 mb-1">Login Failed</h4>
              <div className="text-sm text-red-700 space-y-1">
                {errors.email && <p>{errors.email}</p>}
                {errors.password && <p>{errors.password}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Debugger */}
      <LoginDebugger 
        isVisible={showDebugger} 
        onClose={() => setShowDebugger(false)} 
      />

      {/* Mobile-specific optimizations */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .min-h-screen {
            min-height: 100vh;
            min-height: -webkit-fill-available;
          }
        }
        
        /* iOS Safari viewport fix */
        @supports (-webkit-touch-callout: none) {
          .min-h-screen {
            min-height: -webkit-fill-available;
          }
        }
      `}</style>
      </div>
    </div>
  );
};

export default LoginPage;

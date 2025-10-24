import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService, { AuthResponse, User, Admin } from '../lib/api';

interface AuthContextType {
  user: User | Admin | null;
  role: 'user' | 'admin' | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'user' | 'admin') => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: 'user' | 'admin') => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | Admin | null>(null);
  const [role, setRole] = useState<'user' | 'admin' | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('auth_token');
      const storedUser = await AsyncStorage.getItem('auth_user');
      const storedRole = await AsyncStorage.getItem('auth_role');

      if (storedToken && storedUser && storedRole) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setRole(storedRole as 'user' | 'admin');
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAuthData = async (authData: AuthResponse) => {
    try {
      await AsyncStorage.setItem('auth_token', authData.token);
      await AsyncStorage.setItem('auth_role', authData.role);
      
      const userData = {
        id: authData.id,
        name: authData.name,
        email: authData.email,
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem('auth_user', JSON.stringify(userData));
      
      setToken(authData.token);
      setRole(authData.role);
      setUser(userData);
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  const clearAuthData = async () => {
    try {
      await AsyncStorage.multiRemove(['auth_token', 'auth_user', 'auth_role']);
      setToken(null);
      setRole(null);
      setUser(null);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  const login = async (email: string, password: string, role: 'user' | 'admin') => {
    try {
      const response = await ApiService.login({ email, password, role });
      
      if (response.data) {
        await saveAuthData(response.data);
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Login failed' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  };

  const register = async (name: string, email: string, password: string, role: 'user' | 'admin') => {
    try {
      const response = await ApiService.register({ name, email, password, role });
      
      if (response.data) {
        await saveAuthData(response.data);
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Registration failed' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    await ApiService.logout();
    await clearAuthData();
  };

  const value: AuthContextType = {
    user,
    role,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário salvo no AsyncStorage
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('@SmartParking:user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simular verificação de credenciais
      // Em um app real, aqui você faria uma chamada para a API
      if (email === 'teste@email.com' && password === '123456') {
        const userData: User = {
          id: '1',
          name: 'Usuário Teste',
          email: 'teste@email.com',
          phone: '(11) 99999-9999'
        };
        
        await AsyncStorage.setItem('@SmartParking:user', JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simular criação de conta
      // Em um app real, aqui você faria uma chamada para a API
      const newUser: User = {
        id: Date.now().toString(),
        ...userData
      };
      
      await AsyncStorage.setItem('@SmartParking:user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Erro no registro:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@SmartParking:user');
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

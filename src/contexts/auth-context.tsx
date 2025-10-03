import React from 'react';
import { useHistory } from 'react-router-dom';
import { addToast } from '@heroui/react';
import { User, UserRole, AuthState, LoginCredentials, RegisterData } from '../types';
import { getStoredUser, storeUser, removeStoredUser } from '../utils/storage';

interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = React.useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });
  
  const history = useHistory();

  // Check if user is already logged in
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = getStoredUser();
        
        if (storedUser) {
          setAuthState({
            isAuthenticated: true,
            user: storedUser,
            loading: false,
            error: null,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Failed to authenticate',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login logic - in a real app, this would be an API call
      const mockUsers = [
        {
          id: '1',
          name: 'John Doe',
          email: 'elderly@example.com',
          role: 'elderly' as UserRole,
          avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
          phone: '+1 (555) 123-4567',
          address: '123 Main St, Anytown, USA',
          createdAt: new Date().toISOString(),
          preferences: {
            notifications: true,
            emailUpdates: false,
            fontSize: 'large' as const,
            highContrast: false,
          },
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'volunteer@example.com',
          role: 'volunteer' as UserRole,
          avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
          phone: '+1 (555) 987-6543',
          bio: 'I love helping seniors with technology and daily tasks.',
          createdAt: new Date().toISOString(),
          preferences: {
            notifications: true,
            emailUpdates: true,
            fontSize: 'normal' as const,
            highContrast: false,
          },
        },
      ];
      
      const user = mockUsers.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Store user in localStorage
      storeUser(user);
      
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      });
      
      // Redirect based on user role
      if (user.role === 'elderly') {
        history.push('/elderly/dashboard');
      } else {
        history.push('/volunteer/dashboard');
      }
      
      addToast({
        title: 'Login Successful',
        description: `Welcome back, ${user.name}!`,
        color: 'success',
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      }));
      
      addToast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        color: 'danger',
      });
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock registration logic
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 11),
        name: data.name,
        email: data.email,
        role: data.role,
        avatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${Math.floor(Math.random() * 10)}`,
        createdAt: new Date().toISOString(),
        preferences: {
          notifications: true,
          emailUpdates: true,
          fontSize: 'normal',
          highContrast: false,
        },
      };
      
      // Store user in localStorage
      storeUser(newUser);
      
      setAuthState({
        isAuthenticated: true,
        user: newUser,
        loading: false,
        error: null,
      });
      
      // Redirect based on user role
      if (newUser.role === 'elderly') {
        history.push('/elderly/dashboard');
      } else {
        history.push('/volunteer/dashboard');
      }
      
      addToast({
        title: 'Registration Successful',
        description: `Welcome to Sahayogi, ${newUser.name}!`,
        color: 'success',
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      }));
      
      addToast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        color: 'danger',
      });
    }
  };

  const logout = (): void => {
    removeStoredUser();
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    
    history.push('/');
    
    addToast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
      color: 'default',
    });
  };

  const updateUser = (user: User): void => {
    storeUser(user);
    
    setAuthState(prev => ({
      ...prev,
      user,
    }));
    
    addToast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
      color: 'success',
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

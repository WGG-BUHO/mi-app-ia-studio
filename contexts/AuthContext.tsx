import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, PlanName } from '../types';
import { useNavigate } from 'react-router-dom'; 
import { ROUTES } from '../constants';


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role: UserRole) => void; // Simplified login
  logout: () => void;
  register: (name: string, email: string, role: UserRole) => void; // Simplified registration
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // For redirection after login/logout, if needed

  useEffect(() => {
    // Simulate checking for existing session
    const storedUser = localStorage.getItem('iusvenUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, role: UserRole) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0], // Simplified name
        role,
        currentPlan: role === UserRole.CLIENT ? PlanName.EMPRENDEDOR : undefined, // Example plan
        subscriptionActive: role === UserRole.CLIENT,
        profilePictureUrl: `https://picsum.photos/seed/${email}/100/100`
      };
      setUser(mockUser);
      localStorage.setItem('iusvenUser', JSON.stringify(mockUser));
      setIsLoading(false);
      // Example navigation, actual navigation will be handled by components
      // if (role === UserRole.ADMIN) navigate(ROUTES.ADMIN_DASHBOARD);
      // else if (role === UserRole.LAWYER) navigate(ROUTES.LAWYER_DASHBOARD);
      // else navigate(ROUTES.CLIENT_DASHBOARD);
    }, 500);
  };

  const register = (name: string, email: string, role: UserRole) => {
    setIsLoading(true);
     setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role,
        profilePictureUrl: `https://picsum.photos/seed/${email}/100/100`
      };
       if (role === UserRole.CLIENT) {
        // For clients, maybe redirect to select plan or a welcome screen
        // For simplicity, directly log them in with a default or no plan
        newUser.currentPlan = undefined; // Or PlanName.EMPRENDEDOR as a trial
        newUser.subscriptionActive = false;
      }
      setUser(newUser);
      localStorage.setItem('iusvenUser', JSON.stringify(newUser));
      setIsLoading(false);
      // navigate(ROUTES.LOGIN); // Or directly log them in
    }, 500);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('iusvenUser');
    // navigate(ROUTES.WELCOME);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@heroui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';
import { Footer } from '../components/footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { authState } = useAuth();
  const { isAuthenticated, user } = authState;

  const getDashboardLink = () => {
    if (!isAuthenticated || !user) return '/login';
    return user.role === 'elderly' ? '/elderly/dashboard' : '/volunteer/dashboard';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar 
        maxWidth="xl" 
        className="bg-background border-b border-divider"
        height="5rem" // Taller navbar for better visibility
      >
        <NavbarBrand>
          <RouterLink to="/" className="flex items-center gap-2">
            <Icon icon="lucide:heart-handshake" className="text-primary text-3xl" />
            <p className="font-bold text-2xl text-inherit">Sahayogi</p>
          </RouterLink>
        </NavbarBrand>
        
        <NavbarContent justify="end">
          {isAuthenticated ? (
            <>
              <NavbarItem>
                <Button
                  as={RouterLink}
                  to={getDashboardLink()}
                  color="primary"
                  variant="flat"
                  size="lg" // Larger button for better accessibility
                  startContent={<Icon icon="lucide:layout-dashboard" />}
                  className="font-medium"
                >
                  Dashboard
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="flat"
                  color="default"
                  size="lg" // Larger button for better accessibility
                  className="font-medium"
                >
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={RouterLink}
                  to="/register"
                  color="primary"
                  size="lg" // Larger button for better accessibility
                  className="font-medium"
                >
                  Register
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
      
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  );
};

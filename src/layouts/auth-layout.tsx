import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@heroui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-4">
        <RouterLink to="/" className="flex items-center gap-2 w-fit">
          <Icon icon="lucide:heart-handshake" className="text-primary text-3xl" />
          <span className="font-bold text-2xl">Sahayogi</span>
        </RouterLink>
      </header>
      
      <motion.main 
        className="flex-grow flex items-center justify-center p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full max-w-md">
          {children}
        </div>
      </motion.main>
      
      <footer className="p-6 text-center">
        <p className="text-default-600">
          &copy; {new Date().getFullYear()} Sahayogi. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <Link as={RouterLink} to="/" color="foreground" className="text-default-600 hover:text-primary">
            Home
          </Link>
          <Link href="#" color="foreground" className="text-default-600 hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="#" color="foreground" className="text-default-600 hover:text-primary">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
};

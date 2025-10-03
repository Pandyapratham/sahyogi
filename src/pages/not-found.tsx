import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';

export const NotFoundPage: React.FC = () => {
  const { authState } = useAuth();
  const { isAuthenticated, user } = authState;

  const getDashboardLink = () => {
    if (!isAuthenticated || !user) return '/';
    return user.role === 'elderly' ? '/elderly/dashboard' : '/volunteer/dashboard';
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <Icon icon="lucide:map-off" className="text-9xl text-primary opacity-80" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-xl text-default-600 mb-8">
          We're sorry, but the page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            as={RouterLink}
            to={getDashboardLink()}
            color="primary"
            size="lg"
            startContent={<Icon icon="lucide:home" />}
            className="font-medium"
          >
            {isAuthenticated ? 'Back to Dashboard' : 'Back to Home'}
          </Button>
          
          <Button
            as={RouterLink}
            to="/"
            variant="flat"
            color="default"
            size="lg"
            className="font-medium"
          >
            Visit Homepage
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

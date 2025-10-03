import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardBody, Input, Button, Link, Checkbox } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';
import { LoginCredentials } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, authState } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    
    // If no errors, proceed with login
    if (Object.keys(newErrors).length === 0) {
      const credentials: LoginCredentials = {
        email,
        password,
      };
      
      await login(credentials);
    }
  };
  
  // For demo purposes, provide quick login options
  const handleQuickLogin = async (userType: 'elderly' | 'volunteer') => {
    const credentials: LoginCredentials = {
      email: userType === 'elderly' ? 'elderly@example.com' : 'volunteer@example.com',
      password: 'password',
    };
    
    await login(credentials);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border border-divider shadow-md">
        <CardBody className="p-6 md:p-8 gap-6">
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-default-600">
              Sign in to your Sahayogi account
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onValueChange={setEmail}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              startContent={<Icon icon="lucide:mail" className="text-default-400" />}
              size="lg"
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onValueChange={setPassword}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              startContent={<Icon icon="lucide:lock" className="text-default-400" />}
              size="lg"
            />
            
            <div className="flex items-center justify-between">
              <Checkbox 
                isSelected={rememberMe}
                onValueChange={setRememberMe}
                size="lg"
              >
                Remember me
              </Checkbox>
              
              <Link href="#" color="primary">
                Forgot password?
              </Link>
            </div>
            
            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={authState.loading}
              size="lg"
              className="font-medium"
            >
              Sign In
            </Button>
          </form>
          
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-divider w-full"></div>
            <p className="text-default-500 bg-content1 px-4 text-center absolute">
              Quick Demo Login
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              color="default"
              variant="flat"
              onPress={() => handleQuickLogin('elderly')}
              startContent={<Icon icon="lucide:user" />}
              fullWidth
              size="lg"
            >
              Login as Senior
            </Button>
            
            <Button
              color="default"
              variant="flat"
              onPress={() => handleQuickLogin('volunteer')}
              startContent={<Icon icon="lucide:heart" />}
              fullWidth
              size="lg"
            >
              Login as Volunteer
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-default-600">
              Don't have an account?{' '}
              <Link as={RouterLink} to="/register" color="primary">
                Sign up
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

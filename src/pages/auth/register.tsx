import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardBody, Input, Button, Link, RadioGroup, Radio } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';
import { RegisterData, UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const { register, authState } = useAuth();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [role, setRole] = React.useState<UserRole>('elderly');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    
    // If no errors, proceed with registration
    if (Object.keys(newErrors).length === 0) {
      const data: RegisterData = {
        name,
        email,
        password,
        role,
      };
      
      await register(data);
    }
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
            <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
            <p className="text-default-600">
              Join Sahayogi to connect with seniors and volunteers
            </p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onValueChange={setName}
              isInvalid={!!errors.name}
              errorMessage={errors.name}
              startContent={<Icon icon="lucide:user" className="text-default-400" />}
              size="lg"
            />
            
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
              placeholder="Create a password"
              type="password"
              value={password}
              onValueChange={setPassword}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              startContent={<Icon icon="lucide:lock" className="text-default-400" />}
              size="lg"
            />
            
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              startContent={<Icon icon="lucide:lock" className="text-default-400" />}
              size="lg"
            />
            
            <div>
              <p className="text-default-700 mb-2 text-medium">I am registering as:</p>
              <RadioGroup
                orientation="horizontal"
                value={role}
                onValueChange={setRole as (value: string) => void}
                size="lg"
              >
                <Radio 
                  value="elderly"
                  description="I need assistance"
                >
                  Senior
                </Radio>
                <Radio 
                  value="volunteer"
                  description="I want to help"
                >
                  Volunteer
                </Radio>
              </RadioGroup>
            </div>
            
            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={authState.loading}
              size="lg"
              className="font-medium"
            >
              Create Account
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-default-600">
              Already have an account?{' '}
              <Link as={RouterLink} to="/login" color="primary">
                Sign in
              </Link>
            </p>
          </div>
          
          <div className="text-center text-default-500 text-sm">
            By signing up, you agree to our{' '}
            <Link href="#" color="primary" size="sm">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" color="primary" size="sm">
              Privacy Policy
            </Link>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

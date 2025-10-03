import React from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Input, 
  Textarea, 
  Divider, 
  Switch, 
  RadioGroup, 
  Radio 
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';
import { User } from '../../types';

export const ElderlyProfile: React.FC = () => {
  const { authState, updateUser } = useAuth();
  const { user } = authState;
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<Partial<User>>({});
  const [isSaving, setIsSaving] = React.useState(false);
  
  // Initialize form data when user data is available
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        preferences: {
          notifications: user.preferences?.notifications ?? true,
          emailUpdates: user.preferences?.emailUpdates ?? false,
          fontSize: user.preferences?.fontSize ?? 'normal',
          highContrast: user.preferences?.highContrast ?? false,
        },
      });
    }
  }, [user]);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const handlePreferenceChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };
  
  const handleSave = () => {
    if (!user) return;
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUser: User = {
        ...user,
        ...formData,
        preferences: {
          ...user.preferences,
          ...formData.preferences,
        },
      };
      
      updateUser(updatedUser);
      setIsSaving(false);
      setIsEditing(false);
    }, 1000);
  };
  
  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        preferences: {
          notifications: user.preferences?.notifications ?? true,
          emailUpdates: user.preferences?.emailUpdates ?? false,
          fontSize: user.preferences?.fontSize ?? 'normal',
          highContrast: user.preferences?.highContrast ?? false,
        },
      });
    }
    
    setIsEditing(false);
  };
  
  if (!user) return null;
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-default-600 text-lg">
            Manage your personal information and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="border border-divider">
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Personal Information</h2>
                {!isEditing ? (
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => setIsEditing(true)}
                    startContent={<Icon icon="lucide:edit" />}
                    size="lg"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      color="default"
                      variant="flat"
                      onPress={handleCancel}
                      size="lg"
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      onPress={handleSave}
                      startContent={<Icon icon="lucide:save" />}
                      isLoading={isSaving}
                      size="lg"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardHeader>
              
              <Divider />
              
              <CardBody className="gap-6">
                {isEditing ? (
                  <div className="space-y-6">
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={formData.name || ''}
                      onValueChange={(value) => handleInputChange('name', value)}
                      size="lg"
                    />
                    
                    <Input
                      label="Email"
                      placeholder="Enter your email"
                      type="email"
                      value={formData.email || ''}
                      onValueChange={(value) => handleInputChange('email', value)}
                      isDisabled // Email cannot be changed
                      size="lg"
                    />
                    
                    <Input
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      value={formData.phone || ''}
                      onValueChange={(value) => handleInputChange('phone', value)}
                      size="lg"
                    />
                    
                    <Textarea
                      label="Address"
                      placeholder="Enter your address"
                      value={formData.address || ''}
                      onValueChange={(value) => handleInputChange('address', value)}
                      size="lg"
                      minRows={3}
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <p className="text-default-500 mb-1">Full Name</p>
                      <p className="text-xl">{user.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-default-500 mb-1">Email</p>
                      <p className="text-xl">{user.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-default-500 mb-1">Phone Number</p>
                      <p className="text-xl">{user.phone || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-default-500 mb-1">Address</p>
                      <p className="text-xl">{user.address || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-default-500 mb-1">Account Created</p>
                      <p className="text-xl">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
          
          {/* Profile Photo and Preferences */}
          <div className="space-y-8">
            {/* Profile Photo */}
            <Card className="border border-divider">
              <CardBody className="flex flex-col items-center p-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary">
                  <img 
                    src={user.avatar || `https://img.heroui.chat/image/avatar?w=200&h=200&u=${user.id}`} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
                <p className="text-default-500 mb-4">Senior Member</p>
                
                <Button
                  color="primary"
                  variant="flat"
                  fullWidth
                  startContent={<Icon icon="lucide:upload" />}
                  size="lg"
                  isDisabled={!isEditing}
                >
                  Change Photo
                </Button>
              </CardBody>
            </Card>
            
            {/* Preferences */}
            <Card className="border border-divider">
              <CardHeader>
                <h2 className="text-2xl font-semibold">Preferences</h2>
              </CardHeader>
              
              <Divider />
              
              <CardBody className="gap-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-default-500 text-sm">Receive notifications about your requests</p>
                  </div>
                  <Switch
                    isSelected={formData.preferences?.notifications}
                    onValueChange={(value) => handlePreferenceChange('notifications', value)}
                    size="lg"
                    isDisabled={!isEditing}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Email Updates</p>
                    <p className="text-default-500 text-sm">Receive email updates about your requests</p>
                  </div>
                  <Switch
                    isSelected={formData.preferences?.emailUpdates}
                    onValueChange={(value) => handlePreferenceChange('emailUpdates', value)}
                    size="lg"
                    isDisabled={!isEditing}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">High Contrast Mode</p>
                    <p className="text-default-500 text-sm">Increase contrast for better visibility</p>
                  </div>
                  <Switch
                    isSelected={formData.preferences?.highContrast}
                    onValueChange={(value) => handlePreferenceChange('highContrast', value)}
                    size="lg"
                    isDisabled={!isEditing}
                  />
                </div>
                
                <div>
                  <p className="font-medium mb-2">Font Size</p>
                  <RadioGroup
                    orientation="horizontal"
                    value={formData.preferences?.fontSize}
                    onValueChange={(value) => handlePreferenceChange('fontSize', value)}
                    isDisabled={!isEditing}
                    size="lg"
                  >
                    <Radio value="normal">Normal</Radio>
                    <Radio value="large">Large</Radio>
                    <Radio value="extra-large">Extra Large</Radio>
                  </RadioGroup>
                </div>
              </CardBody>
            </Card>
            
            {/* Account Actions */}
            <Card className="border border-divider">
              <CardHeader>
                <h2 className="text-2xl font-semibold">Account Actions</h2>
              </CardHeader>
              
              <Divider />
              
              <CardBody className="gap-4">
                <Button
                  color="primary"
                  variant="flat"
                  fullWidth
                  startContent={<Icon icon="lucide:lock" />}
                  size="lg"
                >
                  Change Password
                </Button>
                
                <Button
                  color="danger"
                  variant="flat"
                  fullWidth
                  startContent={<Icon icon="lucide:trash-2" />}
                  size="lg"
                >
                  Delete Account
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

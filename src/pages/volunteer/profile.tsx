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
  Chip,
  Checkbox,
  CheckboxGroup
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';
import { User } from '../../types';
import type { VolunteerProfile as VolunteerProfileType } from '../../types';
import { mockVolunteers } from '../../data/mock-data';

export const VolunteerProfile: React.FC = () => {
  const { authState, updateUser } = useAuth();
  const { user } = authState;
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<Partial<User & VolunteerProfileType>>({});
  const [isSaving, setIsSaving] = React.useState(false);
  
  // Get volunteer profile data
  const volunteerData = React.useMemo(() => {
    if (!user) return null;
    return mockVolunteers.find(v => v.id === user.id);
  }, [user]);
  
  // Initialize form data when user data is available
  React.useEffect(() => {
    if (user && volunteerData) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        bio: volunteerData.bio || '',
        skills: volunteerData.skills || [],
        availability: volunteerData.availability || {
          weekdays: true,
          weekends: false,
          mornings: true,
          afternoons: true,
          evenings: false,
        },
        preferences: {
          notifications: user.preferences?.notifications ?? true,
          emailUpdates: user.preferences?.emailUpdates ?? false,
          // provide defaults for required fields on UserPreferences
          fontSize: user.preferences?.fontSize ?? 'normal',
          highContrast: user.preferences?.highContrast ?? false,
        },
      });
    }
  }, [user, volunteerData]);
  
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
  
  const handleAvailabilityChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [field]: value,
      },
    }));
  };
  
  const handleSkillsChange = (skills: string[]) => {
    setFormData(prev => ({
      ...prev,
      skills,
    }));
  };
  
  const handleSave = () => {
    if (!user || !volunteerData) return;
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUser: User = {
        ...user,
        name: formData.name || user.name,
        email: formData.email || user.email,
        phone: formData.phone,
        preferences: {
          ...user.preferences,
          ...formData.preferences,
        },
      };
      
      // In a real app, we would also update the volunteer profile
      // For now, we'll just update the user data
      updateUser(updatedUser);
      setIsSaving(false);
      setIsEditing(false);
    }, 1000);
  };
  
  const handleCancel = () => {
    if (user && volunteerData) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        bio: volunteerData.bio || '',
        skills: volunteerData.skills || [],
        availability: volunteerData.availability || {
          weekdays: true,
          weekends: false,
          mornings: true,
          afternoons: true,
          evenings: false,
        },
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
  
  if (!user || !volunteerData) return null;
  
  // Available skills for selection
  const availableSkills = [
    'shopping',
    'medical',
    'transportation',
    'companionship',
    'housework',
    'technology',
    'cooking',
    'gardening',
    'pet care',
  ];
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Volunteer Profile</h1>
          <p className="text-default-600 text-lg">
            Manage your personal information, skills, and availability
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
                      label="Bio"
                      placeholder="Tell us about yourself and why you want to volunteer"
                      value={formData.bio || ''}
                      onValueChange={(value) => handleInputChange('bio', value)}
                      size="lg"
                      minRows={3}
                    />
                    
                    <div>
                      <p className="text-default-700 mb-2 text-medium">Skills</p>
                      <CheckboxGroup
                        value={formData.skills || []}
                        onValueChange={handleSkillsChange as (keys: string[]) => void}
                        orientation="horizontal"
                        className="flex flex-wrap gap-2"
                      >
                        {availableSkills.map((skill) => (
                          <Checkbox key={skill} value={skill} className="capitalize">
                            {skill}
                          </Checkbox>
                        ))}
                      </CheckboxGroup>
                    </div>
                    
                    <div>
                      <p className="text-default-700 mb-2 text-medium">Availability</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium mb-2">Days</p>
                          <div className="space-y-2">
                            <Checkbox
                              isSelected={formData.availability?.weekdays}
                              onValueChange={(value) => handleAvailabilityChange('weekdays', value)}
                            >
                              Weekdays
                            </Checkbox>
                            <Checkbox
                              isSelected={formData.availability?.weekends}
                              onValueChange={(value) => handleAvailabilityChange('weekends', value)}
                            >
                              Weekends
                            </Checkbox>
                          </div>
                        </div>
                        
                        <div>
                          <p className="font-medium mb-2">Times</p>
                          <div className="space-y-2">
                            <Checkbox
                              isSelected={formData.availability?.mornings}
                              onValueChange={(value) => handleAvailabilityChange('mornings', value)}
                            >
                              Mornings
                            </Checkbox>
                            <Checkbox
                              isSelected={formData.availability?.afternoons}
                              onValueChange={(value) => handleAvailabilityChange('afternoons', value)}
                            >
                              Afternoons
                            </Checkbox>
                            <Checkbox
                              isSelected={formData.availability?.evenings}
                              onValueChange={(value) => handleAvailabilityChange('evenings', value)}
                            >
                              Evenings
                            </Checkbox>
                          </div>
                        </div>
                      </div>
                    </div>
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
                      <p className="text-default-500 mb-1">Bio</p>
                      <p className="text-xl">{volunteerData.bio || 'No bio provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-default-500 mb-1">Skills</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {volunteerData.skills.map((skill) => (
                          <Chip 
                            key={skill}
                            color="secondary"
                            variant="flat"
                            className="capitalize"
                          >
                            {skill}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-default-500 mb-1">Availability</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="font-medium">Days</p>
                          <div className="flex gap-2 mt-1">
                            {volunteerData.availability.weekdays && (
                              <Chip color="primary" variant="flat">Weekdays</Chip>
                            )}
                            {volunteerData.availability.weekends && (
                              <Chip color="primary" variant="flat">Weekends</Chip>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <p className="font-medium">Times</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {volunteerData.availability.mornings && (
                              <Chip color="primary" variant="flat">Mornings</Chip>
                            )}
                            {volunteerData.availability.afternoons && (
                              <Chip color="primary" variant="flat">Afternoons</Chip>
                            )}
                            {volunteerData.availability.evenings && (
                              <Chip color="primary" variant="flat">Evenings</Chip>
                            )}
                          </div>
                        </div>
                      </div>
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
          
          {/* Profile Photo and Stats */}
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
                <p className="text-default-500 mb-4">Volunteer</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Icon icon="lucide:star" className="text-warning" />
                    <span className="ml-1 font-medium">{volunteerData.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-default-500">•</span>
                  <div className="flex items-center">
                    <Icon icon="lucide:check-circle" className="text-success" />
                    <span className="ml-1">{volunteerData.completedRequests} completed</span>
                  </div>
                </div>
                
                <Chip 
                  color={volunteerData.verificationStatus === 'verified' ? 'success' : 'warning'}
                  variant="flat"
                  className="capitalize mb-4"
                >
                  {volunteerData.verificationStatus}
                </Chip>
                
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
                    <p className="text-default-500 text-sm">Receive notifications about new requests</p>
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
                    <p className="text-default-500 text-sm">Receive email updates about new requests</p>
                  </div>
                  <Switch
                    isSelected={formData.preferences?.emailUpdates}
                    onValueChange={(value) => handlePreferenceChange('emailUpdates', value)}
                    size="lg"
                    isDisabled={!isEditing}
                  />
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

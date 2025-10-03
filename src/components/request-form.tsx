import React from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input, 
  Textarea, 
  Select, 
  SelectItem,
  RadioGroup,
  Radio
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { HelpRequest, RequestCategory } from '../types';
import { addRequest } from '../utils/storage';
import { useAuth } from '../contexts/auth-context';

interface RequestFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onRequestCreated: (request: HelpRequest) => void;
  volunteerId?: string;
}

export const RequestForm: React.FC<RequestFormProps> = ({
  isOpen,
  onOpenChange,
  onRequestCreated,
  volunteerId,
}) => {
  const { authState } = useAuth();
  const { user } = authState;
  
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState<RequestCategory>('shopping');
  const [urgency, setUrgency] = React.useState<'low' | 'medium' | 'high'>('medium');
  const [scheduledDate, setScheduledDate] = React.useState('');
  const [scheduledTime, setScheduledTime] = React.useState('');
  const [address, setAddress] = React.useState(user?.address || '');
  
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setCategory('shopping');
      setUrgency('medium');
      setScheduledDate('');
      setScheduledTime('');
      setAddress(user?.address || '');
      setErrors({});
    }
  }, [isOpen, user]);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (scheduledDate && !scheduledTime) {
      newErrors.scheduledTime = 'Please select a time';
    }
    
    if (!scheduledDate && scheduledTime) {
      newErrors.scheduledDate = 'Please select a date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (!validateForm() || !user) return;
    
    setIsSubmitting(true);
    
    // Create scheduled date if both date and time are provided
    let scheduledFor: string | undefined;
    if (scheduledDate && scheduledTime) {
      scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();
    }
    
    // Create new request
    const newRequest: HelpRequest = {
      id: Math.random().toString(36).substring(2, 11),
      title,
      description,
      category,
      status: 'pending',
      urgency,
      createdAt: new Date().toISOString(),
      scheduledFor,
      elderlyId: user.id,
      volunteerId,
      location: {
        address,
      },
    };
    
    // Add request to storage
    addRequest(newRequest);
    
    // Notify parent component
    onRequestCreated(newRequest);
    
    // Close modal
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };
  
  const categories: { value: RequestCategory; label: string; icon: string }[] = [
    { value: 'shopping', label: 'Shopping', icon: 'lucide:shopping-bag' },
    { value: 'medical', label: 'Medical', icon: 'lucide:heart-pulse' },
    { value: 'transportation', label: 'Transportation', icon: 'lucide:car' },
    { value: 'companionship', label: 'Companionship', icon: 'lucide:users' },
    { value: 'housework', label: 'Housework', icon: 'lucide:home' },
    { value: 'technology', label: 'Technology', icon: 'lucide:smartphone' },
    { value: 'other', label: 'Other', icon: 'lucide:help-circle' },
  ];
  
  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              Create Help Request
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                <Input
                  label="Title"
                  placeholder="Enter a title for your request"
                  value={title}
                  onValueChange={setTitle}
                  isRequired
                  isInvalid={!!errors.title}
                  errorMessage={errors.title}
                  size="lg"
                />
                
                <Textarea
                  label="Description"
                  placeholder="Describe what you need help with"
                  value={description}
                  onValueChange={setDescription}
                  isRequired
                  isInvalid={!!errors.description}
                  errorMessage={errors.description}
                  size="lg"
                  minRows={3}
                />
                
                <Select
                  label="Category"
                  placeholder="Select a category"
                  selectedKeys={[category]}
                  onChange={(e) => setCategory(e.target.value as RequestCategory)}
                  size="lg"
                >
                  {categories.map((cat) => (
                    <SelectItem 
                      key={cat.value} 
                      value={cat.value}
                      startContent={<Icon icon={cat.icon} className="text-lg" />}
                    >
                      {cat.label}
                    </SelectItem>
                  ))}
                </Select>
                
                <div>
                  <p className="text-default-700 mb-2 text-medium">Urgency Level</p>
                  <RadioGroup
                    orientation="horizontal"
                    value={urgency}
                    onValueChange={setUrgency as (value: string) => void}
                    size="lg"
                  >
                    <Radio value="low">Low</Radio>
                    <Radio value="medium">Medium</Radio>
                    <Radio value="high">High</Radio>
                  </RadioGroup>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="date"
                    label="Scheduled Date"
                    placeholder="Select a date"
                    value={scheduledDate}
                    onValueChange={setScheduledDate}
                    isInvalid={!!errors.scheduledDate}
                    errorMessage={errors.scheduledDate}
                    size="lg"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  
                  <Input
                    type="time"
                    label="Scheduled Time"
                    placeholder="Select a time"
                    value={scheduledTime}
                    onValueChange={setScheduledTime}
                    isInvalid={!!errors.scheduledTime}
                    errorMessage={errors.scheduledTime}
                    size="lg"
                  />
                </div>
                
                <Input
                  label="Address"
                  placeholder="Enter your address"
                  value={address}
                  onValueChange={setAddress}
                  isRequired
                  isInvalid={!!errors.address}
                  errorMessage={errors.address}
                  size="lg"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button 
                color="default" 
                variant="flat" 
                onPress={onClose}
                size="lg"
              >
                Cancel
              </Button>
              <Button 
                color="primary" 
                onPress={handleSubmit}
                isLoading={isSubmitting}
                size="lg"
              >
                Create Request
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

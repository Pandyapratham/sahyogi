import React from 'react';
import { Card, CardBody, CardFooter, Chip, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { HelpRequest } from '../types';
import { getCategoryIcon, getStatusColor, getUrgencyColor } from '../data/mock-data';

interface RequestCardProps {
  request: HelpRequest;
  userType: 'elderly' | 'volunteer';
  onAccept?: (id: string) => void;
  onCancel?: (id: string) => void;
  onComplete?: (id: string) => void;
  onView?: (id: string) => void;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  userType,
  onAccept,
  onCancel,
  onComplete,
  onView,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="border border-divider"
        shadow="sm"
      >
        <CardBody className="gap-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900">
                <Icon icon={getCategoryIcon(request.category)} className="text-xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{request.title}</h3>
            </div>
            <Chip 
              color={getStatusColor(request.status)} 
              variant="flat" 
              size="lg"
              className="capitalize"
            >
              {request.status}
            </Chip>
          </div>
          
          <p className="text-default-600">{request.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Chip 
              startContent={<Icon icon="lucide:calendar" />} 
              variant="flat" 
              size="lg"
              color="default"
            >
              {request.scheduledFor ? formatDate(request.scheduledFor) : 'Not scheduled'}
            </Chip>
            
            <Chip 
              startContent={<Icon icon="lucide:alert-triangle" />} 
              variant="flat" 
              size="lg"
              color={getUrgencyColor(request.urgency)}
            >
              {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
            </Chip>
            
            <Chip 
              startContent={<Icon icon="lucide:tag" />} 
              variant="flat" 
              size="lg"
              color="secondary"
              className="capitalize"
            >
              {request.category}
            </Chip>
          </div>
          
          {request.location && (
            <div className="flex items-center gap-2 text-default-600 mt-1">
              <Icon icon="lucide:map-pin" />
              <span>{request.location.address}</span>
            </div>
          )}
        </CardBody>
        
        <CardFooter className="flex flex-wrap gap-2 border-t border-divider pt-4">
          {userType === 'volunteer' && request.status === 'pending' && (
            <Button
              color="primary"
              onPress={() => onAccept && onAccept(request.id)}
              startContent={<Icon icon="lucide:check" />}
              size="lg"
            >
              Accept Request
            </Button>
          )}
          
          {userType === 'elderly' && request.status === 'pending' && (
            <Button
              color="danger"
              variant="flat"
              onPress={() => onCancel && onCancel(request.id)}
              startContent={<Icon icon="lucide:x" />}
              size="lg"
            >
              Cancel Request
            </Button>
          )}
          
          {(request.status === 'accepted') && (
            <Button
              color="success"
              onPress={() => onComplete && onComplete(request.id)}
              startContent={<Icon icon="lucide:check-circle" />}
              size="lg"
            >
              Mark Complete
            </Button>
          )}
          
          <Button
            color="default"
            variant="flat"
            onPress={() => onView && onView(request.id)}
            startContent={<Icon icon="lucide:eye" />}
            size="lg"
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

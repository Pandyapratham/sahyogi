import React from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Chip,
  Divider
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { HelpRequest } from '../types';
import { getCategoryIcon, getStatusColor, getUrgencyColor, mockElderlyUsers, mockVolunteers } from '../data/mock-data';

interface RequestDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  request: HelpRequest | null;
  userType: 'elderly' | 'volunteer';
  onAccept?: (id: string) => void;
  onCancel?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export const RequestDetailsModal: React.FC<RequestDetailsModalProps> = ({
  isOpen,
  onOpenChange,
  request,
  userType,
  onAccept,
  onCancel,
  onComplete,
}) => {
  if (!request) return null;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };
  
  const elderly = mockElderlyUsers.find(e => e.id === request.elderlyId);
  const volunteer = request.volunteerId ? mockVolunteers.find(v => v.id === request.volunteerId) : null;
  
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
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900">
                  <Icon icon={getCategoryIcon(request.category)} className="text-xl text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">{request.title}</h2>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Chip 
                  color={getStatusColor(request.status)} 
                  variant="flat" 
                  size="lg"
                  className="capitalize"
                >
                  {request.status}
                </Chip>
                <Chip 
                  color={getUrgencyColor(request.urgency)} 
                  variant="flat" 
                  size="lg"
                  className="capitalize"
                >
                  {request.urgency} Priority
                </Chip>
              </div>
            </ModalHeader>
            
            <ModalBody>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-default-600">{request.description}</p>
                </div>
                
                <Divider />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Details</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Icon icon="lucide:calendar" className="text-primary" />
                        <span className="text-default-600">
                          Created: {formatDate(request.createdAt)}
                        </span>
                      </li>
                      {request.scheduledFor && (
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:clock" className="text-primary" />
                          <span className="text-default-600">
                            Scheduled for: {formatDate(request.scheduledFor)}
                          </span>
                        </li>
                      )}
                      {request.completedAt && (
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:check-circle" className="text-success" />
                          <span className="text-default-600">
                            Completed on: {formatDate(request.completedAt)}
                          </span>
                        </li>
                      )}
                      <li className="flex items-center gap-2">
                        <Icon icon="lucide:tag" className="text-primary" />
                        <span className="text-default-600 capitalize">
                          Category: {request.category}
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Location</h3>
                    {request.location ? (
                      <div className="flex items-start gap-2">
                        <Icon icon="lucide:map-pin" className="text-primary mt-1" />
                        <span className="text-default-600">{request.location.address}</span>
                      </div>
                    ) : (
                      <p className="text-default-500">No location provided</p>
                    )}
                  </div>
                </div>
                
                <Divider />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {elderly && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Requested By</h3>
                      <div className="flex items-center gap-3">
                        <img 
                          src={elderly.avatar} 
                          alt={elderly.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{elderly.name}</p>
                          <p className="text-default-500 text-sm">{elderly.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {volunteer && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Assigned To</h3>
                      <div className="flex items-center gap-3">
                        <img 
                          src={volunteer.avatar} 
                          alt={volunteer.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{volunteer.name}</p>
                          <div className="flex items-center gap-1 text-sm">
                            <Icon icon="lucide:star" className="text-warning" />
                            <span>{volunteer.rating.toFixed(1)}</span>
                            <span className="text-default-500">•</span>
                            <span className="text-default-500">{volunteer.completedRequests} completed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>
            
            <ModalFooter>
              <Button 
                color="default" 
                variant="flat" 
                onPress={onClose}
                size="lg"
              >
                Close
              </Button>
              
              {userType === 'volunteer' && request.status === 'pending' && (
                <Button
                  color="primary"
                  onPress={() => {
                    onAccept && onAccept(request.id);
                    onClose();
                  }}
                  startContent={<Icon icon="lucide:check" />}
                  size="lg"
                >
                  Accept Request
                </Button>
              )}
              
              {userType === 'elderly' && request.status === 'pending' && (
                <Button
                  color="danger"
                  onPress={() => {
                    onCancel && onCancel(request.id);
                    onClose();
                  }}
                  startContent={<Icon icon="lucide:x" />}
                  size="lg"
                >
                  Cancel Request
                </Button>
              )}
              
              {request.status === 'accepted' && (
                <Button
                  color="success"
                  onPress={() => {
                    onComplete && onComplete(request.id);
                    onClose();
                  }}
                  startContent={<Icon icon="lucide:check-circle" />}
                  size="lg"
                >
                  Mark Complete
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

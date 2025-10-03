import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';
import { getStoredRequests } from '../../utils/storage';
import { HelpRequest } from '../../types';
import { RequestCard } from '../../components/request-card';
import { RequestDetailsModal } from '../../components/request-details-modal';
import { updateRequest } from '../../utils/storage';
import { mockElderlyUsers } from '../../data/mock-data';

export const VolunteerDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  
  const [allRequests, setAllRequests] = React.useState<HelpRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = React.useState<HelpRequest | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);
  
  // Load requests from storage
  React.useEffect(() => {
    if (user) {
      const storedRequests = getStoredRequests();
      setAllRequests(storedRequests);
    }
  }, [user]);
  
  // Handle request acceptance
  const handleAcceptRequest = (requestId: string) => {
    if (!user) return;
    
    const updatedRequest = allRequests.find(r => r.id === requestId);
    
    if (updatedRequest) {
      updatedRequest.status = 'accepted';
      updatedRequest.volunteerId = user.id;
      updateRequest(updatedRequest);
      
      setAllRequests(prev => 
        prev.map(r => (r.id === requestId ? updatedRequest : r))
      );
    }
  };
  
  // Handle request completion
  const handleCompleteRequest = (requestId: string) => {
    const updatedRequest = allRequests.find(r => r.id === requestId);
    
    if (updatedRequest) {
      updatedRequest.status = 'completed';
      updatedRequest.completedAt = new Date().toISOString();
      updateRequest(updatedRequest);
      
      setAllRequests(prev => 
        prev.map(r => (r.id === requestId ? updatedRequest : r))
      );
    }
  };
  
  // Handle view request details
  const handleViewRequest = (requestId: string) => {
    const request = allRequests.find(r => r.id === requestId);
    
    if (request) {
      setSelectedRequest(request);
      setIsDetailsModalOpen(true);
    }
  };
  
  // Filter requests
  const pendingRequests = allRequests.filter(r => r.status === 'pending');
  const myActiveRequests = allRequests.filter(r => r.status === 'accepted' && r.volunteerId === user?.id);
  const myCompletedRequests = allRequests.filter(r => 
    (r.status === 'completed' || r.status === 'cancelled') && 
    r.volunteerId === user?.id
  );
  
  // Get nearby seniors
  const nearbySeniors = React.useMemo(() => {
    return mockElderlyUsers.slice(0, 3);
  }, []);
  
  if (!user) return null;
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-default-600 text-lg">
            Thank you for volunteering! Here's an overview of help requests and your activities.
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-divider">
            <CardBody className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900">
                <Icon icon="lucide:clipboard-list" className="text-2xl text-primary" />
              </div>
              <div>
                <p className="text-default-600">Available Requests</p>
                <p className="text-3xl font-bold">{pendingRequests.length}</p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="border border-divider">
            <CardBody className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-full bg-success-100 dark:bg-success-900">
                <Icon icon="lucide:check-circle" className="text-2xl text-success" />
              </div>
              <div>
                <p className="text-default-600">My Active Tasks</p>
                <p className="text-3xl font-bold">{myActiveRequests.length}</p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="border border-divider">
            <CardBody className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-full bg-secondary-100 dark:bg-secondary-900">
                <Icon icon="lucide:award" className="text-2xl text-secondary" />
              </div>
              <div>
                <p className="text-default-600">Completed Tasks</p>
                <p className="text-3xl font-bold">{myCompletedRequests.length}</p>
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* My Active Tasks */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">My Active Tasks</h2>
          
          {myActiveRequests.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {myActiveRequests.map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  userType="volunteer"
                  onComplete={handleCompleteRequest}
                  onView={handleViewRequest}
                />
              ))}
            </div>
          ) : (
            <Card className="border border-divider">
              <CardBody className="flex flex-col items-center justify-center py-12">
                <Icon icon="lucide:calendar" className="text-5xl text-default-400 mb-4" />
                <p className="text-xl text-default-600 mb-6">You don't have any active tasks</p>
                <Button
                  as="a"
                  href="#available-requests"
                  color="primary"
                  startContent={<Icon icon="lucide:search" />}
                  size="lg"
                >
                  Browse Available Requests
                </Button>
              </CardBody>
            </Card>
          )}
        </div>
        
        {/* Available Requests */}
        <div className="mb-8" id="available-requests">
          <h2 className="text-2xl font-semibold mb-4">Available Requests</h2>
          
          {pendingRequests.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {pendingRequests.slice(0, 3).map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  userType="volunteer"
                  onAccept={handleAcceptRequest}
                  onView={handleViewRequest}
                />
              ))}
              
              {pendingRequests.length > 3 && (
                <div className="text-center">
                  <Button
                    as="a"
                    href="/volunteer/requests"
                    color="primary"
                    variant="flat"
                    size="lg"
                  >
                    View All {pendingRequests.length} Available Requests
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Card className="border border-divider">
              <CardBody className="flex flex-col items-center justify-center py-12">
                <Icon icon="lucide:check-circle" className="text-5xl text-success mb-4" />
                <p className="text-xl text-default-600">All requests have been accepted!</p>
                <p className="text-default-500 mb-6">Check back later for new help requests</p>
              </CardBody>
            </Card>
          )}
        </div>
        
        {/* Nearby Seniors */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Seniors Near You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbySeniors.map(senior => (
              <Card key={senior.id} className="border border-divider">
                <CardBody className="flex flex-col items-center text-center p-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img 
                      src={senior.avatar} 
                      alt={senior.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{senior.name}</h3>
                  
                  <p className="text-default-600 mb-4">
                    {senior.address || 'No address provided'}
                  </p>
                  
                  <Divider className="my-3" />
                  
                  <Button
                    color="primary"
                    variant="flat"
                    fullWidth
                    onPress={() => {
                      // In a real app, this would navigate to a chat or contact page
                    }}
                    size="lg"
                    startContent={<Icon icon="lucide:message-circle" />}
                  >
                    Contact
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Request Details Modal */}
      <RequestDetailsModal
        isOpen={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        request={selectedRequest}
        userType="volunteer"
        onAccept={handleAcceptRequest}
        onComplete={handleCompleteRequest}
      />
    </div>
  );
};

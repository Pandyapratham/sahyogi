import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';
import { getStoredRequests } from '../../utils/storage';
import { HelpRequest } from '../../types';
import { RequestForm } from '../../components/request-form';
import { RequestCard } from '../../components/request-card';
import { RequestDetailsModal } from '../../components/request-details-modal';
import { updateRequest } from '../../utils/storage';
import { mockVolunteers } from '../../data/mock-data';

export const ElderlyDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  
  const [requests, setRequests] = React.useState<HelpRequest[]>([]);
  const [isRequestFormOpen, setIsRequestFormOpen] = React.useState(false);
  const [selectedRequest, setSelectedRequest] = React.useState<HelpRequest | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);
  
  // Load requests from storage
  React.useEffect(() => {
    if (user) {
      const allRequests = getStoredRequests();
      const userRequests = allRequests.filter(r => r.elderlyId === user.id);
      setRequests(userRequests);
    }
  }, [user]);
  
  // Handle request creation
  const handleRequestCreated = (request: HelpRequest) => {
    setRequests(prev => [request, ...prev]);
    setIsRequestFormOpen(false);
  };
  
  // Handle request cancellation
  const handleCancelRequest = (requestId: string) => {
    const updatedRequest = requests.find(r => r.id === requestId);
    
    if (updatedRequest) {
      updatedRequest.status = 'cancelled';
      updateRequest(updatedRequest);
      
      setRequests(prev => 
        prev.map(r => (r.id === requestId ? updatedRequest : r))
      );
    }
  };
  
  // Handle request completion
  const handleCompleteRequest = (requestId: string) => {
    const updatedRequest = requests.find(r => r.id === requestId);
    
    if (updatedRequest) {
      updatedRequest.status = 'completed';
      updatedRequest.completedAt = new Date().toISOString();
      updateRequest(updatedRequest);
      
      setRequests(prev => 
        prev.map(r => (r.id === requestId ? updatedRequest : r))
      );
    }
  };
  
  // Handle view request details
  const handleViewRequest = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    
    if (request) {
      setSelectedRequest(request);
      setIsDetailsModalOpen(true);
    }
  };
  
  // Filter requests by status
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const activeRequests = requests.filter(r => r.status === 'accepted');
  const completedRequests = requests.filter(r => r.status === 'completed' || r.status === 'cancelled');
  
  // Get random volunteers for recommendations
  const recommendedVolunteers = React.useMemo(() => {
    return mockVolunteers.slice(0, 3);
  }, []);
  
  if (!user) return null;
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
            <p className="text-default-600 text-lg">
              Here's an overview of your help requests and recommended volunteers.
            </p>
          </div>
          
          <Button
            color="primary"
            size="lg"
            startContent={<Icon icon="lucide:plus" />}
            onPress={() => setIsRequestFormOpen(true)}
            className="font-medium"
          >
            New Help Request
          </Button>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-divider">
            <CardBody className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900">
                <Icon icon="lucide:clock" className="text-2xl text-primary" />
              </div>
              <div>
                <p className="text-default-600">Pending Requests</p>
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
                <p className="text-default-600">Active Requests</p>
                <p className="text-3xl font-bold">{activeRequests.length}</p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="border border-divider">
            <CardBody className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-full bg-secondary-100 dark:bg-secondary-900">
                <Icon icon="lucide:users" className="text-2xl text-secondary" />
              </div>
              <div>
                <p className="text-default-600">Completed Requests</p>
                <p className="text-3xl font-bold">{completedRequests.length}</p>
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Active Requests */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Active Requests</h2>
          
          {activeRequests.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {activeRequests.map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  userType="elderly"
                  onComplete={handleCompleteRequest}
                  onView={handleViewRequest}
                />
              ))}
            </div>
          ) : (
            <Card className="border border-divider">
              <CardBody className="flex flex-col items-center justify-center py-12">
                <Icon icon="lucide:calendar" className="text-5xl text-default-400 mb-4" />
                <p className="text-xl text-default-600 mb-6">You don't have any active requests</p>
                <Button
                  color="primary"
                  onPress={() => setIsRequestFormOpen(true)}
                  startContent={<Icon icon="lucide:plus" />}
                  size="lg"
                >
                  Create a New Request
                </Button>
              </CardBody>
            </Card>
          )}
        </div>
        
        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {pendingRequests.map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  userType="elderly"
                  onCancel={handleCancelRequest}
                  onView={handleViewRequest}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Recommended Volunteers */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recommended Volunteers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedVolunteers.map(volunteer => (
              <Card key={volunteer.id} className="border border-divider">
                <CardBody className="flex flex-col items-center text-center p-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img 
                      src={volunteer.avatar} 
                      alt={volunteer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-1">{volunteer.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <Icon icon="lucide:star" className="text-warning" />
                    <span>{volunteer.rating.toFixed(1)}</span>
                    <span className="text-default-500">•</span>
                    <span className="text-default-500">{volunteer.completedRequests} completed</span>
                  </div>
                  
                  <div className="mb-4">
                    {volunteer.skills.slice(0, 2).map(skill => (
                      <Chip 
                        key={skill}
                        className="mr-1 mb-1 capitalize"
                        color="secondary"
                        variant="flat"
                        size="sm"
                      >
                        {skill}
                      </Chip>
                    ))}
                  </div>
                  
                  <Divider className="my-3" />
                  
                  <Button
                    color="primary"
                    variant="flat"
                    fullWidth
                    onPress={() => {
                      setIsRequestFormOpen(true);
                    }}
                    size="lg"
                  >
                    Request Help
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Request Form Modal */}
      <RequestForm
        isOpen={isRequestFormOpen}
        onOpenChange={setIsRequestFormOpen}
        onRequestCreated={handleRequestCreated}
      />
      
      {/* Request Details Modal */}
      <RequestDetailsModal
        isOpen={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        request={selectedRequest}
        userType="elderly"
        onCancel={handleCancelRequest}
        onComplete={handleCompleteRequest}
      />
    </div>
  );
};

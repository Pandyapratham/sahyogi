import React from 'react';
import { motion } from 'framer-motion';
import { Button, Tabs, Tab, Card, CardBody, Input, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';
import { getStoredRequests } from '../../utils/storage';
import { HelpRequest, RequestCategory, RequestStatus } from '../../types';
import { RequestForm } from '../../components/request-form';
import { RequestCard } from '../../components/request-card';
import { RequestDetailsModal } from '../../components/request-details-modal';
import { updateRequest } from '../../utils/storage';

export const ElderlyRequests: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  
  const [requests, setRequests] = React.useState<HelpRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = React.useState<HelpRequest[]>([]);
  const [isRequestFormOpen, setIsRequestFormOpen] = React.useState(false);
  const [selectedRequest, setSelectedRequest] = React.useState<HelpRequest | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>("all");
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<RequestCategory | "all">("all");
  
  // Load requests from storage
  React.useEffect(() => {
    if (user) {
      const allRequests = getStoredRequests();
      const userRequests = allRequests.filter(r => r.elderlyId === user.id);
      setRequests(userRequests);
      setFilteredRequests(userRequests);
    }
  }, [user]);
  
  // Apply filters when tab, search, or category changes
  React.useEffect(() => {
    if (!requests.length) return;
    
    let filtered = [...requests];
    
    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter(r => {
        if (activeTab === "pending") return r.status === "pending";
        if (activeTab === "active") return r.status === "accepted";
        if (activeTab === "completed") return r.status === "completed";
        if (activeTab === "cancelled") return r.status === "cancelled";
        return true;
      });
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(query) || 
        r.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(r => r.category === categoryFilter);
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setFilteredRequests(filtered);
  }, [activeTab, searchQuery, categoryFilter, requests]);
  
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
  
  // Categories for filter
  const categories: { value: RequestCategory | "all"; label: string }[] = [
    { value: "all", label: "All Categories" },
    { value: "shopping", label: "Shopping" },
    { value: "medical", label: "Medical" },
    { value: "transportation", label: "Transportation" },
    { value: "companionship", label: "Companionship" },
    { value: "housework", label: "Housework" },
    { value: "technology", label: "Technology" },
    { value: "other", label: "Other" },
  ];
  
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
            <h1 className="text-3xl font-bold mb-2">My Help Requests</h1>
            <p className="text-default-600 text-lg">
              Manage and track all your help requests
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
        
        {/* Filters */}
        <Card className="border border-divider mb-8">
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search requests..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                startContent={<Icon icon="lucide:search" className="text-default-400" />}
                size="lg"
                className="flex-1"
              />
              
              <Select
                placeholder="Filter by category"
                selectedKeys={[categoryFilter]}
                onChange={(e) => setCategoryFilter(e.target.value as RequestCategory | "all")}
                size="lg"
                className="w-full md:w-64"
              >
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </CardBody>
        </Card>
        
        {/* Tabs */}
        <Tabs 
          aria-label="Request status" 
          selectedKey={activeTab}
          onSelectionChange={setActiveTab as (key: React.Key) => void}
          className="mb-6"
          variant="underlined"
          size="lg"
        >
          <Tab key="all" title="All Requests" />
          <Tab key="pending" title="Pending" />
          <Tab key="active" title="Active" />
          <Tab key="completed" title="Completed" />
          <Tab key="cancelled" title="Cancelled" />
        </Tabs>
        
        {/* Request List */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredRequests.map(request => (
              <RequestCard
                key={request.id}
                request={request}
                userType="elderly"
                onCancel={request.status === 'pending' ? handleCancelRequest : undefined}
                onComplete={request.status === 'accepted' ? handleCompleteRequest : undefined}
                onView={handleViewRequest}
              />
            ))}
          </div>
        ) : (
          <Card className="border border-divider">
            <CardBody className="flex flex-col items-center justify-center py-12">
              <Icon icon="lucide:clipboard" className="text-5xl text-default-400 mb-4" />
              <p className="text-xl text-default-600 mb-6">No requests found</p>
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

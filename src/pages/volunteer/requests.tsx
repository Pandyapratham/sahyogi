import React from 'react';
import { motion } from 'framer-motion';
import { Button, Tabs, Tab, Card, CardBody, Input, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';
import { getStoredRequests } from '../../utils/storage';
import { HelpRequest, RequestCategory } from '../../types';
import { RequestCard } from '../../components/request-card';
import { RequestDetailsModal } from '../../components/request-details-modal';
import { updateRequest } from '../../utils/storage';

export const VolunteerRequests: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  
  const [allRequests, setAllRequests] = React.useState<HelpRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = React.useState<HelpRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = React.useState<HelpRequest | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>("available");
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<RequestCategory | "all">("all");
  const [urgencyFilter, setUrgencyFilter] = React.useState<string>("all");
  
  // Load requests from storage
  React.useEffect(() => {
    if (user) {
      const storedRequests = getStoredRequests();
      setAllRequests(storedRequests);
    }
  }, [user]);
  
  // Apply filters when tab, search, or category changes
  React.useEffect(() => {
    if (!allRequests.length || !user) return;
    
    let filtered = [...allRequests];
    
    // Apply tab filter
    if (activeTab === "available") {
      filtered = filtered.filter(r => r.status === "pending");
    } else if (activeTab === "my-tasks") {
      filtered = filtered.filter(r => r.volunteerId === user.id && r.status === "accepted");
    } else if (activeTab === "completed") {
      filtered = filtered.filter(r => r.volunteerId === user.id && r.status === "completed");
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
    
    // Apply urgency filter
    if (urgencyFilter !== "all") {
      filtered = filtered.filter(r => r.urgency === urgencyFilter);
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setFilteredRequests(filtered);
  }, [activeTab, searchQuery, categoryFilter, urgencyFilter, allRequests, user]);
  
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
  
  // Urgency levels for filter
  const urgencyLevels = [
    { value: "all", label: "All Urgency Levels" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" },
  ];
  
  if (!user) return null;
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Help Requests</h1>
          <p className="text-default-600 text-lg">
            Browse available requests and manage your tasks
          </p>
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
              
              <Select
                placeholder="Filter by urgency"
                selectedKeys={[urgencyFilter]}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                size="lg"
                className="w-full md:w-64"
              >
                {urgencyLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </CardBody>
        </Card>
        
        {/* Tabs */}
        <Tabs 
          aria-label="Request categories" 
          selectedKey={activeTab}
          onSelectionChange={setActiveTab as (key: React.Key) => void}
          className="mb-6"
          variant="underlined"
          size="lg"
        >
          <Tab key="available" title="Available Requests" />
          <Tab key="my-tasks" title="My Tasks" />
          <Tab key="completed" title="Completed" />
        </Tabs>
        
        {/* Request List */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredRequests.map(request => (
              <RequestCard
                key={request.id}
                request={request}
                userType="volunteer"
                onAccept={request.status === 'pending' ? handleAcceptRequest : undefined}
                onComplete={request.status === 'accepted' ? handleCompleteRequest : undefined}
                onView={handleViewRequest}
              />
            ))}
          </div>
        ) : (
          <Card className="border border-divider">
            <CardBody className="flex flex-col items-center justify-center py-12">
              <Icon icon="lucide:clipboard" className="text-5xl text-default-400 mb-4" />
              <p className="text-xl text-default-600 mb-2">No requests found</p>
              <p className="text-default-500 mb-6">
                {activeTab === "available" 
                  ? "There are no available requests at the moment. Check back later!"
                  : activeTab === "my-tasks"
                    ? "You haven't accepted any tasks yet. Browse available requests to get started!"
                    : "You haven't completed any tasks yet."
                }
              </p>
              {activeTab !== "available" && (
                <Button
                  color="primary"
                  onPress={() => setActiveTab("available")}
                  startContent={<Icon icon="lucide:search" />}
                  size="lg"
                >
                  Browse Available Requests
                </Button>
              )}
            </CardBody>
          </Card>
        )}
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

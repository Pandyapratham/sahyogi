import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Input, Select, SelectItem, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';
import { VolunteerProfile } from '../../types';
import { mockVolunteers } from '../../data/mock-data';
import { VolunteerCard } from '../../components/volunteer-card';
import { RequestForm } from '../../components/request-form';
import { addToast } from '@heroui/react';

export const ElderlyVolunteers: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  
  const [volunteers, setVolunteers] = React.useState<VolunteerProfile[]>([]);
  const [filteredVolunteers, setFilteredVolunteers] = React.useState<VolunteerProfile[]>([]);
  const [isRequestFormOpen, setIsRequestFormOpen] = React.useState(false);
  const [selectedVolunteerId, setSelectedVolunteerId] = React.useState<string | null>(null);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = React.useState("");
  const [skillFilter, setSkillFilter] = React.useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = React.useState<string>("all");
  
  // Load volunteers
  React.useEffect(() => {
    // In a real app, this would be an API call
    setVolunteers(mockVolunteers);
    setFilteredVolunteers(mockVolunteers);
  }, []);
  
  // Apply filters when search or filters change
  React.useEffect(() => {
    if (!volunteers.length) return;
    
    let filtered = [...volunteers];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(v => 
        v.name.toLowerCase().includes(query) || 
        v.bio?.toLowerCase().includes(query) ||
        v.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Apply skill filter
    if (skillFilter !== "all") {
      filtered = filtered.filter(v => v.skills.includes(skillFilter));
    }
    
    // Apply availability filter
    if (availabilityFilter !== "all") {
      filtered = filtered.filter(v => {
        if (availabilityFilter === "weekdays") return v.availability.weekdays;
        if (availabilityFilter === "weekends") return v.availability.weekends;
        if (availabilityFilter === "mornings") return v.availability.mornings;
        if (availabilityFilter === "afternoons") return v.availability.afternoons;
        if (availabilityFilter === "evenings") return v.availability.evenings;
        return true;
      });
    }
    
    // Sort by rating (highest first)
    filtered.sort((a, b) => b.rating - a.rating);
    
    setFilteredVolunteers(filtered);
  }, [searchQuery, skillFilter, availabilityFilter, volunteers]);
  
  // Handle contact volunteer
  const handleContactVolunteer = (volunteerId: string) => {
    const volunteer = volunteers.find(v => v.id === volunteerId);
    
    if (volunteer) {
      addToast({
        title: "Contact Information",
        description: `You can contact ${volunteer.name} at ${volunteer.phone || 'No phone provided'}`,
        color: "primary",
      });
    }
  };
  
  // Handle request help
  const handleRequestHelp = (volunteerId: string) => {
    setSelectedVolunteerId(volunteerId);
    setIsRequestFormOpen(true);
  };
  
  // Handle request created
  const handleRequestCreated = () => {
    const volunteer = volunteers.find(v => v.id === selectedVolunteerId);
    
    if (volunteer) {
      addToast({
        title: "Request Sent",
        description: `Your help request has been sent to ${volunteer.name}`,
        color: "success",
      });
    }
    
    setIsRequestFormOpen(false);
    setSelectedVolunteerId(null);
  };
  
  // Get unique skills for filter
  const allSkills = React.useMemo(() => {
    const skills = new Set<string>();
    skills.add("all");
    
    volunteers.forEach(volunteer => {
      volunteer.skills.forEach(skill => {
        skills.add(skill);
      });
    });
    
    return Array.from(skills);
  }, [volunteers]);
  
  if (!user) return null;
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Volunteers</h1>
          <p className="text-default-600 text-lg">
            Browse and connect with verified volunteers in your area
          </p>
        </div>
        
        {/* Filters */}
        <Card className="border border-divider mb-8">
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search volunteers..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                startContent={<Icon icon="lucide:search" className="text-default-400" />}
                size="lg"
                className="flex-1"
              />
              
              <Select
                placeholder="Filter by skill"
                selectedKeys={[skillFilter]}
                onChange={(e) => setSkillFilter(e.target.value)}
                size="lg"
                className="w-full md:w-64"
              >
                <SelectItem key="all" value="all">All Skills</SelectItem>
                {allSkills.filter(skill => skill !== "all").map((skill) => (
                  <SelectItem key={skill} value={skill} className="capitalize">
                    {skill}
                  </SelectItem>
                ))}
              </Select>
              
              <Select
                placeholder="Filter by availability"
                selectedKeys={[availabilityFilter]}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                size="lg"
                className="w-full md:w-64"
              >
                <SelectItem key="all" value="all">Any Availability</SelectItem>
                <SelectItem key="weekdays" value="weekdays">Weekdays</SelectItem>
                <SelectItem key="weekends" value="weekends">Weekends</SelectItem>
                <SelectItem key="mornings" value="mornings">Mornings</SelectItem>
                <SelectItem key="afternoons" value="afternoons">Afternoons</SelectItem>
                <SelectItem key="evenings" value="evenings">Evenings</SelectItem>
              </Select>
            </div>
          </CardBody>
        </Card>
        
        {/* Volunteer List */}
        {filteredVolunteers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredVolunteers.map(volunteer => (
              <VolunteerCard
                key={volunteer.id}
                volunteer={volunteer}
                onContact={handleContactVolunteer}
                onRequestHelp={handleRequestHelp}
              />
            ))}
          </div>
        ) : (
          <Card className="border border-divider">
            <CardBody className="flex flex-col items-center justify-center py-12">
              <Icon icon="lucide:users" className="text-5xl text-default-400 mb-4" />
              <p className="text-xl text-default-600 mb-2">No volunteers found</p>
              <p className="text-default-500 mb-6">Try adjusting your search filters</p>
              <div className="flex gap-2">
                <Chip 
                  color="primary" 
                  variant="flat" 
                  onClose={() => setSearchQuery("")}
                  isDisabled={!searchQuery}
                >
                  Clear Search
                </Chip>
                <Chip 
                  color="primary" 
                  variant="flat" 
                  onClose={() => setSkillFilter("all")}
                  isDisabled={skillFilter === "all"}
                >
                  Clear Skill Filter
                </Chip>
                <Chip 
                  color="primary" 
                  variant="flat" 
                  onClose={() => setAvailabilityFilter("all")}
                  isDisabled={availabilityFilter === "all"}
                >
                  Clear Availability Filter
                </Chip>
              </div>
            </CardBody>
          </Card>
        )}
      </motion.div>
      
      {/* Request Form Modal */}
      <RequestForm
        isOpen={isRequestFormOpen}
        onOpenChange={setIsRequestFormOpen}
        onRequestCreated={handleRequestCreated}
        volunteerId={selectedVolunteerId || undefined}
      />
    </div>
  );
};

import React from 'react';
import { Card, CardBody, CardFooter, Button, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { VolunteerProfile } from '../types';

interface VolunteerCardProps {
  volunteer: VolunteerProfile;
  onContact: (id: string) => void;
  onRequestHelp: (id: string) => void;
}

export const VolunteerCard: React.FC<VolunteerCardProps> = ({
  volunteer,
  onContact,
  onRequestHelp,
}) => {
  // Format the skills as a readable string
  const formatSkills = (skills: string[]) => {
    return skills.map(skill => skill.charAt(0).toUpperCase() + skill.slice(1)).join(', ');
  };

  // Get availability as a readable string
  const getAvailabilityText = (availability: VolunteerProfile['availability']) => {
    const times = [];
    if (availability.weekdays) times.push('Weekdays');
    if (availability.weekends) times.push('Weekends');
    
    const parts = [];
    if (availability.mornings) parts.push('Mornings');
    if (availability.afternoons) parts.push('Afternoons');
    if (availability.evenings) parts.push('Evenings');
    
    return `${times.join(' & ')} (${parts.join(', ')})`;
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
        <CardBody className="gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary flex-shrink-0">
              <img 
                src={volunteer.avatar} 
                alt={volunteer.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold">{volunteer.name}</h3>
              
              <div className="flex items-center justify-center sm:justify-start gap-2 my-2">
                <div className="flex items-center">
                  <Icon icon="lucide:star" className="text-warning" />
                  <span className="ml-1 font-medium">{volunteer.rating.toFixed(1)}</span>
                </div>
                <span className="text-default-500">•</span>
                <div className="flex items-center">
                  <Icon icon="lucide:check-circle" className="text-success" />
                  <span className="ml-1">{volunteer.completedRequests} completed</span>
                </div>
              </div>
              
              <p className="text-default-600 mb-3">{volunteer.bio}</p>
              
              <div className="flex flex-wrap gap-2">
                <Chip 
                  startContent={<Icon icon="lucide:award" />} 
                  color={volunteer.verificationStatus === 'verified' ? 'success' : 'warning'}
                  variant="flat"
                  size="lg"
                  className="capitalize"
                >
                  {volunteer.verificationStatus}
                </Chip>
                
                <Chip 
                  startContent={<Icon icon="lucide:clock" />} 
                  color="default"
                  variant="flat"
                  size="lg"
                >
                  {getAvailabilityText(volunteer.availability)}
                </Chip>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {volunteer.skills.map((skill) => (
                <Chip 
                  key={skill}
                  color="secondary"
                  variant="flat"
                  size="lg"
                  className="capitalize"
                >
                  {skill}
                </Chip>
              ))}
            </div>
          </div>
        </CardBody>
        
        <CardFooter className="flex flex-wrap gap-2 border-t border-divider pt-4">
          <Button
            color="primary"
            onPress={() => onRequestHelp(volunteer.id)}
            startContent={<Icon icon="lucide:help-circle" />}
            size="lg"
          >
            Request Help
          </Button>
          
          <Button
            color="default"
            variant="flat"
            onPress={() => onContact(volunteer.id)}
            startContent={<Icon icon="lucide:message-circle" />}
            size="lg"
          >
            Contact
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

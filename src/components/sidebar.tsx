import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';

interface SidebarProps {
  userType: 'elderly' | 'volunteer';
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ userType, onItemClick }) => {
  const location = useLocation();
  const { authState } = useAuth();
  const { user } = authState;

  if (!user) return null;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      label: 'Dashboard',
      path: `/${userType}/dashboard`,
      icon: 'lucide:layout-dashboard',
    },
    {
      label: userType === 'elderly' ? 'My Requests' : 'Help Requests',
      path: `/${userType}/requests`,
      icon: 'lucide:clipboard-list',
    },
  ];

  // Add volunteers page only for elderly users
  if (userType === 'elderly') {
    navItems.push({
      label: 'Volunteers',
      path: `/${userType}/volunteers`,
      icon: 'lucide:users',
    });
  }

  // Add profile page for all users
  navItems.push({
    label: 'My Profile',
    path: `/${userType}/profile`,
    icon: 'lucide:user',
  });

  return (
    <div className="p-4 h-full">
      <div className="flex flex-col items-center mb-8 p-4">
        <div className="w-24 h-24 mb-4">
          <img 
            src={user.avatar || `https://img.heroui.chat/image/avatar?w=200&h=200&u=${user.id}`} 
            alt={user.name}
            className="w-full h-full rounded-full object-cover border-4 border-primary"
          />
        </div>
        <h2 className="text-xl font-semibold text-center">{user.name}</h2>
        <p className="text-default-500 text-center">{userType === 'elderly' ? 'Senior Member' : 'Volunteer'}</p>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            as={Link}
            to={item.path}
            variant="flat"
            color={isActive(item.path) ? 'primary' : 'default'}
            startContent={<Icon icon={item.icon} className="text-xl" />}
            className="w-full justify-start text-lg font-medium h-14" // Taller buttons for better accessibility
            onPress={onItemClick}
          >
            {item.label}
          </Button>
        ))}
      </nav>
      
      <div className="mt-auto pt-8">
        <div className="bg-content2 rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Icon icon="lucide:help-circle" className="text-primary" />
            Need Help?
          </h3>
          <p className="text-default-600 text-sm mb-3">
            Contact our support team for assistance with the platform.
          </p>
          <Button
            as="a"
            href="mailto:support@sahayogi.com"
            color="primary"
            variant="flat"
            size="lg"
            fullWidth
            className="font-medium"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

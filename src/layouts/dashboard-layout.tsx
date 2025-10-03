import React from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Avatar,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';
import { Footer } from '../components/footer';
import { Sidebar } from '../components/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'elderly' | 'volunteer';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userType }) => {
  const { authState, logout } = useAuth();
  const { user } = authState;
  const history = useHistory();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Redirect if not authenticated or wrong user type
  React.useEffect(() => {
    if (!authState.isAuthenticated) {
      history.push('/login');
    } else if (user && user.role !== userType) {
      history.push(`/${user.role}/dashboard`);
    }
  }, [authState.isAuthenticated, user, userType, history]);

  if (!user) {
    return null;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar 
        maxWidth="xl" 
        className="bg-background border-b border-divider"
        height="5rem" // Taller navbar for better visibility
      >
        <NavbarBrand>
          <RouterLink to="/" className="flex items-center gap-2">
            <Icon icon="lucide:heart-handshake" className="text-primary text-3xl" />
            <p className="font-bold text-2xl text-inherit">Sahayogi</p>
          </RouterLink>
        </NavbarBrand>
        
        <NavbarContent justify="end">
          <NavbarItem className="lg:hidden">
            <Button 
              isIconOnly 
              variant="light" 
              onPress={toggleMobileMenu}
              aria-label="Open menu"
            >
              <Icon icon="lucide:menu" className="text-2xl" />
            </Button>
          </NavbarItem>
          
          <NavbarItem className="hidden lg:flex">
            <Button
              as={RouterLink}
              to={`/${userType}/dashboard`}
              variant="flat"
              color={window.location.pathname.includes('dashboard') ? 'primary' : 'default'}
              startContent={<Icon icon="lucide:layout-dashboard" />}
              size="lg" // Larger button for better accessibility
            >
              Dashboard
            </Button>
          </NavbarItem>
          
          <NavbarItem className="hidden lg:flex">
            <Button
              as={RouterLink}
              to={`/${userType}/requests`}
              variant="flat"
              color={window.location.pathname.includes('requests') ? 'primary' : 'default'}
              startContent={<Icon icon="lucide:clipboard-list" />}
              size="lg" // Larger button for better accessibility
            >
              {userType === 'elderly' ? 'My Requests' : 'Help Requests'}
            </Button>
          </NavbarItem>
          
          {userType === 'elderly' && (
            <NavbarItem className="hidden lg:flex">
              <Button
                as={RouterLink}
                to={`/${userType}/volunteers`}
                variant="flat"
                color={window.location.pathname.includes('volunteers') ? 'primary' : 'default'}
                startContent={<Icon icon="lucide:users" />}
                size="lg" // Larger button for better accessibility
              >
                Volunteers
              </Button>
            </NavbarItem>
          )}
          
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={user.name}
                  size="md"
                  src={user.avatar}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" textValue="Profile">
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-default-500 text-tiny">{user.email}</p>
                  </div>
                </DropdownItem>
                <DropdownItem 
                  key="settings" 
                  startContent={<Icon icon="lucide:user" />}
                  as={RouterLink}
                  to={`/${userType}/profile`}
                  textValue="My Profile"
                >
                  My Profile
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  startContent={<Icon icon="lucide:log-out" />}
                  color="danger"
                  onPress={logout}
                  textValue="Logout"
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 border-r border-divider">
          <Sidebar userType={userType} />
        </div>
        
        {/* Mobile Drawer */}
        <Drawer 
          isOpen={isMobileMenuOpen} 
          onOpenChange={setIsMobileMenuOpen}
          placement="left"
        >
          <DrawerContent>
            <DrawerHeader className="border-b border-divider">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:heart-handshake" className="text-primary text-2xl" />
                <span className="font-bold text-xl">Sahayogi</span>
              </div>
            </DrawerHeader>
            <DrawerBody className="p-0">
              <Sidebar userType={userType} onItemClick={() => setIsMobileMenuOpen(false)} />
            </DrawerBody>
            <DrawerFooter>
              <Button 
                color="danger" 
                variant="flat" 
                onPress={logout}
                startContent={<Icon icon="lucide:log-out" />}
                fullWidth
              >
                Logout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        
        <motion.main 
          className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
      
      <Footer />
    </div>
  );
};

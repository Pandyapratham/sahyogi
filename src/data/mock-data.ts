import { User, HelpRequest, VolunteerProfile, RequestCategory } from '../types';

// Mock elderly users
export const mockElderlyUsers: User[] = [
  {
    id: 'e1',
    name: 'John Doe',
    email: 'elderly@example.com',
    role: 'elderly',
    avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
    createdAt: '2023-01-15T08:30:00Z',
    preferences: {
      notifications: true,
      emailUpdates: false,
      fontSize: 'large',
      highContrast: false,
    },
  },
  {
    id: 'e2',
    name: 'Mary Johnson',
    email: 'mary@example.com',
    role: 'elderly',
    avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=3',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, Somewhere, USA',
    createdAt: '2023-02-20T10:15:00Z',
    preferences: {
      notifications: true,
      emailUpdates: true,
      fontSize: 'extra-large',
      highContrast: true,
    },
  },
  {
    id: 'e3',
    name: 'Robert Williams',
    email: 'robert@example.com',
    role: 'elderly',
    avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=4',
    phone: '+1 (555) 345-6789',
    address: '789 Pine Rd, Elsewhere, USA',
    createdAt: '2023-03-10T14:45:00Z',
    preferences: {
      notifications: false,
      emailUpdates: false,
      fontSize: 'normal',
      highContrast: false,
    },
  },
];

// Mock volunteer users
export const mockVolunteers: VolunteerProfile[] = [
  {
    id: 'v1',
    name: 'Jane Smith',
    email: 'volunteer@example.com',
    role: 'volunteer',
    avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
    phone: '+1 (555) 987-6543',
    bio: 'I love helping seniors with technology and daily tasks.',
    createdAt: '2023-01-10T09:20:00Z',
    skills: ['technology', 'shopping', 'transportation'],
    availability: {
      weekdays: true,
      weekends: true,
      mornings: true,
      afternoons: true,
      evenings: false,
    },
    verificationStatus: 'verified',
    rating: 4.8,
    completedRequests: 24,
    preferences: {
      notifications: true,
      emailUpdates: true,
      fontSize: 'normal',
      highContrast: false,
    },
  },
  {
    id: 'v2',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'volunteer',
    avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=5',
    phone: '+1 (555) 876-5432',
    bio: 'Retired nurse with 30 years of experience. Happy to help with medical appointments and care.',
    createdAt: '2023-02-05T11:30:00Z',
    skills: ['medical', 'companionship', 'housework'],
    availability: {
      weekdays: true,
      weekends: false,
      mornings: true,
      afternoons: true,
      evenings: false,
    },
    verificationStatus: 'verified',
    rating: 4.9,
    completedRequests: 37,
    preferences: {
      notifications: true,
      emailUpdates: false,
      fontSize: 'normal',
      highContrast: false,
    },
  },
  {
    id: 'v3',
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    role: 'volunteer',
    avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=6',
    phone: '+1 (555) 765-4321',
    bio: 'College student studying social work. Available weekends and evenings.',
    createdAt: '2023-03-15T16:45:00Z',
    skills: ['companionship', 'technology', 'shopping'],
    availability: {
      weekdays: false,
      weekends: true,
      mornings: false,
      afternoons: true,
      evenings: true,
    },
    verificationStatus: 'verified',
    rating: 4.7,
    completedRequests: 12,
    preferences: {
      notifications: true,
      emailUpdates: true,
      fontSize: 'normal',
      highContrast: false,
    },
  },
  {
    id: 'v4',
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'volunteer',
    avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=7',
    phone: '+1 (555) 654-3210',
    bio: 'Retired teacher who enjoys helping others. Good with technology and home repairs.',
    createdAt: '2023-04-01T13:15:00Z',
    skills: ['technology', 'housework', 'transportation'],
    availability: {
      weekdays: true,
      weekends: true,
      mornings: true,
      afternoons: true,
      evenings: false,
    },
    verificationStatus: 'verified',
    rating: 4.6,
    completedRequests: 18,
    preferences: {
      notifications: false,
      emailUpdates: true,
      fontSize: 'normal',
      highContrast: false,
    },
  },
];

// Mock help requests
export const mockHelpRequests: HelpRequest[] = [
  {
    id: 'r1',
    title: 'Grocery Shopping Assistance',
    description: 'Need help with weekly grocery shopping. I have a list prepared.',
    category: 'shopping',
    status: 'pending',
    urgency: 'medium',
    createdAt: '2023-05-10T09:30:00Z',
    scheduledFor: '2023-05-12T10:00:00Z',
    elderlyId: 'e1',
    location: {
      address: '123 Main St, Anytown, USA',
    },
  },
  {
    id: 'r2',
    title: 'Doctor Appointment',
    description: 'Need transportation to and from my doctor appointment.',
    category: 'medical',
    status: 'accepted',
    urgency: 'high',
    createdAt: '2023-05-08T14:15:00Z',
    scheduledFor: '2023-05-15T13:30:00Z',
    elderlyId: 'e1',
    volunteerId: 'v2',
    location: {
      address: '123 Main St, Anytown, USA',
    },
  },
  {
    id: 'r3',
    title: 'Help Setting Up New Phone',
    description: 'I got a new smartphone and need help setting it up and learning how to use it.',
    category: 'technology',
    status: 'completed',
    urgency: 'low',
    createdAt: '2023-05-01T11:00:00Z',
    scheduledFor: '2023-05-03T14:00:00Z',
    completedAt: '2023-05-03T15:30:00Z',
    elderlyId: 'e1',
    volunteerId: 'v1',
    location: {
      address: '123 Main St, Anytown, USA',
    },
  },
  {
    id: 'r4',
    title: 'Weekly House Cleaning',
    description: 'Looking for help with light housekeeping once a week.',
    category: 'housework',
    status: 'pending',
    urgency: 'medium',
    createdAt: '2023-05-09T16:45:00Z',
    scheduledFor: '2023-05-16T10:00:00Z',
    elderlyId: 'e2',
    location: {
      address: '456 Oak Ave, Somewhere, USA',
    },
  },
  {
    id: 'r5',
    title: 'Companionship Visit',
    description: 'Would appreciate someone to come by for conversation and perhaps a game of chess.',
    category: 'companionship',
    status: 'accepted',
    urgency: 'low',
    createdAt: '2023-05-07T10:30:00Z',
    scheduledFor: '2023-05-14T15:00:00Z',
    elderlyId: 'e3',
    volunteerId: 'v3',
    location: {
      address: '789 Pine Rd, Elsewhere, USA',
    },
  },
];

// Helper function to get category icon
export const getCategoryIcon = (category: RequestCategory): string => {
  switch (category) {
    case 'shopping':
      return 'lucide:shopping-bag';
    case 'medical':
      return 'lucide:heart-pulse';
    case 'transportation':
      return 'lucide:car';
    case 'companionship':
      return 'lucide:users';
    case 'housework':
      return 'lucide:home';
    case 'technology':
      return 'lucide:smartphone';
    case 'other':
    default:
      return 'lucide:help-circle';
  }
};

// Helper function to get status color
export const getStatusColor = (status: string): 'default' | 'primary' | 'success' | 'warning' | 'danger' => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'accepted':
      return 'primary';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'default';
  }
};

// Helper function to get urgency color
export const getUrgencyColor = (urgency: string): 'default' | 'primary' | 'success' | 'warning' | 'danger' => {
  switch (urgency) {
    case 'high':
      return 'danger';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

// Initialize localStorage with mock data if empty
export const initializeMockData = (): void => {
  const storedRequests = localStorage.getItem('sahayogi_requests');
  
  if (!storedRequests) {
    localStorage.setItem('sahayogi_requests', JSON.stringify(mockHelpRequests));
  }
};

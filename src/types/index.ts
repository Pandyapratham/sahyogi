// User types
export type UserRole = 'elderly' | 'volunteer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  bio?: string;
  createdAt: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  emailUpdates: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  highContrast: boolean;
}

// Help request types
export type RequestStatus = 'pending' | 'accepted' | 'completed' | 'cancelled';
export type RequestCategory = 'shopping' | 'medical' | 'transportation' | 'companionship' | 'housework' | 'technology' | 'other';

export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  category: RequestCategory;
  status: RequestStatus;
  urgency: 'low' | 'medium' | 'high';
  createdAt: string;
  scheduledFor?: string;
  completedAt?: string;
  elderlyId: string;
  volunteerId?: string;
  location?: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
}

// Volunteer types
export interface VolunteerProfile extends User {
  skills: string[];
  availability: {
    weekdays: boolean;
    weekends: boolean;
    mornings: boolean;
    afternoons: boolean;
    evenings: boolean;
  };
  verificationStatus: 'pending' | 'verified';
  rating: number;
  completedRequests: number;
}

// Authentication types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

import { User, HelpRequest } from '../types';

// User storage
const USER_STORAGE_KEY = 'sahayogi_user';

export const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const storeUser = (user: User): void => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const removeStoredUser = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

// Help requests storage
const REQUESTS_STORAGE_KEY = 'sahayogi_requests';

export const getStoredRequests = (): HelpRequest[] => {
  const storedRequests = localStorage.getItem(REQUESTS_STORAGE_KEY);
  return storedRequests ? JSON.parse(storedRequests) : [];
};

export const storeRequests = (requests: HelpRequest[]): void => {
  localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
};

export const addRequest = (request: HelpRequest): void => {
  const requests = getStoredRequests();
  requests.push(request);
  storeRequests(requests);
};

export const updateRequest = (updatedRequest: HelpRequest): void => {
  const requests = getStoredRequests();
  const index = requests.findIndex(r => r.id === updatedRequest.id);
  
  if (index !== -1) {
    requests[index] = updatedRequest;
    storeRequests(requests);
  }
};

export const deleteRequest = (requestId: string): void => {
  const requests = getStoredRequests();
  const filteredRequests = requests.filter(r => r.id !== requestId);
  storeRequests(filteredRequests);
};

// User preferences
export const updateUserPreferences = (userId: string, preferences: any): void => {
  const user = getStoredUser();
  
  if (user && user.id === userId) {
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences,
      },
    };
    
    storeUser(updatedUser);
  }
};

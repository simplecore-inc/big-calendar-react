import { CALENDAR_ITENS_MOCK, USERS_MOCK } from "@/calendar/mocks";
import type { IEvent, IUser } from "@/calendar/interfaces";

// API Client with error handling and retry logic
class ApiClient {
  private baseUrl: string;
  private defaultOptions: RequestInit;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      // Log error for debugging in development
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(`API request failed for ${endpoint}:`, error);
      }
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create API client instance
const apiClient = new ApiClient();

// Event API functions
export const getEvents = async (): Promise<IEvent[]> => {
  // TODO: Replace with actual API call when backend is ready
  // return apiClient.get<IEvent[]>('/api/events');
  
  // Simulate network delay for better UX testing
  await new Promise(resolve => setTimeout(resolve, 300));
  return CALENDAR_ITENS_MOCK;
};

export const createEvent = async (eventData: Omit<IEvent, 'id'>): Promise<IEvent> => {
  // TODO: Replace with actual API call when backend is ready
  // return apiClient.post<IEvent>('/api/events', eventData);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock implementation
  const newEvent: IEvent = {
    ...eventData,
    id: Date.now(), // Simple ID generation for mock
  };
  
  return newEvent;
};

export const updateEvent = async (eventData: IEvent): Promise<IEvent> => {
  // TODO: Replace with actual API call when backend is ready
  // return apiClient.put<IEvent>(`/api/events/${eventData.id}`, eventData);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock implementation
  return eventData;
};

export const deleteEvent = async (_eventId: number): Promise<void> => {
  // TODO: Replace with actual API call when backend is ready
  // return apiClient.delete<void>(`/api/events/${eventId}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock implementation - no return needed for delete
};

// User API functions
export const getUsers = async (): Promise<IUser[]> => {
  // TODO: Replace with actual API call when backend is ready
  // return apiClient.get<IUser[]>('/api/users');
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return USERS_MOCK;
};

// Export API client for potential direct usage
export { apiClient };

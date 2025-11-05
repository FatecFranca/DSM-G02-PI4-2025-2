import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKEND_URL = 'https://api.smartparking.fun';

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  role: 'user' | 'admin';
  id: string;
  name: string;
  email: string;
}

export interface Reservation {
  id: string;
  parkingSlotId: string;
  vehiclePlate: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  user?: User;
  parkingSlot?: {
    id: string;
    number: number;
    parking: {
      id: string;
      name: string;
    };
  };
}

export interface Parking {
  id: string;
  name: string;
  address: string;
  country: string;
  state: string;
  city: string;
  number: string;
  phone: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ParkingSlot {
  id: string;
  parkingId: string;
  isAvailable: boolean;
  isActive: boolean;
  number: number;
  createdAt: string;
  updatedAt: string;
  parking?: Parking;
}

export interface Statistics {
  totalSlots: number;
  occupiedSlots: number;
  activeSensors: number;
  activeParkings: number;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = BACKEND_URL;
    this.loadToken();
  }

  private async loadToken() {
    try {
      this.token = await AsyncStorage.getItem('auth_token');
    } catch (error) {
      console.error('Error loading token:', error);
    }
  }

  private async saveToken(token: string) {
    try {
      await AsyncStorage.setItem('auth_token', token);
      this.token = token;
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  private async clearToken() {
    try {
      await AsyncStorage.removeItem('auth_token');
      this.token = null;
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  }

  private async getHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Sempre buscar o token mais recente do AsyncStorage
    try {
      const currentToken = await AsyncStorage.getItem('auth_token');
      if (currentToken) {
        this.token = currentToken;
        headers.Authorization = `Bearer ${currentToken}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const headers = await this.getHeaders();
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Request failed');
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }

  // Auth methods
  async register(data: {
    role: 'user' | 'admin';
    name: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.data) {
      await this.saveToken(response.data.token);
    }

    return response;
  }

  async login(data: {
    role: 'user' | 'admin';
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.data) {
      await this.saveToken(response.data.token);
    }

    return response;
  }

  async logout(): Promise<void> {
    await this.clearToken();
  }

  // Reservation methods
  async getMyReservations(): Promise<ApiResponse<Reservation[]>> {
    return this.request<Reservation[]>('/reservations');
  }

  async createReservation(data: {
    parkingSlotId: string;
    vehiclePlate: string;
    date: string;
    startHour: string;
    durationHours: number;
  }): Promise<ApiResponse<Reservation>> {
    return this.request<Reservation>('/reservations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async cancelReservation(id: string): Promise<ApiResponse<{ id: string; cancelled: boolean }>> {
    return this.request<{ id: string; cancelled: boolean }>(`/reservations/${id}`, {
      method: 'DELETE',
    });
  }

  // Parking methods
  async getParkings(): Promise<ApiResponse<Parking[]>> {
    return this.request<Parking[]>('/parkings');
  }

  async getActiveParkings(): Promise<ApiResponse<Parking[]>> {
    return this.request<Parking[]>('/parkings/active');
  }

  // Parking slots methods
  async getParkingSlots(parkingId?: string): Promise<ApiResponse<ParkingSlot[]>> {
    const endpoint = parkingId ? `/parking-slots?parkingId=${parkingId}` : '/parking-slots';
    return this.request<ParkingSlot[]>(endpoint);
  }

  // Statistics methods
  async getStatistics(): Promise<ApiResponse<Statistics>> {
    return this.request<Statistics>('/statistics');
  }

  // Sensor methods
  async getSensors(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/sensors');
  }

  async getParkingSensors(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/parking-sensors');
  }

  async getSensorData(sensorId: string): Promise<ApiResponse<any[]>> {
    return this.request<any[]>(`/sensors-data/sensor/${sensorId}`);
  }

  async getParkingSensorData(parkingSensorId: string): Promise<ApiResponse<any[]>> {
    return this.request<any[]>(`/parking-sensor-data/parking-sensor/${parkingSensorId}`);
  }

  async updateSensor(id: string, data: { isActive: boolean }): Promise<ApiResponse<any>> {
    return this.request<any>(`/sensors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateParkingSensor(id: string, data: { isActive: boolean }): Promise<ApiResponse<any>> {
    return this.request<any>(`/parking-sensors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSensor(id: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/sensors/${id}`, {
      method: 'DELETE',
    });
  }

  async deleteParkingSensor(id: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/parking-sensors/${id}`, {
      method: 'DELETE',
    });
  }

  // Sensors Data methods
  async getLatestSensorsDataBySlot(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/sensors-data/latest-by-slot');
  }

  // Reservations methods (additional)
  async getReservations(): Promise<ApiResponse<Reservation[]>> {
    return this.request<Reservation[]>('/reservations');
  }

  // Contact messages methods
  async getContactMessages(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/contact-messages');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.token !== null;
  }

  // Get current token
  getToken(): string | null {
    return this.token;
  }
}

export default new ApiService();

// Tipos para ContactMessage
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  viewed: boolean;
  createdAt: Date;
}

// Tipos para respostas da API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any;
}

// Tipos para paginação
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Tipos para listagem paginada
export interface PaginatedResponse<T> {
  messages: T[];
  pagination: PaginationInfo;
}

// Tipos para estatísticas
export interface ContactMessageStats {
  total: number;
  viewed: number;
  unviewed: number;
  viewedPercentage: number;
}

// Tipos para query parameters
export interface ContactMessageQuery {
  page?: number;
  limit?: number;
  viewed?: boolean;
  search?: string;
}

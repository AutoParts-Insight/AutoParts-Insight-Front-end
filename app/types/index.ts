// Tipos básicos do projeto
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
}

export interface CatalogGap {
  productId: string;
  missingFields: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

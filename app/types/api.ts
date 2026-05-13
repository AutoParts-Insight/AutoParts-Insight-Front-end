// Tipos que refletem exatamente a resposta da API (NestJS/Prisma)

export interface Brand {
  id: string;
  name: string; // Ex: "GAUSS", "ORIGINAL", "BOSCH"
}

export interface Category {
  id: string;
  name: string; // Ex: "Motor de Partida"
}

export interface ProductReference {
  id: string;
  code: string; // Ex: "31200-KSS-901", "GM23005"
  productId: string;
  brandId: string;
  brand: Brand;
}

export interface Product {
  id: string;
  sku: string; // Código Interno (ex: "20101")
  name: string; // Descrição completa
  applications: string[]; // Veículos compatíveis
  specifications: Record<string, string>; // { VOLTS: "12V", KW: "1,96" }
  isActive: boolean;
  cost: number | null;
  categoryId: string | null;
  registeredAt: string;
  updatedAt: string | null;
  category: Category | null;
  references: ProductReference[];
}

export interface DashboardStats {
  products: number;
  brands: number;
  categories: number;
}

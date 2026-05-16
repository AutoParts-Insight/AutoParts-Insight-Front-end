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

export interface ExternalProduct {
  productNumber: string;
  code: string | null;
  description: string | null;
  imageUrl: string | null;
}

export interface GapAnalysis {
  brand: string;
  category: string;
  externalCount: number;   // Produtos que o concorrente tem
  internalCount: number;   // Nossos produtos na categoria
  // Densidade relativa de catálogo: internalCount / externalCount * 100
  // NÃO é cobertura real — compara volume por categoria.
  // Matching por aplicação/OEM/specs implementado em fase posterior.
  catalogDensity: number;
  externalProducts: ExternalProduct[];
}

# 📋 Contrato de Integração: Front-end ↔ Back-end

## 🎯 Visão Geral

Este documento define o **contrato de dados** entre Front-end (Next.js) e Back-end (Node.js/Express) para o sistema AutoParts Insight.

---

## 📦 Tipagens TypeScript Esperadas

### 1. **Product (Produto)**

```typescript
// app/types/Product.ts

export interface Product {
  // Identificadores
  id: string;              // UUID ou número único
  sku: string;             // Código do produto (ex: "20101")
  oem: string;             // Código OEM (ex: "6GM23005")

  // Informações Básicas
  name: string;            // Nome do produto (ex: "MOTOR PARTIDA LINHA MOTO")
  type: string;            // Tipo (ex: "MOTOR PARTIDA", "ALTERNADOR", etc)
  category: string;        // Categoria (ex: "ENGINE", "ELECTRICAL", etc)

  // Fabricante
  manufacturer: {
    id: string;
    name: string;          // Nome do fabricante (ex: "HONDA", "YAMAHA", "ORIGINAL")
    code?: string;         // Código do fabricante (ex: "31200-KSS-901")
  };

  // Especificações Técnicas
  description: string;     // Descrição técnica (ex: "MOTOR PARTIDA HONDA BIZ125 EX (06>10) / ES (06>10)...")
  specifications: {
    power?: string;        // Potência (ex: "1,96 KW 12V")
    voltage: number;       // Tensão em volts (12, 24, etc)
    amperage?: number;     // Amperagem se aplicável
    rpm?: number;          // Rotações por minuto se aplicável
  };

  // Aplicações
  applications: string[];  // Array de aplicações (ex: ["HONDA BIZ 125 EX JAN/2006-DEZ/2010", "HONDA ES 125..."])

  // Códigos Alternativos / Conversão
  conversionCodes: {
    code: string;          // Código de conversão (ex: "31200-KSS-901")
    manufacturer: string;  // Fabricante desse código (ex: "ORIGINAL", "GAUSS")
  }[];

  // Auditoria
  registeredAt: string;    // Data de cadastro (ISO 8601, ex: "2021-03-19T00:00:00Z")
  updatedAt?: string;      // Última atualização

  // Informações adicionais
  isActive: boolean;       // Produto está ativo no catálogo?
  inStock?: boolean;       // Em estoque?
  cost?: number;           // Custo interno (opcional, pode ser sensível)
}

// Tipo para lista de produtos
export type ProductList = Product[];

// Tipo para resposta paginada
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type PaginatedProductResponse = PaginatedResponse<Product>;
```

---

## 🔄 Endpoints de API Esperados

### **Backend → Frontend**

#### 1. **GET /api/products**
```typescript
// Request
GET /api/products?page=1&pageSize=20&search=HONDA&category=ENGINE

// Response (200 OK)
{
  data: Product[],
  total: 1250,
  page: 1,
  pageSize: 20,
  totalPages: 63
}
```

#### 2. **GET /api/products/:id**
```typescript
// Request
GET /api/products/20101

// Response (200 OK)
{
  id: "20101",
  sku: "20101",
  oem: "6GM23005",
  name: "MOTOR PARTIDA LINHA MOTO",
  type: "MOTOR PARTIDA",
  // ... resto dos dados
}

// Response (404 Not Found)
{ error: "Product not found" }
```

#### 3. **GET /api/products/search**
```typescript
// Request
GET /api/products/search?q=BIZ125&manufacturer=HONDA

// Response (200 OK)
[
  {
    id: "20101",
    name: "MOTOR PARTIDA LINHA MOTO",
    // ... dados resumidos
  },
  // ... mais produtos
]
```

#### 4. **GET /api/categories**
```typescript
// Response (200 OK)
{
  categories: ["ENGINE", "ELECTRICAL", "TRANSMISSION", "SUSPENSION"],
  count: 4
}
```

#### 5. **GET /api/manufacturers**
```typescript
// Response (200 OK)
{
  manufacturers: [
    { id: "1", name: "HONDA" },
    { id: "2", name: "YAMAHA" },
    { id: "3", name: "ORIGINAL" },
    // ...
  ],
  count: 25
}
```

---

## ❓ O que o Front-end Precisa do Back-end

### **Dados Essenciais**

✅ **Lista de Produtos**
- Com paginação (página, tamanho, total)
- Filtro por categoria
- Filtro por fabricante
- Busca por nome/SKU/OEM

✅ **Detalhes do Produto**
- Todas as especificações técnicas
- Todas as aplicações compatíveis
- Códigos de conversão
- Histórico de preços (se análise)

✅ **Metadados**
- Lista de categorias disponíveis
- Lista de fabricantes
- Campos de cada produto

### **Performance**

✅ **Paginação**
- Máximo 50 produtos por página
- Padrão: 20 produtos por página

✅ **Caching**
- Cache nos metadados (categorias, fabricantes) - TTL: 1 hora
- Cache de produtos - TTL: 15 minutos (ou invalidação inteligente)

✅ **Timeouts**
- Resposta dentro de 5 segundos
- Endpoints devem retornar rápido mesmo com 100k+ produtos

### **Tratamento de Erros**

✅ **HTTP Status Codes**
- 200 OK — Sucesso
- 400 Bad Request — Parametros inválidos
- 404 Not Found — Recurso não encontrado
- 500 Internal Server Error — Erro interno

✅ **Formato de Erro Padronizado**
```json
{
  "error": "mensagem de erro",
  "code": "ERROR_CODE",
  "message": "Descrição detalhada"
}
```

---

## 🎨 O que o Back-end Precisa Saber do Front-end

### **Responsabilidades do Front-end**

✅ **Display & Formatação**
- Formatar preços em moeda local
- Formatar datas para legibilidade
- Quebrar descrições em múltiplas linhas
- Destacar (highlight) termos de busca

✅ **Filtros & Busca (Client-Side)**
- Debounce de 300ms em busca
- Filtros locais (após dados carregados)
- Caching de dados já carregados

✅ **Validação de Entrada**
- Validar queries de busca
- Limpar/sanitizar filtros antes de enviar
- Máximo 100 caracteres em busca

✅ **Experiência do Usuário**
- Loading states durante chamadas
- Mensagens de erro claras
- Indicador de página e total
- Sugestões de busca (autocomplete)

### **Não Responsabilidade do Front-end**

❌ Validação de dados (responsabilidade do Backend)  
❌ Regras de negócio complexas (responsabilidade do Backend)  
❌ Cálculos de comparação (responsabilidade do Backend)  
❌ Autenticação/Autorização (responsabilidade do Backend)

---

## 📊 Exemplo de Integração

### **Cenário: Buscar produtos HONDA**

```typescript
// Front-end faz request
const response = await fetch(
  '/api/products?manufacturer=HONDA&category=ENGINE&page=1&pageSize=20'
);

// Backend retorna
{
  data: [
    {
      id: "20101",
      sku: "20101",
      name: "MOTOR PARTIDA LINHA MOTO",
      manufacturer: { name: "HONDA" },
      specifications: { voltage: 12, power: "1,96 KW" },
      applications: ["HONDA BIZ 125 EX JAN/2006-DEZ/2010", ...],
      conversionCodes: [
        { code: "31200-KSS-901", manufacturer: "ORIGINAL" },
        { code: "6M23005", manufacturer: "GAUSS" }
      ]
    },
    // ... mais 19 produtos
  ],
  total: 342,
  page: 1,
  pageSize: 20,
  totalPages: 18
}

// Front-end formata e exibe
products.forEach((product) => {
  console.log(`${product.name} - ${product.manufacturer.name}`);
  console.log(`Aplicações: ${product.applications.join(', ')}`);
  console.log(`Códigos: ${product.conversionCodes.map(c => c.code).join(', ')}`);
});
```

---

## 🔒 Segurança

### **Headers Esperados**

```typescript
// Request
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  // Optional: authorization headers aqui quando necessário
}

// Response
headers: {
  'Content-Type': 'application/json; charset=utf-8',
  'X-Total-Count': '342',  // Total de resultados (útil para paginação)
  'Cache-Control': 'public, max-age=900'  // 15 minutos
}
```

---

## 📝 Checklist de Comunicação

### **Para o Backend:**

- [ ] Estrutura exata dos dados de `Product`
- [ ] Campos obrigatórios vs opcionais
- [ ] Tamanho máximo de descricão/aplicações
- [ ] Limite de requisições por segundo
- [ ] Estratégia de cache (TTL)
- [ ] Comportamento em caso de produto não encontrado
- [ ] Ordenação padrão (por data? por popularidade?)
- [ ] Valor padrão de `pageSize`

### **Para o Frontend:**

- [ ] Tipagens TypeScript finalizadas
- [ ] Serviços de API criados
- [ ] Componentes de UI prontos
- [ ] Tratamento de erros implementado
- [ ] Loading states funcionando
- [ ] Paginação funcionando

---

## 🚀 Próximos Passos

1. **Backend**: Criar endpoints listados acima e retornar dados em formato `Product`
2. **Frontend**: Criar `services/productService.ts` consumindo esses endpoints
3. **Ambos**: Testar integração com dados reais
4. **Ambos**: Documentar qualquer desvio deste contrato

---

**Última atualização:** April 15, 2026  
**Responsável Frontend:** [Seu Nome]  
**Responsável Backend:** [Nome do colaborador]

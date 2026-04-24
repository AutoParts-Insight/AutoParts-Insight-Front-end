# 🏗️ Arquitetura: Front-end → Back-end

## Diagrama de Integração

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐                                          │
│  │   UI Components  │  ProductList, ProductCard, SearchBar    │
│  └────────┬─────────┘                                          │
│           │ usa                                                │
│  ┌────────▼───────────────────────────────────────┐           │
│  │   Service Layer (productService.ts)            │           │
│  │                                                │           │
│  │  getProducts()                                 │           │
│  │  getProductById()                              │           │
│  │  searchProducts()                              │           │
│  │  getCategories()                               │           │
│  │  getManufacturers()                            │           │
│  └────────┬──────────────────────────────────────┘           │
│           │ faz chamadas HTTP para                            │
└───────────┼──────────────────────────────────────────────────┘
            │
    ┌───────▼──────────────────────────────────────┐
    │        HTTP REQUESTS (REST API)              │
    └───────┬──────────────────────────────────────┘
            │
┌───────────▼──────────────────────────────────────────────────────┐
│                   BACKEND (Express/Node.js)                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────┐           │
│  │ Routes / Controllers / Handlers                  │           │
│  │                                                  │           │
│  │  GET  /api/products                   Validação │           │
│  │  GET  /api/products/:id                        │           │
│  │  GET  /api/products/search                      │           │
│  │  GET  /api/categories                           │           │
│  │  GET  /api/manufacturers                        │           │
│  └──────────────────┬───────────────────────────────┘           │
│                     │ usa                                       │
│  ┌──────────────────▼───────────────────────────────┐           │
│  │ Business Logic Layer                            │           │
│  │ (productService, categoryService, etc)          │           │
│  └──────────────────┬───────────────────────────────┘           │
│                     │ acessa                                    │
│  ┌──────────────────▼───────────────────────────────┐           │
│  │ Database Layer (SQL/MongoDB)                    │           │
│  │                                                  │           │
│  │  TABLE: products                                 │           │
│  │  - id, sku, oem, name, type, category          │           │
│  │  - manufacturer_id, description, specs...      │           │
│  │  - applications (JSON), conversionCodes...     │           │
│  │                                                  │           │
│  │  TABLE: manufacturers                            │           │
│  │  - id, name, code                               │           │
│  │                                                  │           │
│  │  TABLE: categories                              │           │
│  │  - id, name, description                        │           │
│  └──────────────────────────────────────────────────┘           │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📊 Fluxo de Dados

```
Usuário → Frontend
   ↓
   └─→ Input: "BIZ125"
       Service Layer (productService)
       └─→ HTTP GET /api/products/search?q=BIZ125
           Backend Router
           └─→ Controllers/Handlers
               └─→ Business Logic
                   └─→ Database Query
                       └─→ Return [{id: "20101", name: "MOTOR...", ...}]
       ↓
       Cache em memória (15 min)
       Display Resultados no UI
       ↓
Usuário clica em resultado
   ↓
   └─→ Input: ID "20101"
       Service Layer (productService)
       └─→ HTTP GET /api/products/20101
           Backend Router
           └─→ Controllers/Handlers
               └─→ Business Logic
                   └─→ Database Query
                       └─→ Return {id: "20101", name: "MOTOR...", applications: [...], ...}
       ↓
       Cache em memória (15 min)
       Display Página de Detalhes com todas informações

```

---

## 🔄 Ciclo de Desenvolvimento

### **Fase 1: Setup (Backend)**
```
Backend Developer:
1. Cria tabelas no BD:
   - products (id, sku, oem, name, type, category, manufacturer_id,...)
   - manufacturers (id, name, code)
   - categories (id, name)

2. Implementa endpoints GET
   - /api/products (com paginação, filtros)
   - /api/products/:id
   - /api/products/search
   - /api/categories
   - /api/manufacturers

3. Testa com Postman/Insomnia
```

### **Fase 2: Integration (Frontend)**
```
Frontend Developer (você):
1. Já tem:
   - Tipagens em app/types/index.ts ✅
   - Service em app/services/productService.ts ✅

2. Cria componentes:
   - features/catalog/CatalogTable.tsx
   - features/catalog/ProductFilter.tsx
   - components/SearchBar.tsx
   - components/ProductCard.tsx

3. Usa o service:
   import { getProducts, searchProducts } from '@/services/productService';

4. Testa integração
```

### **Fase 3: Testing (Ambos)**
```
Ambos:
1. Teste E2E
2. Validação de todos os cenários
3. Performance/Carga
4. Deploy
```

---

## 🗂️ Arquivos Criados para Você

```
autoparts-insight-front-end/
├── BACKEND_FRONTEND_CONTRACT.md    ← Contrato detalhado
├── QUESTIONS_ANSWERS.md            ← Q&A prática
├── API_SUMMARY.md                  ← Este arquivo
├── app/
│   ├── types/
│   │   └── index.ts               ← Tipagens TypeScript
│   └── services/
│       └── productService.ts       ← Service pronto para usar
```

---

## ✅ Checklist Final

**Antes de começar, compartilhe com Backend:**

- [ ] BACKEND_FRONTEND_CONTRACT.md (leitura completa)
- [ ] API_SUMMARY.md (visão rápida)
- [ ] QUESTIONS_ANSWERS.md (esclarecer dúvidas)

**Backend deve confirmar:**

- [ ] Vai usar estrutura `Product` exatamente como definido
- [ ] Vai implementar todos os 5 endpoints
- [ ] Vai retornar paginated response com: data, total, page, pageSize, totalPages
- [ ] Vai tratar erros com status codes corretos
- [ ] Via retornar headers com Cache-Control

**Frontend continuará com:**

- [ ] Componentes de UI
- [ ] Integração com productService.ts
- [ ] Loading states
- [ ] Tratamento de erros
- [ ] Paginação no UI

---

## 📌 Resumo Uma Linha

**Frontend precisa que Backend retorne dados no formato `Product` com paginação, filtros e tratamento de erros padronizado.**

---

## 🤝 Comunicação Recomendada

```
Frontend → Backend:
"Vou usar o arquivo BACKEND_FRONTEND_CONTRACT.md como base.
 Confirma se consegue retornar os dados no formato Product?"

Backend → Frontend:
"Confirmado! Os endpoints estarão prontos em [data].
 Alguma dúvida sobre os dados que vou enviar?"
```

---

Se houver dúvidas, todos os detalhes estão em:
- **BACKEND_FRONTEND_CONTRACT.md** — Especificação técnica
- **QUESTIONS_ANSWERS.md** — Perguntas respondidas
- **app/types/index.ts** — Tipagem TypeScript
- **app/services/productService.ts** — Implementação

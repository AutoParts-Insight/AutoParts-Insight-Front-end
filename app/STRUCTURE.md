# Estrutura do Projeto AutoParts Insight

## ⚡ Filosofia: Simples e Funcional

Esta estrutura é **propositalmente simples** e 100% adequada para o MVP:
- ✅ Sem overengineering
- ✅ Fácil de navegar
- ✅ Escalável quando necessário
- ✅ Focado em catálogo + análise (sem autenticação, sem login)

## 📁 Organização de Pastas

```
app/
├── components/          # Componentes reutilizáveis (Button, Modal, Card, etc)
├── features/            # Features do negócio (Catalog, Dashboard, Gaps, etc)
├── services/            # Chamadas de API e integração com backend
├── hooks/               # Custom React hooks compartilhados
├── types/               # Definições TypeScript globais
├── lib/                 # Utilitários, formatadores, validadores
├── layout.tsx           # Layout raiz da aplicação
├── page.tsx             # Dashboard inicial
└── globals.css          # Estilos globais
```

---

## 📋 O Que Vai em Cada Pasta

### `components/` — UI Compartilhada
Componentes pequenos, reutilizáveis, sem lógica de negócio.

**Exemplos para AutoParts Insight:**
```
components/
├── Button.tsx           # Botão genérico
├── Card.tsx             # Card genérico
├── Header.tsx           # Cabeçalho da app
├── SearchBar.tsx        # Busca por OEM
├── Table.tsx            # Tabela genérica
└── Modal.tsx            # Modal genérico
```

### `features/` — Lógica de Negócio
Cada feature é uma área da aplicação. **MVP tem 3 features:**

```
features/
├── catalog/             # Visualização de produtos
│   ├── CatalogTable.tsx
│   ├── ProductFilter.tsx
│   └── CatalogStats.tsx
├── dashboard/           # Dashboard com métricas
│   ├── MetricsCard.tsx
│   ├── ComparisonChart.tsx
│   └── TopGapsCard.tsx
└── gaps/                # Identificação de gaps
    ├── GapsList.tsx
    ├── GapFilter.tsx
    └── GapOpportunities.tsx
```

### `services/` — API & Backend
Chamadas ao backend Express, dados e lógica compartilhada.

```
services/
├── api.ts               # Cliente HTTP configurado
├── catalogService.ts    # Produtos internos e de concorrentes
├── dashboardService.ts  # Métricas e comparações
└── gapService.ts        # Análise de gaps
```

### `hooks/`
Custom hooks reutilizáveis.

```
hooks/
├── useFetch.ts          # Fetch com cache e loading
├── useFilters.ts        # Gerenciar filtros (OEM, categoria, etc)
└── useDebounce.ts       # Debounce para busca
```

### `types/`
Tipos TypeScript do projeto.

```
types/
└── index.ts             # Product, Competitor, Gap, ApiResponse, etc
```

### `lib/`
Funções utilitárias sem estado.

```
lib/
├── formatters.ts        # formatPrice(), formatDate(), etc
├── constants.ts         # URLs, valores, enums
└── helpers.ts           # Funções auxiliares
```

---

## 🎯 Exemplo Prático: Adicionar Nova Feature

**Cenário:** Adicionar feature de "Análise por Categoria"

1. **Criar componente em `features/`:**
   ```
   features/
   └── categoryAnalysis/
       ├── CategoryBreakdown.tsx
       ├── CategoryTrends.tsx
       └── CategoryComparison.tsx
   ```

2. **Adicionar serviço em `services/`:**
   ```typescript
   // services/categoryService.ts
   export async function getCategoryAnalysis(competitor: string) {
     const response = await api.get(`/analytics/categories/${competitor}`);
     return response.data;
   }
   ```

3. **Usar em `app/page.tsx` ou rota:**
   ```typescript
   import { CategoryBreakdown } from '@/features/categoryAnalysis';
   import { getCategoryAnalysis } from '@/services/categoryService';
   ```

---

## 🎯 Boas Práticas

## 🎯 Boas Práticas

### 1. Nomenclatura
- **Componentes:** `PascalCase` (e.g., `ProductCard.tsx`)
- **Hooks:** `useXxx` (e.g., `useFetch.ts`)
- **Serviços/Utilitários:** `camelCase` (e.g., `formatPrice.ts`)
- **Tipos:** `PascalCase` (e.g., `Product.ts`)

### 2. Importações (usar aliases)
```typescript
// ✅ BOM — Limpo, legível
import Button from '@/components/Button';
import { useFetch } from '@/hooks/useFetch';
import { formatPrice } from '@/lib/formatters';
import type { Product } from '@/types';

// ❌ EVITAR — Paths relativos caóticos
import Button from '../../../components/Button';
```

### 3. Colocação de Código
```typescript
// Se um componente é usado em MÚLTIPLAS features → vai em components/
// Se um componente é usado em UMA feature → vai em features/XYZ/

// Se um hook é GLOBAL e reutilizável → vai em hooks/
// Se um hook é específico de uma feature → coloca no topo de features/XYZ/
```

### 4. Evitar Aninhamento Profundo
```typescript
// ✅ BOM
import CatalogTable from '@/features/catalog/CatalogTable';

// ❌ EVITAR
import CatalogTable from '@/features/catalog/components/tables/main/CatalogTable';
```

---

## 📚 Mapeamento AutoParts → Código

| Funcionalidade | Onde Fica |
|---|---|
| Tabela de produtos | `features/catalog/CatalogTable.tsx` |
| Busca por OEM | `components/SearchBar.tsx` + `services/catalogService.ts` |
| Dashboard de métricas | `features/dashboard/MetricsCard.tsx` |
| Gráfico de comparação | `components/Chart.tsx` (ou `features/dashboard/ComparisonChart.tsx`) |
| Análise de gaps | `features/gaps/GapsList.tsx` + `services/gapService.ts` |
| Filtros (categoria, etc) | `hooks/useFilters.ts` |
| Formatação de preços | `lib/formatters.ts` |
| Tipos de dados | `types/index.ts` |

---

## ✓ Próximas Etapas

1. **Implementar serviços** (`services/catalogService.ts`, `gapService.ts`)
2. **Criar tipos** (`types/index.ts`)
3. **Implementar features** (catalog, dashboard, gaps)
4. **Adicionar componentes** conforme necessário

**Sem apressas. Simples. Funcional. MVP first.**

---

## 🔗 Referências Rápidas

- [Aliases de Importação](./ALIASES.md) — Como usar `@/`
- [ESLint & Prettier](./LINTING.md) — Padrão de código

## 📚 Próximos Passos

1. Criar componentes base em `components/`
2. Organizar features em `features/`
3. Implementar serviços em `services/`
4. Criar custom hooks em `hooks/`
5. Definir tipos globais em `types/`

## ✓ Compatibilidade

- ✅ Next.js 16.2.3 (App Router)
- ✅ TypeScript 5
- ✅ React 19
- ✅ Tailwind CSS 4

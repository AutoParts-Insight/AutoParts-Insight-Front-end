# Estrutura do Projeto AutoParts Insight

## 📁 Organização de Pastas

```
app/
├── components/          # Componentes React reutilizáveis
├── features/           # Domínios/features específicos do negócio
├── services/           # Serviços de API e lógica de negócio
├── hooks/              # Custom React hooks
├── types/              # Definições TypeScript compartilhadas
├── lib/                # Utilitários e helpers
├── layout.tsx          # Layout raiz da aplicação
├── page.tsx            # Página inicial
└── globals.css         # Estilos globais
```

## 📋 Guia de Uso

### `components/`
Componentes React reutilizáveis e compartilhados entre features.

**Exemplos:**
- `Button.tsx`
- `Modal.tsx`
- `Card.tsx`

```
components/
├── Button.tsx
├── Header.tsx
└── Navigation.tsx
```

### `features/`
Organização por domínio/feature. Cada feature contém sua própria lógica, componentes e estilos.

**Estrutura por feature:**
```
features/
├── catalog/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── page.tsx
├── dashboard/
│   ├── components/
│   ├── hooks/
│   └── page.tsx
└── auth/
    ├── components/
    └── services/
```

### `services/`
Serviços para chamadas à API, lógica de negócio e integração com backend.

**Exemplos:**
- `apiClient.ts` - Configuração do cliente HTTP
- `catalogService.ts` - Operações de catálogo
- `authService.ts` - Autenticação

### `hooks/`
Custom React hooks compartilhados entre componentes.

**Exemplos:**
- `useAuth.ts` - Gerenciamento de autenticação
- `useFetch.ts` - Fetch de dados com cache
- `useLocalStorage.ts` - Persistência local

### `types/`
Definições TypeScript globais e compartilhadas.

**Exemplos:**
- `index.ts` - Tipos principais
- `api.ts` - Tipos de resposta da API
- `models.ts` - Modelos de domínio

### `lib/`
Utilitários, helpers e funções de transformação de dados.

**Exemplos:**
- `formatters.ts` - Formatação de dados
- `validators.ts` - Validações
- `constants.ts` - Constantes da aplicação

## 🎯 Boas Práticas

### Organização Hierárquica
- Mantenha componentes próximos de onde são utilizados
- Reutilize apenas quando necessário
- Evite muitos níveis de profundidade

### Nomenclatura
- Componentes: `PascalCase` (e.g., `UserCard.tsx`)
- Hooks: Prefixo `use` (e.g., `useAuth.ts`)
- Utilitários: `camelCase` (e.g., `formatPrice.ts`)
- Tipos: `PascalCase` (e.g., `User.ts`, `ApiResponse.ts`)

### Importações
```typescript
// ✅ Bom
import { Button } from "@/components";
import { useAuth } from "@/hooks";
import { formatPrice } from "@/lib/formatters";
import type { Product } from "@/types";

// ❌ Evitar
import Button from "../../../components/Button";
```

### Path Aliases
Utilize os aliases configurados no `tsconfig.json`:
- `@/` — raiz da pasta `app/`
- `@/components` — `app/components/`
- `@/features` — `app/features/`
- `@/services` — `app/services/`
- etc.

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

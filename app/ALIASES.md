# Aliases de Importação

Os aliases de importação simplificam as importações e tornam o código mais legível. Todos estão configurados em `tsconfig.json`.

## Aliases Disponíveis

| Alias | Caminho | Uso |
|-------|---------|-----|
| `@/components` | `app/components` | Componentes reutilizáveis |
| `@/features` | `app/features` | Features e domínios específicos |
| `@/services` | `app/services` | Serviços, API calls, lógica de negócio |
| `@/hooks` | `app/hooks` | Custom React hooks |
| `@/types` | `app/types` | Tipos e interfaces TypeScript |
| `@/lib` | `app/lib` | Utilitários e helpers |
| `@/*` | `app/*` | Qualquer arquivo dentro de `app/` |

## Exemplos de Uso

### ❌ Sem aliases (evitar)
```typescript
import Button from '../../../components/Button';
import { formatPrice } from '../../../lib/formatters';
import type { Product } from '../../../types';
import { useAuth } from '../../../hooks/useAuth';
```

### ✅ Com aliases (preferir)
```typescript
import Button from '@/components/Button';
import { formatPrice } from '@/lib/formatters';
import type { Product } from '@/types';
import { useAuth } from '@/hooks/useAuth';
```

## Padrões Comuns

### Importar tipo de um serviço
```typescript
// app/features/catalog/components/CatalogList.tsx
import { fetchProducts } from '@/services/productService';
import type { Product } from '@/types';
```

### Importar componente compartilhado
```typescript
// app/features/dashboard/page.tsx
import { Button, Card } from '@/components';
```

### Importar hook customizado
```typescript
// app/components/ProductCard.tsx
import { useDarkMode } from '@/hooks/useDarkMode';
```

### Importar utilitário
```typescript
// app/components/PriceDisplay.tsx
import { formatPrice } from '@/lib/formatters';
```

## IDE Support

Os aliases funcionam nativamente em:
- ✅ VS Code (com Copilot)
- ✅ WebStorm / IntelliJ
- ✅ TypeScript Language Server
- ✅ ESLint

VS Code pode oferecer autocomplete para imports com aliases. Use Ctrl+Space para completar após digitar `@/`.

## Verificação

Para verificar se todos os aliases estão funcionando:

```bash
npm run build    # Compila o projeto
npx tsc --noEmit # Valida tipos sem gerar arquivos
```

Ambos devem passar sem erros.

# ESLint & Prettier

Configuração centralizada de linting e formatação de código.

## 🔧 Ferramentas

- **ESLint** — Análise estática (bugs, boas práticas)
- **Prettier** — Formatação automática de código
- **prettier-eslint** — Integração entre ambas

## 📋 Scripts Disponíveis

```bash
# Verificar problemas de lint
npm run lint

# Corrigir problemas automaticamente
npm run lint:fix

# Verificar formatação (sem modificar)
npm run format:check

# Formatar código automaticamente
npm run format
```

## ⚙️ Configurações

### ESLint (`eslint.config.mjs`)
- Regras Next.js + TypeScript
- Core Web Vitals
- Prettier integration (desabilita conflitos de formatação)

### Prettier (`.prettierrc.json`)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf"
}
```

## 📌 Padrões Enforçados

### Strings
```typescript
// ✅ Bom
const name = 'John';
import { Button } from '@/components';

// ❌ Evitar
const name = "John";
import { Button } from "@/components";
```

### Semicolons
```typescript
// ✅ Bom
const name = 'John';
function greet() {}

// ❌ Evitar
const name = 'John'
function greet() {}
```

### Espaçamento
```typescript
// ✅ Bom
const obj = { name: 'John', age: 30 };
function add(a, b) { }

// ❌ Evitar
const obj = {name:"John",age:30};
function add(a,b){}
```

### Arrow Functions
```typescript
// ✅ Bom
items.map((item) => item.name);

// ❌ Evitar
items.map(item => item.name);
```

## 🚀 Workflow

### Desenvolvimento Local
```bash
# Fazer mudanças
# Editar arquivos...

# Antes de commit
npm run lint:fix    # Corrigir automaticamente
npm run format      # Formatar (redundante com lint:fix)
npm run build       # Compilar para validar
```

### CI/CD
```bash
# No pipeline (não modifica)
npm run lint        # Falha se houver problemas
npm run format:check # Falha se não estiver formatado
```

## 📝 Ignorar Regras (quando necessário)

```typescript
// Desabilitar regra para uma linha
// eslint-disable-next-line no-console
console.log('debug');

// Desabilitar regra para um bloco
/* eslint-disable no-console */
console.log('debug');
console.log('debug 2');
/* eslint-enable no-console */
```

## 🔍 Verificar Configuração

```bash
# Ver configuração ESLint
npx eslint --print-config app/page.tsx

# Ver formatação que Prettier aplicaria
npx prettier --check app/
```

## 📖 Mais Informações

- [ESLint Docs](https://eslint.org/)
- [Prettier Docs](https://prettier.io/)
- [eslint-config-next](https://nextjs.org/docs/app/building-your-application/configuring/eslint)

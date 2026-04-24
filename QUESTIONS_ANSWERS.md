# ❓ Perguntas & Respostas: Front-end ↔ Back-end

## 🔵 O que o Front-end Precisa Saber do Back-end?

### 1. **Estrutura dos Dados de Produto**
```
✅ RESPOSTA DO BACKEND DEVE INCLUIR:
├── ID do produto (identificador único)
├── SKU (código interno)
├── OEM (código original)
├── Nome e tipo
├── Categoria
├── Fabricante (com nome e código)
├── Descrição técnica
├── Especificações (tensão, potência, etc)
├── Lista de aplicações (array)
├── Códigos de conversão (quais marcas podem substituir)
├── Data de cadastro
└── Status (ativo/inativo, em estoque)
```

**Exemplo esperado:**
```json
{
  "id": "20101",
  "sku": "20101",
  "oem": "6GM23005",
  "name": "MOTOR PARTIDA LINHA MOTO",
  "type": "MOTOR PARTIDA",
  "category": "ENGINE",
  "manufacturer": {
    "name": "ORIGINAL",
    "code": "31200-KSS-901"
  },
  "description": "MOTOR PARTIDA HONDA BIZ125 EX (06>10) / ES (06>10) 1,96 KW 12V",
  "specifications": {
    "voltage": 12,
    "power": "1,96 KW"
  },
  "applications": [
    "HONDA BIZ 125 EX JAN/2006-DEZ/2010",
    "HONDA BIZ 125 ES JAN/2006-DEZ/2010"
  ],
  "conversionCodes": [
    { "code": "31200-KSS-901", "manufacturer": "ORIGINAL" },
    { "code": "6M23005", "manufacturer": "GAUSS" }
  ],
  "registeredAt": "2021-03-19T00:00:00Z",
  "isActive": true
}
```

---

### 2. **Endpoints Que Preciso Chamar**

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/products` | GET | Lista todos os produtos (paginado) |
| `/api/products/:id` | GET | Detalhes de 1 produto |
| `/api/products/search` | GET | Busca rápida por nome/OEM |
| `/api/categories` | GET | Lista todas as categorias |
| `/api/manufacturers` | GET | Lista todos os fabricantes |

**Parâmetros Esperados:**
```
GET /api/products?page=1&pageSize=20&category=ENGINE&manufacturer=HONDA&search=BIZ
```

---

### 3. **Paginação**
```
✅ PRECISO QUE RETORNE:
- data: Array de produtos
- total: Número total de produtos (com filtros aplicados)
- page: Página atual (começa em 1)
- pageSize: Quantidade de itens por página
- totalPages: Total de páginas

EXEMPLO:
{
  "data": [...20 produtos...],
  "total": 342,
  "page": 1,
  "pageSize": 20,
  "totalPages": 18
}
```

---

### 4. **Performance & Cache**
```
✅ EXPECTATIVAS:
- Resposta em menos de 5 segundos
- Headers com sugestão de cache:
  {
    "Cache-Control": "public, max-age=900"  // 15 minutos
  }

✅ DADOS QUE MUDAM POUCO (cache longo):
- Categorias (1 hora)
- Fabricantes (1 hora)
- Produtos base (15 minutos)

⚠️ DADOS QUE MUDAM SEMPRE:
- Preços
- Estoque
- Análises comparativas
```

---

### 5. **Tratamento de Erros**
```
✅ RETORNE HTTP STATUS CORRETO:

200 OK → Sucesso
{
  "data": {...},
  "total": 100
}

400 Bad Request → Parametros inválidos
{
  "error": "Invalid manufacturer filter",
  "code": "INVALID_PARAM",
  "message": "Manufacturer 'INVALID' not found"
}

404 Not Found → Produto não existe
{
  "error": "Product not found",
  "code": "NOT_FOUND",
  "message": "Product with ID '99999' does not exist"
}

500 Internal Server Error → Erro interno
{
  "error": "Database connection failed",
  "code": "DB_ERROR",
  "message": "Unable to fetch products"
}
```

---

### 6. **Casos Especiais**

**Como buscar por OEM?**
```
GET /api/products/search?oem=6GM23005
→ Retorna produto com aquele OEM específico
```

**Como listar todas as aplicações de um produto?**
```
GET /api/products/20101
→ applications: ["HONDA BIZ 125 EX JAN/2006-DEZ/2010", ...]
```

**Como listar códigos de conversão?**
```
GET /api/products/20101
→ conversionCodes: [
    { code: "31200-KSS-901", manufacturer: "ORIGINAL" },
    { code: "6M23005", manufacturer: "GAUSS" }
  ]
```

---

## 🔴 O que o Back-end Precisa Saber do Front-end?

### 1. **Validação de Parametros**
```
✅ FRONTEND VAI ENVIAR:
- Páginas começando em 1 (não em 0)
- Query de busca com máximo 100 caracteres
- Filtros já sanitizados (sem caracteres especiais perigosos)

✅ BACKEND DEVE VALIDAR:
- page >= 1
- pageSize <= 100 (máximo 100 itens por página)
- search sem SQL injection
- category/manufacturer existentes
- Retornar erro 400 se inválido
```

---

### 2. **O Front-end Será Responsável Por**

✅ **Formatação de Dados**
```typescript
// Front-end formata datas
new Date("2021-03-19T00:00:00Z").toLocaleDateString('pt-BR')
→ "19/03/2021"

// Front-end formata preços (quando houver)
(priceInCents / 100).toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})
→ "R$ 1.234,56"

// Front-end quebra descrições longas
description.split('\n').map(line => <p>{line}</p>)
```

✅ **Busca com Debounce**
```typescript
// Frontend faz debounce de 300ms ao disponibilizar busca
// Evita enviar 100 requests enquanto user digita
```

✅ **Paginação no UI**
```
Frontend renderiza:
[1] [2] [3] ... [18] [Próximo]

Ao clicar em [2], envia:
GET /api/products?page=2&pageSize=20
```

✅ **Loading States**
```
Inicial: vazio
Carregando: spinner/skeleton
Sucesso: dados exibidos
Erro: mensagem clara "Falha ao carregar. Tente novamente"
```

---

### 3. **O Front-end NÃO Será Responsável Por**

❌ Validação de dados (backend faz isso)  
❌ Regras de negócio (backend faz isso)  
❌ Cálculos complexos de análise (backend faz isso)  
❌ Segurança/Autorização (backend faz isso)

---

### 4. **Requisições de Back-end ao Front-end**
```
✅ COMUNIQUE:
- Quais campos são obrigatórios na resposta
- Qual é a ordem padrão de produtos
- Se há limite de requisições (rate limiting)
- Se há autenticação necessária (hoje não há)
- Tamanho máximo de descrição/array de aplicações
```

---

### 5. **Exemplo de Fluxo Completo**

```
USER NO FRONT-END:
1. Digita "BIZ125" na busca
2. Aguarda 300ms (debounce)
3. Frontend faz: GET /api/products/search?q=BIZ125
4. Backend retorna:
   [
     { id: "20101", name: "MOTOR PARTIDA..." },
     { id: "20102", name: "MOTOR PARTIDA..." }
   ]
5. Frontend mostra resultados em tempo real
6. User clica em um produto
7. Frontend faz: GET /api/products/20101
8. Backend retorna objeto completo
9. Frontend exibe detalhes formatados
```

---

## 📋 Checklist de Comunicação

**Antes de começar o desenvolvimento, ambos devem confirmar:**

| Item | Frontend | Backend | Status |
|------|----------|---------|--------|
| Estrutura do Product definida | ✓ | ✓ | ⏳ |
| Endpoints listados | ✓ | ✓ | ⏳ |
| Filtros suportados | ✓ | ✓ | ⏳ |
| Paginação confirmada | ✓ | ✓ | ⏳ |
| Formatos de erro padronizados | ✓ | ✓ | ⏳ |
| TTL de cache definido | ✓ | ✓ | ⏳ |
| Rate limiting (se houver) | ✓ | ✓ | ⏳ |
| Headers HTTP confirmados | ✓ | ✓ | ⏳ |
| Teste com dados reais | ✓ | ✓ | ⏳ |

---

## 🚀 Próximas Etapas

### Backend (você está aqui ⬇️)
1. Criar tabela `products` no BD
2. Implementar endpoints GET `/api/products*`
3. Retornar dados no formato `Product`
4. Testar com Postman/Insomnia

### Frontend
1. Criar `services/productService.ts`
2. Implementar `useFetch` hook
3. Criar componentes (`ProductList`, `ProductCard`)
4. Conectar com backend
5. Testar integração

### Ambos
1. Testes E2E
2. Documentação final
3. Merge para produção

---

**Data:** April 15, 2026  
**Status:** 🟡 Em Discussão  
**Próxima Reunião:** [Data a confirmar]

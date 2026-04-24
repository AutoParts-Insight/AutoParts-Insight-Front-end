# 🚀 AutoParts Insight - Integração Front-end ↔ Back-end

**Data:** 15/04/2026  
**Status:** 🟡 Pronto para Discussão  
**Versão:** 1.0

---

## 🎯 O que foi preparado?

✅ **Tipagens TypeScript completas** - `app/types/index.ts`  
✅ **Service layer pronto para usar** - `app/services/productService.ts`  
✅ **Contrato de integração detalhado** - `BACKEND_FRONTEND_CONTRACT.md`  
✅ **Perguntas & Respostas práticas** - `QUESTIONS_ANSWERS.md`  
✅ **Resumo executivo** - `API_SUMMARY.md`  
✅ **Arquitetura visual** - `ARCHITECTURE.md`  
✅ **Configuração de ambiente** - `.env.example`

---

## 📋 Estrutura de Dados: Product

Cada produto que o Backend enviar deve ter **exatamente** este formato:

```json
{
  "id": "20101",
  "sku": "20101",
  "oem": "6GM23005",
  "name": "MOTOR PARTIDA LINHA MOTO",
  "type": "MOTOR PARTIDA",
  "category": "ENGINE",
  "manufacturer": {
    "id": "1",
    "name": "ORIGINAL",
    "code": "31200-KSS-901"
  },
  "description": "MOTOR PARTIDA HONDA BIZ125 EX (06>10) / ES (06>10) 1,96 KW 12V",
  "specifications": {
    "power": "1,96 KW",
    "voltage": 12
  },
  "applications": [
    "HONDA BIZ 125 EX JAN/2006-DEZ/2010",
    "HONDA BIZ 125 ES JAN/2006-DEZ/2010"
  ],
  "conversionCodes": [
    {
      "code": "31200-KSS-901",
      "manufacturer": "ORIGINAL"
    },
    {
      "code": "6M23005",
      "manufacturer": "GAUSS"
    }
  ],
  "registeredAt": "2021-03-19T00:00:00Z",
  "isActive": true
}
```

---

## 🔗 5 Endpoints Essenciais

| Endpoint | Descrição | Status |
|----------|-----------|--------|
| `GET /api/products` | Lista todos (com paginação e filtros) | ⏳ Backend |
| `GET /api/products/:id` | Detalhes de um produto | ⏳ Backend |
| `GET /api/products/search` | Busca rápida | ⏳ Backend |
| `GET /api/categories` | Lista categorias | ⏳ Backend |
| `GET /api/manufacturers` | Lista fabricantes | ⏳ Backend |

---

## 📤 Resposta Esperada: Paginação

```json
{
  "data": [
    { ... produto 1 ... },
    { ... produto 2 ... },
    ...
  ],
  "total": 342,
  "page": 1,
  "pageSize": 20,
  "totalPages": 18
}
```

**Sem paginação = sem integração. Todos os endpoints GET devem retornar neste formato.**

---

## 🤝 O que cada lado precisa fazer?

### 👨‍💻 Backend (Seu Colaborador)

- [ ] Criar tabela `products` com todos os campos
- [ ] Criar tabela `manufacturers` com id, name, code
- [ ] Criar tabela `categories` com id, name
- [ ] Implementar GET `/api/products` com paginação e filtros
- [ ] Implementar GET `/api/products/:id`
- [ ] Implementar GET `/api/products/search?q=`
- [ ] Implementar GET `/api/categories`
- [ ] Implementar GET `/api/manufacturers`
- [ ] Retornar status HTTP corretos (200, 400, 404, 500)
- [ ] Adicionar headers `Cache-Control: public, max-age=900`

### 👨‍💼 Frontend (Você - Já Pronto ✅)

- [x] Tipagens TypeScript
- [x] Service layer para API calls
- [x] Hooks reutilizáveis (useFetch, useProducts, useProductSearch)
- [ ] Componentes de UI (CatalogTable, ProductCard, SearchBar)
- [ ] Integração com service
- [ ] Loading states
- [ ] Tratamento de erros
- [ ] Testes E2E

---

## 📝 Antes de Começar: Perguntas para o Backend

**Imprima isso e mande para seu colaborador:**

```
1. Você vai retornar paginação (data, total, page, pageSize, totalPages)?
2. Qual é o tamanho máximo de descrição/aplicações?
3. Qual é o TTL de cache recomendado?
4. Há rate limiting? Se sim, qual?
5. A autenticação será necessária? (hoje esperamos que não)
6. Qual é a ordem padrão de produtos (data? nome? popularidade)?
7. Qual será o valor padrão de pageSize?
```

---

## 🔄 Fluxo de Uso (Exemplo)

```
USUARIO digita:   "BIZ125"

FRONTEND:
  setTimeout(300ms) → GET /api/products/search?q=BIZ125

BACKEND:
  → Busca no banco de dados
  → Retorna: [{id: "20101", name: "MOTOR PARTIDA", ...}, ...]

FRONTEND:
  → Cache resultado (15 min)
  → Mostra lista de resultados

USUARIO clica em:  um resultado

FRONTEND:
  → GET /api/products/20101

BACKEND:
  → Retorna objeto completo com todas as especificações

FRONTEND:
  → Abre página de detalhes
  → Exibe: nome, fabricante, aplicações, códigos alternativos, preço, etc
```

---

## 📊 Endpoints: Exemplos de Requests & Responses

### 1️⃣ GET /api/products

**Request:**
```
GET /api/products?page=1&pageSize=20&category=ENGINE&manufacturer=HONDA
```

**Response:**
```json
{
  "data": [ { id: "20101", ... } ],
  "total": 342,
  "page": 1,
  "pageSize": 20,
  "totalPages": 18
}
```

### 2️⃣ GET /api/products/:id

**Request:**
```
GET /api/products/20101
```

**Response:**
```json
{
  "id": "20101",
  "name": "MOTOR PARTIDA LINHA MOTO",
  ... (todos os campos)
}
```

### 3️⃣ GET /api/products/search

**Request:**
```
GET /api/products/search?q=BIZ125&limit=10
```

**Response:**
```json
[
  { "id": "20101", "name": "MOTOR PARTIDA LINHA MOTO", ... },
  { "id": "20102", "name": "MOTOR PARTIDA LINHA MEDIA", ... }
]
```

### 4️⃣ GET /api/categories

**Response:**
```json
{
  "categories": [
    { "id": "1", "name": "ENGINE", "count": 145 },
    { "id": "2", "name": "ELECTRICAL", "count": 230 }
  ],
  "count": 2
}
```

### 5️⃣ GET /api/manufacturers

**Response:**
```json
{
  "manufacturers": [
    { "id": "1", "name": "HONDA", "count": 145 },
    { "id": "2", "name": "YAMAHA", "count": 87 }
  ],
  "count": 2
}
```

---

## 🚨 Erros: Sempre Retorne Este Formato

```json
{
  "error": "Descrição do erro",
  "code": "ERROR_CODE",
  "message": "Mensagem detalhada para debug"
}
```

---

## 💾 Configuração de Ambiente

**Criar arquivo `.env.local` (não commitar):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_TIMEOUT=5000
```

**Backend rodará em:** `http://localhost:3001`

---

## ✅ Checklist: Pronto para Integração?

**Backend:**
- [ ] Tabelas criadas no BD
- [ ] Todos 5 endpoints implementados
- [ ] Dados retornam no formato `Product`
- [ ] Paginação funcionando
- [ ] Filtros funcionando
- [ ] Erros retornam status code + JSON
- [ ] Headers cache presentes
- [ ] Testado com Postman/Insomnia

**Frontend:**
- [ ] Tipos importados de `app/types/index.ts`
- [ ] Service importado de `app/services/productService.ts`
- [ ] `.env.local` criado
- [ ] Componentes criados
- [ ] Loading states implementados
- [ ] Tratamento de erros implementado
- [ ] Paginação no UI funcionando
- [ ] Testado com backend real

---

## 📚 Documentos de Referência

1. **BACKEND_FRONTEND_CONTRACT.md** — Especificação técnica completa
2. **QUESTIONS_ANSWERS.md** — Q&A: O que cada um precisa saber
3. **API_SUMMARY.md** — Resumo visual e rápido
4. **ARCHITECTURE.md** — Diagrama e fluxos
5. **app/types/index.ts** — Tipagem TypeScript
6. **app/services/productService.ts** — Service pronto para usar

---

## 🎓 Próximas Fases

### Fase 1: Backend Dev (2-3 dias)
- Criar endpoints
- Testar com dados de exemplo

### Fase 2: Frontend Dev (2-3 dias)
- Criar componentes
- Integrar com service

### Fase 3: QA (1-2 dias)
- Teste E2E
- Performance
- Edge cases

### Fase 4: Deploy (1 dia)
- Produção

---

## 📞 Dúvidas Comuns

**P: Todos os campos de Product são obrigatórios?**  
R: Mínimo obrigatório: id, sku, name, type, category, manufacturer, voltage. Resto opcional.

**P: Qual é a ordem de produtos padrão?**  
R: Não definida. Sugestão: por data (mais recentes primeiro).

**P: Posso usar diferentes status codes?**  
R: Use 200, 400, 404, 500. Respeite os standards HTTP.

**P: Preciso de autenticação?**  
R: Não para MVP. Adicionar depois se necessário.

**P: Qual é o limite de requisições?**  
R: Não há. Implementar rate limiting é opcional.

---

## 🎯 Objetivo Final

> **Backend retorna dados estruturados em Product.**  
> **Frontend exibe dados formatados para o usuário.**

---

**Pronto para começar! 🚀**

---

*Última atualização: 15/04/2026*  
*Próxima revisão: [Date TBD]*

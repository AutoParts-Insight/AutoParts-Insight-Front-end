# 📊 Resumo Executivo: Integração Front-end ↔ Back-end

## 🎯 Visão Rápida

Este arquivo oferece um resumo **rápido e prático** para o responsável pelo backend entender exatamente o que o frontend precisa.

---

## 📦 Estrutura de Dados: Product

```typescript
Product {
  id: string;                    // UUID ou número único
  sku: string;                   // Código interno (ex: "20101")
  oem: string;                   // Código OEM (ex: "6GM23005")
  name: string;                  // Nome (ex: "MOTOR PARTIDA LINHA MOTO")
  type: string;                  // Tipo de peça
  category: string;              // Categoria (ex: "ENGINE")
  
  manufacturer: {
    id: string;
    name: string;                // (ex: "HONDA", "YAMAHA")
    code?: string;
  };
  
  description: string;           // Descrição técnica completa
  specifications: {
    power?: string;              // (ex: "1,96 KW")
    voltage: number;             // (ex: 12)
    amperage?: number;
    rpm?: number;
  };
  
  applications: string[];        // Array de modelos compatíveis
  
  conversionCodes: [
    {
      code: string;              // Código alternativo
      manufacturer: string;      // Marca alternativa
    }
  ];
  
  registeredAt: string;          // ISO 8601 formato
  updatedAt?: string;
  isActive: boolean;
  inStock?: boolean;
  cost?: number;
}
```

---

## 🔗 Endpoints Obrigatórios

| Endpoint | Método | Autor | Status |
|----------|--------|-------|--------|
| `/api/products` | GET | Backend | ⏳ |
| `/api/products/:id` | GET | Backend | ⏳ |
| `/api/products/search` | GET | Backend | ⏳ |
| `/api/categories` | GET | Backend | ⏳ |
| `/api/manufacturers` | GET | Backend | ⏳ |

---

## 📋 Parametros de Entrada

### GET /api/products
```
Query Parameters:
  page=1              (número, padrão: 1)
  pageSize=20         (número, padrão: 20, máximo: 100)
  search=BIZ          (texto de busca)
  category=ENGINE     (filtra por categoria)
  manufacturer=HONDA  (filtra por fabricante)
  sortBy=name|date    (opcional)
  sortOrder=asc|desc  (opcional)

Exemplo:
  GET /api/products?page=2&pageSize=20&category=ENGINE&manufacturer=HONDA
```

### GET /api/products/search
```
Query Parameters:
  q=BIZ125            (termo de busca)
  limit=10            (máximo de resultados)

Exemplo:
  GET /api/products/search?q=BIZ125&limit=10
```

---

## 📤 Resposta Esperada

### Sucesso (200 OK)

**GET /api/products**
```json
{
  "data": [
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
        "HONDA BIZ 125 EX JAN/2006-DEZ/2010"
      ],
      "conversionCodes": [
        { "code": "31200-KSS-901", "manufacturer": "ORIGINAL" },
        { "code": "6M23005", "manufacturer": "GAUSS" }
      ],
      "registeredAt": "2021-03-19T00:00:00Z",
      "isActive": true
    }
  ],
  "total": 342,
  "page": 1,
  "pageSize": 20,
  "totalPages": 18
}
```

**GET /api/products/search**
```json
[
  {
    "id": "20101",
    "name": "MOTOR PARTIDA LINHA MOTO",
    "manufacturer": "HONDA",
    "category": "ENGINE"
  },
  ...
]
```

### Erro (400/404/500)
```json
{
  "error": "Invalid manufacturer",
  "code": "INVALID_PARAM",
  "message": "Manufacturer 'INVALID' not found"
}
```

---

## ⏱️ Performance

| Métrica | Expectativa |
|---------|------------|
| **Tempo de Resposta** | < 5 segundos |
| **Paginação** | Max 100 itens por página |
| **Cache** | Headers cache-control presente |
| **Rate Limiting** | Informar se houver limitação |

---

## 🔒 Headers HTTP

### Request
```
GET /api/products HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
```

### Response
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Cache-Control: public, max-age=900
X-Total-Count: 342
```

---

## 🚨 Tratamento de Erros

### HTTP 400 - Parametros Inválidos
```json
{
  "error": "Invalid parameter",
  "code": "INVALID_PARAM",
  "message": "pageSize must be between 1 and 100"
}
```

### HTTP 404 - Não Encontrado
```json
{
  "error": "Product not found",
  "code": "NOT_FOUND",
  "message": "Product with ID '99999' does not exist"
}
```

### HTTP 500 - Erro Interno
```json
{
  "error": "Internal server error",
  "code": "SERVER_ERROR",
  "message": "Database connection failed"
}
```

---

## 📝 Checklist: O que está pronto

- ✅ Tipagem TypeScript (`app/types/index.ts`)
- ✅ Service layer (`app/services/productService.ts`)
- ✅ Contrato detalhado (`BACKEND_FRONTEND_CONTRACT.md`)
- ✅ Q&A completa (`QUESTIONS_ANSWERS.md`)
- ⏳ Endpoints backend (FAZER)
- ⏳ Testes E2E (FAZER)

---

## 💡 Exemplo: Fluxo Completo

```
USER:
  1. Digita "BIZ125" na busca

FRONTEND:
  2. Aguarda 300ms (debounce)
  3. GET /api/products/search?q=BIZ125
  
BACKEND:
  4. Busca no BD e retorna:
     [{id: "20101", name: "MOTOR PARTIDA...", ...}, ...]
  
FRONTEND:
  5. Exibe resultados
  
USER:
  6. Clica em um resultado

FRONTEND:
  7. GET /api/products/20101
  
BACKEND:
  8. Retorna objeto completo com todas as aplicações, códigos, etc
  
FRONTEND:
  9. Abre página de detalhes com informação formatada
```

---

## 🔧 Dados de Teste

Use estes dados de exemplo para testar:

| ID | SKU | OEM | Nome |
|----|-----|-----|------|
| 20101 | 20101 | 6GM23005 | MOTOR PARTIDA LINHA MOTO |
| 20102 | 20102 | T001.000.005 | MOTOR PARTIDA LINHA MEDIA |
| 20300 | 20300 | DITA20394 | MOTOR PARTIDA LINHA LEVE |

---

## 📞 Próximos Passos

### Backend:
- [ ] Criar tabela `products` no BD
- [ ] Implementar endpoints listados
- [ ] Retornar dados no formato `Product`
- [ ] Adicionar validação de parametros (page, pageSize, etc)
- [ ] Implementar paginação
- [ ] Testar com Postman/Insomnia

### Frontend:
- [ ] Usar tipagens em `app/types/index.ts`
- [ ] Usar service em `app/services/productService.ts`
- [ ] Implementar componentes de UI
- [ ] Testar integração

### Ambos:
- [ ] Teste E2E
- [ ] Deploy
- [ ] Documentar desvios (se houver)

---

## 📧 Documentos Relacionados

1. **BACKEND_FRONTEND_CONTRACT.md** — Contrato completo e detalhado
2. **QUESTIONS_ANSWERS.md** — Perguntas e respostas práticas
3. **app/types/index.ts** — Tipagem TypeScript
4. **app/services/productService.ts** — Service layer pronto para usar

---

## ✍️ Informações

- **Data:** April 15, 2026
- **Versão:** 1.0
- **Status:** 🟡 Em Discussão
- **Frontend:** [Seu Nome]
- **Backend:** [Nome do Colaborador]

**Última atualização:** 15/04/2026  
**Próxima revisão:** [Data a confirmar]

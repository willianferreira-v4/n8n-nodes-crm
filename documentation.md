## 📝 CRM Node - Documentação

---

### 🔑 Configuração de Credenciais

### **Campos Obrigatórios**

- **Client ID** - Identificador do cliente para autenticação
- **Client Secret** - Chave secreta para autenticação
- **API URL** - URL base da API do CRM
- **Create Lead URL** - Endpoint para criar leads
- **Update Lead URL** - Endpoint para atualizar campos customizados
- **Update Lead Main URL** - Endpoint para atualizar campos principais
- **Disqualify Lead URL** - Endpoint para desqualificar leads
- **Change Tenant URL** - Endpoint para alterar tenant

### **Custom Field IDs**

Configure os IDs e tipos dos campos customizados em formato JSON. O nó suporta **56 campos customizados**.

Cada campo deve ter:

- **id** - UUID único do campo no CRM
- **type** - Tipo do campo

**Tipos de campos suportados:**

- **BOOLEAN** - Campos booleanos (true/false)
- **DROPDOWN** - Campos de seleção com opções pré-definidas
- **TEXT_SHORT / TEXT_LONG** - Campos de texto curto ou longo
- **DATE** - Campos de data
- **DATETIME** - Campos de data e hora
- **NUMBER_DECIMAL** - Campos numéricos decimais

**Lista completa dos 56 campos customizados:**

| Campo                          | Tipo Recomendado |
| ------------------------------ | ---------------- |
| `ad_id`                        | TEXT_SHORT       |
| `adset_id`                     | TEXT_SHORT       |
| `arquivado`                    | BOOLEAN          |
| `campaign_id`                  | TEXT_SHORT       |
| `canal_de_aquisicao`           | DROPDOWN         |
| `canal_de_origem`              | DROPDOWN         |
| `cargo`                        | TEXT_SHORT       |
| `client_id`                    | TEXT_SHORT       |
| `cohort`                       | DROPDOWN         |
| `csc`                          | BOOLEAN          |
| `csc_oportunidade`             | BOOLEAN          |
| `data_de_cadastro`             | DATE             |
| `data_de_fechamento_estimada`  | DATE             |
| `data_de_observacoes_do_bant`  | DATE             |
| `data_hora_da_reuniao`         | DATETIME         |
| `descricao_da_desqualificacao` | TEXT_LONG        |
| `descricao_feita_pelo_lead`    | TEXT_LONG        |
| `detalhes_da_qualificacao`     | TEXT_LONG        |
| `e_sao`                        | BOOLEAN          |
| `enviar_para_o_deal_broker`    | BOOLEAN          |
| `external_id`                  | TEXT_SHORT       |
| `faturamento_da_lp`            | DROPDOWN         |
| `faturamento_mensal`           | DROPDOWN         |
| `fb_lead_id`                   | TEXT_SHORT       |
| `fbc`                          | TEXT_SHORT       |
| `fbclid`                       | TEXT_SHORT       |
| `fbp`                          | TEXT_SHORT       |
| `fonte_da_oportunidade`        | DROPDOWN         |
| `fonte_do_lead`                | DROPDOWN         |
| `form_name`                    | TEXT_SHORT       |
| `franquia_csc`                 | TEXT_SHORT       |
| `franquia_csc_oportunidade`    | TEXT_SHORT       |
| `gclid`                        | TEXT_SHORT       |
| `id_da_campanha_de_email`      | TEXT_SHORT       |
| `id_de_resposta_do_formulario` | TEXT_SHORT       |
| `id_franquia_csc`              | TEXT_SHORT       |
| `id_franquia_oportunidade`     | TEXT_SHORT       |
| `ip_do_cadastro`               | TEXT_SHORT       |
| `justificativa`                | TEXT_LONG        |
| `modelo_de_negocios`           | DROPDOWN         |
| `nome_da_campanha_de_email`    | TEXT_SHORT       |
| `observacoes`                  | TEXT_LONG        |
| `page_name`                    | TEXT_SHORT       |
| `primeiro_destino`             | DROPDOWN         |
| `produtos_marketing`           | DROPDOWN         |
| `qualidade_da_reuniao`         | TEXT_LONG        |
| `razao_da_desqualificacao`     | DROPDOWN         |
| `segmento`                     | DROPDOWN         |
| `sem_roteamento`               | BOOLEAN          |
| `session_id`                   | TEXT_SHORT       |
| `session_number`               | TEXT_SHORT       |
| `status_da_reuniao`            | DROPDOWN         |
| `status_leadbroker`            | DROPDOWN         |
| `subnicho_v4_food`             | DROPDOWN         |
| `temperatura`                  | DROPDOWN         |
| `urgencia`                     | TEXT_SHORT       |
| `valor_leadbroker`             | NUMBER_DECIMAL   |

### **Owners**

Lista em formato JSON dos proprietários (owners) disponíveis no sistema.

Cada owner deve ter:

- **id** - UUID único do owner
- **name** - Nome de exibição do owner

### **Columns**

Lista em formato JSON das colunas do pipeline. As colunas representam os estágios do funil de vendas.

Cada coluna deve ter:

- **id** - UUID único da coluna
- **name** - Nome de exibição da coluna

### **Tenants**

Lista em formato JSON dos tenants (inquilinos) disponíveis no sistema.

Cada tenant deve ter:

- **id** - UUID único do tenant
- **name** - Nome de exibição do tenant

---

### ⚙️ Operações Disponíveis

O nó CRM oferece **7 operações principais** para gerenciar leads:

1. **Create Lead** - Criar um novo lead
2. **Create Lead and Update Fields** - Criar lead e atualizar campos customizados
3. **Update Lead** - Atualizar campos principais de um lead
4. **Update Lead Column** - Mover um lead para outra coluna do pipeline
5. **Update Lead Custom Field** - Atualizar campos customizados
6. **Disqualify Lead** - Desqualificar um lead
7. **Change Tenant** - Alterar o tenant de um lead

### **1. Create Lead**

Cria um **novo lead** no CRM.

**Campos obrigatórios:**

- **Owner** (dropdown) - Proprietário do lead
- **Coluna de Entrada** (dropdown) - Coluna inicial do pipeline
- **Company Name** - Nome da empresa
- **Title** - Título do lead

**Campos opcionais:**

- **Canal de Origem** (dropdown) - Carregado das credenciais (`originChannels`)
- **Canal de Aquisição** (dropdown) - Carregado das credenciais (`acquisitionChannels`)
- Email
- Phone
- Tax ID (CPF/CNPJ)
- Company Nationality (Brazil, EUA, Others)
- UTM Source
- UTM Campaign
- UTM Content
- UTM Medium
- UTM Term
- Source Page

**Retorno:** Objeto do lead criado incluindo o cardId

---

### **2. Create Lead and Update Fields**

Cria um lead e **atualiza campos customizados** em uma única operação.

**Fluxo de execução:**

1. Cria o lead com os campos padrão
2. Extrai o cardId da resposta
3. Para cada campo customizado selecionado, faz uma chamada de atualização

**Campos obrigatórios:**

- **Owner** (dropdown)
- **Coluna de Entrada** (dropdown)
- **Company Name**
- **Title**

**Campos opcionais:**

- Todos os campos de Create Lead (Email, Phone, Tax ID, Company Nationality, UTMs, Source Page)
- **Canal de Origem** (dropdown) - Carregado das credenciais (`originChannels`)
- **Canal de Aquisição** (dropdown) - Carregado das credenciais (`acquisitionChannels`)
- **Custom Fields** - Adicione quantos campos customizados quiser através do botão "Add Field"

**Como adicionar campos customizados:**

- Clique em "Add Field" na seção Custom Fields
- Selecione o campo desejado no dropdown "Field Name"
- O tipo de input se adapta automaticamente ao tipo do campo:
  - **Boolean** → Checkbox (true/false)
  - **Dropdown** → Seleção com opções pré-definidas
  - **Date/DateTime** → Seletor de data/hora
  - **Number** → Input numérico
  - **Text** → Input de texto

**Retorno:** Objeto com cardId, resposta da criação e array com atualizações dos campos customizados

---

### **3. Update Lead**

Atualiza **campos principais** de um lead existente. Apenas campos preenchidos serão enviados na requisição.

**Campos obrigatórios:**

- **Card ID** - ID do lead a ser atualizado

**Campos opcionais:**

- Title
- Company Name
- Email
- Phone
- Tax ID
- Owner (dropdown)
- Tenant (dropdown)
- Canal de Origem (dropdown) - Carregado das credenciais (`originChannels`)
- Canal de Aquisição (dropdown) - Carregado das credenciais (`acquisitionChannels`)
- UTM Source
- UTM Campaign
- UTM Content
- UTM Medium
- UTM Term
- Source Page
- Lost Reason
- Lost Description

**Retorno:** Resposta da API com os dados atualizados do lead

> **Nota:** Apenas os campos que você preencher serão incluídos na requisição. Campos vazios são ignorados.

---

### **4. Update Lead Column**

Move um lead para uma **coluna diferente** do pipeline sem desqualificá-lo.

**Campos obrigatórios:**

- **Card ID** - ID do lead a ser movido
- **Coluna de Destino** (dropdown) - Coluna para onde o lead será movido

**Campos opcionais:**

- **Novo Index** (number) - Posição do card na coluna (padrão: 0)
- **Ignorar Validação de Campos Obrigatórios** (boolean) - Padrão: true

**Retorno:** Resposta da API confirmando a movimentação

> **Nota:** Esta operação usa o mesmo endpoint de desqualificação, mas não requer motivo ou descrição, permitindo mover leads entre colunas livremente.

---

### **5. Update Lead Custom Field**

Atualiza um ou mais **campos customizados** de um lead existente.

**Campos obrigatórios:**

- **Card ID** - ID do lead a ser atualizado

**Campos customizados:**

- Adicione campos através do botão "Add Field"
- Cada campo tem um input apropriado ao seu tipo:
  - **Boolean** → Checkbox (true/false)
  - **Dropdown** → Seleção com opções específicas do campo
  - **Date** → Seletor de data
  - **DateTime** → Seletor de data e hora
  - **Number** → Input numérico
  - **Text** → Input de texto (curto ou longo)

**Como funciona:**

1. Para cada campo adicionado, o nó:
   - Busca a configuração do campo nas credenciais
   - Identifica o ID e tipo do campo
   - Monta a requisição apropriada baseada no tipo
   - Faz uma chamada para atualizar o campo

**Retorno:** Objeto com cardId e array contendo as respostas de cada atualização de campo

---

### **6. Disqualify Lead**

Desqualifica um lead e move para a coluna de desqualificação.

**Campos obrigatórios:**

- **Card ID** - ID do lead a ser desqualificado
- **Coluna de Desqualificação** (dropdown) - Coluna destino
- **Reason for Lost** (dropdown) - Razão da desqualificação

**Campos opcionais:**

- **Novo Index** (number) - Posição do card na coluna (padrão: 0)
- **Ignorar Validação de Campos Obrigatórios** (boolean) - Padrão: true
- **Description for Lost** - Descrição adicional da desqualificação

**Razões de desqualificação disponíveis:**

- SPAM
- Blocklist
- Sem budget
- Sem necessidade
- Cliente oculto
- Adolescente/Criança
- Cliente
- Contatos inválidos
- Deixou de responder
- Duplicado
- Engano/Não Lembra
- Ex-cliente (detrator)
- Não ICP
- Nunca respondeu
- Pessoa Física
- Sem autoridade
- Sem interesse
- Sem timing
- Serviço fora de escopo

**Retorno:** Resposta da API confirmando a desqualificação

---

### **7. Change Tenant**

Muda o **tenant (inquilino)** de um lead.

**Campos obrigatórios:**

- **Card ID** - ID do lead
- **Tenant** (dropdown) - Tenant destino

**Retorno:** Resposta da API confirmando a mudança de tenant

---

### 🛡️ Autenticação

Todas as requisições incluem headers automáticos de autenticação:

- **x-client-id** - Client ID configurado nas credenciais
- **x-client-secret** - Client Secret configurado nas credenciais
- **Content-Type** - application/json

---

### 🧩 Resumo dos Campos Customizados

O nó suporta **56 campos customizados** distribuídos por tipo:

| **Tipo de Campo** | **Quantidade** | **Descrição**                              |
| ----------------- | -------------- | ------------------------------------------ |
| **Boolean**       | 6 campos       | Campos de verdadeiro/falso                 |
| **Dropdown**      | 14 campos      | Campos de seleção com opções pré-definidas |
| **Date**          | 3 campos       | Campos de data                             |
| **DateTime**      | 1 campo        | Campos de data e hora                      |
| **Number**        | 1 campo        | Campos numéricos decimais                  |
| **Text**          | 31 campos      | Campos de texto curto e longo              |

Cada campo é configurado nas credenciais com seu ID único e tipo, permitindo que o nó renderize automaticamente o input apropriado na interface.

---

## 📁 Estrutura do Nó (organização)

- `nodes/Crm/Crm.node.ts`: classe principal do nó, importa descrições, métodos e executor.
- `nodes/Crm/descriptions/lead/`: descrições separadas por operação (`base`, `create`, `createAndUpdate`, `update`, `updateLeadField`, `updateLeadColumn`, `disqualifyLead`, `changeTenant`).
- `nodes/Crm/descriptions/lead/options.ts`: fonte única de listas e nomes de campos usados em todas as operações (motivos, segmentos, canais, faixas de faturamento, etc.) e também `customFieldsOptions`.
- `nodes/Crm/execute/lead.ts`: lógica de execução das operações.
- `nodes/Crm/methods/loadOptions.ts`: carregamento de owners, columns e tenants a partir das credenciais.

### Valores vindos das credenciais

- **Owners**, **Columns** e **Tenants** são carregados via `methods.loadOptions` a partir das credenciais (`crmApi`).
- **Custom fields**: o mapa `customFieldIds` (JSON nas credenciais) define `id` e `type` de cada campo customizado. As listas de nomes disponíveis para seleção estão em `options.ts` (`customFieldsOptions`, `leadDropdownFieldNames`, etc.). Esses nomes são mapeados para IDs/tipos em tempo de execução antes do envio à API.
- **Endpoints e chaves**: `apiUrl`, `clientId`, `clientSecret`, `createLeadUrl`, `updateLeadUrl`, `updateLeadMainUrl`, `disqualifyLeadUrl`, `changeTenantUrl` são lidos das credenciais e usados em cada operação.

### Como manter consistência nas opções

- Sempre adicionar/alterar opções (ex.: novos segmentos, motivos, canais) em `nodes/Crm/descriptions/lead/options.ts`.
- As operações devem apenas importar as listas de `options.ts`; não duplique opções dentro dos arquivos de operação.
- Para novos campos customizados, inclua o nome em `customFieldsOptions` e, se for dropdown, adicione as opções no array correspondente; o ID/tipo continua vindo de `customFieldIds` nas credenciais.

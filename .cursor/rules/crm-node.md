Contexto rápido do nó CRM
- Classe principal: nodes/Crm/Crm.node.ts (importa descrições, loadOptions e executor).
- Descrições: nodes/Crm/descriptions/lead/ separadas por operação; opções centralizadas em nodes/Crm/descriptions/lead/options.ts.
- Execução: nodes/Crm/execute/lead.ts contém a lógica das operações.
- loadOptions: nodes/Crm/methods/loadOptions.ts carrega owners, columns, tenants das credenciais.
- Credenciais: apiUrl/clientId/clientSecret e endpoints; custom_field_ids JSON com id/type de cada campo customizado.
- Não duplicar listas de opções em arquivos de operação; sempre reutilizar exports de options.ts.


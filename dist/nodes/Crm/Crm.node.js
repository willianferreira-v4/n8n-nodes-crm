"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crm = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class Crm {
    constructor() {
        this.description = {
            displayName: 'CRM',
            name: 'crm',
            icon: 'file:crm.svg',
            group: ['transform'],
            version: 1,
            description: 'Create and update leads in CRM',
            defaults: {
                name: 'CRM',
            },
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [
                {
                    name: 'crmApi',
                    required: true,
                    testedBy: 'Crm',
                },
            ],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Change Tenant',
                            value: 'changeTenant',
                            description: 'Change the tenant of a lead',
                            action: 'Change lead tenant',
                        },
                        {
                            name: 'Create Lead',
                            value: 'createLead',
                            description: 'Create a new lead',
                            action: 'Create a lead',
                        },
                        {
                            name: 'Create Lead and Update Fields',
                            value: 'createAndUpdate',
                            description: 'Create a new lead and update custom fields',
                            action: 'Create lead and update custom fields',
                        },
                        {
                            name: 'Disqualify Lead',
                            value: 'disqualifyLead',
                            description: 'Disqualify a lead and move to disqualification column',
                            action: 'Disqualify a lead',
                        },
                        {
                            name: 'Update Lead',
                            value: 'updateLead',
                            description: 'Update main fields of a lead',
                            action: 'Update a lead',
                        },
                        {
                            name: 'Update Lead Column',
                            value: 'updateLeadColumn',
                            description: 'Move a lead to a different column',
                            action: 'Update lead column',
                        },
                        {
                            name: 'Update Lead Custom Field',
                            value: 'updateLeadField',
                            description: 'Update a custom field on a lead',
                            action: 'Update a lead custom field',
                        },
                    ],
                    default: 'createLead',
                },
                {
                    displayName: 'Owner Name or ID',
                    name: 'ownerId',
                    type: 'options',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    typeOptions: {
                        loadOptionsMethod: 'getOwners',
                    },
                    default: '',
                    description: 'The owner for this lead. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                },
                {
                    displayName: 'Coluna De Entrada Do Lead Name or ID',
                    name: 'columnId',
                    type: 'options',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    typeOptions: {
                        loadOptionsMethod: 'getColumns',
                    },
                    default: '',
                    description: 'The column where the lead will be created. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                },
                {
                    displayName: 'Company Name',
                    name: 'companyName',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    default: '',
                    description: 'The name of the company',
                },
                {
                    displayName: 'Title',
                    name: 'title',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    default: '',
                    description: 'The title of the lead',
                },
                {
                    displayName: 'Email',
                    name: 'email',
                    type: 'string',
                    placeholder: 'name@email.com',
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    default: '',
                    description: 'Email address of the lead',
                },
                {
                    displayName: 'Phone',
                    name: 'phone',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    default: '',
                    description: 'Phone number of the lead',
                },
                {
                    displayName: 'Tax ID',
                    name: 'taxId',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    default: '',
                    description: 'Tax identification number',
                },
                {
                    displayName: 'Company Nationality',
                    name: 'companyNationality',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    options: [
                        { name: 'Brazil', value: 'brazil' },
                        { name: 'EUA', value: 'eua' },
                        { name: 'Others', value: 'others' },
                    ],
                    default: 'brazil',
                    description: 'Nationality of the company',
                },
                {
                    displayName: 'UTM Source',
                    name: 'utmSource',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    default: '',
                    description: 'UTM source parameter',
                },
                {
                    displayName: 'UTM Campaign',
                    name: 'utmCampaign',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    default: '',
                    description: 'UTM campaign parameter',
                },
                {
                    displayName: 'UTM Content',
                    name: 'utmContent',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    default: '',
                    description: 'UTM content parameter',
                },
                {
                    displayName: 'UTM Medium',
                    name: 'utmMedium',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    default: '',
                    description: 'UTM medium parameter',
                },
                {
                    displayName: 'UTM Term',
                    name: 'utmTerm',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    default: '',
                    description: 'UTM term parameter',
                },
                {
                    displayName: 'Source Page',
                    name: 'sourcePage',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createLead'],
                        },
                    },
                    default: '',
                    description: 'The source page where the lead came from',
                },
                {
                    displayName: 'Owner Name or ID',
                    name: 'ownerIdCreateUpdate',
                    type: 'options',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    typeOptions: {
                        loadOptionsMethod: 'getOwners',
                    },
                    default: '',
                    description: 'The owner for this lead. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                },
                {
                    displayName: 'Coluna De Entrada Do Lead Name or ID',
                    name: 'columnIdCreateUpdate',
                    type: 'options',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    typeOptions: {
                        loadOptionsMethod: 'getColumns',
                    },
                    default: '',
                    description: 'The column where the lead will be created. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                },
                {
                    displayName: 'Company Name',
                    name: 'companyNameCreateUpdate',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    default: '',
                    description: 'The name of the company',
                },
                {
                    displayName: 'Title',
                    name: 'titleCreateUpdate',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    default: '',
                    description: 'The title of the lead',
                },
                {
                    displayName: 'Email',
                    name: 'emailCreateUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    default: '',
                    description: 'Email address of the lead',
                },
                {
                    displayName: 'Phone',
                    name: 'phoneCreateUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    default: '',
                    description: 'Phone number of the lead',
                },
                {
                    displayName: 'Tax ID',
                    name: 'taxIdCreateUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    default: '',
                    description: 'Tax identification number',
                },
                {
                    displayName: 'Company Nationality',
                    name: 'companyNationalityCreateUpdate',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    options: [
                        { name: 'Brazil', value: 'brazil' },
                        { name: 'EUA', value: 'eua' },
                        { name: 'Others', value: 'others' },
                    ],
                    default: 'brazil',
                    description: 'Nationality of the company',
                },
                {
                    displayName: 'UTM Source',
                    name: 'utmSourceCreateUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    default: '',
                    description: 'UTM source parameter',
                },
                {
                    displayName: 'UTM Campaign',
                    name: 'utmCampaignCreateUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    default: '',
                    description: 'UTM campaign parameter',
                },
                {
                    displayName: 'UTM Content',
                    name: 'utmContentCreateUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    default: '',
                    description: 'UTM content parameter',
                },
                {
                    displayName: 'UTM Medium',
                    name: 'utmMediumCreateUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    default: '',
                    description: 'UTM medium parameter',
                },
                {
                    displayName: 'UTM Term',
                    name: 'utmTermCreateUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    default: '',
                    description: 'UTM term parameter',
                },
                {
                    displayName: 'Source Page',
                    name: 'sourcePageCreateUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    default: '',
                    description: 'The source page where the lead came from',
                },
                {
                    displayName: 'Custom Fields',
                    name: 'customFieldsCreateUpdate',
                    type: 'fixedCollection',
                    typeOptions: {
                        multipleValues: true,
                    },
                    displayOptions: {
                        show: {
                            operation: ['createAndUpdate'],
                        },
                    },
                    default: {},
                    placeholder: 'Add Custom Field',
                    description: 'Custom fields to update after creating the lead',
                    options: [
                        {
                            name: 'field',
                            displayName: 'Field',
                            values: [
                                {
                                    displayName: 'Field Name',
                                    name: 'fieldName',
                                    type: 'options',
                                    options: [
                                        { name: 'Ad ID', value: 'ad_id' },
                                        { name: 'Adset ID', value: 'adset_id' },
                                        { name: 'Arquivado', value: 'arquivado' },
                                        { name: 'Campaign ID', value: 'campaign_id' },
                                        { name: 'Canal De Aquisição', value: 'canal_de_aquisicao' },
                                        { name: 'Canal De Origem', value: 'canal_de_origem' },
                                        { name: 'Cargo', value: 'cargo' },
                                        { name: 'Client ID', value: 'client_id' },
                                        { name: 'Cohort', value: 'cohort' },
                                        { name: 'CSC', value: 'csc' },
                                        { name: 'CSC Oportunidade', value: 'csc_oportunidade' },
                                        { name: 'Data De Cadastro', value: 'data_de_cadastro' },
                                        { name: 'Data De Fechamento Estimada', value: 'data_de_fechamento_estimada' },
                                        { name: 'Data De Observações Do BANT', value: 'data_de_observacoes_do_bant' },
                                        { name: 'Data/hora Da Reunião', value: 'data_hora_da_reuniao' },
                                        { name: 'Descrição Da Desqualificação', value: 'descricao_da_desqualificacao' },
                                        { name: 'Descrição Feita Pelo Lead', value: 'descricao_feita_pelo_lead' },
                                        { name: 'Detalhes Da Qualificação', value: 'detalhes_da_qualificacao' },
                                        { name: 'É SAO', value: 'e_sao' },
                                        { name: 'Enviar Para O Deal Broker', value: 'enviar_para_o_deal_broker' },
                                        { name: 'External ID', value: 'external_id' },
                                        { name: 'Faturamento Da LP', value: 'faturamento_da_lp' },
                                        { name: 'Faturamento Mensal', value: 'faturamento_mensal' },
                                        { name: 'FB Lead ID', value: 'fb_lead_id' },
                                        { name: 'Fbc', value: 'fbc' },
                                        { name: 'Fbclid', value: 'fbclid' },
                                        { name: 'Fbp', value: 'fbp' },
                                        { name: 'Fonte Da Oportunidade', value: 'fonte_da_oportunidade' },
                                        { name: 'Fonte Do Lead', value: 'fonte_do_lead' },
                                        { name: 'Form Name', value: 'form_name' },
                                        { name: 'Franquia CSC', value: 'franquia_csc' },
                                        { name: 'Franquia CSC Oportunidade', value: 'franquia_csc_oportunidade' },
                                        { name: 'Gclid', value: 'gclid' },
                                        { name: 'ID Da Campanha De Email', value: 'id_da_campanha_de_email' },
                                        { name: 'ID De Resposta Do Formulário', value: 'id_de_resposta_do_formulario' },
                                        { name: 'ID Franquia CSC', value: 'id_franquia_csc' },
                                        { name: 'ID Franquia Oportunidade', value: 'id_franquia_oportunidade' },
                                        { name: 'IP Do Cadastro', value: 'ip_do_cadastro' },
                                        { name: 'Justificativa', value: 'justificativa' },
                                        { name: 'Modelo De Negócios', value: 'modelo_de_negocios' },
                                        { name: 'Nome Da Campanha De Email', value: 'nome_da_campanha_de_email' },
                                        { name: 'Observações', value: 'observacoes' },
                                        { name: 'Page Name', value: 'page_name' },
                                        { name: 'Primeiro Destino', value: 'primeiro_destino' },
                                        { name: 'Produtos Marketing', value: 'produtos_marketing' },
                                        { name: 'Qualidade Da Reunião', value: 'qualidade_da_reuniao' },
                                        { name: 'Razão Da Desqualificação', value: 'razao_da_desqualificacao' },
                                        { name: 'Segmento', value: 'segmento' },
                                        { name: 'Sem Roteamento', value: 'sem_roteamento' },
                                        { name: 'Session ID', value: 'session_id' },
                                        { name: 'Session Number', value: 'session_number' },
                                        { name: 'Status Da Reunião', value: 'status_da_reuniao' },
                                        { name: 'Status Leadbroker', value: 'status_leadbroker' },
                                        { name: 'Subnicho V4 Food', value: 'subnicho_v4_food' },
                                        { name: 'Temperatura', value: 'temperatura' },
                                        { name: 'Urgência', value: 'urgencia' },
                                        { name: 'Valor Leadbroker', value: 'valor_leadbroker' },
                                    ],
                                    default: 'arquivado',
                                    description: 'The custom field to update',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'booleanValue',
                                    type: 'boolean',
                                    displayOptions: {
                                        show: {
                                            fieldName: [
                                                'arquivado',
                                                'e_sao',
                                                'sem_roteamento',
                                                'enviar_para_o_deal_broker',
                                                'csc',
                                                'csc_oportunidade',
                                            ],
                                        },
                                    },
                                    default: false,
                                    description: 'Whether the field is true or false',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['razao_da_desqualificacao'],
                                        },
                                    },
                                    options: [
                                        { name: 'Adolescente/Criança', value: 'Adolescente/Criança' },
                                        { name: 'Blocklist', value: 'Blocklist' },
                                        { name: 'Cliente', value: 'Cliente' },
                                        { name: 'Cliente Oculto', value: 'Cliente oculto' },
                                        { name: 'Contatos Inválidos', value: 'Contatos inválidos' },
                                        { name: 'Deixou De Responder', value: 'Deixou de responder' },
                                        { name: 'Duplicado', value: 'Duplicado' },
                                        { name: 'Engano/Não Lembra', value: 'Engano/Não Lembra' },
                                        { name: 'Ex-Cliente (Detrator)', value: 'Ex-cliente (detrator)' },
                                        { name: 'Não ICP', value: 'Não ICP' },
                                        { name: 'Nunca Respondeu', value: 'Nunca respondeu' },
                                        { name: 'Pessoa Física', value: 'Pessoa Física' },
                                        { name: 'Sem Autoridade', value: 'Sem autoridade' },
                                        { name: 'Sem Budget', value: 'Sem budget' },
                                        { name: 'Sem Interesse', value: 'Sem interesse' },
                                        { name: 'Sem Necessidade', value: 'Sem necessidade' },
                                        { name: 'Sem Timing', value: 'Sem timing' },
                                        { name: 'Serviço Fora De Escopo', value: 'Serviço fora de escopo' },
                                        { name: 'SPAM', value: 'SPAM' },
                                    ],
                                    default: 'Adolescente/Criança',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['cohort'],
                                        },
                                    },
                                    options: [
                                        { name: 'CPG', value: 'CPG' },
                                        { name: 'Education', value: 'Education' },
                                        { name: 'Financial Services', value: 'Financial Services' },
                                        { name: 'Food Service', value: 'Food Service' },
                                        { name: 'Franchisee', value: 'Franchisee' },
                                        { name: 'Outros', value: 'Outros' },
                                        { name: 'Real State', value: 'Real State' },
                                        { name: 'Retail', value: 'Retail' },
                                        { name: 'Service B2B Multilocation', value: 'Service B2B Multilocation' },
                                        { name: 'Service B2C Multilocation', value: 'Service B2C Multilocation' },
                                        { name: 'Solar Energy / Electric Power', value: 'Solar Energy / Electric Power' },
                                        { name: 'TELCO', value: 'TELCO' },
                                    ],
                                    default: 'CPG',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['temperatura'],
                                        },
                                    },
                                    options: [
                                        { name: 'Quente', value: 'Quente' },
                                        { name: 'Morno', value: 'Morno' },
                                        { name: 'Frio', value: 'Frio' },
                                    ],
                                    default: 'Quente',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['status_da_reuniao'],
                                        },
                                    },
                                    options: [
                                        { name: 'Falta Marcar', value: 'Falta marcar' },
                                        { name: 'Falta Acontecer', value: 'Falta acontecer' },
                                        { name: 'Aconteceu', value: 'Aconteceu' },
                                        { name: 'No Show', value: 'No show' },
                                    ],
                                    default: 'Falta marcar',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['primeiro_destino'],
                                        },
                                    },
                                    options: [
                                        { name: 'Blackbox', value: 'Blackbox' },
                                        { name: 'LB', value: 'LB' },
                                        { name: 'CRM', value: 'CRM' },
                                    ],
                                    default: 'Blackbox',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['faturamento_mensal'],
                                        },
                                    },
                                    options: [
                                        { name: 'Até 50 Mil', value: 'Até 50 mil' },
                                        { name: 'De 1 À 4 Milhões', value: 'De 1 à 4 milhões' },
                                        { name: 'De 101 Mil À 200 Mil', value: 'De 101 mil à 200 mil' },
                                        { name: 'De 101 Mil À 400 Mil', value: 'De 101 mil à 400 mil' },
                                        { name: 'De 16 À 40 Milhões', value: 'De 16 à 40 milhões' },
                                        { name: 'De 201 Mil À 400 Mil', value: 'De 201 mil à 400 mil' },
                                        { name: 'De 4 À 16 Milhões', value: 'De 4 à 16 milhões' },
                                        { name: 'De 401 Mil À 1 Milhão', value: 'De 401 mil à 1 milhão' },
                                        { name: 'De 51 Mil À 70 Mil', value: 'De 51 mil à 70 mil' },
                                        { name: 'De 71 Mil À 100 Mil', value: 'De 71 mil à 100 mil' },
                                        { name: 'From $101K to $200K', value: 'From $101K to $200K' },
                                        { name: 'From $11K to $20K', value: 'From $11K to $20K' },
                                        { name: 'From $16M to $40M', value: 'From $16M to $40M' },
                                        { name: 'From $1M to $4M', value: 'From $1M to $4M' },
                                        { name: 'From $201K to $400K', value: 'From $201K to $400K' },
                                        { name: 'From $21K to $30K', value: 'From $21K to $30K' },
                                        { name: 'From $31K to $40K', value: 'From $31K to $40K' },
                                        { name: 'From $401K to $1M', value: 'From $401K to $1M' },
                                        { name: 'From $41K to $50K', value: 'From $41K to $50K' },
                                        { name: 'From $4M to $16M', value: 'From $4M to $16M' },
                                        { name: 'From $51K to $70K', value: 'From $51K to $70K' },
                                        { name: 'From $71K to $100K', value: 'From $71K to $100K' },
                                        { name: 'Mais De 40 Milhões', value: 'Mais de 40 milhões' },
                                        { name: 'More than $1M', value: 'More than $1M' },
                                        { name: 'More than $40M', value: 'More than $40M' },
                                        { name: 'Until $10K', value: 'Until $10K' },
                                    ],
                                    default: 'Até 50 mil',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['subnicho_v4_food'],
                                        },
                                    },
                                    options: [
                                        { name: 'Açaí E Sorvetes', value: 'Açaí e Sorvetes' },
                                        { name: 'Comida Saudável', value: 'Comida Saudável' },
                                        { name: 'Cozinha Internacional', value: 'Cozinha Internacional' },
                                        { name: 'Culinária Japonesa', value: 'Culinária Japonesa' },
                                        { name: 'Doces E Sobremesas', value: 'Doces e Sobremesas' },
                                        { name: 'Lanchonete E Hamburgueria', value: 'Lanchonete e Hamburgueria' },
                                        {
                                            name: 'Marmitaria E Comida Brasileira',
                                            value: 'Marmitaria e Comida Brasileira',
                                        },
                                        { name: 'Pizzaria E Esfiharia', value: 'Pizzaria e Esfiharia' },
                                    ],
                                    default: 'Lanchonete e Hamburgueria',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['status_leadbroker'],
                                        },
                                    },
                                    options: [
                                        { name: 'Black Box', value: 'Black Box' },
                                        { name: 'Lead Comprado', value: 'Lead Comprado' },
                                        { name: 'Lead Não Comprado', value: 'Lead Não Comprado' },
                                        { name: 'Leilão', value: 'Leilão' },
                                        { name: 'Não Leiloado', value: 'Não Leiloado' },
                                        { name: 'Staage', value: 'Staage' },
                                    ],
                                    default: 'Leilão',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['segmento'],
                                        },
                                    },
                                    options: [
                                        { name: 'E-Commerce', value: 'E-commerce' },
                                        { name: 'Educação', value: 'Educação' },
                                        { name: 'Energia Solar', value: 'Energia Solar' },
                                        { name: 'Finanças', value: 'Finanças' },
                                        { name: 'Food Service', value: 'Food Service' },
                                        { name: 'Franquia / Franchising', value: 'Franquia / Franchising' },
                                        { name: 'Imobiliária', value: 'Imobiliária' },
                                        { name: 'Indústria', value: 'Indústria' },
                                        { name: 'Outro', value: 'Outro' },
                                        { name: 'SAAS', value: 'SAAS' },
                                        { name: 'Serviço', value: 'Serviço' },
                                        { name: 'Telecom', value: 'Telecom' },
                                        { name: 'Turismo', value: 'Turismo' },
                                        { name: 'Varejo', value: 'Varejo' },
                                    ],
                                    default: 'Serviço',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['produtos_marketing'],
                                        },
                                    },
                                    options: [
                                        { name: 'A Alavanca', value: 'A Alavanca' },
                                        { name: 'Alavancagem Comercial', value: 'Alavancagem Comercial' },
                                        { name: 'Assessoria', value: 'Assessoria' },
                                        {
                                            name: 'Assessoria Recuperado Hyperflow',
                                            value: 'Assessoria Recuperado Hyperflow',
                                        },
                                        { name: 'Auditoria Growth', value: 'Auditoria Growth' },
                                        { name: 'Bday 2025', value: 'Bday 2025' },
                                        { name: 'Blackbox', value: 'Blackbox' },
                                        { name: 'Estruturação Estratégica', value: 'Estruturação Estratégica' },
                                        {
                                            name: 'Gabarito De Recordes De Vendas',
                                            value: 'Gabarito de Recordes de Vendas',
                                        },
                                        { name: 'Masterclass GdM', value: 'Masterclass GdM' },
                                        { name: 'Material Rico', value: 'Material Rico' },
                                        { name: 'Mentoria GT', value: 'Mentoria GT' },
                                        { name: 'Mesa4X', value: 'Mesa4X' },
                                        { name: 'MVP USA', value: 'MVP USA' },
                                        { name: 'O Único Plano', value: 'O Único Plano' },
                                        { name: 'ROI System', value: 'ROI System' },
                                        { name: 'RPE', value: 'RPE' },
                                        { name: 'Soluções Comerciais', value: 'Soluções Comerciais' },
                                        { name: 'Treinamento Comercial', value: 'Treinamento Comercial' },
                                        { name: 'V4 Food', value: 'V4 Food' },
                                        { name: 'V4 Marketing', value: 'V4 Marketing' },
                                        { name: 'Vender Gera Equity', value: 'Vender Gera Equity' },
                                    ],
                                    default: 'Soluções Comerciais',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['canal_de_aquisicao'],
                                        },
                                    },
                                    options: [
                                        { name: 'ABM', value: 'ABM' },
                                        { name: 'Blackbox', value: 'Blackbox' },
                                        { name: 'Eventos', value: 'Eventos' },
                                        { name: 'Food Box', value: 'Food Box' },
                                        { name: 'Indicação', value: 'Indicação' },
                                        { name: 'Inside Box', value: 'Inside Box' },
                                        { name: 'Leadbroker', value: 'Leadbroker' },
                                        { name: 'LP Franquia', value: 'LP Franquia' },
                                        { name: 'LP Matriz', value: 'LP Matriz' },
                                        { name: 'Meetingbroker', value: 'Meetingbroker' },
                                        { name: 'Networking', value: 'Networking' },
                                        { name: 'Pandora Box', value: 'Pandora Box' },
                                        { name: 'Prospecção Fria', value: 'Prospecção Fria' },
                                        { name: 'Reativação', value: 'Reativação' },
                                        { name: 'Recomendação', value: 'Recomendação' },
                                        { name: 'Reposição Inside Box', value: 'Reposição Inside Box' },
                                    ],
                                    default: 'Leadbroker',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['faturamento_da_lp'],
                                        },
                                    },
                                    options: [
                                        { name: 'Até 50 Mil', value: 'Até 50 mil' },
                                        { name: 'De 1 À 4 Milhões', value: 'De 1 à 4 milhões' },
                                        { name: 'De 101 Mil À 200 Mil', value: 'De 101 mil à 200 mil' },
                                        { name: 'De 101 Mil À 400 Mil', value: 'De 101 mil à 400 mil' },
                                        { name: 'De 16 a 40 Milhões', value: 'De 16 a 40 milhões' },
                                        { name: 'De 201 Mil À 400 Mil', value: 'De 201 mil à 400 mil' },
                                        { name: 'De 4 À 16 Milhões', value: 'De 4 à 16 milhões' },
                                        { name: 'De 401 Mil À 1 Milhão', value: 'De 401 mil à 1 milhão' },
                                        { name: 'De 51 Mil À 70 Mil', value: 'De 51 mil à 70 mil' },
                                        { name: 'De 71 Mil À 100 Mil', value: 'De 71 mil à 100 mil' },
                                        { name: 'From $101K to $200K', value: 'From $101K to $200K' },
                                        { name: 'From $11K to $20K', value: 'From $11K to $20K' },
                                        { name: 'From $16M to $40M', value: 'From $16M to $40M' },
                                        { name: 'From $1M to $4M', value: 'From $1M to $4M' },
                                        { name: 'From $201K to $400K', value: 'From $201K to $400K' },
                                        { name: 'From $21K to $30K', value: 'From $21K to $30K' },
                                        { name: 'From $31K to $40K', value: 'From $31K to $40K' },
                                        { name: 'From $401K to $1M', value: 'From $401K to $1M' },
                                        { name: 'From $41K to $50K', value: 'From $41K to $50K' },
                                        { name: 'From $4M to $16M', value: 'From $4M to $16M' },
                                        { name: 'From $51K to $70K', value: 'From $51K to $70K' },
                                        { name: 'From $71K to $100K', value: 'From $71K to $100K' },
                                        { name: 'Mais De 40 Milhões', value: 'Mais de 40 milhões' },
                                        { name: 'More than $1M', value: 'More than $1M' },
                                        { name: 'More than $40M', value: 'More than $40M' },
                                        { name: 'Until $10K', value: 'Until $10K' },
                                    ],
                                    default: 'Até 50 mil',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['fonte_do_lead'],
                                        },
                                    },
                                    options: [
                                        { name: 'Inside', value: 'Inside' },
                                        { name: 'Outside', value: 'Outside' },
                                    ],
                                    default: 'Inside',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['fonte_da_oportunidade'],
                                        },
                                    },
                                    options: [
                                        { name: 'Inside', value: 'Inside' },
                                        { name: 'Outside', value: 'Outside' },
                                    ],
                                    default: 'Inside',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['canal_de_origem'],
                                        },
                                    },
                                    options: [
                                        { name: 'Acelerador Empresarial', value: 'Acelerador Empresarial' },
                                        { name: 'Acelerador Experience', value: 'Acelerador Experience' },
                                        { name: 'B Coorporate', value: 'B coorporate' },
                                        { name: 'Bing', value: 'Bing' },
                                        { name: 'Campanha De Recuperação', value: 'Campanha de Recuperação' },
                                        { name: 'Embaixadores/Networking', value: 'Embaixadores/Networking' },
                                        { name: 'Equity+', value: 'Equity+' },
                                        { name: 'Escola Franchising', value: 'Escola Franchising' },
                                        {
                                            name: 'Eventos Em Parceria (Não Homologados Na Matriz)',
                                            value: 'Eventos em Parceria (não homologados na Matriz)',
                                        },
                                        {
                                            name: 'Eventos Independentes (Regionais/Locais)',
                                            value: 'Eventos Independentes (Regionais/Locais)',
                                        },
                                        { name: 'Facebook', value: 'Facebook' },
                                        { name: 'G4 Alumni', value: 'G4 Alumni' },
                                        { name: 'G4 Gestão E Estratégia', value: 'G4 Gestão e Estratégia' },
                                        { name: 'G4 Marketing E Growth', value: 'G4 Marketing e Growth' },
                                        { name: 'G4 Sales', value: 'G4 Sales' },
                                        { name: 'G4 Scale', value: 'G4 Scale' },
                                        { name: 'G4 Traction', value: 'G4 Traction' },
                                        { name: 'Gestão 4.0', value: 'Gestão 4.0' },
                                        { name: 'Google', value: 'Google' },
                                        { name: 'Goshen Land', value: 'Goshen Land' },
                                        { name: 'Independente', value: 'Independente' },
                                        { name: 'Indicação De Franqueado', value: 'Indicação de Franqueado' },
                                        { name: 'Indicação de Investidor', value: 'Indicação de Investidor' },
                                        { name: 'Indicação De Parceiro', value: 'Indicação de Parceiro' },
                                        { name: 'Institucional', value: 'Institucional' },
                                        { name: 'Jotaja', value: 'Jotaja' },
                                        { name: 'LinkedIn', value: 'LinkedIn' },
                                        { name: 'Lista De Leads Frios', value: 'Lista de Leads Frios' },
                                        { name: 'Luminare', value: 'Luminare' },
                                        { name: 'Multiplix', value: 'Multiplix' },
                                        { name: 'Open Mind', value: 'Open Mind' },
                                        { name: 'Orgânico', value: 'Orgânico' },
                                        { name: 'Pinterest', value: 'Pinterest' },
                                        { name: 'Programática', value: 'Programática' },
                                        { name: 'Reativação', value: 'Reativação' },
                                        { name: 'Recomendação BDR/SDR', value: 'Recomendação BDR/SDR' },
                                        { name: 'Recomendação Closer', value: 'Recomendação Closer' },
                                        { name: 'Reddit', value: 'Reddit' },
                                        { name: 'RGV', value: 'RGV' },
                                        { name: 'Scale', value: 'Scale' },
                                        { name: 'Scale Company', value: 'Scale Company' },
                                        { name: 'Scale Up', value: 'Scale Up' },
                                        { name: 'Seja Ap', value: 'Seja Ap' },
                                        { name: 'SME', value: 'SME' },
                                        { name: 'Taboola', value: 'Taboola' },
                                        { name: 'TikTok', value: 'TikTok' },
                                        { name: 'Twitter', value: 'Twitter' },
                                        { name: 'Vende C', value: 'Vende C' },
                                    ],
                                    default: 'Facebook',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['modelo_de_negocios'],
                                        },
                                    },
                                    options: [
                                        { name: 'Aplicativo (PLG)', value: 'Aplicativo (PLG)' },
                                        { name: 'E-Commerce', value: 'E-commerce' },
                                        { name: 'Food Service', value: 'Food Service' },
                                        { name: 'Infoproduto/Educação Perpétuo', value: 'Infoproduto/Educação Perpétuo' },
                                        { name: 'Inside Sales', value: 'Inside Sales' },
                                        { name: 'Lançamento', value: 'Lançamento' },
                                        { name: 'PDV - Varejo/Retail', value: 'PDV - Varejo/Retail' },
                                    ],
                                    default: 'Inside Sales',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dateValue',
                                    type: 'dateTime',
                                    displayOptions: {
                                        show: {
                                            fieldName: [
                                                'data_de_fechamento_estimada',
                                                'data_de_observacoes_do_bant',
                                                'data_de_cadastro',
                                            ],
                                        },
                                    },
                                    default: '',
                                    description: 'The date value for the field',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dateTimeValue',
                                    type: 'dateTime',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['data_hora_da_reuniao'],
                                        },
                                    },
                                    default: '',
                                    description: 'The date/time value for the field',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'numberValue',
                                    type: 'number',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['valor_leadbroker'],
                                        },
                                    },
                                    default: 0,
                                    description: 'The numeric value for the field',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'textValue',
                                    type: 'string',
                                    displayOptions: {
                                        show: {
                                            fieldName: [
                                                'descricao_da_desqualificacao',
                                                'detalhes_da_qualificacao',
                                                'qualidade_da_reuniao',
                                                'justificativa',
                                                'descricao_feita_pelo_lead',
                                                'form_name',
                                                'page_name',
                                                'campaign_id',
                                                'adset_id',
                                                'ad_id',
                                                'fbclid',
                                                'gclid',
                                                'external_id',
                                                'session_id',
                                                'client_id',
                                                'fbp',
                                                'fbc',
                                                'session_number',
                                                'fb_lead_id',
                                                'id_de_resposta_do_formulario',
                                                'nome_da_campanha_de_email',
                                                'id_da_campanha_de_email',
                                                'ip_do_cadastro',
                                                'cargo',
                                                'urgencia',
                                                'franquia_csc',
                                                'franquia_csc_oportunidade',
                                                'id_franquia_csc',
                                                'observacoes',
                                                'id_franquia_oportunidade',
                                            ],
                                        },
                                    },
                                    default: '',
                                    description: 'The text value for the field',
                                },
                            ],
                        },
                    ],
                },
                {
                    displayName: 'Card ID',
                    name: 'cardId',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['updateLeadField'],
                        },
                    },
                    default: '',
                    description: 'The ID of the card (lead) to update',
                },
                {
                    displayName: 'Fields to Update',
                    name: 'fieldsToUpdate',
                    type: 'fixedCollection',
                    typeOptions: {
                        multipleValues: true,
                    },
                    displayOptions: {
                        show: {
                            operation: ['updateLeadField'],
                        },
                    },
                    default: {},
                    placeholder: 'Add Field',
                    options: [
                        {
                            name: 'field',
                            displayName: 'Field',
                            values: [
                                {
                                    displayName: 'Field Name',
                                    name: 'fieldName',
                                    type: 'options',
                                    options: [
                                        { name: 'Ad ID', value: 'ad_id' },
                                        { name: 'Adset ID', value: 'adset_id' },
                                        { name: 'Arquivado', value: 'arquivado' },
                                        { name: 'Campaign ID', value: 'campaign_id' },
                                        { name: 'Canal De Aquisição', value: 'canal_de_aquisicao' },
                                        { name: 'Canal De Origem', value: 'canal_de_origem' },
                                        { name: 'Cargo', value: 'cargo' },
                                        { name: 'Client ID', value: 'client_id' },
                                        { name: 'Cohort', value: 'cohort' },
                                        { name: 'CSC', value: 'csc' },
                                        { name: 'CSC Oportunidade', value: 'csc_oportunidade' },
                                        { name: 'Data De Cadastro', value: 'data_de_cadastro' },
                                        { name: 'Data De Fechamento Estimada', value: 'data_de_fechamento_estimada' },
                                        { name: 'Data De Observações Do BANT', value: 'data_de_observacoes_do_bant' },
                                        { name: 'Data/hora Da Reunião', value: 'data_hora_da_reuniao' },
                                        { name: 'Descrição Da Desqualificação', value: 'descricao_da_desqualificacao' },
                                        { name: 'Descrição Feita Pelo Lead', value: 'descricao_feita_pelo_lead' },
                                        { name: 'Detalhes Da Qualificação', value: 'detalhes_da_qualificacao' },
                                        { name: 'É SAO', value: 'e_sao' },
                                        { name: 'Enviar Para O Deal Broker', value: 'enviar_para_o_deal_broker' },
                                        { name: 'External ID', value: 'external_id' },
                                        { name: 'Faturamento Da LP', value: 'faturamento_da_lp' },
                                        { name: 'Faturamento Mensal', value: 'faturamento_mensal' },
                                        { name: 'FB Lead ID', value: 'fb_lead_id' },
                                        { name: 'Fbc', value: 'fbc' },
                                        { name: 'Fbclid', value: 'fbclid' },
                                        { name: 'Fbp', value: 'fbp' },
                                        { name: 'Fonte Da Oportunidade', value: 'fonte_da_oportunidade' },
                                        { name: 'Fonte Do Lead', value: 'fonte_do_lead' },
                                        { name: 'Form Name', value: 'form_name' },
                                        { name: 'Franquia CSC', value: 'franquia_csc' },
                                        { name: 'Franquia CSC Oportunidade', value: 'franquia_csc_oportunidade' },
                                        { name: 'Gclid', value: 'gclid' },
                                        { name: 'ID Da Campanha De Email', value: 'id_da_campanha_de_email' },
                                        { name: 'ID De Resposta Do Formulário', value: 'id_de_resposta_do_formulario' },
                                        { name: 'ID Franquia CSC', value: 'id_franquia_csc' },
                                        { name: 'ID Franquia Oportunidade', value: 'id_franquia_oportunidade' },
                                        { name: 'IP Do Cadastro', value: 'ip_do_cadastro' },
                                        { name: 'Justificativa', value: 'justificativa' },
                                        { name: 'Modelo De Negócios', value: 'modelo_de_negocios' },
                                        { name: 'Nome Da Campanha De Email', value: 'nome_da_campanha_de_email' },
                                        { name: 'Observações', value: 'observacoes' },
                                        { name: 'Page Name', value: 'page_name' },
                                        { name: 'Primeiro Destino', value: 'primeiro_destino' },
                                        { name: 'Produtos Marketing', value: 'produtos_marketing' },
                                        { name: 'Qualidade Da Reunião', value: 'qualidade_da_reuniao' },
                                        { name: 'Razão Da Desqualificação', value: 'razao_da_desqualificacao' },
                                        { name: 'Segmento', value: 'segmento' },
                                        { name: 'Sem Roteamento', value: 'sem_roteamento' },
                                        { name: 'Session ID', value: 'session_id' },
                                        { name: 'Session Number', value: 'session_number' },
                                        { name: 'Status Da Reunião', value: 'status_da_reuniao' },
                                        { name: 'Status Leadbroker', value: 'status_leadbroker' },
                                        { name: 'Subnicho V4 Food', value: 'subnicho_v4_food' },
                                        { name: 'Temperatura', value: 'temperatura' },
                                        { name: 'Urgência', value: 'urgencia' },
                                        { name: 'Valor Leadbroker', value: 'valor_leadbroker' },
                                    ],
                                    default: 'arquivado',
                                    description: 'The custom field to update',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'booleanValue',
                                    type: 'boolean',
                                    displayOptions: {
                                        show: {
                                            fieldName: [
                                                'arquivado',
                                                'e_sao',
                                                'sem_roteamento',
                                                'enviar_para_o_deal_broker',
                                                'csc',
                                                'csc_oportunidade',
                                            ],
                                        },
                                    },
                                    default: false,
                                    description: 'Whether the field is true or false',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['razao_da_desqualificacao'],
                                        },
                                    },
                                    options: [
                                        { name: 'Adolescente/Criança', value: 'Adolescente/Criança' },
                                        { name: 'Blocklist', value: 'Blocklist' },
                                        { name: 'Cliente', value: 'Cliente' },
                                        { name: 'Cliente Oculto', value: 'Cliente oculto' },
                                        { name: 'Contatos Inválidos', value: 'Contatos inválidos' },
                                        { name: 'Deixou De Responder', value: 'Deixou de responder' },
                                        { name: 'Duplicado', value: 'Duplicado' },
                                        { name: 'Engano/Não Lembra', value: 'Engano/Não Lembra' },
                                        { name: 'Ex-Cliente (Detrator)', value: 'Ex-cliente (detrator)' },
                                        { name: 'Não ICP', value: 'Não ICP' },
                                        { name: 'Nunca Respondeu', value: 'Nunca respondeu' },
                                        { name: 'Pessoa Física', value: 'Pessoa Física' },
                                        { name: 'Sem Autoridade', value: 'Sem autoridade' },
                                        { name: 'Sem Budget', value: 'Sem budget' },
                                        { name: 'Sem Interesse', value: 'Sem interesse' },
                                        { name: 'Sem Necessidade', value: 'Sem necessidade' },
                                        { name: 'Sem Timing', value: 'Sem timing' },
                                        { name: 'Serviço Fora De Escopo', value: 'Serviço fora de escopo' },
                                        { name: 'SPAM', value: 'SPAM' },
                                    ],
                                    default: 'Adolescente/Criança',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['cohort'],
                                        },
                                    },
                                    options: [
                                        { name: 'CPG', value: 'CPG' },
                                        { name: 'Education', value: 'Education' },
                                        { name: 'Financial Services', value: 'Financial Services' },
                                        { name: 'Food Service', value: 'Food Service' },
                                        { name: 'Franchisee', value: 'Franchisee' },
                                        { name: 'Outros', value: 'Outros' },
                                        { name: 'Real State', value: 'Real State' },
                                        { name: 'Retail', value: 'Retail' },
                                        { name: 'Service B2B Multilocation', value: 'Service B2B Multilocation' },
                                        { name: 'Service B2C Multilocation', value: 'Service B2C Multilocation' },
                                        { name: 'Solar Energy / Electric Power', value: 'Solar Energy / Electric Power' },
                                        { name: 'TELCO', value: 'TELCO' },
                                    ],
                                    default: 'CPG',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['temperatura'],
                                        },
                                    },
                                    options: [
                                        { name: 'Quente', value: 'Quente' },
                                        { name: 'Morno', value: 'Morno' },
                                        { name: 'Frio', value: 'Frio' },
                                    ],
                                    default: 'Quente',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['status_da_reuniao'],
                                        },
                                    },
                                    options: [
                                        { name: 'Falta Marcar', value: 'Falta marcar' },
                                        { name: 'Falta Acontecer', value: 'Falta acontecer' },
                                        { name: 'Aconteceu', value: 'Aconteceu' },
                                        { name: 'No Show', value: 'No show' },
                                    ],
                                    default: 'Falta marcar',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['primeiro_destino'],
                                        },
                                    },
                                    options: [
                                        { name: 'Blackbox', value: 'Blackbox' },
                                        { name: 'LB', value: 'LB' },
                                        { name: 'CRM', value: 'CRM' },
                                    ],
                                    default: 'Blackbox',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['faturamento_mensal'],
                                        },
                                    },
                                    options: [
                                        { name: 'Até 50 Mil', value: 'Até 50 mil' },
                                        { name: 'De 1 À 4 Milhões', value: 'De 1 à 4 milhões' },
                                        { name: 'De 101 Mil À 200 Mil', value: 'De 101 mil à 200 mil' },
                                        { name: 'De 101 Mil À 400 Mil', value: 'De 101 mil à 400 mil' },
                                        { name: 'De 16 À 40 Milhões', value: 'De 16 à 40 milhões' },
                                        { name: 'De 201 Mil À 400 Mil', value: 'De 201 mil à 400 mil' },
                                        { name: 'De 4 À 16 Milhões', value: 'De 4 à 16 milhões' },
                                        { name: 'De 401 Mil À 1 Milhão', value: 'De 401 mil à 1 milhão' },
                                        { name: 'De 51 Mil À 70 Mil', value: 'De 51 mil à 70 mil' },
                                        { name: 'De 71 Mil À 100 Mil', value: 'De 71 mil à 100 mil' },
                                        { name: 'From $101K to $200K', value: 'From $101K to $200K' },
                                        { name: 'From $11K to $20K', value: 'From $11K to $20K' },
                                        { name: 'From $16M to $40M', value: 'From $16M to $40M' },
                                        { name: 'From $1M to $4M', value: 'From $1M to $4M' },
                                        { name: 'From $201K to $400K', value: 'From $201K to $400K' },
                                        { name: 'From $21K to $30K', value: 'From $21K to $30K' },
                                        { name: 'From $31K to $40K', value: 'From $31K to $40K' },
                                        { name: 'From $401K to $1M', value: 'From $401K to $1M' },
                                        { name: 'From $41K to $50K', value: 'From $41K to $50K' },
                                        { name: 'From $4M to $16M', value: 'From $4M to $16M' },
                                        { name: 'From $51K to $70K', value: 'From $51K to $70K' },
                                        { name: 'From $71K to $100K', value: 'From $71K to $100K' },
                                        { name: 'Mais De 40 Milhões', value: 'Mais de 40 milhões' },
                                        { name: 'More than $1M', value: 'More than $1M' },
                                        { name: 'More than $40M', value: 'More than $40M' },
                                        { name: 'Until $10K', value: 'Until $10K' },
                                    ],
                                    default: 'Até 50 mil',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['subnicho_v4_food'],
                                        },
                                    },
                                    options: [
                                        { name: 'Açaí E Sorvetes', value: 'Açaí e Sorvetes' },
                                        { name: 'Comida Saudável', value: 'Comida Saudável' },
                                        { name: 'Cozinha Internacional', value: 'Cozinha Internacional' },
                                        { name: 'Culinária Japonesa', value: 'Culinária Japonesa' },
                                        { name: 'Doces E Sobremesas', value: 'Doces e Sobremesas' },
                                        { name: 'Lanchonete E Hamburgueria', value: 'Lanchonete e Hamburgueria' },
                                        {
                                            name: 'Marmitaria E Comida Brasileira',
                                            value: 'Marmitaria e Comida Brasileira',
                                        },
                                        { name: 'Pizzaria E Esfiharia', value: 'Pizzaria e Esfiharia' },
                                    ],
                                    default: 'Lanchonete e Hamburgueria',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['status_leadbroker'],
                                        },
                                    },
                                    options: [
                                        { name: 'Black Box', value: 'Black Box' },
                                        { name: 'Lead Comprado', value: 'Lead Comprado' },
                                        { name: 'Lead Não Comprado', value: 'Lead Não Comprado' },
                                        { name: 'Leilão', value: 'Leilão' },
                                        { name: 'Não Leiloado', value: 'Não Leiloado' },
                                        { name: 'Staage', value: 'Staage' },
                                    ],
                                    default: 'Leilão',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['segmento'],
                                        },
                                    },
                                    options: [
                                        { name: 'E-Commerce', value: 'E-commerce' },
                                        { name: 'Educação', value: 'Educação' },
                                        { name: 'Energia Solar', value: 'Energia Solar' },
                                        { name: 'Finanças', value: 'Finanças' },
                                        { name: 'Food Service', value: 'Food Service' },
                                        { name: 'Franquia / Franchising', value: 'Franquia / Franchising' },
                                        { name: 'Imobiliária', value: 'Imobiliária' },
                                        { name: 'Indústria', value: 'Indústria' },
                                        { name: 'Outro', value: 'Outro' },
                                        { name: 'SAAS', value: 'SAAS' },
                                        { name: 'Serviço', value: 'Serviço' },
                                        { name: 'Telecom', value: 'Telecom' },
                                        { name: 'Turismo', value: 'Turismo' },
                                        { name: 'Varejo', value: 'Varejo' },
                                    ],
                                    default: 'Serviço',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['produtos_marketing'],
                                        },
                                    },
                                    options: [
                                        { name: 'A Alavanca', value: 'A Alavanca' },
                                        { name: 'Alavancagem Comercial', value: 'Alavancagem Comercial' },
                                        { name: 'Assessoria', value: 'Assessoria' },
                                        {
                                            name: 'Assessoria Recuperado Hyperflow',
                                            value: 'Assessoria Recuperado Hyperflow',
                                        },
                                        { name: 'Auditoria Growth', value: 'Auditoria Growth' },
                                        { name: 'Bday 2025', value: 'Bday 2025' },
                                        { name: 'Blackbox', value: 'Blackbox' },
                                        { name: 'Estruturação Estratégica', value: 'Estruturação Estratégica' },
                                        {
                                            name: 'Gabarito De Recordes De Vendas',
                                            value: 'Gabarito de Recordes de Vendas',
                                        },
                                        { name: 'Masterclass GdM', value: 'Masterclass GdM' },
                                        { name: 'Material Rico', value: 'Material Rico' },
                                        { name: 'Mentoria GT', value: 'Mentoria GT' },
                                        { name: 'Mesa4X', value: 'Mesa4X' },
                                        { name: 'MVP USA', value: 'MVP USA' },
                                        { name: 'O Único Plano', value: 'O Único Plano' },
                                        { name: 'ROI System', value: 'ROI System' },
                                        { name: 'RPE', value: 'RPE' },
                                        { name: 'Soluções Comerciais', value: 'Soluções Comerciais' },
                                        { name: 'Treinamento Comercial', value: 'Treinamento Comercial' },
                                        { name: 'V4 Food', value: 'V4 Food' },
                                        { name: 'V4 Marketing', value: 'V4 Marketing' },
                                        { name: 'Vender Gera Equity', value: 'Vender Gera Equity' },
                                    ],
                                    default: 'Soluções Comerciais',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['canal_de_aquisicao'],
                                        },
                                    },
                                    options: [
                                        { name: 'ABM', value: 'ABM' },
                                        { name: 'Blackbox', value: 'Blackbox' },
                                        { name: 'Eventos', value: 'Eventos' },
                                        { name: 'Food Box', value: 'Food Box' },
                                        { name: 'Indicação', value: 'Indicação' },
                                        { name: 'Inside Box', value: 'Inside Box' },
                                        { name: 'Leadbroker', value: 'Leadbroker' },
                                        { name: 'LP Franquia', value: 'LP Franquia' },
                                        { name: 'LP Matriz', value: 'LP Matriz' },
                                        { name: 'Meetingbroker', value: 'Meetingbroker' },
                                        { name: 'Networking', value: 'Networking' },
                                        { name: 'Pandora Box', value: 'Pandora Box' },
                                        { name: 'Prospecção Fria', value: 'Prospecção Fria' },
                                        { name: 'Reativação', value: 'Reativação' },
                                        { name: 'Recomendação', value: 'Recomendação' },
                                        { name: 'Reposição Inside Box', value: 'Reposição Inside Box' },
                                    ],
                                    default: 'Leadbroker',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['faturamento_da_lp'],
                                        },
                                    },
                                    options: [
                                        { name: 'Até 50 Mil', value: 'Até 50 mil' },
                                        { name: 'De 1 À 4 Milhões', value: 'De 1 à 4 milhões' },
                                        { name: 'De 101 Mil À 200 Mil', value: 'De 101 mil à 200 mil' },
                                        { name: 'De 101 Mil À 400 Mil', value: 'De 101 mil à 400 mil' },
                                        { name: 'De 16 a 40 Milhões', value: 'De 16 a 40 milhões' },
                                        { name: 'De 201 Mil À 400 Mil', value: 'De 201 mil à 400 mil' },
                                        { name: 'De 4 À 16 Milhões', value: 'De 4 à 16 milhões' },
                                        { name: 'De 401 Mil À 1 Milhão', value: 'De 401 mil à 1 milhão' },
                                        { name: 'De 51 Mil À 70 Mil', value: 'De 51 mil à 70 mil' },
                                        { name: 'De 71 Mil À 100 Mil', value: 'De 71 mil à 100 mil' },
                                        { name: 'From $101K to $200K', value: 'From $101K to $200K' },
                                        { name: 'From $11K to $20K', value: 'From $11K to $20K' },
                                        { name: 'From $16M to $40M', value: 'From $16M to $40M' },
                                        { name: 'From $1M to $4M', value: 'From $1M to $4M' },
                                        { name: 'From $201K to $400K', value: 'From $201K to $400K' },
                                        { name: 'From $21K to $30K', value: 'From $21K to $30K' },
                                        { name: 'From $31K to $40K', value: 'From $31K to $40K' },
                                        { name: 'From $401K to $1M', value: 'From $401K to $1M' },
                                        { name: 'From $41K to $50K', value: 'From $41K to $50K' },
                                        { name: 'From $4M to $16M', value: 'From $4M to $16M' },
                                        { name: 'From $51K to $70K', value: 'From $51K to $70K' },
                                        { name: 'From $71K to $100K', value: 'From $71K to $100K' },
                                        { name: 'Mais De 40 Milhões', value: 'Mais de 40 milhões' },
                                        { name: 'More than $1M', value: 'More than $1M' },
                                        { name: 'More than $40M', value: 'More than $40M' },
                                        { name: 'Until $10K', value: 'Until $10K' },
                                    ],
                                    default: 'Até 50 mil',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['fonte_do_lead'],
                                        },
                                    },
                                    options: [
                                        { name: 'Inside', value: 'Inside' },
                                        { name: 'Outside', value: 'Outside' },
                                    ],
                                    default: 'Inside',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['fonte_da_oportunidade'],
                                        },
                                    },
                                    options: [
                                        { name: 'Inside', value: 'Inside' },
                                        { name: 'Outside', value: 'Outside' },
                                    ],
                                    default: 'Inside',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['canal_de_origem'],
                                        },
                                    },
                                    options: [
                                        { name: 'Acelerador Empresarial', value: 'Acelerador Empresarial' },
                                        { name: 'Acelerador Experience', value: 'Acelerador Experience' },
                                        { name: 'B Coorporate', value: 'B coorporate' },
                                        { name: 'Bing', value: 'Bing' },
                                        { name: 'Campanha De Recuperação', value: 'Campanha de Recuperação' },
                                        { name: 'Embaixadores/Networking', value: 'Embaixadores/Networking' },
                                        { name: 'Equity+', value: 'Equity+' },
                                        { name: 'Escola Franchising', value: 'Escola Franchising' },
                                        {
                                            name: 'Eventos Em Parceria (Não Homologados Na Matriz)',
                                            value: 'Eventos em Parceria (não homologados na Matriz)',
                                        },
                                        {
                                            name: 'Eventos Independentes (Regionais/Locais)',
                                            value: 'Eventos Independentes (Regionais/Locais)',
                                        },
                                        { name: 'Facebook', value: 'Facebook' },
                                        { name: 'G4 Alumni', value: 'G4 Alumni' },
                                        { name: 'G4 Gestão E Estratégia', value: 'G4 Gestão e Estratégia' },
                                        { name: 'G4 Marketing E Growth', value: 'G4 Marketing e Growth' },
                                        { name: 'G4 Sales', value: 'G4 Sales' },
                                        { name: 'G4 Scale', value: 'G4 Scale' },
                                        { name: 'G4 Traction', value: 'G4 Traction' },
                                        { name: 'Gestão 4.0', value: 'Gestão 4.0' },
                                        { name: 'Google', value: 'Google' },
                                        { name: 'Goshen Land', value: 'Goshen Land' },
                                        { name: 'Independente', value: 'Independente' },
                                        { name: 'Indicação De Franqueado', value: 'Indicação de Franqueado' },
                                        { name: 'Indicação de Investidor', value: 'Indicação de Investidor' },
                                        { name: 'Indicação De Parceiro', value: 'Indicação de Parceiro' },
                                        { name: 'Institucional', value: 'Institucional' },
                                        { name: 'Jotaja', value: 'Jotaja' },
                                        { name: 'LinkedIn', value: 'LinkedIn' },
                                        { name: 'Lista De Leads Frios', value: 'Lista de Leads Frios' },
                                        { name: 'Luminare', value: 'Luminare' },
                                        { name: 'Multiplix', value: 'Multiplix' },
                                        { name: 'Open Mind', value: 'Open Mind' },
                                        { name: 'Orgânico', value: 'Orgânico' },
                                        { name: 'Pinterest', value: 'Pinterest' },
                                        { name: 'Programática', value: 'Programática' },
                                        { name: 'Reativação', value: 'Reativação' },
                                        { name: 'Recomendação BDR/SDR', value: 'Recomendação BDR/SDR' },
                                        { name: 'Recomendação Closer', value: 'Recomendação Closer' },
                                        { name: 'Reddit', value: 'Reddit' },
                                        { name: 'RGV', value: 'RGV' },
                                        { name: 'Scale', value: 'Scale' },
                                        { name: 'Scale Company', value: 'Scale Company' },
                                        { name: 'Scale Up', value: 'Scale Up' },
                                        { name: 'Seja Ap', value: 'Seja Ap' },
                                        { name: 'SME', value: 'SME' },
                                        { name: 'Taboola', value: 'Taboola' },
                                        { name: 'TikTok', value: 'TikTok' },
                                        { name: 'Twitter', value: 'Twitter' },
                                        { name: 'Vende C', value: 'Vende C' },
                                    ],
                                    default: 'Facebook',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dropdownValue',
                                    type: 'options',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['modelo_de_negocios'],
                                        },
                                    },
                                    options: [
                                        { name: 'Aplicativo (PLG)', value: 'Aplicativo (PLG)' },
                                        { name: 'E-Commerce', value: 'E-commerce' },
                                        { name: 'Food Service', value: 'Food Service' },
                                        { name: 'Infoproduto/Educação Perpétuo', value: 'Infoproduto/Educação Perpétuo' },
                                        { name: 'Inside Sales', value: 'Inside Sales' },
                                        { name: 'Lançamento', value: 'Lançamento' },
                                        { name: 'PDV - Varejo/Retail', value: 'PDV - Varejo/Retail' },
                                    ],
                                    default: 'Inside Sales',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dateValue',
                                    type: 'dateTime',
                                    displayOptions: {
                                        show: {
                                            fieldName: [
                                                'data_de_fechamento_estimada',
                                                'data_de_observacoes_do_bant',
                                                'data_de_cadastro',
                                            ],
                                        },
                                    },
                                    default: '',
                                    description: 'The date value for the field',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'dateTimeValue',
                                    type: 'dateTime',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['data_hora_da_reuniao'],
                                        },
                                    },
                                    default: '',
                                    description: 'The date/time value for the field',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'numberValue',
                                    type: 'number',
                                    displayOptions: {
                                        show: {
                                            fieldName: ['valor_leadbroker'],
                                        },
                                    },
                                    default: 0,
                                    description: 'The numeric value for the field',
                                },
                                {
                                    displayName: 'Field Value',
                                    name: 'textValue',
                                    type: 'string',
                                    displayOptions: {
                                        show: {
                                            fieldName: [
                                                'descricao_da_desqualificacao',
                                                'detalhes_da_qualificacao',
                                                'qualidade_da_reuniao',
                                                'justificativa',
                                                'descricao_feita_pelo_lead',
                                                'form_name',
                                                'page_name',
                                                'campaign_id',
                                                'adset_id',
                                                'ad_id',
                                                'fbclid',
                                                'gclid',
                                                'external_id',
                                                'session_id',
                                                'client_id',
                                                'fbp',
                                                'fbc',
                                                'session_number',
                                                'fb_lead_id',
                                                'id_de_resposta_do_formulario',
                                                'nome_da_campanha_de_email',
                                                'id_da_campanha_de_email',
                                                'ip_do_cadastro',
                                                'cargo',
                                                'urgencia',
                                                'franquia_csc',
                                                'franquia_csc_oportunidade',
                                                'id_franquia_csc',
                                                'observacoes',
                                                'id_franquia_oportunidade',
                                            ],
                                        },
                                    },
                                    default: '',
                                    description: 'The text value for the field',
                                },
                            ],
                        },
                    ],
                },
                {
                    displayName: 'Card ID',
                    name: 'cardIdUpdateColumn',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['updateLeadColumn'],
                        },
                    },
                    default: '',
                    description: 'The ID of the card (lead) to move',
                },
                {
                    displayName: 'Coluna De Destino Name or ID',
                    name: 'toColumnIdUpdate',
                    type: 'options',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['updateLeadColumn'],
                        },
                    },
                    typeOptions: {
                        loadOptionsMethod: 'getColumns',
                    },
                    default: '',
                    description: 'The column where the lead will be moved. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                },
                {
                    displayName: 'Novo Index',
                    name: 'newIndexUpdate',
                    type: 'number',
                    displayOptions: {
                        show: {
                            operation: ['updateLeadColumn'],
                        },
                    },
                    default: 0,
                    description: 'The new index position of the card in the column',
                },
                {
                    displayName: 'Ignorar Validação De Campos Obrigatórios',
                    name: 'ignoreColumnsRequiredFieldsValidationUpdate',
                    type: 'boolean',
                    displayOptions: {
                        show: {
                            operation: ['updateLeadColumn'],
                        },
                    },
                    default: true,
                    description: 'Whether to ignore required fields validation when moving to the column',
                },
                {
                    displayName: 'Card ID',
                    name: 'cardIdDisqualify',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['disqualifyLead'],
                        },
                    },
                    default: '',
                    description: 'The ID of the card (lead) to disqualify',
                },
                {
                    displayName: 'Coluna De Desqualificação Name or ID',
                    name: 'toColumnId',
                    type: 'options',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['disqualifyLead'],
                        },
                    },
                    typeOptions: {
                        loadOptionsMethod: 'getColumns',
                    },
                    default: '',
                    description: 'The column where the disqualified lead will be moved. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                },
                {
                    displayName: 'Novo Index',
                    name: 'newIndex',
                    type: 'number',
                    displayOptions: {
                        show: {
                            operation: ['disqualifyLead'],
                        },
                    },
                    default: 0,
                    description: 'The new index position of the card in the column',
                },
                {
                    displayName: 'Ignorar Validação De Campos Obrigatórios',
                    name: 'ignoreColumnsRequiredFieldsValidation',
                    type: 'boolean',
                    displayOptions: {
                        show: {
                            operation: ['disqualifyLead'],
                        },
                    },
                    default: true,
                    description: 'Whether to ignore required fields validation when moving to disqualification column',
                },
                {
                    displayName: 'Razão Da Desqualificação',
                    name: 'reasonForLost',
                    type: 'options',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['disqualifyLead'],
                        },
                    },
                    options: [
                        { name: 'Adolescente/Criança', value: 'Adolescente/Criança' },
                        { name: 'Blocklist', value: 'Blocklist' },
                        { name: 'Cliente', value: 'Cliente' },
                        { name: 'Cliente Oculto', value: 'Cliente oculto' },
                        { name: 'Contatos Inválidos', value: 'Contatos inválidos' },
                        { name: 'Deixou De Responder', value: 'Deixou de responder' },
                        { name: 'Duplicado', value: 'Duplicado' },
                        { name: 'Engano/Não Lembra', value: 'Engano/Não Lembra' },
                        { name: 'Ex-Cliente (Detrator)', value: 'Ex-cliente (detrator)' },
                        { name: 'Não ICP', value: 'Não ICP' },
                        { name: 'Nunca Respondeu', value: 'Nunca respondeu' },
                        { name: 'Pessoa Física', value: 'Pessoa Física' },
                        { name: 'Sem Autoridade', value: 'Sem autoridade' },
                        { name: 'Sem Budget', value: 'Sem budget' },
                        { name: 'Sem Interesse', value: 'Sem interesse' },
                        { name: 'Sem Necessidade', value: 'Sem necessidade' },
                        { name: 'Sem Timing', value: 'Sem timing' },
                        { name: 'Serviço Fora De Escopo', value: 'Serviço fora de escopo' },
                        { name: 'SPAM', value: 'SPAM' },
                    ],
                    default: 'SPAM',
                    description: 'The reason for disqualifying the lead',
                },
                {
                    displayName: 'Descrição Da Desqualificação',
                    name: 'descriptionForLost',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    displayOptions: {
                        show: {
                            operation: ['disqualifyLead'],
                        },
                    },
                    default: '',
                    description: 'Additional description for the disqualification reason',
                },
                {
                    displayName: 'Card ID',
                    name: 'cardIdChangeTenant',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['changeTenant'],
                        },
                    },
                    default: '',
                    description: 'The ID of the card (lead) to change tenant',
                },
                {
                    displayName: 'Tenant Name or ID',
                    name: 'tenantId',
                    type: 'options',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['changeTenant'],
                        },
                    },
                    typeOptions: {
                        loadOptionsMethod: 'getTenants',
                    },
                    default: '',
                    description: 'The tenant to assign to the lead. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                },
                {
                    displayName: 'Card ID',
                    name: 'cardIdUpdate',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'The ID of the card (lead) to update',
                },
                {
                    displayName: 'Title',
                    name: 'titleUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'The title of the lead',
                },
                {
                    displayName: 'Company Name',
                    name: 'companyNameUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'The name of the company',
                },
                {
                    displayName: 'Email',
                    name: 'emailUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'Email address of the lead',
                },
                {
                    displayName: 'Phone',
                    name: 'phoneUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'Phone number of the lead',
                },
                {
                    displayName: 'Tax ID',
                    name: 'taxIdUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'Tax identification number',
                },
                {
                    displayName: 'Owner Name or ID',
                    name: 'ownerIdUpdate',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    typeOptions: {
                        loadOptionsMethod: 'getOwners',
                    },
                    default: '',
                    description: 'The owner for this lead. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                },
                {
                    displayName: 'Tenant Name or ID',
                    name: 'tenantIdUpdate',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    typeOptions: {
                        loadOptionsMethod: 'getTenants',
                    },
                    default: '',
                    description: 'The tenant for this lead. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                },
                {
                    displayName: 'Channel',
                    name: 'channelUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'The channel of the lead',
                },
                {
                    displayName: 'UTM Source',
                    name: 'utmSourceUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'UTM source parameter',
                },
                {
                    displayName: 'UTM Campaign',
                    name: 'utmCampaignUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'UTM campaign parameter',
                },
                {
                    displayName: 'UTM Content',
                    name: 'utmContentUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'UTM content parameter',
                },
                {
                    displayName: 'UTM Medium',
                    name: 'utmMediumUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'UTM medium parameter',
                },
                {
                    displayName: 'UTM Term',
                    name: 'utmTermUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'UTM term parameter',
                },
                {
                    displayName: 'Source Page',
                    name: 'sourcePageUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'The source page where the lead came from',
                },
                {
                    displayName: 'Lost Reason',
                    name: 'lostReasonUpdate',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'The reason why the lead was lost',
                },
                {
                    displayName: 'Lost Description',
                    name: 'lostDescriptionUpdate',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    displayOptions: {
                        show: {
                            operation: ['updateLead'],
                        },
                    },
                    default: '',
                    description: 'Additional description for the lost reason',
                },
            ],
            usableAsTool: true,
        };
        this.methods = {
            loadOptions: {
                async getOwners() {
                    const credentials = await this.getCredentials('crmApi');
                    const ownersJson = credentials.owners;
                    try {
                        const owners = JSON.parse(ownersJson);
                        return owners.map((owner) => ({
                            name: owner.name,
                            value: owner.id,
                        }));
                    }
                    catch (error) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON in owners credential: ${error.message}`);
                    }
                },
                async getColumns() {
                    const credentials = await this.getCredentials('crmApi');
                    const columnsJson = credentials.columns;
                    try {
                        const columns = JSON.parse(columnsJson);
                        return columns.map((column) => ({
                            name: column.name,
                            value: column.id,
                        }));
                    }
                    catch (error) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON in columns credential: ${error.message}`);
                    }
                },
                async getTenants() {
                    const credentials = await this.getCredentials('crmApi');
                    const tenantsJson = credentials.tenants;
                    try {
                        const tenants = JSON.parse(tenantsJson);
                        return tenants.map((tenant) => ({
                            name: tenant.name,
                            value: tenant.id,
                        }));
                    }
                    catch (error) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON in tenants credential: ${error.message}`);
                    }
                },
            },
        };
    }
    async execute() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('crmApi');
        const apiUrl = credentials.apiUrl;
        const clientId = credentials.clientId;
        const clientSecret = credentials.clientSecret;
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            try {
                const operation = this.getNodeParameter('operation', itemIndex);
                if (operation === 'createLead') {
                    const createLeadUrl = credentials.createLeadUrl;
                    const ownerId = this.getNodeParameter('ownerId', itemIndex);
                    const columnId = this.getNodeParameter('columnId', itemIndex);
                    const companyName = this.getNodeParameter('companyName', itemIndex);
                    const title = this.getNodeParameter('title', itemIndex);
                    const email = this.getNodeParameter('email', itemIndex, '');
                    const phone = this.getNodeParameter('phone', itemIndex, '');
                    const taxId = this.getNodeParameter('taxId', itemIndex, '');
                    const companyNationality = this.getNodeParameter('companyNationality', itemIndex, '');
                    const utmSource = this.getNodeParameter('utmSource', itemIndex, '');
                    const utmCampaign = this.getNodeParameter('utmCampaign', itemIndex, '');
                    const utmContent = this.getNodeParameter('utmContent', itemIndex, '');
                    const utmMedium = this.getNodeParameter('utmMedium', itemIndex, '');
                    const utmTerm = this.getNodeParameter('utmTerm', itemIndex, '');
                    const sourcePage = this.getNodeParameter('sourcePage', itemIndex, '');
                    const body = {
                        ownerId,
                        companyName,
                        title,
                    };
                    if (email)
                        body.email = email;
                    if (phone)
                        body.phone = phone;
                    if (taxId)
                        body.taxId = taxId;
                    if (companyNationality)
                        body.companyNationality = companyNationality;
                    if (utmSource)
                        body.utmSource = utmSource;
                    if (utmCampaign)
                        body.utmCampaign = utmCampaign;
                    if (utmContent)
                        body.utmContent = utmContent;
                    if (utmMedium)
                        body.utmMedium = utmMedium;
                    if (utmTerm)
                        body.utmTerm = utmTerm;
                    if (sourcePage)
                        body.sourcePage = sourcePage;
                    const options = {
                        method: 'POST',
                        url: `${apiUrl}${createLeadUrl}/${columnId}`,
                        headers: {
                            'x-client-id': clientId,
                            'x-client-secret': clientSecret,
                            'Content-Type': 'application/json',
                        },
                        body,
                        json: true,
                    };
                    const response = await this.helpers.httpRequest(options);
                    returnData.push({ json: response, pairedItem: itemIndex });
                }
                else if (operation === 'createAndUpdate') {
                    const createLeadUrl = credentials.createLeadUrl;
                    const updateLeadUrl = credentials.updateLeadUrl;
                    const ownerId = this.getNodeParameter('ownerIdCreateUpdate', itemIndex);
                    const columnId = this.getNodeParameter('columnIdCreateUpdate', itemIndex);
                    const companyName = this.getNodeParameter('companyNameCreateUpdate', itemIndex);
                    const title = this.getNodeParameter('titleCreateUpdate', itemIndex);
                    const email = this.getNodeParameter('emailCreateUpdate', itemIndex, '');
                    const phone = this.getNodeParameter('phoneCreateUpdate', itemIndex, '');
                    const taxId = this.getNodeParameter('taxIdCreateUpdate', itemIndex, '');
                    const companyNationality = this.getNodeParameter('companyNationalityCreateUpdate', itemIndex, '');
                    const utmSource = this.getNodeParameter('utmSourceCreateUpdate', itemIndex, '');
                    const utmCampaign = this.getNodeParameter('utmCampaignCreateUpdate', itemIndex, '');
                    const utmContent = this.getNodeParameter('utmContentCreateUpdate', itemIndex, '');
                    const utmMedium = this.getNodeParameter('utmMediumCreateUpdate', itemIndex, '');
                    const utmTerm = this.getNodeParameter('utmTermCreateUpdate', itemIndex, '');
                    const sourcePage = this.getNodeParameter('sourcePageCreateUpdate', itemIndex, '');
                    const createBody = {
                        ownerId,
                        companyName,
                        title,
                    };
                    if (email)
                        createBody.email = email;
                    if (phone)
                        createBody.phone = phone;
                    if (taxId)
                        createBody.taxId = taxId;
                    if (companyNationality)
                        createBody.companyNationality = companyNationality;
                    if (utmSource)
                        createBody.utmSource = utmSource;
                    if (utmCampaign)
                        createBody.utmCampaign = utmCampaign;
                    if (utmContent)
                        createBody.utmContent = utmContent;
                    if (utmMedium)
                        createBody.utmMedium = utmMedium;
                    if (utmTerm)
                        createBody.utmTerm = utmTerm;
                    if (sourcePage)
                        createBody.sourcePage = sourcePage;
                    const createOptions = {
                        method: 'POST',
                        url: `${apiUrl}${createLeadUrl}/${columnId}`,
                        headers: {
                            'x-client-id': clientId,
                            'x-client-secret': clientSecret,
                            'Content-Type': 'application/json',
                        },
                        body: createBody,
                        json: true,
                    };
                    const createResponse = await this.helpers.httpRequest(createOptions);
                    const cardId = createResponse.cardId || createResponse.id;
                    if (!cardId) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Could not extract cardId from create lead response', { itemIndex });
                    }
                    const customFields = this.getNodeParameter('customFieldsCreateUpdate.field', itemIndex, []);
                    const customFieldIdsJson = credentials.customFieldIds;
                    let customFieldIds;
                    try {
                        customFieldIds = JSON.parse(customFieldIdsJson);
                    }
                    catch (error) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON in custom_field_ids credential: ${error.message}`, { itemIndex });
                    }
                    const updateResponses = [];
                    if (customFields && customFields.length > 0) {
                        for (const fieldData of customFields) {
                            const fieldName = fieldData.fieldName;
                            const fieldConfig = customFieldIds[fieldName];
                            if (!fieldConfig) {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Field "${fieldName}" not found in custom_field_ids configuration`, { itemIndex });
                            }
                            const fieldId = fieldConfig.id;
                            const fieldType = fieldConfig.type;
                            let fieldValue;
                            if (fieldData.booleanValue !== undefined) {
                                fieldValue = fieldData.booleanValue;
                            }
                            else if (fieldData.dropdownValue !== undefined) {
                                fieldValue = fieldData.dropdownValue;
                            }
                            else if (fieldData.dateValue !== undefined) {
                                fieldValue = fieldData.dateValue;
                            }
                            else if (fieldData.dateTimeValue !== undefined) {
                                fieldValue = fieldData.dateTimeValue;
                            }
                            else if (fieldData.numberValue !== undefined) {
                                fieldValue = fieldData.numberValue;
                            }
                            else if (fieldData.textValue !== undefined) {
                                fieldValue = fieldData.textValue;
                            }
                            if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
                                continue;
                            }
                            const updateBody = {
                                cardId,
                                cardCustomFieldsId: fieldId,
                            };
                            if (['TEXT_SHORT', 'TEXT_LONG', 'DROPDOWN'].includes(fieldType)) {
                                updateBody.listValues = [fieldValue];
                            }
                            else if (['DATETIME', 'DATE'].includes(fieldType)) {
                                updateBody.dateValue = fieldValue;
                            }
                            else if (fieldType === 'BOOLEAN') {
                                updateBody.booleanValue = fieldValue;
                            }
                            else if (fieldType === 'NUMBER_DECIMAL') {
                                updateBody.numberValue = fieldValue;
                            }
                            else {
                                updateBody.listValues = [fieldValue];
                            }
                            const updateOptions = {
                                method: 'POST',
                                url: `${apiUrl}${updateLeadUrl}`,
                                headers: {
                                    'x-client-id': clientId,
                                    'x-client-secret': clientSecret,
                                    'Content-Type': 'application/json',
                                },
                                body: updateBody,
                                json: true,
                            };
                            const updateResponse = await this.helpers.httpRequest(updateOptions);
                            updateResponses.push({
                                field: fieldName,
                                response: updateResponse,
                            });
                        }
                    }
                    returnData.push({
                        json: {
                            cardId,
                            createResponse,
                            customFieldUpdates: updateResponses,
                            success: true,
                        },
                        pairedItem: itemIndex,
                    });
                }
                else if (operation === 'updateLead') {
                    const updateLeadMainUrl = credentials.updateLeadMainUrl;
                    const cardId = this.getNodeParameter('cardIdUpdate', itemIndex);
                    const title = this.getNodeParameter('titleUpdate', itemIndex, '');
                    const companyName = this.getNodeParameter('companyNameUpdate', itemIndex, '');
                    const email = this.getNodeParameter('emailUpdate', itemIndex, '');
                    const phone = this.getNodeParameter('phoneUpdate', itemIndex, '');
                    const taxId = this.getNodeParameter('taxIdUpdate', itemIndex, '');
                    const ownerId = this.getNodeParameter('ownerIdUpdate', itemIndex, '');
                    const tenantId = this.getNodeParameter('tenantIdUpdate', itemIndex, '');
                    const channel = this.getNodeParameter('channelUpdate', itemIndex, '');
                    const utmSource = this.getNodeParameter('utmSourceUpdate', itemIndex, '');
                    const utmCampaign = this.getNodeParameter('utmCampaignUpdate', itemIndex, '');
                    const utmContent = this.getNodeParameter('utmContentUpdate', itemIndex, '');
                    const utmMedium = this.getNodeParameter('utmMediumUpdate', itemIndex, '');
                    const utmTerm = this.getNodeParameter('utmTermUpdate', itemIndex, '');
                    const sourcePage = this.getNodeParameter('sourcePageUpdate', itemIndex, '');
                    const lostReason = this.getNodeParameter('lostReasonUpdate', itemIndex, '');
                    const lostDescription = this.getNodeParameter('lostDescriptionUpdate', itemIndex, '');
                    const body = {};
                    if (title)
                        body.title = title;
                    if (companyName)
                        body.companyName = companyName;
                    if (email)
                        body.email = email;
                    if (phone)
                        body.phone = phone;
                    if (taxId)
                        body.taxId = taxId;
                    if (ownerId)
                        body.ownerId = ownerId;
                    if (tenantId)
                        body.tenantId = tenantId;
                    if (channel)
                        body.channel = channel;
                    if (utmSource)
                        body.utmSource = utmSource;
                    if (utmCampaign)
                        body.utmCampaign = utmCampaign;
                    if (utmContent)
                        body.utmContent = utmContent;
                    if (utmMedium)
                        body.utmMedium = utmMedium;
                    if (utmTerm)
                        body.utmTerm = utmTerm;
                    if (sourcePage)
                        body.sourcePage = sourcePage;
                    if (lostReason)
                        body.lostReason = lostReason;
                    if (lostDescription)
                        body.lostDescription = lostDescription;
                    const options = {
                        method: 'PUT',
                        url: `${apiUrl}${updateLeadMainUrl}/${cardId}`,
                        headers: {
                            'x-client-id': clientId,
                            'x-client-secret': clientSecret,
                            'Content-Type': 'application/json',
                        },
                        body,
                        json: true,
                    };
                    const response = await this.helpers.httpRequest(options);
                    returnData.push({ json: response, pairedItem: itemIndex });
                }
                else if (operation === 'updateLeadField') {
                    const updateLeadUrl = credentials.updateLeadUrl;
                    const cardId = this.getNodeParameter('cardId', itemIndex);
                    const fieldsToUpdate = this.getNodeParameter('fieldsToUpdate.field', itemIndex, []);
                    const customFieldIdsJson = credentials.customFieldIds;
                    let customFieldIds;
                    try {
                        customFieldIds = JSON.parse(customFieldIdsJson);
                    }
                    catch (error) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON in custom_field_ids credential: ${error.message}`, { itemIndex });
                    }
                    const responses = [];
                    for (const fieldData of fieldsToUpdate) {
                        const fieldName = fieldData.fieldName;
                        const fieldConfig = customFieldIds[fieldName];
                        if (!fieldConfig) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Field "${fieldName}" not found in custom_field_ids configuration`, { itemIndex });
                        }
                        const fieldId = fieldConfig.id;
                        const fieldType = fieldConfig.type;
                        let fieldValue;
                        if (fieldData.booleanValue !== undefined) {
                            fieldValue = fieldData.booleanValue;
                        }
                        else if (fieldData.dropdownValue !== undefined) {
                            fieldValue = fieldData.dropdownValue;
                        }
                        else if (fieldData.dateValue !== undefined) {
                            fieldValue = fieldData.dateValue;
                        }
                        else if (fieldData.dateTimeValue !== undefined) {
                            fieldValue = fieldData.dateTimeValue;
                        }
                        else if (fieldData.numberValue !== undefined) {
                            fieldValue = fieldData.numberValue;
                        }
                        else if (fieldData.textValue !== undefined) {
                            fieldValue = fieldData.textValue;
                        }
                        if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
                            continue;
                        }
                        const body = {
                            cardId,
                            cardCustomFieldsId: fieldId,
                        };
                        if (['TEXT_SHORT', 'TEXT_LONG', 'DROPDOWN'].includes(fieldType)) {
                            body.listValues = [fieldValue];
                        }
                        else if (['DATETIME', 'DATE'].includes(fieldType)) {
                            body.dateValue = fieldValue;
                        }
                        else if (fieldType === 'BOOLEAN') {
                            body.booleanValue = fieldValue;
                        }
                        else if (fieldType === 'NUMBER_DECIMAL') {
                            body.numberValue = fieldValue;
                        }
                        else {
                            body.listValues = [fieldValue];
                        }
                        const options = {
                            method: 'POST',
                            url: `${apiUrl}${updateLeadUrl}`,
                            headers: {
                                'x-client-id': clientId,
                                'x-client-secret': clientSecret,
                                'Content-Type': 'application/json',
                            },
                            body,
                            json: true,
                        };
                        const response = await this.helpers.httpRequest(options);
                        responses.push({
                            field: fieldName,
                            response,
                        });
                    }
                    returnData.push({
                        json: {
                            cardId,
                            updates: responses,
                            success: true,
                        },
                        pairedItem: itemIndex,
                    });
                }
                else if (operation === 'disqualifyLead') {
                    const disqualifyLeadUrl = credentials.disqualifyLeadUrl;
                    const cardId = this.getNodeParameter('cardIdDisqualify', itemIndex);
                    const toColumnId = this.getNodeParameter('toColumnId', itemIndex);
                    const newIndex = this.getNodeParameter('newIndex', itemIndex);
                    const ignoreColumnsRequiredFieldsValidation = this.getNodeParameter('ignoreColumnsRequiredFieldsValidation', itemIndex);
                    const reasonForLost = this.getNodeParameter('reasonForLost', itemIndex);
                    const descriptionForLost = this.getNodeParameter('descriptionForLost', itemIndex, '');
                    const body = {
                        toColumnId,
                        newIndex,
                        ignoreColumnsRequiredFieldsValidation,
                        reasonForLost,
                        descriptionForLost,
                    };
                    const options = {
                        method: 'POST',
                        url: `${apiUrl}${disqualifyLeadUrl}/${cardId}`,
                        headers: {
                            'x-client-id': clientId,
                            'x-client-secret': clientSecret,
                            'Content-Type': 'application/json',
                        },
                        body,
                        json: true,
                    };
                    const response = await this.helpers.httpRequest(options);
                    returnData.push({ json: response, pairedItem: itemIndex });
                }
                else if (operation === 'changeTenant') {
                    const changeTenantUrl = credentials.changeTenantUrl;
                    const cardId = this.getNodeParameter('cardIdChangeTenant', itemIndex);
                    const tenantId = this.getNodeParameter('tenantId', itemIndex);
                    const body = {
                        tenantId,
                    };
                    const options = {
                        method: 'PUT',
                        url: `${apiUrl}${changeTenantUrl}/${cardId}`,
                        headers: {
                            'x-client-id': clientId,
                            'x-client-secret': clientSecret,
                            'Content-Type': 'application/json',
                        },
                        body,
                        json: true,
                    };
                    const response = await this.helpers.httpRequest(options);
                    returnData.push({ json: response, pairedItem: itemIndex });
                }
            }
            catch (error) {
                const operation = this.getNodeParameter('operation', itemIndex);
                let responseBody;
                let statusCode;
                let requestUrl;
                let requestMethod;
                if (error.response) {
                    statusCode = error.response.status || error.response.statusCode;
                    responseBody = error.response.data || error.response.body;
                    requestUrl = ((_a = error.response.config) === null || _a === void 0 ? void 0 : _a.url) || ((_b = error.config) === null || _b === void 0 ? void 0 : _b.url);
                    requestMethod = ((_c = error.response.config) === null || _c === void 0 ? void 0 : _c.method) || ((_d = error.config) === null || _d === void 0 ? void 0 : _d.method);
                }
                else if ((_e = error.cause) === null || _e === void 0 ? void 0 : _e.response) {
                    statusCode = error.cause.response.status || error.cause.response.statusCode;
                    responseBody = error.cause.response.data || error.cause.response.body;
                    requestUrl = (_f = error.cause.response.config) === null || _f === void 0 ? void 0 : _f.url;
                    requestMethod = (_g = error.cause.response.config) === null || _g === void 0 ? void 0 : _g.method;
                }
                if (!responseBody && ((_h = error.options) === null || _h === void 0 ? void 0 : _h.body)) {
                    responseBody = error.options.body;
                }
                let detailedMessage = `CRM API Error - ${operation}\n\n`;
                detailedMessage += `Status Code: ${statusCode || 'Unknown'}\n`;
                if (requestMethod && requestUrl) {
                    detailedMessage += `Request: ${requestMethod.toUpperCase()} ${requestUrl}\n\n`;
                }
                if (responseBody) {
                    if (responseBody.errors && Array.isArray(responseBody.errors)) {
                        detailedMessage += `Errors:\n`;
                        responseBody.errors.forEach((err, index) => {
                            detailedMessage += `\n  ${index + 1}. ${err.code || 'Error'}:\n`;
                            detailedMessage += `     ${err.message || JSON.stringify(err)}\n`;
                        });
                        if (responseBody.traceId) {
                            detailedMessage += `\nTrace ID: ${responseBody.traceId}\n`;
                        }
                    }
                    else if (responseBody.message) {
                        detailedMessage += `Message: ${responseBody.message}\n`;
                    }
                    else {
                        detailedMessage += `\nAPI Response:\n`;
                        if (typeof responseBody === 'string') {
                            detailedMessage += responseBody;
                        }
                        else {
                            detailedMessage += JSON.stringify(responseBody, null, 2);
                        }
                    }
                }
                else {
                    detailedMessage += `\nNo response body available\n`;
                    detailedMessage += `Original error: ${error.message}`;
                }
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error.message,
                            operation,
                            statusCode,
                            responseBody,
                            requestUrl,
                            requestMethod,
                        },
                        pairedItem: itemIndex,
                    });
                }
                else {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), detailedMessage, {
                        itemIndex,
                        description: `CRM ${operation} operation failed`,
                    });
                }
            }
        }
        return [returnData];
    }
}
exports.Crm = Crm;
//# sourceMappingURL=Crm.node.js.map
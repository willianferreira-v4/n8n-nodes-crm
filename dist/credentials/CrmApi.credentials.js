"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmApi = void 0;
class CrmApi {
    constructor() {
        this.name = 'crmApi';
        this.icon = 'file:crm.svg';
        this.displayName = 'CRM API';
        this.documentationUrl = 'https://github.com/org/repo';
        this.properties = [
            {
                displayName: 'Client ID',
                name: 'clientId',
                type: 'string',
                default: '',
                required: true,
                description: 'The x-client-id for authentication',
            },
            {
                displayName: 'Client Secret',
                name: 'clientSecret',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'The x-client-secret for authentication',
            },
            {
                displayName: 'API URL',
                name: 'apiUrl',
                type: 'string',
                default: '',
                required: true,
                placeholder: 'https://api.example.com',
                description: 'The base URL for the CRM API',
            },
            {
                displayName: 'Create Lead URL',
                name: 'createLeadUrl',
                type: 'string',
                default: '',
                required: true,
                placeholder: '/api/leads',
                description: 'The endpoint path to create a lead',
            },
            {
                displayName: 'Update Lead URL',
                name: 'updateLeadUrl',
                type: 'string',
                default: '',
                required: true,
                placeholder: '/api/leads/update',
                description: 'The endpoint path to update a lead field',
            },
            {
                displayName: 'Update Lead Main URL',
                name: 'updateLeadMainUrl',
                type: 'string',
                default: '',
                required: true,
                placeholder: '/api/leads',
                description: 'The endpoint path to update lead main fields',
            },
            {
                displayName: 'Disqualify Lead URL',
                name: 'disqualifyLeadUrl',
                type: 'string',
                default: '',
                required: true,
                placeholder: '/api/leads/disqualify',
                description: 'The endpoint path to disqualify a lead',
            },
            {
                displayName: 'Change Tenant URL',
                name: 'changeTenantUrl',
                type: 'string',
                default: '',
                required: true,
                placeholder: '/api/leads/change-tenant',
                description: 'The endpoint path to change lead tenant',
            },
            {
                displayName: 'Custom Field IDs (JSON)',
                name: 'customFieldIds',
                type: 'json',
                default: '{}',
                required: true,
                description: 'JSON object containing custom field configurations with their IDs and types',
                placeholder: '{\n  "arquivado": {\n    "id": "4a3d9742-b3ac-4a76-8b22-965903016b7d",\n    "type": "BOOLEAN"\n  },\n  "lead_enriquecido": {\n    "id": "8fad7933-3dd8-422b-a490-c7e6f2bfcf62",\n    "type": "BOOLEAN"\n  }\n}',
            },
            {
                displayName: 'Owners (JSON)',
                name: 'owners',
                type: 'json',
                default: '[]',
                required: true,
                description: 'JSON array containing owner configurations with their IDs and display names',
                placeholder: '[\n  {\n    "id": "owner-uuid-1",\n    "name": "John Doe"\n  },\n  {\n    "id": "owner-uuid-2",\n    "name": "Jane Smith"\n  }\n]',
            },
            {
                displayName: 'Columns (JSON)',
                name: 'columns',
                type: 'json',
                default: '[]',
                required: true,
                description: 'JSON array containing column configurations with their IDs and display names',
                placeholder: '[\n  {\n    "id": "column-uuid-1",\n    "name": "New Leads"\n  },\n  {\n    "id": "column-uuid-2",\n    "name": "Qualified"\n  }\n]',
            },
            {
                displayName: 'Tenants (JSON)',
                name: 'tenants',
                type: 'json',
                default: '[]',
                required: true,
                description: 'JSON array containing tenant configurations with their IDs and display names',
                placeholder: '[\n  {\n    "id": "tenant-uuid-1",\n    "name": "Tenant A"\n  },\n  {\n    "id": "tenant-uuid-2",\n    "name": "Tenant B"\n  }\n]',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'x-client-id': '={{$credentials.clientId}}',
                    'x-client-secret': '={{$credentials.clientSecret}}',
                },
            },
        };
    }
}
exports.CrmApi = CrmApi;
//# sourceMappingURL=CrmApi.credentials.js.map
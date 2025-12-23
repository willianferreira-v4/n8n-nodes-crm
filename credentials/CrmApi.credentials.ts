import type { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class CrmApi implements ICredentialType {
	name = 'crmApi';
	icon: Icon = 'file:crm.svg';
	displayName = 'CRM API';
	documentationUrl = 'https://github.com/org/repo';
	properties: INodeProperties[] = [
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
			placeholder:
				'{\n  "arquivado": {\n    "id": "4a3d9742-b3ac-4a76-8b22-965903016b7d",\n    "type": "BOOLEAN"\n  },\n  "lead_enriquecido": {\n    "id": "8fad7933-3dd8-422b-a490-c7e6f2bfcf62",\n    "type": "BOOLEAN"\n  }\n}',
		},
		{
			displayName: 'Owners (JSON)',
			name: 'owners',
			type: 'json',
			default: '[]',
			required: true,
			description: 'JSON array containing owner configurations with their IDs and display names',
			placeholder:
				'[\n  {\n    "id": "owner-uuid-1",\n    "name": "John Doe"\n  },\n  {\n    "id": "owner-uuid-2",\n    "name": "Jane Smith"\n  }\n]',
		},
		{
			displayName: 'Columns (JSON)',
			name: 'columns',
			type: 'json',
			default: '[]',
			required: true,
			description: 'JSON array containing column configurations with their IDs and display names',
			placeholder:
				'[\n  {\n    "id": "column-uuid-1",\n    "name": "New Leads"\n  },\n  {\n    "id": "column-uuid-2",\n    "name": "Qualified"\n  }\n]',
		},
		{
			displayName: 'Tenants (JSON)',
			name: 'tenants',
			type: 'json',
			default: '[]',
			required: true,
			description: 'JSON array containing tenant configurations with their IDs and display names',
			placeholder:
				'[\n  {\n    "id": "tenant-uuid-1",\n    "name": "Tenant A"\n  },\n  {\n    "id": "tenant-uuid-2",\n    "name": "Tenant B"\n  }\n]',
		},
		{
			displayName: 'Origin Channels (JSON)',
			name: 'originChannels',
			type: 'json',
			default: '[]',
			required: true,
			description: 'JSON array with origin channels (id and name) used in dropdowns',
			placeholder:
				'[\n  {\n    "id": "origin-uuid-1",\n    "name": "Facebook"\n  },\n  {\n    "id": "origin-uuid-2",\n    "name": "Google"\n  }\n]',
		},
		{
			displayName: 'Acquisition Channels (JSON)',
			name: 'acquisitionChannels',
			type: 'json',
			default: '[]',
			required: true,
			description: 'JSON array with acquisition channels (id and name) used in dropdowns',
			placeholder:
				'[\n  {\n    "id": "acq-uuid-1",\n    "name": "ABM"\n  },\n  {\n    "id": "acq-uuid-2",\n    "name": "Leadbroker"\n  }\n]',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-client-id': '={{$credentials.clientId}}',
				'x-client-secret': '={{$credentials.clientSecret}}',
			},
		},
	};
}

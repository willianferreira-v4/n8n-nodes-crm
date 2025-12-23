import type { INodeProperties } from 'n8n-workflow';

export const leadChangeTenantDescription: INodeProperties[] = [
	{
		displayName: 'Card ID',
		name: 'cardIdChangeTenant',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
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
				resource: ['lead'],
				operation: ['changeTenant'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getTenants',
		},
		default: '',
		description:
			'The tenant to assign to the lead. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
];

import type { INodeProperties } from 'n8n-workflow';

export const leadBaseDescription: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Lead',
				value: 'lead',
			},
		],
		default: 'lead',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lead'],
			},
		},
		options: [
			{
				name: 'Change Tenant',
				value: 'changeTenant',
				description: 'Change the tenant of a lead',
				action: 'Change tenant',
			},
			{
				name: 'Create',
				value: 'createLead',
				description: 'Create a new lead',
				action: 'Create',
			},
			{
				name: 'Create and Update Fields',
				value: 'createAndUpdate',
				description: 'Create a new lead and update custom fields',
				action: 'Create and update fields',
			},
			{
				name: 'Disqualify',
				value: 'disqualifyLead',
				description: 'Disqualify a lead and move to disqualification column',
				action: 'Disqualify',
			},
			{
				name: 'Update',
				value: 'updateLead',
				description: 'Update main fields of a lead',
				action: 'Update',
			},
			{
				name: 'Update Column',
				value: 'updateLeadColumn',
				description: 'Move a lead to a different column',
				action: 'Update column',
			},
			{
				name: 'Update Custom Field',
				value: 'updateLeadField',
				description: 'Update a custom field on a lead',
				action: 'Update custom field',
			},
		],
		default: 'createLead',
	},
];

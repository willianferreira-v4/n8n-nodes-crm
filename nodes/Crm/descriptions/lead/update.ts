import type { INodeProperties } from 'n8n-workflow';

export const leadUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Card ID',
		name: 'cardIdUpdate',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
				operation: ['updateLead'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getOwners',
		},
		default: '',
		description:
			'The owner for this lead. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Tenant Name or ID',
		name: 'tenantIdUpdate',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['updateLead'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getTenants',
		},
		default: '',
		description:
			'The tenant for this lead. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Channel',
		name: 'channelUpdate',
		type: 'hidden',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['updateLead'],
			},
		},
		default: '',
	},
	{
		displayName: 'Canal De Origem',
		name: 'originChannelIdUpdate',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['updateLead'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getOriginChannels',
		},
		default: '',
		description: 'Canal de origem do lead.',
	},
	{
		displayName: 'Canal De Aquisição',
		name: 'acquisitionChannelIdUpdate',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['updateLead'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getAcquisitionChannels',
		},
		default: '',
		description: 'Canal de aquisição do lead.',
	},
	{
		displayName: 'UTM Source',
		name: 'utmSourceUpdate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
				operation: ['updateLead'],
			},
		},
		default: '',
		description: 'Additional description for the lost reason',
	},
];

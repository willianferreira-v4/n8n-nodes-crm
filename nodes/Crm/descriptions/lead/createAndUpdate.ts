import type { INodeProperties } from 'n8n-workflow';
import {
	customFieldsOptions,
	leadReasonOptions,
	leadCohortOptions,
	leadTemperatureOptions,
	leadMeetingStatusOptions,
	leadFirstDestinationOptions,
	leadRevenueOptions,
	leadFoodSubnicheOptions,
	leadBrokerStatusOptions,
	leadSegmentOptions,
	leadMarketingProductsOptions,
	leadAcquisitionChannelOptions,
	leadLpRevenueOptions,
	leadLeadSourceOptions,
	leadOpportunitySourceOptions,
	leadOriginChannelOptions,
	leadBusinessModelOptions,
	leadBooleanFieldNames,
	leadDateFieldNames,
	leadDateTimeFieldNames,
	leadNumberFieldNames,
	leadTextFieldNames,
} from './options';

export const leadCreateAndUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Owner Name or ID',
		name: 'ownerIdCreateUpdate',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
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
		displayName: 'Coluna De Entrada Do Lead Name or ID',
		name: 'columnIdCreateUpdate',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getColumns',
		},
		default: '',
		description:
			'The column where the lead will be created. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Company Name',
		name: 'companyNameCreateUpdate',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
		displayName: 'Canal De Origem Name or ID',
		name: 'originChannelIdCreateUpdate',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getOriginChannels',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'Canal De Aquisição Name or ID',
		name: 'acquisitionChannelIdCreateUpdate',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['createAndUpdate'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getAcquisitionChannels',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	},
	{
		displayName: 'UTM Source',
		name: 'utmSourceCreateUpdate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
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
						options: customFieldsOptions,
						default: 'arquivado',
						description: 'The custom field to update',
					},
					// Boolean fields
					{
						displayName: 'Field Value',
						name: 'booleanValue',
						type: 'boolean',
						displayOptions: {
							show: {
								fieldName: leadBooleanFieldNames,
							},
						},
						default: false,
						description: 'Whether the field is true or false',
					},
					// Dropdown fields with options
					{
						displayName: 'Field Value',
						name: 'dropdownValue',
						type: 'options',
						displayOptions: {
							show: {
								fieldName: ['razao_da_desqualificacao'],
							},
						},
						options: leadReasonOptions,
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
						options: leadCohortOptions,
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
						options: leadTemperatureOptions,
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
						options: leadMeetingStatusOptions,
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
						options: leadFirstDestinationOptions,
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
						options: leadRevenueOptions,
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
						options: leadFoodSubnicheOptions,
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
						options: leadBrokerStatusOptions,
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
						options: leadSegmentOptions,
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
						options: leadMarketingProductsOptions,
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
						options: leadAcquisitionChannelOptions,
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
						options: leadLpRevenueOptions,
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
						options: leadLeadSourceOptions,
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
						options: leadOpportunitySourceOptions,
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
						options: leadOriginChannelOptions,
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
						options: leadBusinessModelOptions,
						default: 'Inside Sales',
					},
					// Date fields
					{
						displayName: 'Field Value',
						name: 'dateValue',
						type: 'dateTime',
						displayOptions: {
							show: {
								fieldName: leadDateFieldNames,
							},
						},
						default: '',
						description: 'The date value for the field',
					},
					// DateTime fields
					{
						displayName: 'Field Value',
						name: 'dateTimeValue',
						type: 'dateTime',
						displayOptions: {
							show: {
								fieldName: leadDateTimeFieldNames,
							},
						},
						default: '',
						description: 'The date/time value for the field',
					},
					// Number fields
					{
						displayName: 'Field Value',
						name: 'numberValue',
						type: 'number',
						displayOptions: {
							show: {
								fieldName: leadNumberFieldNames,
							},
						},
						default: 0,
						description: 'The numeric value for the field',
					},
					// Text fields (default for all others)
					{
						displayName: 'Field Value',
						name: 'textValue',
						type: 'string',
						displayOptions: {
							show: {
								fieldName: leadTextFieldNames,
							},
						},
						default: '',
						description: 'The text value for the field',
					},
				],
			},
		],
	},
];

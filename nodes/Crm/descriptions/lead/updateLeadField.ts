import type { INodeProperties } from 'n8n-workflow';
import {
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

export const leadUpdateFieldDescription: INodeProperties[] = [
	{
		displayName: 'Card ID',
		name: 'cardId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
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
				resource: ['lead'],
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

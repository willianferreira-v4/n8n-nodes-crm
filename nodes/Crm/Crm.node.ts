import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	IDataObject,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class Crm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CRM',
		name: 'crm',
		icon: 'file:crm.svg',
		group: ['transform'],
		version: 1,
		description: 'Create and update leads in CRM',
		defaults: {
			name: 'CRM',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'crmApi',
				required: true,
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
						name: 'Update Lead Field',
						value: 'updateLeadField',
						description: 'Update a custom field on a lead',
						action: 'Update a lead field',
					},
				],
				default: 'createLead',
			},

			// Create Lead fields
			{
				displayName: 'Owner ID',
				name: 'ownerId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['createLead'],
					},
				},
				default: '',
				description: 'The ID of the owner for this lead',
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
					{ name: 'Other', value: 'other' },
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

			// Create and Update Lead fields
			{
				displayName: 'Owner ID',
				name: 'ownerIdCreateUpdate',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['createAndUpdate'],
					},
				},
				default: '',
				description: 'The ID of the owner for this lead',
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
					{ name: 'Other', value: 'other' },
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
									{ name: 'Razão da Desqualificação', value: 'razao_da_desqualificacao' },
									{ name: 'Descrição da Desqualificação', value: 'descricao_da_desqualificacao' },
									{ name: 'Arquivado', value: 'arquivado' },
									{ name: 'Cohort', value: 'cohort' },
									{ name: 'Faturamento Mensal', value: 'faturamento_mensal' },
									{ name: 'Detalhes da qualificação', value: 'detalhes_da_qualificacao' },
									{ name: 'É SAO', value: 'e_sao' },
									{ name: 'Temperatura', value: 'temperatura' },
									{ name: 'Data de Fechamento Estimada', value: 'data_de_fechamento_estimada' },
									{ name: 'Data de Observações do BANT', value: 'data_de_observacoes_do_bant' },
									{ name: 'Qualidade da Reunião', value: 'qualidade_da_reuniao' },
									{ name: 'Justificativa', value: 'justificativa' },
									{ name: 'Descrição feita pelo lead', value: 'descricao_feita_pelo_lead' },
									{ name: 'Form name', value: 'form_name' },
									{ name: 'Page name', value: 'page_name' },
									{ name: 'Valor Leadbroker', value: 'valor_leadbroker' },
									{ name: 'Status da reunião', value: 'status_da_reuniao' },
									{ name: 'Data/hora da reunião', value: 'data_hora_da_reuniao' },
									{ name: 'Campaign id', value: 'campaign_id' },
									{ name: 'Adset id', value: 'adset_id' },
									{ name: 'Ad id', value: 'ad_id' },
									{ name: 'Fbclid', value: 'fbclid' },
									{ name: 'Gclid', value: 'gclid' },
									{ name: 'External id', value: 'external_id' },
									{ name: 'Session Id', value: 'session_id' },
									{ name: 'Client Id', value: 'client_id' },
									{ name: 'Fbp', value: 'fbp' },
									{ name: 'Fbc', value: 'fbc' },
									{ name: 'Session Number', value: 'session_number' },
									{ name: 'FB Lead Id', value: 'fb_lead_id' },
									{ name: 'Id de Resposta do Formulário', value: 'id_de_resposta_do_formulario' },
									{ name: 'Nome da Campanha de Email', value: 'nome_da_campanha_de_email' },
									{ name: 'Id da Campanha de Email', value: 'id_da_campanha_de_email' },
									{ name: 'IP do Cadastro', value: 'ip_do_cadastro' },
									{ name: 'Subnicho V4 Food', value: 'subnicho_v4_food' },
									{ name: 'Primeiro destino', value: 'primeiro_destino' },
									{ name: 'Data de Cadastro', value: 'data_de_cadastro' },
									{ name: 'Sem Roteamento', value: 'sem_roteamento' },
									{ name: 'Cargo', value: 'cargo' },
									{ name: 'Urgência', value: 'urgencia' },
									{ name: 'Franquia CSC', value: 'franquia_csc' },
									{ name: 'Franquia CSC Oportunidade', value: 'franquia_csc_oportunidade' },
									{ name: 'ID Franquia CSC', value: 'id_franquia_csc' },
									{ name: 'Status Leadbroker', value: 'status_leadbroker' },
									{ name: 'Enviar para o Deal Broker', value: 'enviar_para_o_deal_broker' },
									{ name: 'Segmento', value: 'segmento' },
									{ name: 'CSC', value: 'csc' },
									{ name: 'CSC Oportunidade', value: 'csc_oportunidade' },
									{ name: 'Observações', value: 'observacoes' },
									{ name: 'Produtos Marketing', value: 'produtos_marketing' },
									{ name: 'Canal de Aquisição', value: 'canal_de_aquisicao' },
									{ name: 'Faturamento da LP', value: 'faturamento_da_lp' },
									{ name: 'ID Franquia Oportunidade', value: 'id_franquia_oportunidade' },
									{ name: 'Fonte do Lead', value: 'fonte_do_lead' },
									{ name: 'Fonte da Oportunidade', value: 'fonte_da_oportunidade' },
									{ name: 'Canal de Origem', value: 'canal_de_origem' },
									{ name: 'Modelo de Negócios', value: 'modelo_de_negocios' },
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
								description: 'The boolean value for the field',
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
								options: [
									{ name: 'Adolescente/Criança', value: 'Adolescente/Criança' },
									{ name: 'Blocklist', value: 'Blocklist' },
									{ name: 'Sem budget', value: 'Sem budget' },
									{ name: 'Sem necessidade', value: 'Sem necessidade' },
									{ name: 'Cliente oculto', value: 'Cliente oculto' },
									{ name: 'Sem autoridade', value: 'Sem autoridade' },
									{ name: 'Cliente', value: 'Cliente' },
									{ name: 'Ex-cliente (detrator)', value: 'Ex-cliente (detrator)' },
									{ name: 'Pessoa Física', value: 'Pessoa Física' },
									{ name: 'Engano/Não Lembra', value: 'Engano/Não Lembra' },
									{ name: 'Deixou de responder', value: 'Deixou de responder' },
									{ name: 'Nunca respondeu', value: 'Nunca respondeu' },
									{ name: 'Sem timing', value: 'Sem timing' },
									{ name: 'Serviço fora de escopo', value: 'Serviço fora de escopo' },
									{ name: 'Duplicado', value: 'Duplicado' },
									{ name: 'Contatos inválidos', value: 'Contatos inválidos' },
									{ name: 'Sem interesse', value: 'Sem interesse' },
									{ name: 'SPAM', value: 'SPAM' },
									{ name: 'Não ICP', value: 'Não ICP' },
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
									{ name: 'Real State', value: 'Real State' },
									{ name: 'Retail', value: 'Retail' },
									{ name: 'Service B2C Multilocation', value: 'Service B2C Multilocation' },
									{ name: 'Solar Energy / Electric Power', value: 'Solar Energy / Electric Power' },
									{ name: 'TELCO', value: 'TELCO' },
									{ name: 'Outros', value: 'Outros' },
									{ name: 'Service B2B Multilocation', value: 'Service B2B Multilocation' },
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
									{ name: 'Falta marcar', value: 'Falta marcar' },
									{ name: 'Falta acontecer', value: 'Falta acontecer' },
									{ name: 'Aconteceu', value: 'Aconteceu' },
									{ name: 'No show', value: 'No show' },
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
									{ name: 'Até 50 mil', value: 'Até 50 mil' },
									{ name: 'De 51 mil à 70 mil', value: 'De 51 mil à 70 mil' },
									{ name: 'De 71 mil à 100 mil', value: 'De 71 mil à 100 mil' },
									{ name: 'De 101 mil à 200 mil', value: 'De 101 mil à 200 mil' },
									{ name: 'De 201 mil à 400 mil', value: 'De 201 mil à 400 mil' },
									{ name: 'De 101 mil à 400 mil', value: 'De 101 mil à 400 mil' },
									{ name: 'De 401 mil à 1 milhão', value: 'De 401 mil à 1 milhão' },
									{ name: 'De 1 à 4 milhões', value: 'De 1 à 4 milhões' },
									{ name: 'De 4 à 16 milhões', value: 'De 4 à 16 milhões' },
									{ name: 'De 16 à 40 milhões', value: 'De 16 à 40 milhões' },
									{ name: 'Mais de 40 milhões', value: 'Mais de 40 milhões' },
									{ name: 'Until $10K', value: 'Until $10K' },
									{ name: 'From $11K to $20K', value: 'From $11K to $20K' },
									{ name: 'From $21K to $30K', value: 'From $21K to $30K' },
									{ name: 'From $31K to $40K', value: 'From $31K to $40K' },
									{ name: 'From $41K to $50K', value: 'From $41K to $50K' },
									{ name: 'From $51K to $70K', value: 'From $51K to $70K' },
									{ name: 'From $71K to $100K', value: 'From $71K to $100K' },
									{ name: 'From $101K to $200K', value: 'From $101K to $200K' },
									{ name: 'From $201K to $400K', value: 'From $201K to $400K' },
									{ name: 'From $401K to $1M', value: 'From $401K to $1M' },
									{ name: 'More than $1M', value: 'More than $1M' },
									{ name: 'From $1M to $4M', value: 'From $1M to $4M' },
									{ name: 'From $4M to $16M', value: 'From $4M to $16M' },
									{ name: 'From $16M to $40M', value: 'From $16M to $40M' },
									{ name: 'More than $40M', value: 'More than $40M' },
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
									{ name: 'Lanchonete e Hamburgueria', value: 'Lanchonete e Hamburgueria' },
									{ name: 'Culinária Japonesa', value: 'Culinária Japonesa' },
									{ name: 'Pizzaria e Esfiharia', value: 'Pizzaria e Esfiharia' },
									{ name: 'Cozinha Internacional', value: 'Cozinha Internacional' },
									{ name: 'Açaí e Sorvetes', value: 'Açaí e Sorvetes' },
									{
										name: 'Marmitaria e Comida Brasileira',
										value: 'Marmitaria e Comida Brasileira',
									},
									{ name: 'Comida Saudável', value: 'Comida Saudável' },
									{ name: 'Doces e Sobremesas', value: 'Doces e Sobremesas' },
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
									{ name: 'Leilão', value: 'Leilão' },
									{ name: 'Lead Não Comprado', value: 'Lead Não Comprado' },
									{ name: 'Black Box', value: 'Black Box' },
									{ name: 'Não Leiloado', value: 'Não Leiloado' },
									{ name: 'Staage', value: 'Staage' },
									{ name: 'Lead Comprado', value: 'Lead Comprado' },
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
									{ name: 'Serviço', value: 'Serviço' },
									{ name: 'Varejo', value: 'Varejo' },
									{ name: 'Indústria', value: 'Indústria' },
									{ name: 'E-commerce', value: 'E-commerce' },
									{ name: 'Food Service', value: 'Food Service' },
									{ name: 'Educação', value: 'Educação' },
									{ name: 'Imobiliária', value: 'Imobiliária' },
									{ name: 'SAAS', value: 'SAAS' },
									{ name: 'Finanças', value: 'Finanças' },
									{ name: 'Franquia / Franchising', value: 'Franquia / Franchising' },
									{ name: 'Telecom', value: 'Telecom' },
									{ name: 'Energia Solar', value: 'Energia Solar' },
									{ name: 'Turismo', value: 'Turismo' },
									{ name: 'Outro', value: 'Outro' },
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
									{ name: 'Soluções Comerciais', value: 'Soluções Comerciais' },
									{ name: 'Estruturação Estratégica', value: 'Estruturação Estratégica' },
									{ name: 'Assessoria', value: 'Assessoria' },
									{ name: 'MVP USA', value: 'MVP USA' },
									{
										name: 'Assessoria Recuperado Hyperflow',
										value: 'Assessoria Recuperado Hyperflow',
									},
									{ name: 'Blackbox', value: 'Blackbox' },
									{ name: 'Auditoria Growth', value: 'Auditoria Growth' },
									{ name: 'O Único Plano', value: 'O Único Plano' },
									{ name: 'Alavancagem Comercial', value: 'Alavancagem Comercial' },
									{ name: 'Vender Gera Equity', value: 'Vender Gera Equity' },
									{ name: 'A Alavanca', value: 'A Alavanca' },
									{ name: 'Masterclass GdM', value: 'Masterclass GdM' },
									{ name: 'Treinamento Comercial', value: 'Treinamento Comercial' },
									{ name: 'Mentoria GT', value: 'Mentoria GT' },
									{ name: 'V4 Food', value: 'V4 Food' },
									{ name: 'RPE', value: 'RPE' },
									{ name: 'Material Rico', value: 'Material Rico' },
									{ name: 'ROI System', value: 'ROI System' },
									{
										name: 'Gabarito de Recordes de Vendas',
										value: 'Gabarito de Recordes de Vendas',
									},
									{ name: 'Mesa4X', value: 'Mesa4X' },
									{ name: 'Bday 2025', value: 'Bday 2025' },
									{ name: 'V4 Marketing', value: 'V4 Marketing' },
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
									{ name: 'Leadbroker', value: 'Leadbroker' },
									{ name: 'Blackbox', value: 'Blackbox' },
									{ name: 'Meetingbroker', value: 'Meetingbroker' },
									{ name: 'LP Matriz', value: 'LP Matriz' },
									{ name: 'LP Franquia', value: 'LP Franquia' },
									{ name: 'Prospecção Fria', value: 'Prospecção Fria' },
									{ name: 'Eventos', value: 'Eventos' },
									{ name: 'Indicação', value: 'Indicação' },
									{ name: 'Recomendação', value: 'Recomendação' },
									{ name: 'ABM', value: 'ABM' },
									{ name: 'Networking', value: 'Networking' },
									{ name: 'Reativação', value: 'Reativação' },
									{ name: 'Inside Box', value: 'Inside Box' },
									{ name: 'Food Box', value: 'Food Box' },
									{ name: 'Pandora Box', value: 'Pandora Box' },
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
									{ name: 'Até 50 mil', value: 'Até 50 mil' },
									{ name: 'De 51 mil à 70 mil', value: 'De 51 mil à 70 mil' },
									{ name: 'De 71 mil à 100 mil', value: 'De 71 mil à 100 mil' },
									{ name: 'De 101 mil à 200 mil', value: 'De 101 mil à 200 mil' },
									{ name: 'De 201 mil à 400 mil', value: 'De 201 mil à 400 mil' },
									{ name: 'De 101 mil à 400 mil', value: 'De 101 mil à 400 mil' },
									{ name: 'De 401 mil à 1 milhão', value: 'De 401 mil à 1 milhão' },
									{ name: 'De 1 à 4 milhões', value: 'De 1 à 4 milhões' },
									{ name: 'De 4 à 16 milhões', value: 'De 4 à 16 milhões' },
									{ name: 'De 16 a 40 milhões', value: 'De 16 a 40 milhões' },
									{ name: 'Mais de 40 milhões', value: 'Mais de 40 milhões' },
									{ name: 'Until $10K', value: 'Until $10K' },
									{ name: 'From $11K to $20K', value: 'From $11K to $20K' },
									{ name: 'From $21K to $30K', value: 'From $21K to $30K' },
									{ name: 'From $31K to $40K', value: 'From $31K to $40K' },
									{ name: 'From $41K to $50K', value: 'From $41K to $50K' },
									{ name: 'From $51K to $70K', value: 'From $51K to $70K' },
									{ name: 'From $71K to $100K', value: 'From $71K to $100K' },
									{ name: 'From $101K to $200K', value: 'From $101K to $200K' },
									{ name: 'From $201K to $400K', value: 'From $201K to $400K' },
									{ name: 'From $401K to $1M', value: 'From $401K to $1M' },
									{ name: 'More than $1M', value: 'More than $1M' },
									{ name: 'From $1M to $4M', value: 'From $1M to $4M' },
									{ name: 'From $4M to $16M', value: 'From $4M to $16M' },
									{ name: 'From $16M to $40M', value: 'From $16M to $40M' },
									{ name: 'More than $40M', value: 'More than $40M' },
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
									{ name: 'Facebook', value: 'Facebook' },
									{ name: 'Google', value: 'Google' },
									{ name: 'Orgânico', value: 'Orgânico' },
									{ name: 'Institucional', value: 'Institucional' },
									{ name: 'Bing', value: 'Bing' },
									{ name: 'TikTok', value: 'TikTok' },
									{ name: 'LinkedIn', value: 'LinkedIn' },
									{ name: 'Twitter', value: 'Twitter' },
									{ name: 'Taboola', value: 'Taboola' },
									{ name: 'Embaixadores/Networking', value: 'Embaixadores/Networking' },
									{ name: 'Pinterest', value: 'Pinterest' },
									{ name: 'Programática', value: 'Programática' },
									{ name: 'Indicação de Parceiro', value: 'Indicação de Parceiro' },
									{ name: 'Indicação de Investidor', value: 'Indicação de Investidor' },
									{ name: 'Indicação de Franqueado', value: 'Indicação de Franqueado' },
									{ name: 'Recomendação Closer', value: 'Recomendação Closer' },
									{ name: 'Recomendação BDR/SDR', value: 'Recomendação BDR/SDR' },
									{ name: 'Lista de Leads Frios', value: 'Lista de Leads Frios' },
									{ name: 'Acelerador Empresarial', value: 'Acelerador Empresarial' },
									{ name: 'Equity+', value: 'Equity+' },
									{ name: 'Gestão 4.0', value: 'Gestão 4.0' },
									{
										name: 'Eventos em Parceria (não homologados na Matriz)',
										value: 'Eventos em Parceria (não homologados na Matriz)',
									},
									{
										name: 'Eventos Independentes (Regionais/Locais)',
										value: 'Eventos Independentes (Regionais/Locais)',
									},
									{ name: 'B coorporate', value: 'B coorporate' },
									{ name: 'Escola Franchising', value: 'Escola Franchising' },
									{ name: 'G4 Alumni', value: 'G4 Alumni' },
									{ name: 'G4 Gestão e Estratégia', value: 'G4 Gestão e Estratégia' },
									{ name: 'G4 Marketing e Growth', value: 'G4 Marketing e Growth' },
									{ name: 'G4 Sales', value: 'G4 Sales' },
									{ name: 'G4 Scale', value: 'G4 Scale' },
									{ name: 'G4 Traction', value: 'G4 Traction' },
									{ name: 'Goshen Land', value: 'Goshen Land' },
									{ name: 'Jotaja', value: 'Jotaja' },
									{ name: 'Luminare', value: 'Luminare' },
									{ name: 'Multiplix', value: 'Multiplix' },
									{ name: 'Open Mind', value: 'Open Mind' },
									{ name: 'RGV', value: 'RGV' },
									{ name: 'Scale', value: 'Scale' },
									{ name: 'Scale Company', value: 'Scale Company' },
									{ name: 'Scale Up', value: 'Scale Up' },
									{ name: 'Seja Ap', value: 'Seja Ap' },
									{ name: 'SME', value: 'SME' },
									{ name: 'Vende C', value: 'Vende C' },
									{ name: 'Acelerador Experience', value: 'Acelerador Experience' },
									{ name: 'Independente', value: 'Independente' },
									{ name: 'Campanha de Recuperação', value: 'Campanha de Recuperação' },
									{ name: 'Reddit', value: 'Reddit' },
									{ name: 'Reativação', value: 'Reativação' },
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
									{ name: 'Inside Sales', value: 'Inside Sales' },
									{ name: 'PDV - Varejo/Retail', value: 'PDV - Varejo/Retail' },
									{ name: 'Infoproduto/Educação Perpétuo', value: 'Infoproduto/Educação Perpétuo' },
									{ name: 'Lançamento', value: 'Lançamento' },
									{ name: 'Aplicativo (PLG)', value: 'Aplicativo (PLG)' },
									{ name: 'E-commerce', value: 'E-commerce' },
									{ name: 'Food Service', value: 'Food Service' },
								],
								default: 'Inside Sales',
							},
							// Date fields
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
							// DateTime fields
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
							// Number fields
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
							// Text fields (default for all others)
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

			// Update Lead Field fields
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
									{ name: 'Razão da Desqualificação', value: 'razao_da_desqualificacao' },
									{ name: 'Descrição da Desqualificação', value: 'descricao_da_desqualificacao' },
									{ name: 'Arquivado', value: 'arquivado' },
									{ name: 'Cohort', value: 'cohort' },
									{ name: 'Faturamento Mensal', value: 'faturamento_mensal' },
									{ name: 'Detalhes da qualificação', value: 'detalhes_da_qualificacao' },
									{ name: 'É SAO', value: 'e_sao' },
									{ name: 'Temperatura', value: 'temperatura' },
									{ name: 'Data de Fechamento Estimada', value: 'data_de_fechamento_estimada' },
									{ name: 'Data de Observações do BANT', value: 'data_de_observacoes_do_bant' },
									{ name: 'Qualidade da Reunião', value: 'qualidade_da_reuniao' },
									{ name: 'Justificativa', value: 'justificativa' },
									{ name: 'Descrição feita pelo lead', value: 'descricao_feita_pelo_lead' },
									{ name: 'Form name', value: 'form_name' },
									{ name: 'Page name', value: 'page_name' },
									{ name: 'Valor Leadbroker', value: 'valor_leadbroker' },
									{ name: 'Status da reunião', value: 'status_da_reuniao' },
									{ name: 'Data/hora da reunião', value: 'data_hora_da_reuniao' },
									{ name: 'Campaign id', value: 'campaign_id' },
									{ name: 'Adset id', value: 'adset_id' },
									{ name: 'Ad id', value: 'ad_id' },
									{ name: 'Fbclid', value: 'fbclid' },
									{ name: 'Gclid', value: 'gclid' },
									{ name: 'External id', value: 'external_id' },
									{ name: 'Session Id', value: 'session_id' },
									{ name: 'Client Id', value: 'client_id' },
									{ name: 'Fbp', value: 'fbp' },
									{ name: 'Fbc', value: 'fbc' },
									{ name: 'Session Number', value: 'session_number' },
									{ name: 'FB Lead Id', value: 'fb_lead_id' },
									{ name: 'Id de Resposta do Formulário', value: 'id_de_resposta_do_formulario' },
									{ name: 'Nome da Campanha de Email', value: 'nome_da_campanha_de_email' },
									{ name: 'Id da Campanha de Email', value: 'id_da_campanha_de_email' },
									{ name: 'IP do Cadastro', value: 'ip_do_cadastro' },
									{ name: 'Subnicho V4 Food', value: 'subnicho_v4_food' },
									{ name: 'Primeiro destino', value: 'primeiro_destino' },
									{ name: 'Data de Cadastro', value: 'data_de_cadastro' },
									{ name: 'Sem Roteamento', value: 'sem_roteamento' },
									{ name: 'Cargo', value: 'cargo' },
									{ name: 'Urgência', value: 'urgencia' },
									{ name: 'Franquia CSC', value: 'franquia_csc' },
									{ name: 'Franquia CSC Oportunidade', value: 'franquia_csc_oportunidade' },
									{ name: 'ID Franquia CSC', value: 'id_franquia_csc' },
									{ name: 'Status Leadbroker', value: 'status_leadbroker' },
									{ name: 'Enviar para o Deal Broker', value: 'enviar_para_o_deal_broker' },
									{ name: 'Segmento', value: 'segmento' },
									{ name: 'CSC', value: 'csc' },
									{ name: 'CSC Oportunidade', value: 'csc_oportunidade' },
									{ name: 'Observações', value: 'observacoes' },
									{ name: 'Produtos Marketing', value: 'produtos_marketing' },
									{ name: 'Canal de Aquisição', value: 'canal_de_aquisicao' },
									{ name: 'Faturamento da LP', value: 'faturamento_da_lp' },
									{ name: 'ID Franquia Oportunidade', value: 'id_franquia_oportunidade' },
									{ name: 'Fonte do Lead', value: 'fonte_do_lead' },
									{ name: 'Fonte da Oportunidade', value: 'fonte_da_oportunidade' },
									{ name: 'Canal de Origem', value: 'canal_de_origem' },
									{ name: 'Modelo de Negócios', value: 'modelo_de_negocios' },
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
								description: 'The boolean value for the field',
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
								options: [
									{ name: 'Adolescente/Criança', value: 'Adolescente/Criança' },
									{ name: 'Blocklist', value: 'Blocklist' },
									{ name: 'Sem budget', value: 'Sem budget' },
									{ name: 'Sem necessidade', value: 'Sem necessidade' },
									{ name: 'Cliente oculto', value: 'Cliente oculto' },
									{ name: 'Sem autoridade', value: 'Sem autoridade' },
									{ name: 'Cliente', value: 'Cliente' },
									{ name: 'Ex-cliente (detrator)', value: 'Ex-cliente (detrator)' },
									{ name: 'Pessoa Física', value: 'Pessoa Física' },
									{ name: 'Engano/Não Lembra', value: 'Engano/Não Lembra' },
									{ name: 'Deixou de responder', value: 'Deixou de responder' },
									{ name: 'Nunca respondeu', value: 'Nunca respondeu' },
									{ name: 'Sem timing', value: 'Sem timing' },
									{ name: 'Serviço fora de escopo', value: 'Serviço fora de escopo' },
									{ name: 'Duplicado', value: 'Duplicado' },
									{ name: 'Contatos inválidos', value: 'Contatos inválidos' },
									{ name: 'Sem interesse', value: 'Sem interesse' },
									{ name: 'SPAM', value: 'SPAM' },
									{ name: 'Não ICP', value: 'Não ICP' },
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
									{ name: 'Real State', value: 'Real State' },
									{ name: 'Retail', value: 'Retail' },
									{ name: 'Service B2C Multilocation', value: 'Service B2C Multilocation' },
									{ name: 'Solar Energy / Electric Power', value: 'Solar Energy / Electric Power' },
									{ name: 'TELCO', value: 'TELCO' },
									{ name: 'Outros', value: 'Outros' },
									{ name: 'Service B2B Multilocation', value: 'Service B2B Multilocation' },
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
									{ name: 'Falta marcar', value: 'Falta marcar' },
									{ name: 'Falta acontecer', value: 'Falta acontecer' },
									{ name: 'Aconteceu', value: 'Aconteceu' },
									{ name: 'No show', value: 'No show' },
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
									{ name: 'Até 50 mil', value: 'Até 50 mil' },
									{ name: 'De 51 mil à 70 mil', value: 'De 51 mil à 70 mil' },
									{ name: 'De 71 mil à 100 mil', value: 'De 71 mil à 100 mil' },
									{ name: 'De 101 mil à 200 mil', value: 'De 101 mil à 200 mil' },
									{ name: 'De 201 mil à 400 mil', value: 'De 201 mil à 400 mil' },
									{ name: 'De 101 mil à 400 mil', value: 'De 101 mil à 400 mil' },
									{ name: 'De 401 mil à 1 milhão', value: 'De 401 mil à 1 milhão' },
									{ name: 'De 1 à 4 milhões', value: 'De 1 à 4 milhões' },
									{ name: 'De 4 à 16 milhões', value: 'De 4 à 16 milhões' },
									{ name: 'De 16 à 40 milhões', value: 'De 16 à 40 milhões' },
									{ name: 'Mais de 40 milhões', value: 'Mais de 40 milhões' },
									{ name: 'Until $10K', value: 'Until $10K' },
									{ name: 'From $11K to $20K', value: 'From $11K to $20K' },
									{ name: 'From $21K to $30K', value: 'From $21K to $30K' },
									{ name: 'From $31K to $40K', value: 'From $31K to $40K' },
									{ name: 'From $41K to $50K', value: 'From $41K to $50K' },
									{ name: 'From $51K to $70K', value: 'From $51K to $70K' },
									{ name: 'From $71K to $100K', value: 'From $71K to $100K' },
									{ name: 'From $101K to $200K', value: 'From $101K to $200K' },
									{ name: 'From $201K to $400K', value: 'From $201K to $400K' },
									{ name: 'From $401K to $1M', value: 'From $401K to $1M' },
									{ name: 'More than $1M', value: 'More than $1M' },
									{ name: 'From $1M to $4M', value: 'From $1M to $4M' },
									{ name: 'From $4M to $16M', value: 'From $4M to $16M' },
									{ name: 'From $16M to $40M', value: 'From $16M to $40M' },
									{ name: 'More than $40M', value: 'More than $40M' },
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
									{ name: 'Lanchonete e Hamburgueria', value: 'Lanchonete e Hamburgueria' },
									{ name: 'Culinária Japonesa', value: 'Culinária Japonesa' },
									{ name: 'Pizzaria e Esfiharia', value: 'Pizzaria e Esfiharia' },
									{ name: 'Cozinha Internacional', value: 'Cozinha Internacional' },
									{ name: 'Açaí e Sorvetes', value: 'Açaí e Sorvetes' },
									{
										name: 'Marmitaria e Comida Brasileira',
										value: 'Marmitaria e Comida Brasileira',
									},
									{ name: 'Comida Saudável', value: 'Comida Saudável' },
									{ name: 'Doces e Sobremesas', value: 'Doces e Sobremesas' },
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
									{ name: 'Leilão', value: 'Leilão' },
									{ name: 'Lead Não Comprado', value: 'Lead Não Comprado' },
									{ name: 'Black Box', value: 'Black Box' },
									{ name: 'Não Leiloado', value: 'Não Leiloado' },
									{ name: 'Staage', value: 'Staage' },
									{ name: 'Lead Comprado', value: 'Lead Comprado' },
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
									{ name: 'Serviço', value: 'Serviço' },
									{ name: 'Varejo', value: 'Varejo' },
									{ name: 'Indústria', value: 'Indústria' },
									{ name: 'E-commerce', value: 'E-commerce' },
									{ name: 'Food Service', value: 'Food Service' },
									{ name: 'Educação', value: 'Educação' },
									{ name: 'Imobiliária', value: 'Imobiliária' },
									{ name: 'SAAS', value: 'SAAS' },
									{ name: 'Finanças', value: 'Finanças' },
									{ name: 'Franquia / Franchising', value: 'Franquia / Franchising' },
									{ name: 'Telecom', value: 'Telecom' },
									{ name: 'Energia Solar', value: 'Energia Solar' },
									{ name: 'Turismo', value: 'Turismo' },
									{ name: 'Outro', value: 'Outro' },
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
									{ name: 'Soluções Comerciais', value: 'Soluções Comerciais' },
									{ name: 'Estruturação Estratégica', value: 'Estruturação Estratégica' },
									{ name: 'Assessoria', value: 'Assessoria' },
									{ name: 'MVP USA', value: 'MVP USA' },
									{
										name: 'Assessoria Recuperado Hyperflow',
										value: 'Assessoria Recuperado Hyperflow',
									},
									{ name: 'Blackbox', value: 'Blackbox' },
									{ name: 'Auditoria Growth', value: 'Auditoria Growth' },
									{ name: 'O Único Plano', value: 'O Único Plano' },
									{ name: 'Alavancagem Comercial', value: 'Alavancagem Comercial' },
									{ name: 'Vender Gera Equity', value: 'Vender Gera Equity' },
									{ name: 'A Alavanca', value: 'A Alavanca' },
									{ name: 'Masterclass GdM', value: 'Masterclass GdM' },
									{ name: 'Treinamento Comercial', value: 'Treinamento Comercial' },
									{ name: 'Mentoria GT', value: 'Mentoria GT' },
									{ name: 'V4 Food', value: 'V4 Food' },
									{ name: 'RPE', value: 'RPE' },
									{ name: 'Material Rico', value: 'Material Rico' },
									{ name: 'ROI System', value: 'ROI System' },
									{
										name: 'Gabarito de Recordes de Vendas',
										value: 'Gabarito de Recordes de Vendas',
									},
									{ name: 'Mesa4X', value: 'Mesa4X' },
									{ name: 'Bday 2025', value: 'Bday 2025' },
									{ name: 'V4 Marketing', value: 'V4 Marketing' },
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
									{ name: 'Leadbroker', value: 'Leadbroker' },
									{ name: 'Blackbox', value: 'Blackbox' },
									{ name: 'Meetingbroker', value: 'Meetingbroker' },
									{ name: 'LP Matriz', value: 'LP Matriz' },
									{ name: 'LP Franquia', value: 'LP Franquia' },
									{ name: 'Prospecção Fria', value: 'Prospecção Fria' },
									{ name: 'Eventos', value: 'Eventos' },
									{ name: 'Indicação', value: 'Indicação' },
									{ name: 'Recomendação', value: 'Recomendação' },
									{ name: 'ABM', value: 'ABM' },
									{ name: 'Networking', value: 'Networking' },
									{ name: 'Reativação', value: 'Reativação' },
									{ name: 'Inside Box', value: 'Inside Box' },
									{ name: 'Food Box', value: 'Food Box' },
									{ name: 'Pandora Box', value: 'Pandora Box' },
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
									{ name: 'Até 50 mil', value: 'Até 50 mil' },
									{ name: 'De 51 mil à 70 mil', value: 'De 51 mil à 70 mil' },
									{ name: 'De 71 mil à 100 mil', value: 'De 71 mil à 100 mil' },
									{ name: 'De 101 mil à 200 mil', value: 'De 101 mil à 200 mil' },
									{ name: 'De 201 mil à 400 mil', value: 'De 201 mil à 400 mil' },
									{ name: 'De 101 mil à 400 mil', value: 'De 101 mil à 400 mil' },
									{ name: 'De 401 mil à 1 milhão', value: 'De 401 mil à 1 milhão' },
									{ name: 'De 1 à 4 milhões', value: 'De 1 à 4 milhões' },
									{ name: 'De 4 à 16 milhões', value: 'De 4 à 16 milhões' },
									{ name: 'De 16 a 40 milhões', value: 'De 16 a 40 milhões' },
									{ name: 'Mais de 40 milhões', value: 'Mais de 40 milhões' },
									{ name: 'Until $10K', value: 'Until $10K' },
									{ name: 'From $11K to $20K', value: 'From $11K to $20K' },
									{ name: 'From $21K to $30K', value: 'From $21K to $30K' },
									{ name: 'From $31K to $40K', value: 'From $31K to $40K' },
									{ name: 'From $41K to $50K', value: 'From $41K to $50K' },
									{ name: 'From $51K to $70K', value: 'From $51K to $70K' },
									{ name: 'From $71K to $100K', value: 'From $71K to $100K' },
									{ name: 'From $101K to $200K', value: 'From $101K to $200K' },
									{ name: 'From $201K to $400K', value: 'From $201K to $400K' },
									{ name: 'From $401K to $1M', value: 'From $401K to $1M' },
									{ name: 'More than $1M', value: 'More than $1M' },
									{ name: 'From $1M to $4M', value: 'From $1M to $4M' },
									{ name: 'From $4M to $16M', value: 'From $4M to $16M' },
									{ name: 'From $16M to $40M', value: 'From $16M to $40M' },
									{ name: 'More than $40M', value: 'More than $40M' },
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
									{ name: 'Facebook', value: 'Facebook' },
									{ name: 'Google', value: 'Google' },
									{ name: 'Orgânico', value: 'Orgânico' },
									{ name: 'Institucional', value: 'Institucional' },
									{ name: 'Bing', value: 'Bing' },
									{ name: 'TikTok', value: 'TikTok' },
									{ name: 'LinkedIn', value: 'LinkedIn' },
									{ name: 'Twitter', value: 'Twitter' },
									{ name: 'Taboola', value: 'Taboola' },
									{ name: 'Embaixadores/Networking', value: 'Embaixadores/Networking' },
									{ name: 'Pinterest', value: 'Pinterest' },
									{ name: 'Programática', value: 'Programática' },
									{ name: 'Indicação de Parceiro', value: 'Indicação de Parceiro' },
									{ name: 'Indicação de Investidor', value: 'Indicação de Investidor' },
									{ name: 'Indicação de Franqueado', value: 'Indicação de Franqueado' },
									{ name: 'Recomendação Closer', value: 'Recomendação Closer' },
									{ name: 'Recomendação BDR/SDR', value: 'Recomendação BDR/SDR' },
									{ name: 'Lista de Leads Frios', value: 'Lista de Leads Frios' },
									{ name: 'Acelerador Empresarial', value: 'Acelerador Empresarial' },
									{ name: 'Equity+', value: 'Equity+' },
									{ name: 'Gestão 4.0', value: 'Gestão 4.0' },
									{
										name: 'Eventos em Parceria (não homologados na Matriz)',
										value: 'Eventos em Parceria (não homologados na Matriz)',
									},
									{
										name: 'Eventos Independentes (Regionais/Locais)',
										value: 'Eventos Independentes (Regionais/Locais)',
									},
									{ name: 'B coorporate', value: 'B coorporate' },
									{ name: 'Escola Franchising', value: 'Escola Franchising' },
									{ name: 'G4 Alumni', value: 'G4 Alumni' },
									{ name: 'G4 Gestão e Estratégia', value: 'G4 Gestão e Estratégia' },
									{ name: 'G4 Marketing e Growth', value: 'G4 Marketing e Growth' },
									{ name: 'G4 Sales', value: 'G4 Sales' },
									{ name: 'G4 Scale', value: 'G4 Scale' },
									{ name: 'G4 Traction', value: 'G4 Traction' },
									{ name: 'Goshen Land', value: 'Goshen Land' },
									{ name: 'Jotaja', value: 'Jotaja' },
									{ name: 'Luminare', value: 'Luminare' },
									{ name: 'Multiplix', value: 'Multiplix' },
									{ name: 'Open Mind', value: 'Open Mind' },
									{ name: 'RGV', value: 'RGV' },
									{ name: 'Scale', value: 'Scale' },
									{ name: 'Scale Company', value: 'Scale Company' },
									{ name: 'Scale Up', value: 'Scale Up' },
									{ name: 'Seja Ap', value: 'Seja Ap' },
									{ name: 'SME', value: 'SME' },
									{ name: 'Vende C', value: 'Vende C' },
									{ name: 'Acelerador Experience', value: 'Acelerador Experience' },
									{ name: 'Independente', value: 'Independente' },
									{ name: 'Campanha de Recuperação', value: 'Campanha de Recuperação' },
									{ name: 'Reddit', value: 'Reddit' },
									{ name: 'Reativação', value: 'Reativação' },
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
									{ name: 'Inside Sales', value: 'Inside Sales' },
									{ name: 'PDV - Varejo/Retail', value: 'PDV - Varejo/Retail' },
									{ name: 'Infoproduto/Educação Perpétuo', value: 'Infoproduto/Educação Perpétuo' },
									{ name: 'Lançamento', value: 'Lançamento' },
									{ name: 'Aplicativo (PLG)', value: 'Aplicativo (PLG)' },
									{ name: 'E-commerce', value: 'E-commerce' },
									{ name: 'Food Service', value: 'Food Service' },
								],
								default: 'Inside Sales',
							},
							// Date fields
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
							// DateTime fields
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
							// Number fields
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
							// Text fields (default for all others)
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
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('crmApi');
		const apiUrl = credentials.apiUrl as string;
		const clientId = credentials.clientId as string;
		const clientSecret = credentials.clientSecret as string;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const operation = this.getNodeParameter('operation', itemIndex) as string;

				if (operation === 'createLead') {
					const createLeadUrl = credentials.createLeadUrl as string;
					const ownerId = this.getNodeParameter('ownerId', itemIndex) as string;
					const companyName = this.getNodeParameter('companyName', itemIndex) as string;
					const title = this.getNodeParameter('title', itemIndex) as string;
					const email = this.getNodeParameter('email', itemIndex, '') as string;
					const phone = this.getNodeParameter('phone', itemIndex, '') as string;
					const taxId = this.getNodeParameter('taxId', itemIndex, '') as string;
					const companyNationality = this.getNodeParameter(
						'companyNationality',
						itemIndex,
						'',
					) as string;
					const utmSource = this.getNodeParameter('utmSource', itemIndex, '') as string;
					const utmCampaign = this.getNodeParameter('utmCampaign', itemIndex, '') as string;
					const utmContent = this.getNodeParameter('utmContent', itemIndex, '') as string;
					const utmMedium = this.getNodeParameter('utmMedium', itemIndex, '') as string;
					const utmTerm = this.getNodeParameter('utmTerm', itemIndex, '') as string;
					const sourcePage = this.getNodeParameter('sourcePage', itemIndex, '') as string;

					const body: IDataObject = {
						ownerId,
						companyName,
						title,
					};

					if (email) body.email = email;
					if (phone) body.phone = phone;
					if (taxId) body.taxId = taxId;
					if (companyNationality) body.companyNationality = companyNationality;
					if (utmSource) body.utmSource = utmSource;
					if (utmCampaign) body.utmCampaign = utmCampaign;
					if (utmContent) body.utmContent = utmContent;
					if (utmMedium) body.utmMedium = utmMedium;
					if (utmTerm) body.utmTerm = utmTerm;
					if (sourcePage) body.sourcePage = sourcePage;

					const options: IHttpRequestOptions = {
						method: 'POST',
						url: `${apiUrl}${createLeadUrl}`,
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
				} else if (operation === 'createAndUpdate') {
					const createLeadUrl = credentials.createLeadUrl as string;
					const updateLeadUrl = credentials.updateLeadUrl as string;

					// Get create lead parameters
					const ownerId = this.getNodeParameter('ownerIdCreateUpdate', itemIndex) as string;
					const companyName = this.getNodeParameter('companyNameCreateUpdate', itemIndex) as string;
					const title = this.getNodeParameter('titleCreateUpdate', itemIndex) as string;
					const email = this.getNodeParameter('emailCreateUpdate', itemIndex, '') as string;
					const phone = this.getNodeParameter('phoneCreateUpdate', itemIndex, '') as string;
					const taxId = this.getNodeParameter('taxIdCreateUpdate', itemIndex, '') as string;
					const companyNationality = this.getNodeParameter(
						'companyNationalityCreateUpdate',
						itemIndex,
						'',
					) as string;
					const utmSource = this.getNodeParameter('utmSourceCreateUpdate', itemIndex, '') as string;
					const utmCampaign = this.getNodeParameter(
						'utmCampaignCreateUpdate',
						itemIndex,
						'',
					) as string;
					const utmContent = this.getNodeParameter(
						'utmContentCreateUpdate',
						itemIndex,
						'',
					) as string;
					const utmMedium = this.getNodeParameter('utmMediumCreateUpdate', itemIndex, '') as string;
					const utmTerm = this.getNodeParameter('utmTermCreateUpdate', itemIndex, '') as string;
					const sourcePage = this.getNodeParameter(
						'sourcePageCreateUpdate',
						itemIndex,
						'',
					) as string;

					// Build create lead body
					const createBody: IDataObject = {
						ownerId,
						companyName,
						title,
					};

					if (email) createBody.email = email;
					if (phone) createBody.phone = phone;
					if (taxId) createBody.taxId = taxId;
					if (companyNationality) createBody.companyNationality = companyNationality;
					if (utmSource) createBody.utmSource = utmSource;
					if (utmCampaign) createBody.utmCampaign = utmCampaign;
					if (utmContent) createBody.utmContent = utmContent;
					if (utmMedium) createBody.utmMedium = utmMedium;
					if (utmTerm) createBody.utmTerm = utmTerm;
					if (sourcePage) createBody.sourcePage = sourcePage;

					// Create the lead
					const createOptions: IHttpRequestOptions = {
						method: 'POST',
						url: `${apiUrl}${createLeadUrl}`,
						headers: {
							'x-client-id': clientId,
							'x-client-secret': clientSecret,
							'Content-Type': 'application/json',
						},
						body: createBody,
						json: true,
					};

					const createResponse = await this.helpers.httpRequest(createOptions);

					// Extract card ID from response
					const cardId = createResponse.cardId || createResponse.id;

					if (!cardId) {
						throw new NodeOperationError(
							this.getNode(),
							'Could not extract cardId from create lead response',
							{ itemIndex },
						);
					}

					// Get custom fields to update
					const customFields = this.getNodeParameter(
						'customFieldsCreateUpdate.field',
						itemIndex,
						[],
					) as IDataObject[];

					// Parse custom field IDs from credentials
					const customFieldIdsJson = credentials.customFieldIds as string;
					let customFieldIds: IDataObject;

					try {
						customFieldIds = JSON.parse(customFieldIdsJson);
					} catch (error) {
						throw new NodeOperationError(
							this.getNode(),
							`Invalid JSON in custom_field_ids credential: ${error.message}`,
							{ itemIndex },
						);
					}

					const updateResponses: IDataObject[] = [];

					// Update custom fields if provided
					if (customFields && customFields.length > 0) {
						for (const fieldData of customFields) {
							const fieldName = fieldData.fieldName as string;

							// Get field configuration
							const fieldConfig = customFieldIds[fieldName] as IDataObject;
							if (!fieldConfig) {
								throw new NodeOperationError(
									this.getNode(),
									`Field "${fieldName}" not found in custom_field_ids configuration`,
									{ itemIndex },
								);
							}

							const fieldId = fieldConfig.id as string;
							const fieldType = fieldConfig.type as string;

							// Get the appropriate value based on field type
							let fieldValue: any;
							if (fieldData.booleanValue !== undefined) {
								fieldValue = fieldData.booleanValue;
							} else if (fieldData.dropdownValue !== undefined) {
								fieldValue = fieldData.dropdownValue;
							} else if (fieldData.dateValue !== undefined) {
								fieldValue = fieldData.dateValue;
							} else if (fieldData.dateTimeValue !== undefined) {
								fieldValue = fieldData.dateTimeValue;
							} else if (fieldData.numberValue !== undefined) {
								fieldValue = fieldData.numberValue;
							} else if (fieldData.textValue !== undefined) {
								fieldValue = fieldData.textValue;
							}

							// Build update body based on field type
							let updateBody: IDataObject = {
								cardId,
								cardCustomFieldsId: fieldId,
							};

							if (['TEXT_SHORT', 'TEXT_LONG', 'DROPDOWN'].includes(fieldType)) {
								updateBody.listValues = [fieldValue];
							} else if (['DATETIME', 'DATE'].includes(fieldType)) {
								updateBody.dateValue = fieldValue;
							} else if (fieldType === 'BOOLEAN') {
								updateBody.booleanValue = fieldValue;
							} else if (fieldType === 'NUMBER_DECIMAL') {
								updateBody.numberValue = fieldValue;
							} else {
								// Default to listValues for unknown types
								updateBody.listValues = [fieldValue];
							}

							const updateOptions: IHttpRequestOptions = {
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

					// Return combined response
					returnData.push({
						json: {
							cardId,
							createResponse,
							customFieldUpdates: updateResponses,
							success: true,
						},
						pairedItem: itemIndex,
					});
				} else if (operation === 'updateLeadField') {
					const updateLeadUrl = credentials.updateLeadUrl as string;
					const cardId = this.getNodeParameter('cardId', itemIndex) as string;
					const fieldsToUpdate = this.getNodeParameter(
						'fieldsToUpdate.field',
						itemIndex,
						[],
					) as IDataObject[];

					// Parse custom field IDs from credentials
					const customFieldIdsJson = credentials.customFieldIds as string;
					let customFieldIds: IDataObject;

					try {
						customFieldIds = JSON.parse(customFieldIdsJson);
					} catch (error) {
						throw new NodeOperationError(
							this.getNode(),
							`Invalid JSON in custom_field_ids credential: ${error.message}`,
							{ itemIndex },
						);
					}

					const responses: IDataObject[] = [];

					// Process each field
					for (const fieldData of fieldsToUpdate) {
						const fieldName = fieldData.fieldName as string;

						// Get field configuration
						const fieldConfig = customFieldIds[fieldName] as IDataObject;
						if (!fieldConfig) {
							throw new NodeOperationError(
								this.getNode(),
								`Field "${fieldName}" not found in custom_field_ids configuration`,
								{ itemIndex },
							);
						}

						const fieldId = fieldConfig.id as string;
						const fieldType = fieldConfig.type as string;

						// Get the appropriate value based on field type
						let fieldValue: any;
						if (fieldData.booleanValue !== undefined) {
							fieldValue = fieldData.booleanValue;
						} else if (fieldData.dropdownValue !== undefined) {
							fieldValue = fieldData.dropdownValue;
						} else if (fieldData.dateValue !== undefined) {
							fieldValue = fieldData.dateValue;
						} else if (fieldData.dateTimeValue !== undefined) {
							fieldValue = fieldData.dateTimeValue;
						} else if (fieldData.numberValue !== undefined) {
							fieldValue = fieldData.numberValue;
						} else if (fieldData.textValue !== undefined) {
							fieldValue = fieldData.textValue;
						}

						// Build body based on field type
						let body: IDataObject = {
							cardId,
							cardCustomFieldsId: fieldId,
						};

						if (['TEXT_SHORT', 'TEXT_LONG', 'DROPDOWN'].includes(fieldType)) {
							body.listValues = [fieldValue];
						} else if (['DATETIME', 'DATE'].includes(fieldType)) {
							body.dateValue = fieldValue;
						} else if (fieldType === 'BOOLEAN') {
							body.booleanValue = fieldValue;
						} else if (fieldType === 'NUMBER_DECIMAL') {
							body.numberValue = fieldValue;
						} else {
							// Default to listValues for unknown types
							body.listValues = [fieldValue];
						}

						const options: IHttpRequestOptions = {
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
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: itemIndex,
					});
				} else {
					if (error.context) {
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return [returnData];
	}
}

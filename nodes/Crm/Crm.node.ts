import type { IExecuteFunctions, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import { leadProperties } from './descriptions/lead';
import { loadOptions } from './methods/loadOptions';
import { executeLead } from './execute/lead';

export class Crm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'V4 CRM',
		name: 'crm',
		icon: 'file:crm.svg',
		group: ['transform'],
		version: 1,
		description: 'Create and update leads in CRM',
		defaults: {
			name: 'V4 CRM',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'crmApi',
				required: true,
				testedBy: 'Crm',
			},
		],
		properties: leadProperties,
		usableAsTool: true,
	};

	methods = {
		loadOptions,
	};

	async execute(this: IExecuteFunctions) {
		return executeLead.call(this);
	}
}

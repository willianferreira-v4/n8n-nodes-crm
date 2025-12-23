import {
	NodeOperationError,
	type ILoadOptionsFunctions,
	type INodePropertyOptions,
} from 'n8n-workflow';

export const loadOptions = {
	async getOwners(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const credentials = await this.getCredentials('crmApi');
		const ownersJson = credentials.owners as string;

		try {
			const owners = JSON.parse(ownersJson) as Array<{ id: string; name: string }>;
			return owners.map((owner) => ({
				name: owner.name,
				value: owner.id,
			}));
		} catch (error) {
			throw new NodeOperationError(
				this.getNode(),
				`Invalid JSON in owners credential: ${error.message}`,
			);
		}
	},
	async getColumns(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const credentials = await this.getCredentials('crmApi');
		const columnsJson = credentials.columns as string;

		try {
			const columns = JSON.parse(columnsJson) as Array<{ id: string; name: string }>;
			return columns.map((column) => ({
				name: column.name,
				value: column.id,
			}));
		} catch (error) {
			throw new NodeOperationError(
				this.getNode(),
				`Invalid JSON in columns credential: ${error.message}`,
			);
		}
	},
	async getTenants(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const credentials = await this.getCredentials('crmApi');
		const tenantsJson = credentials.tenants as string;

		try {
			const tenants = JSON.parse(tenantsJson) as Array<{ id: string; name: string }>;
			return tenants.map((tenant) => ({
				name: tenant.name,
				value: tenant.id,
			}));
		} catch (error) {
			throw new NodeOperationError(
				this.getNode(),
				`Invalid JSON in tenants credential: ${error.message}`,
			);
		}
	},
	async getOriginChannels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const credentials = await this.getCredentials('crmApi');
		const channelsJson = credentials.originChannels as string;

		try {
			const channels = JSON.parse(channelsJson) as Array<{ id: string; name: string }>;
			return channels.map((channel) => ({
				name: channel.name,
				value: channel.id,
			}));
		} catch (error) {
			throw new NodeOperationError(
				this.getNode(),
				`Invalid JSON in originChannels credential: ${error.message}`,
			);
		}
	},
	async getAcquisitionChannels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const credentials = await this.getCredentials('crmApi');
		const channelsJson = credentials.acquisitionChannels as string;

		try {
			const channels = JSON.parse(channelsJson) as Array<{ id: string; name: string }>;
			return channels.map((channel) => ({
				name: channel.name,
				value: channel.id,
			}));
		} catch (error) {
			throw new NodeOperationError(
				this.getNode(),
				`Invalid JSON in acquisitionChannels credential: ${error.message}`,
			);
		}
	},
};

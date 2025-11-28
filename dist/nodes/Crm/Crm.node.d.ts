import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
export declare class Crm implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getOwners(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getColumns(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getTenants(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}

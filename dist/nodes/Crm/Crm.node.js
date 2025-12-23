"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crm = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const lead_1 = require("./descriptions/lead");
const loadOptions_1 = require("./methods/loadOptions");
const lead_2 = require("./execute/lead");
class Crm {
    constructor() {
        this.description = {
            displayName: 'CRM',
            name: 'crm',
            icon: 'file:crm.svg',
            group: ['transform'],
            version: 1,
            description: 'Create and update leads in CRM',
            defaults: {
                name: 'CRM',
            },
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [
                {
                    name: 'crmApi',
                    required: true,
                    testedBy: 'Crm',
                },
            ],
            properties: lead_1.leadProperties,
            usableAsTool: true,
        };
        this.methods = {
            loadOptions: loadOptions_1.loadOptions,
        };
    }
    async execute() {
        return lead_2.executeLead.call(this);
    }
}
exports.Crm = Crm;
//# sourceMappingURL=Crm.node.js.map
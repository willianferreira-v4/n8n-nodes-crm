import type { INodeProperties } from 'n8n-workflow';
import { leadCreateDescription } from './lead/create';
import { leadBaseDescription } from './lead/base';
import { leadCreateAndUpdateDescription } from './lead/createAndUpdate';
import { leadUpdateFieldDescription } from './lead/updateLeadField';
import { leadUpdateColumnDescription } from './lead/updateLeadColumn';
import { leadDisqualifyDescription } from './lead/disqualifyLead';
import { leadChangeTenantDescription } from './lead/changeTenant';
import { leadUpdateDescription } from './lead/update';

export const leadProperties: INodeProperties[] = [
	...leadBaseDescription,
	// Create Lead fields
	...leadCreateDescription,
	// Create and Update Lead fields
	...leadCreateAndUpdateDescription,
	// Update Lead Field fields
	...leadUpdateFieldDescription,
	// Update Lead Column fields
	...leadUpdateColumnDescription,
	// Disqualify Lead fields
	...leadDisqualifyDescription,
	// Change Tenant fields
	...leadChangeTenantDescription,
	// Update Lead fields
	...leadUpdateDescription,
];

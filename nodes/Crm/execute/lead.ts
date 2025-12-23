import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export async function executeLead(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
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
				const columnId = this.getNodeParameter('columnId', itemIndex) as string;
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
					url: `${apiUrl}${createLeadUrl}/${columnId}`,
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
				const columnId = this.getNodeParameter('columnIdCreateUpdate', itemIndex) as string;
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
				const utmContent = this.getNodeParameter('utmContentCreateUpdate', itemIndex, '') as string;
				const utmMedium = this.getNodeParameter('utmMediumCreateUpdate', itemIndex, '') as string;
				const utmTerm = this.getNodeParameter('utmTermCreateUpdate', itemIndex, '') as string;
				const sourcePage = this.getNodeParameter('sourcePageCreateUpdate', itemIndex, '') as string;

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
					url: `${apiUrl}${createLeadUrl}/${columnId}`,
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
						let fieldValue;
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

						// Skip if value is null, undefined or empty string
						if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
							continue;
						}

						// Build update body based on field type
						const updateBody: IDataObject = {
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
			} else if (operation === 'updateLead') {
				const updateLeadMainUrl = credentials.updateLeadMainUrl as string;
				const cardId = this.getNodeParameter('cardIdUpdate', itemIndex) as string;

				// Get all optional fields
				const title = this.getNodeParameter('titleUpdate', itemIndex, '') as string;
				const companyName = this.getNodeParameter('companyNameUpdate', itemIndex, '') as string;
				const email = this.getNodeParameter('emailUpdate', itemIndex, '') as string;
				const phone = this.getNodeParameter('phoneUpdate', itemIndex, '') as string;
				const taxId = this.getNodeParameter('taxIdUpdate', itemIndex, '') as string;
				const ownerId = this.getNodeParameter('ownerIdUpdate', itemIndex, '') as string;
				const tenantId = this.getNodeParameter('tenantIdUpdate', itemIndex, '') as string;
				const channel = this.getNodeParameter('channelUpdate', itemIndex, '') as string;
				const utmSource = this.getNodeParameter('utmSourceUpdate', itemIndex, '') as string;
				const utmCampaign = this.getNodeParameter('utmCampaignUpdate', itemIndex, '') as string;
				const utmContent = this.getNodeParameter('utmContentUpdate', itemIndex, '') as string;
				const utmMedium = this.getNodeParameter('utmMediumUpdate', itemIndex, '') as string;
				const utmTerm = this.getNodeParameter('utmTermUpdate', itemIndex, '') as string;
				const sourcePage = this.getNodeParameter('sourcePageUpdate', itemIndex, '') as string;
				const lostReason = this.getNodeParameter('lostReasonUpdate', itemIndex, '') as string;
				const lostDescription = this.getNodeParameter(
					'lostDescriptionUpdate',
					itemIndex,
					'',
				) as string;

				// Build body with only non-empty fields
				const body: IDataObject = {};
				if (title) body.title = title;
				if (companyName) body.companyName = companyName;
				if (email) body.email = email;
				if (phone) body.phone = phone;
				if (taxId) body.taxId = taxId;
				if (ownerId) body.ownerId = ownerId;
				if (tenantId) body.tenantId = tenantId;
				if (channel) body.channel = channel;
				if (utmSource) body.utmSource = utmSource;
				if (utmCampaign) body.utmCampaign = utmCampaign;
				if (utmContent) body.utmContent = utmContent;
				if (utmMedium) body.utmMedium = utmMedium;
				if (utmTerm) body.utmTerm = utmTerm;
				if (sourcePage) body.sourcePage = sourcePage;
				if (lostReason) body.lostReason = lostReason;
				if (lostDescription) body.lostDescription = lostDescription;

				const options: IHttpRequestOptions = {
					method: 'PUT',
					url: `${apiUrl}${updateLeadMainUrl}/${cardId}`,
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
					let fieldValue;
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

					// Skip if value is null, undefined or empty string
					if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
						continue;
					}

					// Build body based on field type
					const body: IDataObject = {
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
			} else if (operation === 'disqualifyLead') {
				const disqualifyLeadUrl = credentials.disqualifyLeadUrl as string;
				const cardId = this.getNodeParameter('cardIdDisqualify', itemIndex) as string;
				const toColumnId = this.getNodeParameter('toColumnId', itemIndex) as string;
				const newIndex = this.getNodeParameter('newIndex', itemIndex) as number;
				const ignoreColumnsRequiredFieldsValidation = this.getNodeParameter(
					'ignoreColumnsRequiredFieldsValidation',
					itemIndex,
				) as boolean;
				const reasonForLost = this.getNodeParameter('reasonForLost', itemIndex) as string;
				const descriptionForLost = this.getNodeParameter(
					'descriptionForLost',
					itemIndex,
					'',
				) as string;

				const body: IDataObject = {
					toColumnId,
					newIndex,
					ignoreColumnsRequiredFieldsValidation,
					reasonForLost,
					descriptionForLost,
				};

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: `${apiUrl}${disqualifyLeadUrl}/${cardId}`,
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
			} else if (operation === 'changeTenant') {
				const changeTenantUrl = credentials.changeTenantUrl as string;
				const cardId = this.getNodeParameter('cardIdChangeTenant', itemIndex) as string;
				const tenantId = this.getNodeParameter('tenantId', itemIndex) as string;

				const body: IDataObject = {
					tenantId,
				};

				const options: IHttpRequestOptions = {
					method: 'PUT',
					url: `${apiUrl}${changeTenantUrl}/${cardId}`,
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
			}
		} catch (error) {
			// Extract detailed error information
			const operation = this.getNodeParameter('operation', itemIndex) as string;

			// Try to get the actual error response from various possible locations
			let responseBody;
			let statusCode: number | undefined;
			let requestUrl: string | undefined;
			let requestMethod: string | undefined;

			// Check multiple possible locations for error details
			if (error.response) {
				statusCode = error.response.status || error.response.statusCode;
				responseBody = error.response.data || error.response.body;
				requestUrl = error.response.config?.url || error.config?.url;
				requestMethod = error.response.config?.method || error.config?.method;
			} else if (error.cause?.response) {
				statusCode = error.cause.response.status || error.cause.response.statusCode;
				responseBody = error.cause.response.data || error.cause.response.body;
				requestUrl = error.cause.response.config?.url;
				requestMethod = error.cause.response.config?.method;
			}

			// If still no response body, check error properties directly
			if (!responseBody && error.options?.body) {
				responseBody = error.options.body;
			}

			// Build detailed error message
			let detailedMessage = `CRM API Error - ${operation}\n\n`;
			detailedMessage += `Status Code: ${statusCode || 'Unknown'}\n`;

			if (requestMethod && requestUrl) {
				detailedMessage += `Request: ${requestMethod.toUpperCase()} ${requestUrl}\n\n`;
			}

			if (responseBody) {
				// Try to extract and format specific error messages
				if (responseBody.errors && Array.isArray(responseBody.errors)) {
					detailedMessage += `Errors:\n`;
					responseBody.errors.forEach((err: { code: number; message: string }, index: number) => {
						detailedMessage += `\n  ${index + 1}. ${err.code || 'Error'}:\n`;
						detailedMessage += `     ${err.message || JSON.stringify(err)}\n`;
					});

					if (responseBody.traceId) {
						detailedMessage += `\nTrace ID: ${responseBody.traceId}\n`;
					}
				} else if (responseBody.message) {
					detailedMessage += `Message: ${responseBody.message}\n`;
				} else {
					detailedMessage += `\nAPI Response:\n`;
					if (typeof responseBody === 'string') {
						detailedMessage += responseBody;
					} else {
						detailedMessage += JSON.stringify(responseBody, null, 2);
					}
				}
			} else {
				detailedMessage += `\nNo response body available\n`;
				detailedMessage += `Original error: ${error.message}`;
			}

			if (this.continueOnFail()) {
				returnData.push({
					json: {
						error: error.message,
						operation,
						statusCode,
						responseBody,
						requestUrl,
						requestMethod,
					},
					pairedItem: itemIndex,
				});
			} else {
				throw new NodeOperationError(this.getNode(), detailedMessage, {
					itemIndex,
					description: `CRM ${operation} operation failed`,
				});
			}
		}
	}

	return [returnData];
}

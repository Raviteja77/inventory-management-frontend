// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = 'http://localhost:9090/';

export const environment = {
  production: false,
  endpoints: {
    register: `${baseUrl}api/v1/auth/register`,
    login: `${baseUrl}api/v1/auth/login`,
    logout: `${baseUrl}api/v1/auth/logout`,
    item: `${baseUrl}api/items`,
    addItem: `${baseUrl}api/items/add`,
    allItems: `${baseUrl}api/items/all`,
    allVendors: `${baseUrl}api/vendors/allVendors`,
    addVendor: `${baseUrl}api/vendors/add`,
    vendor: `${baseUrl}api/vendors`,
    request: `${baseUrl}api/requests`,
    addRequest: `${baseUrl}api/requests/add`,
    allRequests: `${baseUrl}api/requests/all`,
  }
};
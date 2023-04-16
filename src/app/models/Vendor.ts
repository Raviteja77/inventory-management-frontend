
export interface Vendors {
    vendors: Vendor[],
    isAllVendorsLoading: boolean,
    errorMessage: string
}

export interface Vendor {
    vendorId: number,
    firstName: string,
    lastName: string,
    mobile: string,
    email: string,
    status: boolean,
}
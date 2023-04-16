import { Item } from "./Inventory";
import { Vendor } from "./Vendor";

export interface Request {
    requestId: number,
    batchNumber: number,
    dateOfRequest: string,
    vendorId: number,
    items: Item[],
    status: boolean,
}

export interface RequestItems {
    request: Request[],
    isLoading: boolean,
    errorMessage: string,
}
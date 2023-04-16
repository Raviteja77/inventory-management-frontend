
export interface Inventory {
    items: Item[],
    isAllItemsLoading: boolean,
    errorMessage: string
}

export interface Item {
    itemId: number,
    name: string,
    vendorId: number,
    description: string,
    purchasePrice: number;
	salesPrice: number;
	itemThreshold: number;
	expirationDate: string;
	quantity: number;
	soldQuantity: number;
    status: boolean;
}
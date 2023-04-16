import { Item } from "./Inventory"
import { Vendor } from "./Vendor";

export interface SalesReport {
    items: Item[],
    totalSales: number,
    vendor: Vendor,
}

export interface StocksReport {
    items: Item[],
    totalStocks: number,
    vendor: Vendor,
}
// import {  } from "firebase/";
export class ProveedorModel {
    constructor (
        public query?: ProvRequest,
        public result?: ProvResult,
        public queried?: any,
        public posible_sales_URL?: string
    ){}
}

export interface ProvRequest {
    table: string;
    product: string;
    provider: string
    desc: number
    stock: number
    condition: number
    buy_price: number
    sale_price: number
}

export interface ProvResult {
    viability?: boolean;
    message?: string;
    invested_capital: number;
    suggest_sale_price: number;
    suggest_buy_price: number;
    saving: number;
    desc_price: number;
    invest: number;
    total_saving: number;
    total_invest: number;
    profits: number;
    utilities: number;
    percent_utilities: number;
}
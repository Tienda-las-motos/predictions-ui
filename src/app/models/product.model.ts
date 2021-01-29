export class ProductModel {
    constructor (
        public name: string,
        public code?: string,
        public dataset?: string,
        public buy_stats?: BuyStats,
        public product_stats?: ProductStats,
        public sell_stats?: SellStats,
        public time_stats?: TimeStats,
        public year_predictions_URL?: string,
        // public month_details?: MonthDetails
    ){}
}

export interface ProductItemList {
    Codigo?: string,
    Descripcion?: string
}

export interface BuyStats {
    error_score2?: number,
    suggest_buy_price?: number,
    suggest_buy_price_URL?: string
}

export interface ProductStats {
    avg_buy_price?: number,
    avg_margin?:number,
    avg_sale_price?:number,
    max_margin?:number,
    max_sale_price?:number,
    min_buy_price?:number,
    sales_quantity?:number,
    sold_units?:number,
}

export interface SellStats {
    avg_throwput_sale?:number
    max_throwput_sale_price?:number
    score_error2?:number
    suggest_sale_price?:number
    suggest_sale_price_img?: string,
}

export interface TimeStats {
    avgsales_per_month?: number
    files?:{
        month_sales?: string
        boxchart_URL?: string
        salesvscosts_chart_URL?: string
        sales_dates?: string
        timeline?: string
    }
    first_sale?: Date
    last_sale?: Date
    max_monthsales?: number
    max_monththrowput?: number
    max_sales_month?: string[]
    max_throwput_month?: string[]
}

export const product_stats: ProductStats = {
    sold_units: 0,
    sales_quantity: 0,
    min_buy_price: 0,
    avg_buy_price: 0,
    avg_sale_price: 0,
    max_sale_price: 0,
    avg_margin: 0,
    max_margin: 0,
}
export const sell_stats: SellStats = {
    avg_throwput_sale:0,
    max_throwput_sale_price:0,
    score_error2:0,
    suggest_sale_price:0,
    suggest_sale_price_img: '',
}

export const time_stats: TimeStats = {
    avgsales_per_month: 0,
    files:{
        month_sales: '',
        boxchart_URL: '',
        salesvscosts_chart_URL: '',
        sales_dates: '',
        timeline: '',
    },
    first_sale: new Date(),
    last_sale: new Date(),
    max_monthsales: 0,
    max_monththrowput: 0,
    max_sales_month: [],
    max_throwput_month: [],
}

export const buy_stats: BuyStats = {
    error_score2: 0,
    suggest_buy_price: 0,
    suggest_buy_price_URL: '',
}

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

// export interface ProductStats {
//     avgs?: AvgStats,
//     time_data?: TimeStats,
//     files?: StatsFiles
//     }
//     export interface StatsFiles {
//         data_byperiods?: string,
//         chart?: string,
//         dataset?: string,
//         timeline?: string
//     }
//     export interface TimeStats {
//         first_sale_date?: Date,
//         last_sale_date?: Date,
//         period_in_days?: number
//     }
//     export interface AvgStats {
//         sold_units?: number,
//         sales_quantity?: number
//         min_purch_price?: number,
//         avg_purch_price?: number,
//         avg_sell_price?: number,
//         max_sell_price?: number,
//         avg_margin?: number,
//         max_margin?: number,
//     }

// export interface MonthDetails {
//     avgsales_per_month?: number,
//     max_sales?: number,
//     month_sales_chart?: string,
//     normalized_sells?: string,
//     sales_dates?: string,
// }

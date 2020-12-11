export class ProductModel {
    constructor (
        public name: string,
        public code: string,
        public stats?: ProductStats,
        public month_details?: MonthDetails
    ){}
}

export interface ProductItemList {
    name: string,
    code: string
}

export interface ProductStats {
    avgs?: AvgStats,
    time_data?: TimeStats,
    files?: StatsFiles
    }
    export interface StatsFiles {
        data_byperiods?: string,
        sales_chart?: string,
        dataset?: string,
        timeline?: string
    }
    export interface TimeStats {
        first_sale_date?: Date,
        last_sale_date?: Date,
        period_in_days?: number
    }
    export interface AvgStats {
        sold_units?: number,
        sales_quantity?: number
        min_purch_price?: number,
        avg_purch_price?: number,
        avg_sell_price?: number,
        max_sell_price?: number,
        avg_margin?: number,
        max_margin?: number,
    }

export interface MonthDetails {
    avgsales_per_month?: number,
    max_sales?: number,
    month_sales_chart?: string,
    normalized_sells?: string,
    sales_dates?: string,
}

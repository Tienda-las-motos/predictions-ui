export interface PredictionResults {
    error_mean?: number,
    avg_for_sell?: number,
    months_predicted?: number,
    total_predicted?: number,
    imgURL?: string,
}


export interface ArimaResults {
    avg_for_sell?: number,
    months_predicted?: number,
    total_predicted?: number,
}

export interface PredictionForm {
    table: string, 
    product: string,
    test_size?: number,
    window_size?: number

}

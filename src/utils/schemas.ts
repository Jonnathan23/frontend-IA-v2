import { array, file, number, object, string, } from "valibot";

export const ResultPredictionSchema = object({
    label: string(),
    confidence: number(),
})

export const PredictionSchema = object({
    predictions: array(ResultPredictionSchema),
})

export const HistoryPredictionImageSchema = array(object({
    id: number(),
    image: string(),
    date: string(),
    labels: array(ResultPredictionSchema),
}))


export const DraftHistoryPredictionImageSchema = object({
    image: string(), //TODO: file(),    
    date: string(),
    labels: array(ResultPredictionSchema),
})
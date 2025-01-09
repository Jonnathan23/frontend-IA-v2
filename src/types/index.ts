import { InferOutput } from "valibot";
import {  DraftHistoryPredictionImageSchema, HistoryPredictionImageSchema, PredictionSchema, ResultPredictionSchema } from "../utils/schemas";


export type Prediction = InferOutput<typeof PredictionSchema>
export type HistoryPredictions = InferOutput<typeof HistoryPredictionImageSchema>
export type DraftHistoryPredictions = InferOutput<typeof DraftHistoryPredictionImageSchema>
export type Labels = InferOutput<typeof ResultPredictionSchema>
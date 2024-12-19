import { InferOutput } from "valibot";
import { DraftPredictionSchema,  PredictionSchema } from "../utils/prediction-schema";


export type Prediction = InferOutput<typeof PredictionSchema>
export type DraftPrediction = InferOutput<typeof DraftPredictionSchema>
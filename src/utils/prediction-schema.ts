import { array, number, object, string, } from "valibot";

export const DraftPredictionSchema = object({
    acurracy: number(),
    predicted_classes: string(),
    loss: number()
})

export const PredictionSchema = object({
    predictions: array(string()),
})

export const ImageSchema = object({
    image: string()
})

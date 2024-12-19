import { StateCreator } from "zustand";
import { Prediction } from "../types";
import { getPrediction } from "../services/PredictionService";

export type PredictionSliceType = {
    predicted_classes: Prediction
    getPredictedClasses: (file: File) => Promise<void>
    predicting: boolean
}

export const createPredictionSlice: StateCreator<PredictionSliceType> = (set) => ({
    predicted_classes: {
        predictions: []
    },
    predicting: false,
    getPredictedClasses: async (file: File) => {
        set({ predicting: true })
        const predicted_classes = await getPrediction(file)
        console.log('predicted_classes:')
        console.log(predicted_classes)
        if (predicted_classes === undefined) {
            set({ predicted_classes: { predictions: [] }, predicting: false })
        } else {
            set({ predicted_classes, predicting: false })

        }

    }

});
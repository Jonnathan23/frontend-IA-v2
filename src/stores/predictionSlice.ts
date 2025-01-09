import { StateCreator } from "zustand";
import { getPrediction, savePrediction } from "../services/PredictionService";
import { HistoryPredictions, Labels, Prediction } from "../types";
import { getHistoryPredictions } from "../services/HistoryService";

export type PredictionSliceType = {
    predicted_classes: Prediction
    historyPredictions: HistoryPredictions;
    predicting: boolean
    getPredictedClasses: (file: File) => Promise<void>
    getHistoryPredictions: () => Promise<void>;
    saveHistoryPrediction: (file: File, labels: Labels[]) => Promise<void>;
}



export const createPredictionSlice: StateCreator<PredictionSliceType> = (set) => ({
    predicted_classes: { predictions: [] },
    predicting: false,
    historyPredictions: [],

    getPredictedClasses: async (file: File) => {
        set({ predicting: true })
        try {
            let predicted_classes: Prediction | undefined
            predicted_classes = await getPrediction(file)

            set({
                predicted_classes: predicted_classes === undefined ? { predictions: [] } : predicted_classes,
                predicting: false
            })
        } catch (error) {
            set({
                predicted_classes: { predictions: [] },
                predicting: false
            })
        }

    },
    getHistoryPredictions: async () => {
        try {
            const historyPredictions = await getHistoryPredictions();

            if (historyPredictions === undefined) {
                throw new Error("No se pudo obtener las predicciones de la base de datos.");
            }     
            
            set({ historyPredictions });
        } catch (error) {

        }
    },
    saveHistoryPrediction: async (file: File, labels: Labels[]) => {
        try {
            await savePrediction(file, labels)
        } catch (error) {

        }
    }

});
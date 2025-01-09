
import { safeParse } from "valibot";
import { api, apiHistory } from "../lib/axios";
import { DraftHistoryPredictionImageSchema, PredictionSchema } from "../utils/schemas";
import { labelTranslations } from "../data/db";
import { handleApiError } from "../utils/error";
import { Labels } from "../types";


export async function getPrediction(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const { data } = await api.post('/predict/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const result = safeParse(PredictionSchema, data)

        if (result.success) {
            const predictions = result.output.predictions.map((prediction) => {
                return { ...prediction, label: labelTranslations[prediction.label] }
            })

            return { predictions: predictions }
        } else {
            throw new Error('Api data type error')
        }

    } catch (error) {
        handleApiError(error);
    }
}

export async function savePrediction(file: File, labels: Labels[]) {
    try {
        const result = safeParse(DraftHistoryPredictionImageSchema, {
            image: 'file',
            date: '1/8/2025',
            labels
        })

        if (result.success) {
            await apiHistory.post('/history', result.output);
            console.log('Predicción guardada');
        } else {
            throw new Error('Error al guardar la predicción')
        }
    } catch (error) {
        handleApiError(error);
    }
}
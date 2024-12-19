import axios from "axios";
import { safeParse } from "valibot";
import { DraftPrediction } from "../types";
import { DraftPredictionSchema, PredictionSchema } from "../utils/prediction-schema";

export async function getPrediction(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const url = `${import.meta.env.VITE_API_URL}/predict/`;
        const { data } = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('data:')
        console.log(data)
        const result = safeParse(PredictionSchema, data)
        console.log('result:')
        console.log(result)


        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }

    } catch (error) {
        console.log(error);
    }
}


export async function savePrediction(data: DraftPrediction) {
    try {
        const result = safeParse(DraftPredictionSchema, data)

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/predictions`
            await axios.post(url, data)

        } else {
            throw new Error('Datos inválidos')
        }
    } catch (error) {
        console.log(error)
    }
}
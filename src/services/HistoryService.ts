import { safeParse } from "valibot";
import { apiHistory } from "../lib/axios";
import { handleApiError } from "../utils/error"
import { HistoryPredictionImageSchema } from "../utils/schemas";


export const getHistoryPredictions = async () => {
    try {
        const { data } = await apiHistory.get('/history');      

        const response = safeParse(HistoryPredictionImageSchema, data.data)       

        if (response.success) {
            console.log('consulta')
            return response.output
        }

        throw new Error('Api data type error')

    } catch (error) {
        handleApiError(error);
    }
}
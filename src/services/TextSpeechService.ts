import { apiGoogle } from "../lib/axios";
import { Prediction } from "../types";
import { handleApiError } from "../utils/error"

export const speakText = async (predicted_classes: Prediction) => {
    try {
        const apiKey = import.meta.env.VITE_API_GOOGLE;
        const url = `/text:synthesize?key=${apiKey}`

        //const textToSpeech = "Hello, world!";
        const predictionsText = predicted_classes.predictions
            .map((prediction) => prediction.label)
            .join(", ")

        const requestBody = {
            input: { text: `Gracias por esperar, en la imagen se puede apreciar principalmente: ${predictionsText}, que tanga un buen dia` },
            voice: { languageCode: "es-ES", ssmlGender: "FEMALE" },
            audioConfig: { audioEncoding: "MP3" },
        };

        const response = await apiGoogle.post(url, requestBody)

        const audioContent = response.data.audioContent;
        const audioBlob = new Blob([Uint8Array.from(atob(audioContent), (c) => c.charCodeAt(0))], { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioUrl === undefined) {
            throw new Error("No se pudo obtener la URL del audio.");
        }

        return audioUrl
    } catch (error) {
        console.log(error);
        handleApiError(error);
        return "";
    }
}
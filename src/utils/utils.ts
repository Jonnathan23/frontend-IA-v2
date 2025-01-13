import { Prediction } from "../types";

export function formatDate(isoString: string) {
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return formatter.format(date)
}

export function formatTextApi(predicted_classes: Prediction) {
    const predictions = predicted_classes.predictions.map((prediction) => prediction.label);
    let predictionsText = '';

    if (predictions.length === 0) {
        predictionsText = ''; // Sin predicciones
    } else if (predictions.length === 1) {
        predictionsText = predictions[0]; // Solo una predicción
    } else {
        predictionsText = predictions.slice(0, -1).join(', ') + ' y ' + predictions[predictions.length - 1]; // Dos o más predicciones
    }

    return predictionsText
}
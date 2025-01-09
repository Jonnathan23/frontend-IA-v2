import { useEffect, useMemo } from "react";
import { useAppStore } from "../stores/useAppStore"

export default function HistoryPredictions() {
    const { historyPredictions, getHistoryPredictions } = useAppStore();
    const thereIsHistory = useMemo(() => { return historyPredictions.length ? true : false }, [historyPredictions])
    useEffect(() => { getHistoryPredictions() }, [])

    return (
        <>
            {
                thereIsHistory ? (
                    <>
                        {historyPredictions.map((prediction) => (
                            <div key={prediction.id} className="container">
                                <h3>Clases Predichas</h3>
                                {prediction.labels.length > 0 ? (
                                    prediction.labels.map(label => (
                                        <p key={label.label}>{label.label} - {label.confidence.toFixed(3)}%</p>
                                    ))) : (
                                    <p>Sin predicciones</p>
                                )
                                }
                            </div>
                        ))
                        }
                    </>
                ) : (
                    <p>No hay historial de predicciones</p>
                )

            }
        </>
    )
}
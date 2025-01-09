import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";


export default function PredictedClasses() {
    const { predicted_classes, predicting } = useAppStore();
    const isEmpty = useMemo(() => predicted_classes.predictions.length ? true : false, [predicted_classes])
    
    return (
        <>
            <h3>Clases Predichas</h3>
            {!isEmpty ? (
                <p>Sin predicciones</p>
            ) : (
                <>
                    {predicting ? (
                        <p>Predicciendo...</p>
                    ) : (
                        <div className="predicted__classes">
                            {predicted_classes.predictions.map((prediction, index) => (
                                <p key={index}>{prediction.label}</p>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    )
}
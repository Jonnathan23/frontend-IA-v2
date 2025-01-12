import { useMemo, useState } from "react";
import { useAppStore } from "../stores/useAppStore";
import { useMutation } from "@tanstack/react-query";
import { speakText } from "../services/TextSpeechService";
import { toast } from "react-toastify";


export default function PredictedClasses() {
    const { predicted_classes } = useAppStore();

    const isEmpty = useMemo(() => predicted_classes.predictions.length ? true : false, [predicted_classes])
    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = useMutation({
        mutationFn: () => {
            setIsLoading(true);
            return speakText(predicted_classes)
        },
        onSuccess: (audioUrl: string) => {
            const audio = new Audio(audioUrl);
            audio.play();
            toast.success("Reproduciendo...");
            setIsLoading(false);
        },
        onError: (error) => {
            setIsLoading(false);
            console.log('error');
            console.log(error);
            console.log('----- x -----');
            toast.error(error.message || "Error inesperado, no se pudo reproducir el audio.")
        },
    });


    return (
        <>
            <h3>En la imagen se encuentra</h3>
            {!isEmpty ? (
                <p>Sin predicciones</p>
            ) : (
                <>
                    <div className="predicted__classes">
                        {predicted_classes.predictions.map((prediction, index) => (
                            <p key={index}>{prediction.label}</p>
                        ))}
                    </div>
                    <button onClick={() => mutate()} disabled={isLoading}>
                        {isLoading ? "Reproduciendo..." : "Escuchar Predicciones"}
                    </button>
                </>
            )}
        </>
    );
}
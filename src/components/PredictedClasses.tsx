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
                <div className="content__prediction">
                    <div className="predicted__classes">
                        {predicted_classes.predictions.map((prediction, index) => (
                            <p key={index}>{prediction.label}</p>
                        ))}
                    </div>
                    <button className="button__prediction"  onClick={() => mutate()} disabled={isLoading} title="Reproducir audio">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="24"
                            height="24"
                            strokeWidth="2"
                            style={{ stroke: "currentColor" }} // Corrige el formato de style
                        >
                            <path d="M15 8a5 5 0 0 1 0 8"></path>
                            <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"></path>
                        </svg>
                    </button>
                </div>
                </>
            )}
        </>
    );
}
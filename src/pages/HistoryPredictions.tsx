import { useQuery } from "@tanstack/react-query";
import { getHistoryPredictions } from "../services/HistoryService";

export default function HistoryPredictions() {        

    const { data, isLoading } = useQuery({
        queryKey: ['historyPredictions'],
        queryFn: getHistoryPredictions
    })

    if (isLoading) return <p>Cargando...</p>
    if (!data) return <p>Sin predicciones</p>
    return (
        <>
            {data.map((prediction) => (
                <div key={prediction.id} className="container">
                    <h3 onClick={() => { console.log(prediction.image) }} >Clases Predichas</h3>

                    <img className="image_prediction" src={prediction.image || 'selectImage.jpg'} alt={`image ${prediction.id}`} />
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
    )
}
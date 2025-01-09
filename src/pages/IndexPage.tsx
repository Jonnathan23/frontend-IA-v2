import { ChangeEvent, FormEvent, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { useAppStore } from "../stores/useAppStore"
import PredictedClasses from "../components/PredictedClasses";


export default function IndexPage() {
    const defaultImage = 'selectImage.jpg';

    const [image, setImage] = useState(defaultImage);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { getPredictedClasses, saveHistoryPrediction, getHistoryPredictions, predicting, predicted_classes } = useAppStore();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setImage(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setImage(defaultImage);
        }
    };

    const handleSubtmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error('Por favor, seleccione una imagen.',);
            return;
        }
        const toastId = toast.loading("Prediciendo...");
        try {
            await getPredictedClasses(selectedFile);
            await saveHistoryPrediction(selectedFile, predicted_classes.predictions);
            await getHistoryPredictions();

            toast.update(toastId, {
                render: "Predicción completada.",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
        } catch (error: any) {
            toast.update(toastId, {
                render: error.message || "Error inesperado durante la predicción.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    return (
        <>
            <div className="container">
                <h2>Predicción de Imagen</h2>
                <form className="form__prediction" onSubmit={handleSubtmit}>
                    <div className="field field__image">
                        <img className="image__selected" src={image} alt="image_selec" />
                    </div>
                    <div className="cont__buttons">
                        <input className="field__button" onChange={handleChange} type="file" name="file" id="file" />
                    </div>
                    <input className="field__button submit" type="submit" value={"Predecir"} disabled={predicting} />
                </form>
            </div>

            <div className="container">
                <PredictedClasses />
            </div>
            <ToastContainer />

        </>
    )
}
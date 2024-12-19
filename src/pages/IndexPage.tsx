import { ChangeEvent, FormEvent, useState } from "react"
import { useAppStore } from "../stores/useAppStore"
import PredictedClasses from "../components/PredictedClasses";


export default function IndexPage() {
    const defaultImage = 'selectImage.jpg';

    const [image, setImage] = useState(defaultImage);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { getPredictedClasses } = useAppStore();

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
            alert('Por favor selecciona una imagen antes de enviar.');
            return;
        }

        try {
            await getPredictedClasses(selectedFile);
        } catch (error) {
            console.error('Error enviando la imagen:', error);
        }
    };

    return (
        <>
            <div className="container">
                <h2>Predicción de Imagen</h2>
                <form onSubmit={handleSubtmit}>
                    <img src={image} alt="image_selec" />
                    <input onChange={handleChange} type="file" name="file" id="file" />

                    <input type="submit" value="Predecir" />
                </form>
            </div>

            <div className="container">
                <PredictedClasses />
            </div>


        </>
    )
}
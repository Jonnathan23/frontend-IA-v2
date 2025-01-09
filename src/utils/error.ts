import { isAxiosError } from "axios";

export const handleApiError = (error: unknown): never => {
    if (isAxiosError(error)) {
        console.error("Error de Axios:", error);
        if (error.response) {
            throw new Error(error.response.data.message || "Error en la solicitud a la API.");
        }
        throw new Error("No se pudo conectar al servidor.");
    }

    console.error("Error inesperado:", error);
    throw new Error("Ocurrió un error inesperado.");
}

import { ToastContainer, toast } from 'react-toastify';

export const messageAlert = (toastId: Id, message: string, isError: boolean) => {
    toast.update(toastId, {
        render: "Predicción completada.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
    });
}
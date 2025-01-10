// utils/toast.ts
import { toast } from "react-toastify";

export const Success = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000, // Le toast disparaît après 3 secondes
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

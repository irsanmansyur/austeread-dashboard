import { errorType } from "@/commons/hooks/message";
import { useEffect } from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function FlashMessage({ flash, second = 5 }: { flash: errorType; second?: number }) {
  useEffect(() => {
    if (!flash || Object.keys(flash).length < 1) return;

    let toastOptions: ToastOptions = {
      position: "top-right",
      autoClose: second * 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    };
    toast[flash.type](flash.message, toastOptions);
  }, [flash]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={second * 1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}

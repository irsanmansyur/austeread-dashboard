import React, { createContext, useState, useContext } from "react";

// Definisikan tipe data konteks kesalahan
export type errorType = { type: "info" | "success" | "error"; message: string };
type ErrorContextType = {
  message: errorType | null;
  setMessage: React.Dispatch<React.SetStateAction<errorType | null>>;
};

// Buat konteks kesalahan
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// Buat provider konteks kesalahan
export const ErrorProvider = ({ children }: any) => {
  const [message, setMessage] = useState<errorType | null>(null);

  // Membungkus komponen children dengan konteks kesalahan
  return <ErrorContext.Provider value={{ message, setMessage }}>{children}</ErrorContext.Provider>;
};

// Hook untuk mengakses konteks kesalahan
export const useMessage = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useMessage must be used within an ErrorProvider");
  }
  return context;
};

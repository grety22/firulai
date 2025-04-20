"use client";
import { createContext, useContext, useState } from "react";

type StyleContextType = {
  current: string;
  preview: string;
  setPermanent: (value: string) => void;
  setPreview: (value: string) => void;
};

const BodyStyleContext = createContext<StyleContextType | null>(null);

export const useBodyStyle = () => {
  const context = useContext(BodyStyleContext);
  if (!context) throw new Error("Must use within BodyStyleProvider");
  return context;
};

export const BodyStyleProvider = ({ children }: { children: React.ReactNode }) => {
  const [permanent, setPermanent] = useState("bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100");
  const [preview, setPreview] = useState("");

  return (
    <BodyStyleContext.Provider
      value={{
        current: preview || permanent,
        preview,
        setPermanent,
        setPreview,
      }}
    >
      {children}
    </BodyStyleContext.Provider>
  );
};

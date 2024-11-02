"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

const CalendlyContext = createContext({
  isCalendlyModalOpen: false,
  toggleCalendlyModal: () => {},
});

interface CalendlyProviderProps {
  children: ReactNode;
}

export const CalendlyProvider: React.FC<CalendlyProviderProps> = ({
  children,
}) => {
  const [isCalendlyModalOpen, setCalendlyModalOpen] = useState(false);

  const toggleCalendlyModal = () =>
    setCalendlyModalOpen((prevState) => !prevState);

  return (
    <CalendlyContext.Provider
      value={{ isCalendlyModalOpen, toggleCalendlyModal }}
    >
      {children}
    </CalendlyContext.Provider>
  );
};

export const useCalendlyContext = () => useContext(CalendlyContext);

"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

const PsychadelicBackgroundContext = createContext({
  isPsychadelic: false,
  toggleIsPsychadelic: () => {},
});

interface PsychadelicBackgroundProviderProps {
  children: ReactNode;
}

export const PsychadelicBackgroundProvider: React.FC<
  PsychadelicBackgroundProviderProps
> = ({ children }) => {
  const [isPsychadelic, setIsPsychedelic] = useState(false);
  const toggleIsPsychadelic = () => setIsPsychedelic((prevState) => !prevState);

  return (
    <PsychadelicBackgroundContext.Provider
      value={{ isPsychadelic, toggleIsPsychadelic }}
    >
      {children}
    </PsychadelicBackgroundContext.Provider>
  );
};

export const usePsychadelicBackgroundContext = () =>
  useContext(PsychadelicBackgroundContext);

"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

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
  const [isPsychadelic, setIsPsychadelic] = useState(false);
  const toggleIsPsychadelic = () => setIsPsychadelic((prevState) => !prevState);

  const pathname = usePathname();

  useEffect(() => {
    setIsPsychadelic(false);
  }, [pathname]);

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

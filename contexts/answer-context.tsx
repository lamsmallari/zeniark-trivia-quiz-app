import { createContext, ReactNode, useContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";

interface INITIAL_STATE_SHAPE {
  results: { [key: string]: any }[] | [];
  setResults: Dispatch<SetStateAction<INITIAL_STATE_SHAPE["results"]>>;
}

const INITIAL_STATE: INITIAL_STATE_SHAPE = {
  results: [],
  setResults: () => {},
};

const Context = createContext(INITIAL_STATE);

export function ResultsProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState(INITIAL_STATE.results);
  return (
    <Context.Provider value={{ results, setResults }}>
      {children}
    </Context.Provider>
  );
}

export function useResultsContext() {
  return useContext(Context);
}

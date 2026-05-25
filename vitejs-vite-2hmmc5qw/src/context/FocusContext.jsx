import { createContext, useContext, useState } from 'react';

const FocusContext = createContext();

export function FocusProvider({ children }) {
  const [isFocusMode, setIsFocusMode] = useState(false);

  return (
    <FocusContext.Provider value={{ isFocusMode, setIsFocusMode }}>
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  return useContext(FocusContext);
}

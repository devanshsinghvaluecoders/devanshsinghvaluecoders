import { useState } from "react";
import { createContext, useContext } from "react";
import Header from "../Component/Header";
const AppContext = createContext();
export default function Layout({ children }) {
  const [val, setval] = useState(false);

  let sharedState = { val, setval };
  return (
    <AppContext.Provider value={sharedState}>
      <div>
        <Header />
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

import type { StreakType } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext<{
  streakLists: StreakType[];
  setstreakLists: (streakList: StreakType[]) => void;
  hasHydrated: boolean;
  setHasHydrated: (status: boolean) => void;
}>({
  streakLists: [],
  setstreakLists: () => {},
  hasHydrated: false,
  setHasHydrated: () => {},
});

export const useMyContext = () => {
  return useContext(MyContext);
};

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [streakLists, setstreakLists] = useState([] as StreakType[]);
  const [hasHydrated, setHasHydrated] = useState(false);
  useEffect(() => {
    if (hasHydrated) { //save safely to local storage
      // save to local storage on change:
      localStorage.setItem("streaksDb", JSON.stringify(streakLists));
      console.log("saved locally");
    }
  }, [streakLists]);

  return (
    <MyContext.Provider
      value={{ streakLists, setstreakLists, hasHydrated, setHasHydrated }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;

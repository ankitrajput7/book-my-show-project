import { createContext, useContext, useState } from "react";
import ProfileSideBar from "../../components/header/SideBar";

const SideBarContext = createContext();
export const useSideBarContext = () => useContext(SideBarContext);

export const SideBarProvider = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const openSideBar = () => setShowSideBar(true);
  const closeSideBar = () => setShowSideBar(false);

  return (
    <SideBarContext.Provider value={{ openSideBar, closeSideBar }}>
      {children}
      {showSideBar && <ProfileSideBar />}
    </SideBarContext.Provider>
  );
};

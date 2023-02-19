import { createContext } from "react";

const DarkModeContext = createContext({
  isDarkModeOn: true,
  toggleDarkMode: () => {},
});

export default DarkModeContext;

import { ChakraProvider, useBoolean } from "@chakra-ui/react";
import cn from "classnames";

import "./App.css";

import { BookmarkList, ThemeToggle } from "./components";
import { DarkModeContext } from "./shared";

function App() {
  const isBrowserDarkModeOn = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  const [isDarkModeOn, setDarkMode] = useBoolean(isBrowserDarkModeOn);

  return (
    <ChakraProvider>
      <DarkModeContext.Provider
        value={{ isDarkModeOn, toggleDarkMode: setDarkMode.toggle }}
      >
        <main
          className={cn("main", isDarkModeOn ? "main--dark" : "main--light")}
        >
          <ThemeToggle />
          <BookmarkList />
        </main>
      </DarkModeContext.Provider>
    </ChakraProvider>
  );
}

export default App;

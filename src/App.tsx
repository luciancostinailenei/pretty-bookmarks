import "./App.css";
import { ChakraProvider, useBoolean } from "@chakra-ui/react";
import cn from "classnames";

import { ThemeToggle } from "./components";

function App() {
  const isBrowserDarkModeOn = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  console.log(isBrowserDarkModeOn);
  const [isDarkModeOn, setDarkMode] = useBoolean(isBrowserDarkModeOn);

  return (
    <ChakraProvider>
      <main className={cn("main", isDarkModeOn ? "main--dark" : "main--light")}>
        <ThemeToggle
          isDarkModeOn={isDarkModeOn}
          toggleDarkMode={setDarkMode.toggle}
        />
      </main>
    </ChakraProvider>
  );
}

export default App;

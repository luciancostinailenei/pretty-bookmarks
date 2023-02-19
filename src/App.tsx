import {
  ChakraProvider,
  extendTheme,
  type ThemeConfig,
} from "@chakra-ui/react";

import "./App.css";

import { MainLayout } from "./layouts";

const themeConfig: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};
const theme = extendTheme({ themeConfig });

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout />
    </ChakraProvider>
  );
}

export default App;

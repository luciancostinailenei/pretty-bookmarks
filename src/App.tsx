import { ChakraProvider } from "@chakra-ui/react";

import "./App.css";

import theme from "./theme";
import { MainLayout } from "./layouts";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout />
    </ChakraProvider>
  );
}

export default App;

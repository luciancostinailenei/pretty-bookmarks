import { useColorMode } from "@chakra-ui/react";
import cn from "classnames";

import { BookmarkList, ThemeToggle } from "../components";

const MainLayout = () => {
  const { colorMode } = useColorMode();

  return (
    <main
      className={cn(
        "main",
        colorMode === "dark" ? "main--dark" : "main--light"
      )}
    >
      <ThemeToggle />
      <BookmarkList />
    </main>
  );
};

export default MainLayout;

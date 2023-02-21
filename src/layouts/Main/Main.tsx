import { Heading, useColorMode } from "@chakra-ui/react";
import cn from "classnames";

import { ThemeToggle, BookmarkFolderTabs } from "../../components";

import styles from "./Main.module.css";

const MainLayout = () => {
  const { colorMode } = useColorMode();

  return (
    <main
      className={cn(
        styles.main,
        colorMode === "dark" ? styles["main--dark"] : styles["main--light"]
      )}
    >
      <ThemeToggle />
      <Heading pl="15px" mb="20px" size="sm">
        Your pretty bookmarks:
      </Heading>
      <BookmarkFolderTabs />
    </main>
  );
};

export default MainLayout;

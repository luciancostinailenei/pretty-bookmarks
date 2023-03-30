import { useColorMode } from "@chakra-ui/react";
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

      <h2
        className={cn(
          styles.main__heading,
          colorMode === "dark"
            ? styles["main__heading--dark"]
            : styles["main__heading--light"]
        )}
      >
        My pretty bookmarks:
      </h2>

      <BookmarkFolderTabs />
    </main>
  );
};

export default MainLayout;

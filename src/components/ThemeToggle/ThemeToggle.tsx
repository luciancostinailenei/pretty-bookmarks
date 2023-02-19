import { Switch, Text } from "@chakra-ui/react";
import { useContext } from "react";

import { DarkModeContext } from "../../shared";

import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { isDarkModeOn, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className={styles.themeToggle}>
      <Text fontSize="xs" pr="5px">
        dark:
      </Text>

      <Switch
        onChange={toggleDarkMode}
        id="theme-toggle"
        size="sm"
        colorScheme="gray"
        isChecked={isDarkModeOn}
        pr="5px"
      />
    </div>
  );
};

export default ThemeToggle;

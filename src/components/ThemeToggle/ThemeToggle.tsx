import { Switch, Text } from "@chakra-ui/react";

import styles from "./ThemeToggle.module.css";

const ThemeToggle = ({ isDarkModeOn, toggleDarkMode }: ThemeToggleProps) => {
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

type ThemeToggleProps = {
  isDarkModeOn: boolean;
  toggleDarkMode: () => void;
};

export default ThemeToggle;

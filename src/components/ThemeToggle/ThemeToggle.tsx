import { Switch, Text, useColorMode } from "@chakra-ui/react";

import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className={styles.themeToggle}>
      <Text fontSize="xs" pr="5px">
        dark:
      </Text>

      <Switch
        onChange={toggleColorMode}
        id="theme-toggle"
        size="sm"
        colorScheme="gray"
        isChecked={colorMode === "dark"}
        pr="5px"
      />
    </div>
  );
};

export default ThemeToggle;

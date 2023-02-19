import { Button, Text, useColorMode } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import cn from "classnames";

import styles from "./Bookmark.module.css";

type BookmarkProps = {
  title: string;
  url: string | undefined;
};

const Bookmark = ({ title, url }: BookmarkProps) => {
  const { colorMode } = useColorMode();
  const isDarkModeOn = colorMode === "dark";

  return (
    <div
      className={cn(
        styles.bookmark,
        isDarkModeOn
          ? styles["bookmark--dark"]
          : styles["bookmark--light"]
      )}
    >
      <div className={styles.content}>
        <Text fontSize="sm" as="b">
          <a href={url}>{title}</a>
        </Text>

        <Text>
          <a href={url}>{url}</a>
        </Text>
      </div>

      <div className={styles.actions}>
        <Button colorScheme="gray" ml="5px" size="xs" variant="ghost">
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default Bookmark;

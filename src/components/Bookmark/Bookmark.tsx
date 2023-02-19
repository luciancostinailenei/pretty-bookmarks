import { useContext } from "react";
import { Checkbox, Text } from "@chakra-ui/react";
import cn from "classnames";

import { DarkModeContext } from "../../shared";

import styles from "./Bookmark.module.css";

type BookmarkProps = {
  title: string;
  url: string | undefined;
};

const Bookmark = ({ title, url }: BookmarkProps) => {
  const { isDarkModeOn } = useContext(DarkModeContext);

  console.log("dark", isDarkModeOn);

  return (
    <div
      className={cn(
        styles.bookmark,
        isDarkModeOn ? styles["bookmark--dark"] : styles["bookmark--light"]
      )}
    >
      <div className={styles.content}>
        <Text fontSize="sm" as="b">
          {title}
        </Text>
        <Text>
          <a href={url}>{url}</a>
        </Text>
      </div>
      {/* <Checkbox></Checkbox> */}
    </div>
  );
};

export default Bookmark;

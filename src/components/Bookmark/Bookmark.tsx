import { Button, Text, Image, useColorMode } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import cn from "classnames";

import styles from "./Bookmark.module.css";
import MoveToFolderMenu from "./MoveToFolderMenu";

interface BookmarkProps extends chrome.bookmarks.BookmarkTreeNode {
  removeBookmark: (bookmarkId: string) => void;
}

const Bookmark = ({ title, url, id, removeBookmark }: BookmarkProps) => {
  const { colorMode } = useColorMode();
  const isDarkModeOn = colorMode === "dark";

  const onPressDelete = async (bookmarkId: string) => {
    await chrome.bookmarks.remove(bookmarkId);
    removeBookmark(id);
  };

  return (
    <div
      className={cn(
        styles.bookmark,
        isDarkModeOn ? styles["bookmark--dark"] : styles["bookmark--light"]
      )}
    >
      {url && (
        <Image
          boxSize="16px"
          borderRadius="full"
          mt="2px"
          src={`chrome-extension://${
            chrome.runtime.id
          }/_favicon/?pageUrl=${encodeURIComponent(url)}&size=16`}
        ></Image>
      )}

      <div className={styles.content}>
        <Text color="teal.400" fontSize="sm" as="b">
          <a href={url} rel="noreferrer" target="_blank">
            {title}
          </a>
        </Text>

        <Text fontSize="sm">
          <a href={url} rel="noreferrer" target="_blank">
            {url}
          </a>
        </Text>
      </div>

      <div className={styles.actions}>
        <MoveToFolderMenu removeBookmark={removeBookmark} bookmarkId={id} />

        <Button
          onClick={() => onPressDelete(id)}
          colorScheme="teal"
          ml="5px"
          size="xs"
          variant="ghost"
        >
          <DeleteIcon boxSize={3} />
        </Button>
      </div>
    </div>
  );
};

export default Bookmark;

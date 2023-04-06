import { Button, Text, Image, useColorMode } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import cn from "classnames";

import styles from "./Bookmark.module.css";
import MoveToFolderMenu from "./MoveToFolderMenu";

interface BookmarkProps extends chrome.bookmarks.BookmarkTreeNode {
  removeBookmarkFromList: (bookmarkId: string) => void;
}

const Bookmark = ({
  title,
  url,
  id,
  dateAdded,
  removeBookmarkFromList,
}: BookmarkProps) => {
  const { colorMode } = useColorMode();
  const isDarkModeOn = colorMode === "dark";

  const removeBookmarkFromChromeAndList = async (bookmarkId: string) => {
    await chrome.bookmarks.remove(bookmarkId);
    removeBookmarkFromList(id);
  };

  const parsedDate = dateAdded
    ? new Date(dateAdded).toLocaleDateString("en-US")
    : "";

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

      <div className={styles["bookmark__content"]}>
        <Text color="teal.400" fontSize="sm" as="b">
          <a href={url} rel="noreferrer" target="_blank">
            {title}
          </a>
        </Text>

        {dateAdded && (
          <Text color="gray.400">
            Saved on: <span>{parsedDate}</span>
          </Text>
        )}

        <Text fontSize="sm">
          <a href={url} rel="noreferrer" target="_blank">
            {url}
          </a>
        </Text>
      </div>

      <div className={styles["bookmark__actions"]}>
        <MoveToFolderMenu
          removeBookmarkFromList={removeBookmarkFromList}
          bookmarkId={id}
        />

        <Button
          onClick={() => removeBookmarkFromChromeAndList(id)}
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

import { useContext } from "react";
import {
  Button,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  MenuGroup,
} from "@chakra-ui/react";
import { DeleteIcon, ExternalLinkIcon, StarIcon } from "@chakra-ui/icons";
import cn from "classnames";

import { BookmarkFoldersContext } from "../";

import styles from "./Bookmark.module.css";

interface BookmarkProps extends chrome.bookmarks.BookmarkTreeNode {
  removeBookmark: (bookmarkId: string) => void;
}

const Bookmark = ({ title, url, id, removeBookmark }: BookmarkProps) => {
  const { colorMode } = useColorMode();
  const isDarkModeOn = colorMode === "dark";

  const { folders, refreshFolders } = useContext(BookmarkFoldersContext);

  const onPressDelete = async (bookmarkId: string) => {
    await chrome.bookmarks.remove(bookmarkId);
    removeBookmark(id);
  };

  const onChooseFolder = async (bookmarkId: string, folderId: string) => {
    await chrome.bookmarks.move(bookmarkId, { parentId: folderId });
    removeBookmark(id);
    await refreshFolders();
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
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="teal"
            ml="5px"
            size="xs"
            variant="ghost"
          >
            <ExternalLinkIcon mt="-1" boxSize={4} />
          </MenuButton>
          <MenuList>
            <MenuGroup title="Move to folder:">
              {folders.map(({ title, id: folderId }) => (
                <MenuItem
                  key={`menu-${title}-${id}`}
                  onClick={() => onChooseFolder(id, folderId)}
                  pl="20px"
                >
                  <StarIcon />
                  <Text ml="5px">{title}</Text>
                </MenuItem>
              ))}
            </MenuGroup>
          </MenuList>
        </Menu>

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

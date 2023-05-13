import { memo, useContext, useRef } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { BookmarkFoldersContext } from "../../..";
import MenuItemTreeList from "./MenuItemTreeList";

interface MoveToFolderMenuProps {
  removeBookmarkFromList: (bookmarkId: string) => void;
  bookmarkId: string;
}

const MoveToFolderMenu = ({
  removeBookmarkFromList,
  bookmarkId,
}: MoveToFolderMenuProps) => {
  const { folders, refreshFolders } = useContext(BookmarkFoldersContext);
  const menuGroupRef = useRef<HTMLDivElement>(null);

  const moveBookmarkAndRefresh = async (
    bookmarkId: string,
    folderId: string
  ) => {
    await chrome.bookmarks.move(bookmarkId, { parentId: folderId });
    removeBookmarkFromList(bookmarkId);
    await refreshFolders();
  };

  return (
    <Menu
      isLazy
      strategy="fixed"
      placement="left-start"
      initialFocusRef={menuGroupRef}
    >
      <MenuButton
        as={Button}
        colorScheme="teal"
        ml="5px"
        size="xs"
        variant="ghost"
      >
        <ExternalLinkIcon mt="-1" boxSize={4} />
      </MenuButton>
      <MenuList
        sx={{
          "&": {
            maxHeight: "200px",
            overflowX: "hidden",
            overflowY: "scroll",
          },
        }}
      >
        <MenuGroup ref={menuGroupRef} title="Move to folder:">
          <MenuItemTreeList
            folders={folders}
            bookmarkId={bookmarkId}
            onChooseFolder={moveBookmarkAndRefresh}
            startLevel={1}
          />
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default memo(MoveToFolderMenu);

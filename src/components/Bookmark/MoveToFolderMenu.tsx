import { memo, useContext } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { BookmarkFoldersContext } from "../";
import MenuItemTreeList from "./MenuItemTreeList";

interface MoveToFolderMenuProps {
  removeBookmark: (bookmarkId: string) => void;
  bookmarkId: string;
}

const MoveToFolderMenu = ({
  removeBookmark,
  bookmarkId,
}: MoveToFolderMenuProps) => {
  const { folders, refreshFolders } = useContext(BookmarkFoldersContext);

  const onChooseFolder = async (bookmarkId: string, folderId: string) => {
    await chrome.bookmarks.move(bookmarkId, { parentId: folderId });
    removeBookmark(bookmarkId);
    await refreshFolders();
  };

  const MenuItemTreeListComponent = memo(MenuItemTreeList);

  return (
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
          <MenuItemTreeListComponent
            folders={folders}
            bookmarkId={bookmarkId}
            onChooseFolder={onChooseFolder}
            startLevel={1}
          />
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default MoveToFolderMenu;

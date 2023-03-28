import { Text, MenuItem } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface MenuItemTreeListProps {
  folders: chrome.bookmarks.BookmarkTreeNode[];
  bookmarkId: string;
  startLevel: number;
  onChooseFolder: (bookmarkId: string, folderId: string) => void;
}

const MenuItemTreeList = ({
  folders,
  bookmarkId,
  startLevel,
  onChooseFolder,
}: MenuItemTreeListProps) => (
  <>
    {folders.map(({ title, id: folderId, children }) => (
      <>
        {children && ( // is folder
          <MenuItem
            key={`menu-${title}-${bookmarkId}`}
            onClick={() => onChooseFolder(bookmarkId, folderId)}
            pl={`${20 * startLevel}px`}
          >
            <StarIcon />
            <Text ml="5px">{title}</Text>
          </MenuItem>
        )}

        {children &&
          children.length > 0 && ( // is folder and there's a possibility to have subfolders
            <MenuItemTreeList
              folders={children}
              bookmarkId={bookmarkId}
              onChooseFolder={onChooseFolder}
              key={`move-to-folder-menu-${folderId}`}
              startLevel={startLevel + 1}
            />
          )}
      </>
    ))}
  </>
);

export default MenuItemTreeList;

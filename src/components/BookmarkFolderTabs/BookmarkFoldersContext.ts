import { createContext } from "react";

type DefaultContextState = {
  folders: Array<chrome.bookmarks.BookmarkTreeNode> | [];
  refreshFolders: () => Promise<void>;
};

const BookmarkFoldersContext = createContext<DefaultContextState>({
  folders: [],
  refreshFolders: () => Promise.resolve(),
});

export default BookmarkFoldersContext;

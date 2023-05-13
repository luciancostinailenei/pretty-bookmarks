import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  AbsoluteCenter,
  Spinner,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import BookmarkList, { BookmarkListType } from "./BookmarkList/BookmarkList";
import BookmarkFoldersContext from "./BookmarkFoldersContext";
import CreateFolder from "./CreateFolder";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const fetchBookmarksFoldersAndSortByItemsCount = async (): Promise<
  chrome.bookmarks.BookmarkTreeNode[]
> => {
  const bookmarksTree = await chrome.bookmarks.getTree();
  const bookmarksFolders = bookmarksTree[0].children || [];

  return bookmarksFolders;
};

const fetchFoldersAndAddToState = async (
  setStateCallback: (folder: chrome.bookmarks.BookmarkTreeNode[]) => void
): Promise<void> => {
  const sortedFolders = await fetchBookmarksFoldersAndSortByItemsCount();
  setStateCallback(sortedFolders);
};

const BookmarkFolderTabs = () => {
  const [folders, setFolders] = useState<chrome.bookmarks.BookmarkTreeNode[]>(
    []
  );
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    fetchFoldersAndAddToState(setFolders);
  }, []);

  const getSortedBookmarksAndSubfoldersInsideFolder = (
    folderId: string
  ): chrome.bookmarks.BookmarkTreeNode[] => {
    const folder = folders.find((f) => f.id === folderId);
    const bookmarks = folder?.children || [];

    if (!bookmarks.length) {
      return [];
    }

    const foldersAndBookmarks = bookmarks.map((bookmark) => {
      if (bookmark.children) {
        return { ...bookmark, type: "folder" };
      }

      return { ...bookmark, type: "bookmark" };
    });

    const alphabeticallySortedFolders = foldersAndBookmarks
      .filter((f) => f.type === "folder")
      .sort((f1, f2) => f1.title.localeCompare(f2.title));

    const dateSortedBookmarks = foldersAndBookmarks
      .filter((f) => f.type === "bookmark" && f.dateAdded)
      .sort((f1, f2) => f1.title.localeCompare(f2.title))
      .sort((a, b) => a.dateAdded! - b.dateAdded!);

    return [...alphabeticallySortedFolders, ...dateSortedBookmarks];
  };

  const getFolderBookmarksCount = (folderId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    return folder?.children ? folder.children.length : 0;
  };

  const BookmarksContent = () => {
    const isBookmarksListLoading = folders.length === 0;

    if (!isBookmarksListLoading) {
      return (
        <Tabs
          mt="25px"
          isLazy
          lazyBehavior="keepMounted"
          size="sm"
          colorScheme="teal"
          index={tabIndex}
          onChange={handleTabsChange}
        >
          <TabList w="max-content">
            {folders.map(({ title, id }) => (
              <Tab key={id}>
                <StarIcon mr="5px" />
                {`${title} (${getFolderBookmarksCount(id)})`}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {folders.map(({ id, title }) => (
              <TabPanel p="5px" key={`tab-${id}`}>
                <CreateFolder parentId={id} />

                <BookmarkList
                  type={BookmarkListType.List}
                  title={title}
                  bookmarks={getSortedBookmarksAndSubfoldersInsideFolder(id)}
                  folderId={id}
                />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      );
    }

    return (
      <AbsoluteCenter color="white" axis="both">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.300"
          size="xl"
        />
      </AbsoluteCenter>
    );
  };

  return (
    <BookmarkFoldersContext.Provider
      value={{
        folders,
        refreshFolders: () => fetchFoldersAndAddToState(setFolders),
      }}
    >
      <BookmarksContent />

      <ScrollToTop />
    </BookmarkFoldersContext.Provider>
  );
};

export default BookmarkFolderTabs;

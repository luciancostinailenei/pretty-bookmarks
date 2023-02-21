import { useState, useEffect } from "react";
import { Tabs, Tab, TabList, TabPanels, TabPanel, Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import BookmarkList from "../BookmarkList";

const BookmarkFolderTabs = () => {
  const [folders, setFolders] = useState<chrome.bookmarks.BookmarkTreeNode[]>(
    []
  );

  useEffect(() => {
    const fetchBookmarksAndAttachToState = async (): Promise<void> => {
      const bookmarksTree = await chrome.bookmarks.getTree();
      const bookmarksFolders = bookmarksTree[0].children || [];

      setFolders(bookmarksFolders);
    };

    fetchBookmarksAndAttachToState();
  }, []);

  const getSortedBookmarksInsideFolder = (folderId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    const bookmarks = folder?.children || [];
    let sortedBookmarks: chrome.bookmarks.BookmarkTreeNode[] = [];

    if (bookmarks.length) {
      // @ts-ignore: Unreachable code error
      sortedBookmarks = bookmarks.sort((a, b) => b.dateAdded - a.dateAdded);
    }

    return sortedBookmarks;
  };

  return (
    <Tabs size="sm" colorScheme="teal">
      <>
        <Box
          sx={{
            "&::-webkit-scrollbar": {
              height: "10px",
              backgroundColor: `rgba(0, 0, 0, 0.1)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.1)`,
            },
          }}
          overflow="auto"
        >
          <TabList w="max-content">
            {folders.map(({ title, id }) => (
              <Tab key={id}>
                <StarIcon mr="5px" />
                {title}
              </Tab>
            ))}
          </TabList>
        </Box>

        <TabPanels>
          {folders.map(({ id }) => (
            <TabPanel p="5px" key={id}>
              <BookmarkList bookmarks={getSortedBookmarksInsideFolder(id)} />
            </TabPanel>
          ))}
        </TabPanels>
      </>
    </Tabs>
  );
};

export default BookmarkFolderTabs;

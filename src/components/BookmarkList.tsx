import { Stack, CheckboxGroup, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import Bookmark from "./Bookmark/Bookmark";

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  useEffect(() => {
    const fetchBookmarksAndAttachToState = async (): Promise<void> => {
      const bookmarksTree = await chrome.bookmarks.getTree();
      const bookmarksTreeNodes = bookmarksTree[0].children;
      const mobileBookmarksTreeNode = bookmarksTreeNodes?.find(
        (c) => c.title === "Mobile bookmarks"
      );
      const bookmarks = mobileBookmarksTreeNode?.children || [];

      let sortedBookmarks: chrome.bookmarks.BookmarkTreeNode[] = [];
      if (bookmarks.length) {
        // @ts-ignore: Unreachable code error
        sortedBookmarks = bookmarks.sort((a, b) => b.dateAdded - a.dateAdded);
      }

      setBookmarks(sortedBookmarks);
    };

    fetchBookmarksAndAttachToState();
  }, []);

  const removeBookmark = (bookmarkId: string) => {
    const filteredBookmarms = bookmarks.filter((b) => b.id !== bookmarkId);
    setBookmarks(filteredBookmarms);
  };

  return (
    <>
      <Heading pl="15px" mb="10px" size="sm">
        Your pretty bookmarks:
      </Heading>
      <CheckboxGroup colorScheme="teal">
        <Stack p="2" spacing="2" direction="column">
          {bookmarks &&
            bookmarks.map((bookmark) => {
              const { title, url, id } = bookmark;
              return (
                <Bookmark
                  title={title}
                  url={url}
                  id={id}
                  removeBookmark={removeBookmark}
                  key={id}
                />
              );
            })}
        </Stack>
      </CheckboxGroup>
    </>
  );
};

export default BookmarkList;

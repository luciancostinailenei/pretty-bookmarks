import { Stack, CheckboxGroup } from "@chakra-ui/react";
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

  return (
    <>
      <CheckboxGroup colorScheme="teal" size="lg">
        <Stack p="2" spacing="2" direction="column">
          {bookmarks &&
            bookmarks.map((bookmark) => {
              const { title, url } = bookmark;
              return <Bookmark title={title} url={url} />;
            })}
        </Stack>
      </CheckboxGroup>
    </>
  );
};

export default BookmarkList;

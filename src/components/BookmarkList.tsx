import { Text, Stack, CheckboxGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import Bookmark from "./Bookmark/Bookmark";

type BookmarkListProps = {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
};

const BookmarkList = ({ bookmarks }: BookmarkListProps) => {
  const [bookmarkList, setBookmarkList] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  useEffect(() => {
    setBookmarkList(bookmarks);
  }, [bookmarks]);

  const removeBookmark = (bookmarkId: string) => {
    const filteredBookmarms = bookmarks.filter((b) => b.id !== bookmarkId);
    setBookmarkList(filteredBookmarms);
  };

  const BookmarkListContent = () => {
    if (bookmarkList.length > 0) {
      return (
        <>
          {bookmarkList.map((bookmark) => {
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
        </>
      );
    }

    return <Text fontSize="sm">No bookmarks saved in this folder.</Text>;
  };

  return (
    <CheckboxGroup colorScheme="teal">
      <Stack p="2" spacing="2" direction="column">
        <BookmarkListContent />
      </Stack>
    </CheckboxGroup>
  );
};

export default BookmarkList;

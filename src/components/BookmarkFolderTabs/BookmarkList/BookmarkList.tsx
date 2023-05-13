import { Text, Stack, CheckboxGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { Bookmark, BookmarkDisplayType } from "../..";
import Subfolder from "./Subfolder";

export const enum BookmarkListType {
  List = "LIST",
  Subfolder = "SUBFOLDER",
  SearchResults = "SEARCHRESULTS",
}

type BookmarkListProps = {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
  type: BookmarkListType;
  title?: string;
  folderId?: string;
};

const BookmarkList = ({
  bookmarks,
  type = BookmarkListType.List,
  title = "",
  folderId = "",
}: BookmarkListProps) => {
  const [bookmarkList, setBookmarkList] =
    useState<chrome.bookmarks.BookmarkTreeNode[]>(bookmarks);

  const removeBookmarkFromList = (bookmarkId: string) => {
    const filteredBookmarks = bookmarkList.filter((b) => b.id !== bookmarkId);
    setBookmarkList(filteredBookmarks);
  };

  useEffect(() => {
    setBookmarkList(bookmarks);
  }, [bookmarks]);

  const BookmarkListContent = () => {
    if (bookmarkList.length > 0) {
      return (
        <>
          {bookmarkList.map((bookmark) => {
            const { title, url, id, children, dateAdded } = bookmark;

            if (type === BookmarkListType.SearchResults && !url) {
              return null;
            }

            if (children) {
              // is subfolder
              return (
                <BookmarkList
                  title={title}
                  type={BookmarkListType.Subfolder}
                  bookmarks={children}
                  key={`bookmarkList-${id}`}
                  folderId={id}
                />
              );
            }

            return (
              <Bookmark
                title={title}
                url={url}
                id={id}
                removeBookmarkFromList={removeBookmarkFromList}
                dateAdded={dateAdded}
                key={`bookmark-${id}`}
                displayType={
                  type === BookmarkListType.SearchResults
                    ? BookmarkDisplayType.SearchResult
                    : BookmarkDisplayType.Bookmark
                }
              />
            );
          })}
        </>
      );
    }

    const noContentText =
      type === BookmarkListType.SearchResults
        ? "No results."
        : "No bookmarks saved in this folder.";

    return <Text fontSize="sm">{noContentText}</Text>;
  };

  return (
    <CheckboxGroup colorScheme="teal">
      <Stack p="2" spacing="2" direction="column">
        {type === BookmarkListType.List ||
        type === BookmarkListType.SearchResults ? (
          <BookmarkListContent />
        ) : (
          <Subfolder
            title={title}
            id={folderId}
            hasBookmarks={bookmarkList.length > 0}
            children={<BookmarkListContent />}
          />
        )}
      </Stack>
    </CheckboxGroup>
  );
};

export default BookmarkList;

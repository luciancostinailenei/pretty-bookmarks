import { Text, Stack, CheckboxGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { Bookmark } from "./";
import Subfolder from "./Subfolder";

export enum BookmarkListType {
  List = "LIST",
  Subfolder = "SUBFOLDER",
}

type BookmarkListProps = {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
  type: BookmarkListType;
  title: string;
  folderId: string;
};

const BookmarkList = ({
  bookmarks,
  type = BookmarkListType.List,
  title,
  folderId,
}: BookmarkListProps) => {
  const [bookmarkList, setBookmarkList] =
    useState<chrome.bookmarks.BookmarkTreeNode[]>(bookmarks);

  useEffect(() => {
    const foldersToTop = bookmarks
      .map((bookmark) => {
        if (bookmark.children) {
          return { ...bookmark, type: "folder" };
        }

        return { ...bookmark, type: "bookmark" };
      })
      .sort((a, b) => {
        if (a.type === "folder" && b.type === "folder") return 0;
        if (a.type === "folder" && b.type === "bookmark") return -1;

        return 1;
      });

    setBookmarkList(foldersToTop);
  }, [bookmarks]);

  const removeBookmarkFromList = (bookmarkId: string) => {
    const filteredBookmarks = bookmarkList.filter((b) => b.id !== bookmarkId);
    setBookmarkList(filteredBookmarks);
  };

  const BookmarkListContent = () => {
    if (bookmarkList.length > 0) {
      return (
        <>
          {bookmarkList.map((bookmark) => {
            const { title, url, id, children, dateAdded } = bookmark;

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
        {type === BookmarkListType.List ? (
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

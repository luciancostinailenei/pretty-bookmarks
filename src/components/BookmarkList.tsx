import {
  Text,
  Stack,
  CheckboxGroup,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  AccordionIcon,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

import Bookmark from "./Bookmark/Bookmark";

export enum BookmarkListType {
  List = "LIST",
  Subfolder = "SUBFOLDER",
}

type BookmarkListProps = {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
  type: BookmarkListType;
  title: string;
};

const BookmarkList = ({
  bookmarks,
  type = BookmarkListType.List,
  title,
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

  const removeBookmark = (bookmarkId: string) => {
    const filteredBookmarms = bookmarks.filter((b) => b.id !== bookmarkId);
    setBookmarkList(filteredBookmarms);
  };

  const BookmarkListContent = () => {
    if (bookmarkList.length > 0) {
      return (
        <>
          {bookmarkList.map((bookmark) => {
            const { title, url, id, children } = bookmark;

            if (children) { // is subfolder
              return (
                <BookmarkList
                  title={title}
                  type={BookmarkListType.Subfolder}
                  bookmarks={children}
                  key={`bookmarkList-${id}`}
                />
              );
            }

            return (
              <Bookmark
                title={title}
                url={url}
                id={id}
                removeBookmark={removeBookmark}
                key={`bookmark-${id}`}
              />
            );
          })}
        </>
      );
    }

    return <Text fontSize="sm">No bookmarks saved in this folder.</Text>;
  };

  const Subfolder = ({ title }: { title: string }) => (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box display="flex" alignItems="center">
                <StarIcon mr="5px" />
                <Text>{title}</Text>
              </Box>
              <AccordionIcon ml="auto" />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Stack p="2" spacing="2" direction="column">
              <BookmarkListContent />
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );

  return (
    <CheckboxGroup colorScheme="teal">
      <Stack p="2" spacing="2" direction="column">
        {type === BookmarkListType.List ? (
          <BookmarkListContent />
        ) : (
          <Subfolder title={title} />
        )}
      </Stack>
    </CheckboxGroup>
  );
};

export default BookmarkList;

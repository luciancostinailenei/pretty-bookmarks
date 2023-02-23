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
            const { title, url, id, children } = bookmark;

            if (children) {
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
            <BookmarkListContent />
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

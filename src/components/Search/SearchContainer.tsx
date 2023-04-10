import { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  InputGroup,
  Input,
  InputLeftElement,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import SearchTriggerInput from "./SearchTriggerInput";
import BookmarkList, { BookmarkListType } from "../BookmarkList";

const SearchContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookmarksResults, setBookmarksResults] = useState<
    chrome.bookmarks.BookmarkTreeNode[] | []
  >([]);

  const finalRef = useRef(null);

  const searchBookmarksInBrowsersStoreAndSetState = async (query: string) => {
    const results = await chrome.bookmarks.search(query);

    setBookmarksResults(results);
  };

  return (
    <>
      <SearchTriggerInput onFocus={onOpen} />

      <Modal
        size="xl"
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader padding="10px">
            <InputGroup
            >
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="teal.400" />}
              />

              <Input
                variant="filled"
                size="md"
                type="text"
                placeholder="Search bookmark"
                _placeholder={{ opacity: 1, color: "gray.400" }}
                sx={{
                  "&, &:hover, &:focus": {
                    border: "none",
                    background: "none",
                  },
                }}
                onChange={(e) =>
                  searchBookmarksInBrowsersStoreAndSetState(e.target.value)
                }
              />
            </InputGroup>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody sx={{ "&:empty": { padding: "0" } }}>
            <BookmarkList
              bookmarks={bookmarksResults}
              type={BookmarkListType.SearchResults}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchContainer;

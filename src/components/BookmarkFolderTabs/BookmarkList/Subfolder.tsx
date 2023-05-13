import { useContext, PropsWithChildren } from "react";
import {
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Flex,
} from "@chakra-ui/react";
import { StarIcon, DeleteIcon } from "@chakra-ui/icons";

import { BookmarkFoldersContext } from "../..";

type SubfolderProps = PropsWithChildren<{
  title: string;
  id: string;
  hasBookmarks: boolean;
}>;

const Subfolder = ({ title, id, hasBookmarks, children }: SubfolderProps) => {
  const { refreshFolders } = useContext(BookmarkFoldersContext);

  const removeFolderFromChromeAndRefresh = async (folderId: string) => {
    await chrome.bookmarks.remove(folderId);
    refreshFolders();
  };

  return (
    <Accordion reduceMotion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton
            sx={{
              "html[data-theme='dark'] &:hover": {
                backgroundColor: "whiteAlpha.200",
              },
              "html[data-theme='dark'] &[aria-expanded='true']": {
                backgroundColor: "whiteAlpha.200",
                color: "teal.300",
              },
              "html[data-theme='light'] &:hover": {
                backgroundColor: "gray.200",
              },
              "html[data-theme='light'] &[aria-expanded='true']": {
                backgroundColor: "gray.200",
                color: "teal.600",
              },
            }}
            className="folderBtn"
          >
            <Flex alignItems="center">
              <StarIcon mr="5px" />
              <Text>{title}</Text>
            </Flex>
            <AccordionIcon ml="auto" />
          </AccordionButton>
        </h2>

        <AccordionPanel pb={4}>
          {!hasBookmarks && (
            <Flex>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                variant="outline"
                size="xs"
                borderRadius="2"
                marginLeft="auto"
                onClick={() => removeFolderFromChromeAndRefresh(id)}
              >
                Delete folder
              </Button>
            </Flex>
          )}

          <Stack p="2" spacing="2" direction="column">
            {children}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Subfolder;

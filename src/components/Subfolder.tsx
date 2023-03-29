import { useContext } from "react";
import {
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  AccordionIcon,
  Button,
  Flex,
} from "@chakra-ui/react";
import { StarIcon, DeleteIcon } from "@chakra-ui/icons";

import { BookmarkFoldersContext } from "./";

type SubfolderProps = {
  title: string;
  id: string;
  hasBookmarks: boolean;
  children: React.ReactNode;
};

const Subfolder = ({ title, id, hasBookmarks, children }: SubfolderProps) => {
  const { refreshFolders } = useContext(BookmarkFoldersContext);

  const removeFolderFromChromeAndRefresh = async (folderId: string) => {
    await chrome.bookmarks.remove(folderId);
    refreshFolders();
  };

  return (
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
    </>
  );
};

export default Subfolder;

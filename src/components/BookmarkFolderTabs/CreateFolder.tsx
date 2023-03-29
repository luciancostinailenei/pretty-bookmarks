import { useState, useContext } from "react";
import {
  Flex,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";

import BookmarkFoldersContext from "./BookmarkFoldersContext";

enum InputStateValues {
  Hidden,
  Visible,
}

const CreateFolder = ({ parentId }: { parentId: string }) => {
  const [inputState, setInputState] = useState<InputStateValues>(
    InputStateValues.Hidden
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [isInputValid, setInputValidity] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { refreshFolders } = useContext(BookmarkFoldersContext);

  const createFolder = (folderName: string) => {
    return chrome.bookmarks.create({ parentId, title: folderName });
  };

  const showInputOrValidateAndThenCreateAndRefresh = async () => {
    if (inputState === InputStateValues.Hidden) {
      setInputState(InputStateValues.Visible);
      return;
    }

    if (!inputValue) {
      setInputValidity(false);
      return;
    }

    try {
      await createFolder(inputValue);
    } catch (e: any) {
      setError(e);
      return;
    }

    setInputValue("");
    setError("");
    setInputValidity(true);
    setInputState(InputStateValues.Hidden);
    refreshFolders();
  };

  const isError = error !== "";

  return (
    <Flex p="2">
      {inputState === InputStateValues.Visible && (
        <FormControl width="78%" isInvalid={isError}>
          <Input
            value={inputValue}
            placeholder="* New folder name"
            size="xs"
            mr="2"
            onChange={(e) => setInputValue(e.target.value)}
            focusBorderColor="green.200"
            errorBorderColor="red.300"
            isInvalid={!isInputValid}
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      )}

      <Button
        leftIcon={
          inputState === InputStateValues.Hidden ? <AddIcon /> : <CheckIcon />
        }
        colorScheme="teal"
        variant="outline"
        size="xs"
        width="20%"
        borderRadius="2"
        onClick={showInputOrValidateAndThenCreateAndRefresh}
        marginLeft="auto"
      >
        New folder
      </Button>
    </Flex>
  );
};

export default CreateFolder;

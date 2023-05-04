import { useState, useContext, useRef, useEffect } from "react";
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
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setInputValidity] = useState(true);
  const [error, setError] = useState("");

  const { refreshFolders } = useContext(BookmarkFoldersContext);

  const createFolder = (folderName: string) => {
    return chrome.bookmarks.create({ parentId, title: folderName });
  };

  const resetStates = () => {
    setInputValue("");
    setError("");
    setInputValidity(true);
    setInputState(InputStateValues.Hidden);
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

    resetStates();
    refreshFolders();
  };

  const isError = error !== "";

  const folderNameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputState === InputStateValues.Visible) {
      folderNameInputRef.current?.focus();
    }
  }, [inputState]);

  return (
    <Flex overflow="hidden" p="2">
      {inputState === InputStateValues.Visible && (
        <FormControl width="78%" isInvalid={isError}>
          <Input
            focusBorderColor="green.200"
            errorBorderColor="red.300"
            size="xs"
            mr="2"
            value={inputValue}
            placeholder="* New folder name"
            onChange={(e) => setInputValue(e.target.value)}
            isInvalid={!isInputValid}
            ref={folderNameInputRef}
            animation="append-animate .3s linear"
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

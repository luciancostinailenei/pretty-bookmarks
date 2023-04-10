import { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import SearchTriggerInput from "./SearchTriggerInput";

const SearchContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const finalRef = useRef(null);

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
          <ModalHeader>Modal Header - Search Input</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Modal Content - Results</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchContainer;

import { Box, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchTriggerInput = ({ onFocus }: { onFocus: () => void }) => {
  return (
    <Box paddingInline="20px">
      <InputGroup
        sx={{
          "html[data-theme='light'] &": { backgroundColor: "gray.50" },
          "html[data-theme='light'] & input::placeholder": {
            color: "gray.500",
          },
          "html[data-theme='dark'] &": { backgroundColor: "whiteAlpha.50" },
        }}
        borderRadius="3px"
      >
        <InputLeftElement
          height="32px"
          pointerEvents="none"
          children={<SearchIcon color="gray.400" />}
        />

        <Input
          width="280px"
          border="none"
          size="sm"
          type="text"
          placeholder="Search bookmark"
          _placeholder={{ opacity: 1, color: "gray.400" }}
          onFocus={onFocus}
        />
      </InputGroup>
    </Box>
  );
};

export default SearchTriggerInput;

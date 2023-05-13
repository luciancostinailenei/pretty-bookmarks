import { useState, useEffect } from "react";
import {
  Button,
  Text,
  Image,
  useColorMode,
  Flex,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import cn from "classnames";

import styles from "./Bookmark.module.css";
import MoveToFolderMenu from "./MoveToFolderMenu";

import { CacheStore } from "../../../../services";

export enum BookmarkDisplayType {
  Bookmark = "BOOKMARK",
  SearchResult = "SEARCHRESULT",
}

interface BookmarkProps extends chrome.bookmarks.BookmarkTreeNode {
  removeBookmarkFromList: (bookmarkId: string) => void;
  displayType: BookmarkDisplayType;
}

const Bookmark = ({
  title,
  url,
  id,
  dateAdded,
  removeBookmarkFromList,
  displayType = BookmarkDisplayType.Bookmark,
}: BookmarkProps) => {
  const { colorMode } = useColorMode();
  const isDarkModeOn = colorMode === "dark";

  const referralStateDefaultValue = {
    isReferralFetched: false,
    ...(CacheStore.isInCacheStore(`${id}-${title}`)
      ? CacheStore.getFromCacheStore(`${id}-${title}`)
      : {}),
  };
  const [referral, setReferral] = useState(referralStateDefaultValue);

  const removeBookmarkFromChromeAndList = async (bookmarkId: string) => {
    await chrome.bookmarks.remove(bookmarkId);
    removeBookmarkFromList(id);
  };

  const parsedDate = dateAdded
    ? new Date(dateAdded).toLocaleDateString("en-US")
    : "";

  useEffect(() => {
    const retrieveReferral = async () => {
      const storageKey = `${id}-${title}`;

      if (!referral.value) {
        const retrievedStorage = await chrome.storage.local.get([
          `${id}-${title}`,
        ]);

        const referralValue = retrievedStorage[storageKey];
        const referalStateValue = {
          isReferralFetched: true,
          value: referralValue,
        };
        setReferral(referalStateValue);
        CacheStore.addToCacheStore(storageKey, referalStateValue);
      }
    };

    retrieveReferral();
  }, [id, title, referral]);

  const slicedReferral =
    referral.value && referral.value.length > 160
      ? referral.value.slice(0, 159).concat("...")
      : referral.value;

  return (
    <div
      className={cn(
        styles.bookmark,
        isDarkModeOn ? styles["bookmark--dark"] : styles["bookmark--light"]
      )}
    >
      {url && (
        <Image
          boxSize="16px"
          borderRadius="full"
          mt="2px"
          src={`chrome-extension://${
            chrome.runtime.id
          }/_favicon/?pageUrl=${encodeURIComponent(url)}&size=16`}
        ></Image>
      )}

      <div className={styles["bookmark__content"]}>
        <Text color="teal.400" fontSize="sm" as="b">
          <a href={url} rel="noreferrer" target="_blank">
            {title}
          </a>
        </Text>

        {dateAdded && (
          <Flex fontSize="13px">
            <Text color="gray.500">Saved on:</Text>
            <Text color="gray.400" fontStyle="italic" ml="3px">
              {parsedDate}
            </Text>
          </Flex>
        )}

        <Box>
          {referral.value && (
            <>
              <span className={styles["bookmark__info-item"]}>
                What brought me here:
              </span>
              <span className={styles["bookmark__info-value"]}>
                <a href={referral.value} rel="noreferrer" target="_blank">
                  {slicedReferral}
                </a>
              </span>
            </>
          )}

          {!referral.isReferralFetched && <Skeleton height="20px" />}
        </Box>

        <Text display="inline" color="blue.400" mt="10px" fontSize="sm">
          <a href={url} rel="noreferrer" target="_blank">
            {url}
          </a>
        </Text>
      </div>

      {displayType === BookmarkDisplayType.Bookmark && (
        <div className={styles["bookmark__actions"]}>
          <MoveToFolderMenu
            removeBookmarkFromList={removeBookmarkFromList}
            bookmarkId={id}
          />

          <Button
            onClick={() => removeBookmarkFromChromeAndList(id)}
            colorScheme="teal"
            ml="5px"
            size="xs"
            variant="ghost"
          >
            <DeleteIcon boxSize={3} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Bookmark;

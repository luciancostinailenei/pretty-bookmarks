import { useState, useEffect } from "react";
import { useColorMode, Icon } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import cn from "classnames";

import styles from "./ScrollToTop.module.css";

const ScrollToTop = () => {
  const { colorMode } = useColorMode();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const SHOW_AFTER_SCROLL_OFFSET = 100;

      if (window.scrollY > SHOW_AFTER_SCROLL_OFFSET) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  return (
    <div className="top-to-btn" onClick={goToTop}>
      {showTopBtn && (
        <Icon
          color="white"
          as={ChevronUpIcon}
          w={25}
          h={25}
          className={cn(
            styles["icon"],
            colorMode === "dark" ? styles["icon--dark"] : styles["icon--light"]
          )}
        />
      )}
    </div>
  );
};

export default ScrollToTop;

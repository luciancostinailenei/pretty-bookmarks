import React, { useState, useEffect } from "react";
import { useColorMode, Icon } from "@chakra-ui/react";
import cn from "classnames";

import styles from "../../layouts/ScrollToTop/ScrollToTop.module.css";
import { ChevronUpIcon } from "@chakra-ui/icons";

const ScrollToTop = () => {
  const { colorMode } = useColorMode();

  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
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

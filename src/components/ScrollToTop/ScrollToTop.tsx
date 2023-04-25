import React, { useState, useEffect } from "react";
import { FaAngleUp } from 'react-icons/fa';
import { useColorMode } from "@chakra-ui/react";
import cn from "classnames";

import '../../App.css';
import styles from "../../layouts/Main/Main.module.css";

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
            behavior: "smooth",
        });
    };
    return (
        <div className="top-to-btm">
            {" "}
            {showTopBtn && (
                <FaAngleUp
                    // className="icon-position icon-style"
                    className={cn(
                        styles["icon-position"],
                        styles["icon-style"],
                        colorMode === "dark"
                          ? styles["main__heading--dark"]
                          : styles["main__heading--light"],
                      )}
                    onClick={goToTop}
                />
            )}{" "}
        </div>
    );
};
export default ScrollToTop;
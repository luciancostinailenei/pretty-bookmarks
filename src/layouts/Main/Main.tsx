import { useColorMode } from "@chakra-ui/react";
import cn from "classnames";

import { ThemeToggle, BookmarkFolderTabs } from "../../components";

import styles from "./Main.module.css";

const MainLayout = () => {
  const { colorMode } = useColorMode();

  return (
    <main
      className={cn(
        styles.main,
        colorMode === "dark" ? styles["main--dark"] : styles["main--light"]
      )}
    >
      <ThemeToggle />

      <h2
        className={cn(
          styles.main__heading,
          colorMode === "dark"
            ? styles["main__heading--dark"]
            : styles["main__heading--light"]
        )}
      >
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="32px"
          height="32px"
          viewBox="0 0 32 32"
          enableBackground="new 0 0 32 32"
        >
          <image
            id="image0"
            width="32"
            height="32"
            x="0"
            y="0"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                  AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABuVBMVEUAAACa/qya/quY/KuT
                  +6uP+auM+KqI9qqF9KqB8ql98Kl676h27ahy66hv6qhr6Khn5qhk5KZg46Zd4aZZ36VW3qVS3KRO
                  2qRL2KRH2KND1aNA06NA06M80qI806E+0aI91KA80qI50KI50KI6z6FJ25IzzJk50aM50KI1zqE1
                  zqIzzJ81y541zqExzKExzKAxy6AA//8yzaIxzKEuy6Euy6Euy6EzzKYwz58uyqIuy6EqyaAqyaAr
                  yKIqyKCa/qyX/KuT+6uP+auM96qI9qqF9KqJ9K2B8qmD8qvd/ed98Kmn9sXq//J676h876nX/efn
                  //LY/eh27ah97q2N8bed88K5+NTj//Fy66ic88Pf/+/g//Cb88Nv6qeP8Lza/+7c/++O8Ltr6KeQ
                  8L/W/+zY/+7W/+2S8MFo5qeI7bzS/uvV/+3T/+uL7r1k5KbI/ebR/+zH/eZg46Zo5avO/+tp5atd
                  4aZ46bjK/+rD/eV56bdZ36WB677G/+nB/uaT8Mlg4aqA6r1W3qVb36h/6r5h4axa36dS3KRO2qRL
                  2KRH16ND1aNA06M80qI50KI1zqExzKEuy6H////YBMblAAAAP3RSTlMAr7Tv7+/v7+/v7+/v7+/v
                  7+/v7+/v7+/v7+/v/u/aQjvU7/aABwVv9O+/KCK47+heAU3k7/6iFBCR/bfPPLbCzpTWAAAAAWJL
                  R0SSlgTvIAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAAAd0SU1FB+cEAQkoNY6WETkAAAFvSURBVDjL
                  bcr3O0JRHMfxS6mUlmiojMyMrGzZIiVRSCR771loGNmj/mP3nO69vo/nvH649/s5z5uikKx+gmzq
                  D2+AgAcC/iABHwQ5QwQ5IBAMEwhAIBwhEIJANMqy27lTBILcMca4wzHO3rkgEE8wnC6Xk73FIJBM
                  ZrinPJ5pNzMkIMiboXl9s3PztLlZnxftPBBI/X7/QmCRE1iiH6QgkAWDweXQCie0Sj/IQCBfo61v
                  bDK2ttGWg0Cxg+zu7WMHh3gqQKA8wo5PsNPMUoIg/ww5v2Bc4pkPAtUVch0OhyMR+nODpwoEBbfI
                  XTQWTyTiseg9ngUgKHxAHp+S6Jd8esazEATqFwI1CDSvBBoQaN8ItCDQvRPoQFD0QVAEAv0ny2Dg
                  Tj0IjF+M4pLSMvY2gsD0jZVXVFJUVXVNZplAYP5Bausyq74BTzMILKlUqrGpmdstrfSDBQTWdFt7
                  B9hUZ1d32gp2T6+N+sfW24f/vwTL7OUZGe7IAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA0LTAx
                  VDA5OjQwOjUzKzAwOjAwPKA6UgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNC0wMVQwOTo0MDo1
                  MyswMDowME39gu4AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSu
                  QmCC"
          />
        </svg>
        <span>My pretty bookmarks</span>
      </h2>

      <BookmarkFolderTabs />
    </main>
  );
};

export default MainLayout;

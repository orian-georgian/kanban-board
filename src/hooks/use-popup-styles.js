import { useSelector } from "react-redux";
import useDimensions from "./use-dimensions";

import { modalStyles, colors, themes } from "../constants/general";

export default function usePopupStyles() {
  const theme = useSelector((state) => state.layout.theme);
  const { isMobileView } = useDimensions();
  const isDark = theme === themes.DARK;

  return {
    ...modalStyles,
    overlay: {
      ...modalStyles.overlay,
      backgroundColor: isDark
        ? colors.TRANSPATENT_BLACK
        : colors.TRANSPARENT_SNOW,
    },
    content: {
      ...modalStyles.content,
      backgroundColor: isDark ? colors.DARK_GRAY : colors.ALL_WHITE,
      ...(isMobileView && { maxHeight: "calc(100vh - 20px)", padding: "20px" }),
    },
  };
}

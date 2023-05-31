import { useSelector } from "react-redux";

import { modalStyles, colors, themes } from "../constants/general";

export default function usePopupStyles() {
  const theme = useSelector((state) => state.layout.theme);
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
    },
  };
}

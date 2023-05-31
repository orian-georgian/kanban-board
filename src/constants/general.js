export const themes = {
  DARK: "dark",
  LIGHT: "light",
};

export const colors = {
  DARK_GRAY: "#2c2c38",
  ALL_WHITE: "#ffffff",
  TRANSPATENT_BLACK: "#00000080",
  TRANSPARENT_SNOW: "#00000090",
  BORDER_GRAY: "#3f3f4b",
  SHY_BORDER_GRAY: "#cccccc",
};

export const modalStyles = {
  overlay: {
    backgroundColor: colors.TRANSPATENT_BLACK,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: colors.DARK_GRAY,
    width: "450px",
    border: "none",
    padding: "30px",
  },
};

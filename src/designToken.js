export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          background: {
            default: "#e2eef5",
          },
          color: {
            primary: "#000",
            secondary: "#035366",
            shadows: "rgba(0, 0, 0, 0.1)",
          },
        }
      : {
          background: {
            default: "#002741",
          },
          color: {
            primary: "#fff",
            secondary: "#035366",
            shadows: "rgba(255, 255, 255, 0.1)",
          },
          // palette values for dark mode
        }),
  },
});

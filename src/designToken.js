export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
        // palette values for light mode
        background: {
          default: "#e2eef5",
          navbar: "#002f5f",
        },
        color: {
          primary: "#000",
          secondary: "#035366",
          shadows: "rgba(0, 0, 0, 0.1)",
          mode: "#fff",
        },

      }
      : {
        // palette values for dark mode
        background: {
          default: "#002741",
          navbar: "#121212",
        },
        color: {
          primary: "#fff",
          secondary: "#035366",
          shadows: "rgba(255, 255, 255, 0.1)",
          mode: "#000",
        },

        // palette values for dark mode
      }),
  },
});

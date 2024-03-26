import { createTheme, responsiveFontSizes } from "@mui/material";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#071541",
      },
      secondary: {
        main: "#78909c",
      },
    },
    typography: {
      fontSize: 14,
    },
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            background: "#fff",
            color: "#071541",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            background: "#fff",
          },
        },
      },
    },
  })
);

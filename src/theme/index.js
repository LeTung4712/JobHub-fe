import { createTheme } from "@mui/material/styles";

// Tạo theme chính cho dark mode
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#646cff",
      light: "#858eff",
      dark: "#535bf2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3498db",
      light: "#5dade2",
      dark: "#2980b9",
      contrastText: "#ffffff",
    },
    background: {
      default: "#242424",
      paper: "#2a2a2a",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.6)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  typography: {
    fontFamily: '"system-ui", "Avenir", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#2a2a2a",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          border: "1px solid #3a3a3a",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a",
        },
      },
    },
  },
});

// Tạo theme cho light mode
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#646cff",
      light: "#858eff",
      dark: "#535bf2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3498db",
      light: "#5dade2",
      dark: "#2980b9",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f9f9f9",
    },
    text: {
      primary: "#213547",
      secondary: "#555555",
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    fontFamily: '"system-ui", "Avenir", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2c3e50",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  },
});

// Mặc định export theme sáng
export default lightTheme;

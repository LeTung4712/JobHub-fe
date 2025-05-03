import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Typography, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";

function MainLayout() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[900],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            &copy; {currentYear} JobHub. Đã đăng ký bản quyền.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default MainLayout;

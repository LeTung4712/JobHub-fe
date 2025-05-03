import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Việc làm", path: "/jobs" },
    { name: "Giới thiệu", path: "/about" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <WorkIcon sx={{ mr: 1 }} />
        JobHub
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => handleNavigation("/login")}
          >
            <ListItemText primary="Đăng nhập" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              textAlign: "center",
              backgroundColor: theme.palette.primary.main,
              color: "white",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
              margin: "8px 16px",
              borderRadius: 1,
            }}
            onClick={() => handleNavigation("/register")}
          >
            <ListItemText primary="Đăng ký" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" component="nav">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo và Menu icon cho mobile */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/")}
            >
              <WorkIcon sx={{ mr: 1 }} />
              JobHub
            </Typography>

            {/* Hiển thị cho desktop */}
            {!isMobile && (
              <>
                <Box sx={{ flexGrow: 1, display: "flex" }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      color="inherit"
                      onClick={() => handleNavigation(item.path)}
                      sx={{ mx: 1 }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => handleNavigation("/login")}
                    sx={{ 
                      mx: 1, 
                      borderColor: "rgba(255,255,255,0.7)",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255,255,255,0.2)"
                      }
                    }}
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleNavigation("/register")}
                    sx={{ 
                      mx: 1, 
                      backgroundColor: "#fff",
                      color: "primary.main",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.85)"
                      }
                    }}
                  >
                    Đăng ký
                  </Button>
                </Box>
              </>
            )}

            {/* Nút menu cho thiết bị di động */}
            {isMobile && (
              <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer cho mobile */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: "block",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default Navbar;

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
  Avatar,
  Tooltip,
  Divider,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "../App"; // Import useAuth hook

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth(); // Sử dụng AuthContext

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout(); // Sử dụng hàm logout từ AuthContext
    setAnchorElUser(null);
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (mobileOpen) {
      setMobileOpen(false);
    }
    if (anchorElUser) {
      setAnchorElUser(null);
    }
  };

  const navItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Việc làm", path: "/jobs" },
    { name: "Giới thiệu", path: "/about" },
  ];

  const userMenuItems = [
    {
      name: "Hồ sơ cá nhân",
      icon: <AccountCircleIcon fontSize="small" />,
      path: "/profile",
    },
    {
      name: "Bảng điều khiển",
      icon: <DashboardIcon fontSize="small" />,
      path: "/dashboard",
    },
    {
      name: "Đăng xuất",
      icon: <LogoutIcon fontSize="small" />,
      action: handleLogout,
    },
  ];

  // Component drawer cho mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WorkIcon sx={{ mr: 1 }} />
        JobHub
      </Typography>
      <Divider />
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

        {isAuthenticated ? (
          <>
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
                onClick={() => handleNavigation("/posts/create")}
              >
                <AddIcon sx={{ mr: 1 }} />
                <ListItemText primary="Đăng bài mới" />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ my: 1 }} />
            {userMenuItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={item.action || (() => handleNavigation(item.path))}
                >
                  {item.icon}
                  <ListItemText primary={item.name} sx={{ ml: 1 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        ) : (
          <>
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
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" component="nav">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
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

                <Box
                  sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}
                >
                  {isAuthenticated ? (
                    <>
                      <Button
                        color="inherit"
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleNavigation("/posts/create")}
                        sx={{
                          mx: 1,
                          backgroundColor: "rgba(255,255,255,0.15)",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.25)",
                          },
                        }}
                      >
                        Đăng bài mới
                      </Button>

                      <Tooltip title="Thông báo">
                        <IconButton color="inherit" sx={{ mx: 0.5 }}>
                          <Badge badgeContent={3} color="error">
                            <NotificationsIcon />
                          </Badge>
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Cài đặt tài khoản">
                        <IconButton
                          onClick={handleOpenUserMenu}
                          sx={{ mx: 0.5, p: 0 }}
                        >
                          {user.avatar ? (
                            <Avatar
                              alt={user.name}
                              src={user.avatar}
                              sx={{
                                width: 40,
                                height: 40,
                                border: "2px solid white",
                              }}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: theme.palette.secondary.main,
                                border: "2px solid white",
                              }}
                            >
                              {user.name.charAt(0).toUpperCase()}
                            </Avatar>
                          )}
                        </IconButton>
                      </Tooltip>

                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <Box sx={{ px: 2, py: 1, textAlign: "center" }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {user.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                        <Divider />
                        {userMenuItems.map((item) => (
                          <MenuItem
                            key={item.name}
                            onClick={
                              item.action || (() => handleNavigation(item.path))
                            }
                            sx={{
                              py: 1,
                              gap: 1.5,
                            }}
                          >
                            {item.icon}
                            <Typography variant="body2">{item.name}</Typography>
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Button
                        color="inherit"
                        variant="outlined"
                        onClick={() => handleNavigation("/login")}
                        sx={{
                          mx: 1,
                          borderColor: "rgba(255,255,255,0.7)",
                          "&:hover": {
                            borderColor: "white",
                            backgroundColor: "rgba(255,255,255,0.2)",
                          },
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
                            backgroundColor: "rgba(255,255,255,0.85)",
                          },
                        }}
                      >
                        Đăng ký
                      </Button>
                    </>
                  )}
                </Box>
              </>
            )}

            {/* Nút menu cho thiết bị di động */}
            {isMobile && (
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  justifyContent: "flex-end",
                }}
              >
                {isAuthenticated && !mobileOpen && (
                  <Button
                    color="inherit"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleNavigation("/posts/create")}
                    sx={{
                      mr: 1,
                      backgroundColor: "rgba(255,255,255,0.15)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.25)",
                      },
                    }}
                  >
                    Đăng bài
                  </Button>
                )}
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
              width: 280,
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

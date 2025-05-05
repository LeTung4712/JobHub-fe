import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Divider,
  useTheme,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây
    console.log("Đăng nhập với:", formData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f8f9fa",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "50%",
          height: "120%",
          background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          borderRadius: "0 0 0 100%",
          opacity: 0.7,
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "50%",
          height: "120%",
          background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.dark})`,
          borderRadius: "0 100% 0 0",
          opacity: 0.3,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ zIndex: 1, my: 4 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={isMobile ? 4 : 8}
          sx={{
            minHeight: "80vh",
            position: "relative",
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            lg={7}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box
              sx={{
                pr: { md: 4, lg: 10 },
                position: "relative",
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  color: "text.primary",
                  textShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                  lineHeight: 1.2,
                  fontSize: { md: "3rem", lg: "3.5rem" },
                }}
              >
                Tìm việc{" "}
                <Box
                  component="span"
                  sx={{ color: theme.palette.primary.main }}
                >
                  mơ ước
                </Box>{" "}
                của bạn
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: "text.secondary",
                  fontWeight: 400,
                  opacity: 0.9,
                  maxWidth: "80%",
                  lineHeight: 1.5,
                }}
              >
                Kết nối với hàng ngàn cơ hội nghề nghiệp phù hợp với kỹ năng và
                mục tiêu của bạn.
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            lg={5}
            sx={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <Card
              elevation={16}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                backdropFilter: "blur(20px)",
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow:
                  "0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
                maxWidth: { sm: "450px", md: "100%" },
                mx: "auto",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{
                    p: 4,
                    pb: 3,
                  }}
                >
                  <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography
                      variant="h4"
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      Đăng nhập
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        maxWidth: "80%",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      Đăng nhập để tiếp tục hành trình tìm kiếm công việc mơ ước
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineIcon color="primary" />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          height: 56,
                          "&.MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: theme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderWidth: "1px",
                            },
                          },
                        },
                      }}
                      sx={{
                        mb: 3,
                        "& .MuiInputLabel-root": {
                          fontSize: "0.95rem",
                        },
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Mật khẩu"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          height: 56,
                          "&.MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: theme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderWidth: "1px",
                            },
                          },
                        },
                      }}
                      sx={{
                        mb: 3,
                        "& .MuiInputLabel-root": {
                          fontSize: "0.95rem",
                        },
                      }}
                    />

                    <Box sx={{ textAlign: "right", mb: 3 }}>
                      <Link
                        to="/forgot-password"
                        style={{ textDecoration: "none" }}
                      >
                        <MuiLink
                          component="span"
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            transition: "color 0.2s ease",
                            "&:hover": {
                              color: theme.palette.primary.dark,
                              textDecoration: "none",
                            },
                          }}
                        >
                          Quên mật khẩu?
                        </MuiLink>
                      </Link>
                    </Box>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        py: 1.8,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: "1rem",
                        textTransform: "none",
                        boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: `0 10px 25px ${theme.palette.primary.main}50`,
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        },
                      }}
                    >
                      Đăng nhập
                    </Button>

                    <Box sx={{ mt: 3, textAlign: "center" }}>
                      <Typography
                        variant="body1"
                        sx={{ color: "text.secondary" }}
                      >
                        Chưa có tài khoản?{" "}
                        <Link to="/register" style={{ textDecoration: "none" }}>
                          <MuiLink
                            component="span"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.primary.main,
                              transition: "color 0.2s ease",
                              "&:hover": {
                                color: theme.palette.primary.dark,
                                textDecoration: "none",
                              },
                            }}
                          >
                            Đăng ký ngay
                          </MuiLink>
                        </Link>
                      </Typography>
                    </Box>

                    <Divider
                      sx={{
                        mt: 4,
                        mb: 3,
                        "&::before, &::after": {
                          borderColor: "rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          px: 2,
                          fontWeight: 500,
                          backgroundColor: "white",
                          position: "relative",
                        }}
                      >
                        HOẶC
                      </Typography>
                    </Divider>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<GoogleIcon />}
                          sx={{
                            borderRadius: 2,
                            py: 1.5,
                            color: "#DB4437",
                            borderColor: "#DB4437",
                            fontWeight: 600,
                            textTransform: "none",
                            "&:hover": {
                              borderColor: "#DB4437",
                              backgroundColor: "rgba(219, 68, 55, 0.08)",
                            },
                          }}
                        >
                          Google
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<FacebookIcon />}
                          sx={{
                            borderRadius: 2,
                            py: 1.5,
                            color: "#4267B2",
                            borderColor: "#4267B2",
                            fontWeight: 600,
                            textTransform: "none",
                            "&:hover": {
                              borderColor: "#4267B2",
                              backgroundColor: "rgba(66, 103, 178, 0.08)",
                            },
                          }}
                        >
                          Facebook
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "rgba(100, 108, 255, 0.04)",
                    p: 3,
                    textAlign: "center",
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Bằng việc đăng nhập, bạn đồng ý với{" "}
                    <MuiLink component="span" sx={{ fontWeight: 600 }}>
                      Điều khoản sử dụng
                    </MuiLink>{" "}
                    và{" "}
                    <MuiLink component="span" sx={{ fontWeight: 600 }}>
                      Chính sách bảo mật
                    </MuiLink>{" "}
                    của chúng tôi
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Login;

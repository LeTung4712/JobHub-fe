import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Divider,
  useTheme,
  Alert,
  Stack,
  Avatar,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (name === "confirmPassword" || name === "password") {
      if (
        (name === "confirmPassword" && value !== formData.password) ||
        (name === "password" &&
          value !== formData.confirmPassword &&
          formData.confirmPassword)
      ) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };

  const handleClickShowPassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }
    // Xử lý đăng ký ở đây
    console.log("Đăng ký với:", formData);
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
            md={8}
            lg={9}
            sx={{
              display: { xs: "none", md: "block" },
              order: { xs: 2, md: 1 },
            }}
          >
            <Box
              sx={{
                pl: { md: 4, lg: 10 },
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
                Cơ hội nghề nghiệp{" "}
                <Box
                  component="span"
                  sx={{ color: theme.palette.primary.main }}
                >
                  mới
                </Box>{" "}
                đang chờ đón bạn
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
                Tạo tài khoản ngay hôm nay để bắt đầu hành trình khám phá công
                việc mơ ước của bạn.
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={9}
            md={6}
            lg={5}
            sx={{
              position: "relative",
              zIndex: 2,
              order: { xs: 1, md: 2 },
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
                maxWidth: { xs: "360px", sm: "450px", md: "550px" },
                mx: "auto",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{
                    p: { xs: 2, sm: 2.5 },
                    pb: 2,
                  }}
                >
                  <Box sx={{ textAlign: "center", mb: 2.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 65,
                        height: 65,
                        mx: "auto",
                        mb: 2,
                        boxShadow: "0 8px 20px rgba(100, 108, 255, 0.3)",
                      }}
                    >
                      <HowToRegIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography
                      variant="h4"
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 1,
                        fontSize: { xs: "1.5rem", sm: "1.7rem", md: "1.9rem" },
                      }}
                    >
                      Đăng ký tài khoản
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        maxWidth: "90%",
                        mx: "auto",
                        mb: 2,
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      }}
                    >
                      Tạo tài khoản để khám phá hàng ngàn cơ hội việc làm hấp
                      dẫn
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="fullName"
                      label="Họ và tên"
                      name="fullName"
                      autoComplete="name"
                      autoFocus
                      value={formData.fullName}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineIcon
                              color="primary"
                              fontSize="medium"
                            />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          height: 52,
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
                        mb: 2,
                        "& .MuiInputLabel-root": {
                          fontSize: "0.95rem",
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "1rem",
                        },
                      }}
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineIcon
                              color="primary"
                              fontSize="medium"
                            />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          height: 52,
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
                        mb: 2,
                        "& .MuiInputLabel-root": {
                          fontSize: "0.95rem",
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "1rem",
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
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon
                              color="primary"
                              fontSize="medium"
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                handleClickShowPassword("password")
                              }
                              edge="end"
                              size="medium"
                            >
                              {showPassword ? (
                                <VisibilityOffIcon fontSize="small" />
                              ) : (
                                <VisibilityIcon fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          height: 52,
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
                        mb: 2,
                        "& .MuiInputLabel-root": {
                          fontSize: "0.95rem",
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "1rem",
                        },
                      }}
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Xác nhận mật khẩu"
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={passwordError}
                      helperText={
                        passwordError
                          ? "Mật khẩu xác nhận không khớp với mật khẩu đã nhập"
                          : ""
                      }
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon
                              color={passwordError ? "error" : "primary"}
                              fontSize="medium"
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={() => handleClickShowPassword("confirm")}
                              edge="end"
                              size="medium"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOffIcon fontSize="small" />
                              ) : (
                                <VisibilityIcon fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          height: 52,
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
                        mb: 1.5,
                        "& .MuiInputLabel-root": {
                          fontSize: "0.95rem",
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "1rem",
                        },
                        "& .MuiFormHelperText-root": {
                          marginTop: "2px",
                          fontSize: "0.75rem",
                        },
                      }}
                    />

                    {passwordError && (
                      <Alert
                        severity="error"
                        sx={{
                          mb: 2,
                          py: 0.8,
                          borderRadius: 2,
                          "& .MuiAlert-message": {
                            fontWeight: 500,
                            fontSize: "0.85rem",
                          },
                          "& .MuiAlert-icon": {
                            color: theme.palette.error.main,
                            opacity: 0.8,
                            fontSize: "1.2rem",
                            marginRight: 1,
                          },
                        }}
                      >
                        Mật khẩu xác nhận không khớp với mật khẩu đã nhập!
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        py: 1.5,
                        mt: 1,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: "1.1rem",
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
                      Đăng ký
                    </Button>

                    <Box sx={{ mt: 2.5, textAlign: "center" }}>
                      <Typography
                        variant="body1"
                        sx={{ color: "text.secondary", fontSize: "0.95rem" }}
                      >
                        Đã có tài khoản?{" "}
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          <MuiLink
                            component="span"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.primary.main,
                              transition: "color 0.2s ease",
                              fontSize: "1rem",
                              "&:hover": {
                                color: theme.palette.primary.dark,
                                textDecoration: "none",
                              },
                            }}
                          >
                            Đăng nhập
                          </MuiLink>
                        </Link>
                      </Typography>
                    </Box>

                    <Divider
                      sx={{
                        mt: 3,
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
                          fontSize: "0.85rem",
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
                          startIcon={<GoogleIcon sx={{ fontSize: "1.2rem" }} />}
                          sx={{
                            borderRadius: 2,
                            py: 1.2,
                            color: "#DB4437",
                            borderColor: "#DB4437",
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "0.95rem",
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
                          startIcon={
                            <FacebookIcon sx={{ fontSize: "1.2rem" }} />
                          }
                          sx={{
                            borderRadius: 2,
                            py: 1.2,
                            color: "#4267B2",
                            borderColor: "#4267B2",
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "0.95rem",
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
                    p: 2,
                    textAlign: "center",
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "0.85rem" }}
                  >
                    Bằng việc đăng ký, bạn đồng ý với{" "}
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

export default Register;

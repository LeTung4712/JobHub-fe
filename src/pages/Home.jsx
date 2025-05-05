import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UpdateIcon from "@mui/icons-material/Update";
import SpeedIcon from "@mui/icons-material/Speed";
import { useNavigate } from "react-router-dom";
import heroBgDesktop from "../assets/ApartmentCoder.png";
import heroBgMobile from "../assets/ApartmentCoderSm-mobile.png";
import featureBgDesktop from "../assets/find-talent-2x.jpg";
import featureBgMobile from "../assets/find-talent-mobile-2x.jpg";
import { useAuth } from "../App";

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isAuthenticated } = useAuth();

  // Chọn hình ảnh phù hợp dựa trên kích thước màn hình
  const heroBgImage = isMobile ? heroBgMobile : heroBgDesktop;
  const featureBgImage = isMobile ? featureBgMobile : featureBgDesktop;

  const features = [
    {
      title: "Tìm kiếm việc làm",
      description:
        "Dễ dàng tìm kiếm việc làm phù hợp với kỹ năng và kinh nghiệm của bạn.",
      icon: <SearchIcon fontSize="large" color="primary" />,
    },
    {
      title: "Cập nhật hàng ngày",
      description:
        "Cơ hội việc làm mới được cập nhật hàng ngày từ các công ty hàng đầu.",
      icon: <UpdateIcon fontSize="large" color="primary" />,
    },
    {
      title: "Ứng tuyển nhanh chóng",
      description:
        "Quy trình ứng tuyển đơn giản và nhanh chóng, tiết kiệm thời gian của bạn.",
      icon: <SpeedIcon fontSize="large" color="primary" />,
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
            borderRadius: 2,
            position: "relative",
            height: "600px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
              "& img": {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              },
            }}
          >
            <img src={heroBgImage} alt="Hero background" />
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))",
              zIndex: 1,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              py: 4,
              px: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: "800px",
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                backdropFilter: "blur(8px)",
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                color="white"
                sx={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  fontWeight: "bold",
                  mb: 3,
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                JobHub
              </Typography>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                color="white"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                }}
              >
                Nền tảng tìm kiếm việc làm hàng đầu
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mx: "auto",
                  mb: 4,
                  color: "white",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                  fontSize: { xs: "0.9rem", md: "1.1rem" },
                  lineHeight: 1.6,
                }}
              >
                Khám phá hàng nghìn cơ hội việc làm phù hợp với kỹ năng và mong
                muốn của bạn. Kết nối với các nhà tuyển dụng hàng đầu và phát
                triển sự nghiệp.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/jobs")}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 10px rgba(0,0,0,0.3)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Tìm việc ngay
                </Button>
                {!isAuthenticated && (
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/register")}
                    sx={{
                      px: 4,
                      py: 1.5,
                      color: "white",
                      borderColor: "white",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 6px 10px rgba(0,0,0,0.2)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Đăng ký tài khoản
                  </Button>
                )}
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Features Section */}
        <Box
          sx={{
            py: 10,
            px: { xs: 2, md: 6 },
            position: "relative",
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            mt: 4,
            mb: 8,
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${featureBgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.6,
              zIndex: 0,
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              textAlign="center"
              sx={{
                mb: 2,
                fontWeight: "bold",
                position: "relative",
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
                color: "#fff",
                textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100px",
                  height: "4px",
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "2px",
                },
              }}
            >
              Tính năng nổi bật
            </Typography>

            <Typography
              variant="body1"
              align="center"
              sx={{
                maxWidth: "800px",
                mx: "auto",
                mb: 6,
                mt: 4,
                color: "#fff",
                fontWeight: "500",
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                lineHeight: 1.6,
                px: { xs: 2, sm: 0 },
                textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
              }}
            >
              Khám phá những công cụ mạnh mẽ giúp bạn dễ dàng tìm kiếm công việc
              phù hợp và phát triển sự nghiệp của mình.
            </Typography>

            <Grid
              container
              spacing={4}
              sx={{
                px: { xs: 1, sm: 2, md: 3 },
                flexWrap: { xs: "wrap", md: "nowrap" },
                overflow: "visible",
                pb: { xs: 2, sm: 0 },
              }}
            >
              {features.map((feature, index) => (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  key={index}
                  sx={{ mb: { xs: 3, md: 0 } }}
                >
                  <Card
                    elevation={3}
                    sx={{
                      height: "100%",
                      transition: "all 0.4s ease",
                      borderRadius: { xs: 3, md: 4 },
                      border: "1px solid rgba(255,255,255,0.2)",
                      overflow: "hidden",
                      position: "relative",
                      backgroundColor: "rgba(255, 255, 255, 0.75)",
                      backdropFilter: "blur(5px)",
                      "&:hover": {
                        transform: "translateY(-12px)",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
                        borderColor: theme.palette.primary.main,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        "& .feature-icon-wrapper": {
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                          transform: "scale(1.1)",
                        },
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        textAlign: "center",
                        p: { xs: 3, md: 4 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        className="feature-icon-wrapper"
                        sx={{
                          mb: 3,
                          p: 2,
                          borderRadius: "50%",
                          backgroundColor: "rgba(100, 108, 255, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.4s ease",
                          transform: "scale(1)",
                          width: { xs: 70, sm: 75, md: 85 },
                          height: { xs: 70, sm: 75, md: 85 },
                          border: "2px solid rgba(100, 108, 255, 0.3)",
                        }}
                      >
                        {React.cloneElement(feature.icon, {
                          style: {
                            fontSize: "2.7rem",
                            color: theme.palette.primary.main,
                          },
                        })}
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          mb: 2,
                          fontSize: {
                            xs: "1.3rem",
                            sm: "1.4rem",
                            md: "1.5rem",
                          },
                          color: theme.palette.primary.dark,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.7,
                          fontSize: {
                            xs: "0.9rem",
                            sm: "0.95rem",
                            md: "1rem",
                          },
                          color: "text.secondary",
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            textAlign: "center",
            mt: 8,
            py: 4,
            borderRadius: 2,
            backgroundColor: "primary.main",
            color: "white",
          }}
        >
          <Typography variant="h5" component="h3" gutterBottom>
            Sẵn sàng bắt đầu sự nghiệp mới?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Hàng nghìn cơ hội việc làm đang chờ đợi bạn.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.8)",
              },
            }}
            onClick={() => navigate("/jobs")}
          >
            Khám phá việc làm
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;

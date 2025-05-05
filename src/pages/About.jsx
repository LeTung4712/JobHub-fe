import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Card,
  CardContent,
  Avatar,
  Stack,
  useTheme,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import GroupsIcon from "@mui/icons-material/Groups";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

function About() {
  const theme = useTheme();

  // Mảng các giá trị của công ty
  const values = [
    {
      id: 1,
      icon: <WorkIcon fontSize="large" />,
      title: "Hiệu quả",
      content:
        "Chúng tôi tin vào việc tạo ra giải pháp tuyển dụng hiệu quả, giúp các ứng viên và nhà tuyển dụng tiết kiệm thời gian và nguồn lực.",
    },
    {
      id: 2,
      icon: <GroupsIcon fontSize="large" />,
      title: "Kết nối",
      content:
        "Xây dựng mạng lưới kết nối bền vững giữa người tìm việc và nhà tuyển dụng, tạo nên cộng đồng nghề nghiệp năng động.",
    },
    {
      id: 3,
      icon: <LightbulbIcon fontSize="large" />,
      title: "Đổi mới",
      content:
        "Không ngừng cải tiến công nghệ và quy trình, đảm bảo mang lại trải nghiệm tốt nhất cho người dùng trên nền tảng của chúng tôi.",
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              color: "text.secondary",
            }}
          >
            Về JobHub
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              maxWidth: 800,
              mx: "auto",
              color: "text.secondary",
              mb: 2,
            }}
          >
            Nền tảng kết nối việc làm hàng đầu Việt Nam
          </Typography>
          <Divider sx={{ width: "100px", mx: "auto", my: 3 }} />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  color: "text.secondary",
                }}
              >
                Sứ mệnh của chúng tôi
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ color: "text.secondary", mb: 3 }}
              >
                JobHub được thành lập với sứ mệnh kết nối nhà tuyển dụng với
                nguồn nhân lực chất lượng cao, giúp các doanh nghiệp tìm kiếm
                được những ứng viên phù hợp nhất và hỗ trợ người tìm việc tìm
                được công việc mơ ước.
              </Typography>
              <Typography variant="body1" paragraph>
                Với nền tảng công nghệ hiện đại, JobHub cung cấp trải nghiệm tìm
                kiếm việc làm và tuyển dụng trực tuyến thuận tiện, nhanh chóng
                và hiệu quả. Chúng tôi cam kết mang đến những cơ hội việc làm
                chất lượng và đáng tin cậy cho người tìm việc.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 3,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                  color: "text.secondary",
                }}
              >
                JobHub trong số liệu
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Typography variant="h3" component="p" color="primary">
                      5000+
                    </Typography>
                    <Typography variant="body2">Việc làm</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h3" component="p" color="primary">
                      1000+
                    </Typography>
                    <Typography variant="body2">Doanh nghiệp</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h3" component="p" color="primary">
                      20000+
                    </Typography>
                    <Typography variant="body2">Người dùng</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8, mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{
              color: "text.secondary",
            }}
          >
            Giá trị cốt lõi
          </Typography>
          <Divider sx={{ width: "100px", mx: "auto", my: 3 }} />

          <Grid container spacing={4} mt={2}>
            {values.map((value) => (
              <Grid item xs={12} md={4} key={value.id}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                >
                  <CardContent>
                    <Stack
                      direction="column"
                      spacing={2}
                      alignItems="center"
                      textAlign="center"
                    >
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          width: 56,
                          height: 56,
                          mb: 1,
                        }}
                      >
                        {value.icon}
                      </Avatar>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          color: "text.secondary",
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {value.content}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            mt: 8,
            textAlign: "center",
            p: 4,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.02)",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "text.secondary",
            }}
          >
            Bạn muốn tìm kiếm cơ hội nghề nghiệp mới?
          </Typography>
          <Typography variant="body1">
            Khám phá hàng ngàn việc làm trên nền tảng của chúng tôi và tìm kiếm
            công việc phù hợp với kỹ năng và đam mê của bạn.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default About;

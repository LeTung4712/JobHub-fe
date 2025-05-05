import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Button,
  Divider,
  Chip,
  LinearProgress,
  IconButton,
  useTheme,
  Stack,
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WorkIcon from "@mui/icons-material/Work";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";

// Biểu đồ hoạt động (đơn giản hóa)
function ActivityChart() {
  const theme = useTheme();
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const data = [30, 45, 25, 60, 40, 20, 35];
  const maxValue = Math.max(...data);

  return (
    <Box
      sx={{
        mt: 2,
        height: { xs: 100, sm: 120 },
        display: "flex",
        alignItems: "flex-end",
        mx: { xs: -1, sm: 0 },
      }}
    >
      {data.map((value, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            mx: { xs: 0.2, sm: 0.5 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: `${(value / maxValue) * 90}px`,
              width: "100%",
              bgcolor: theme.palette.primary.main,
              borderRadius: 1,
              mb: 1,
              opacity: 0.7,
              "&:hover": {
                opacity: 1,
                bgcolor: theme.palette.primary.dark,
              },
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            fontSize={{ xs: "0.6rem", sm: "0.75rem" }}
          >
            {days[index]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();

  // Mock data
  const stats = {
    totalApplications: 12,
    acceptedApplications: 3,
    pendingApplications: 8,
    rejectedApplications: 1,
    profileViews: 45,
    unreadMessages: 5,
    savedJobs: 8,
    jobPosts: 3,
  };

  const recentApplications = [
    {
      id: 1,
      position: "Frontend Developer",
      company: "Công ty ABC",
      logo: null,
      status: "pending",
      date: "15/06/2023",
    },
    {
      id: 2,
      position: "UI/UX Designer",
      company: "Công ty XYZ",
      logo: null,
      status: "accepted",
      date: "10/06/2023",
    },
    {
      id: 3,
      position: "React Developer",
      company: "Công ty DEF",
      logo: null,
      status: "rejected",
      date: "05/06/2023",
    },
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Công ty ABC",
      logo: null,
      applications: 8,
      status: "active",
      date: "15/06/2023",
    },
    {
      id: 2,
      title: "Web Designer",
      company: "Công ty ABC",
      logo: null,
      applications: 5,
      status: "active",
      date: "10/06/2023",
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "application",
      message:
        "Ứng tuyển của bạn vào vị trí Frontend Developer đã được phản hồi",
      time: "2 giờ trước",
      read: false,
    },
    {
      id: 2,
      type: "message",
      message: "Bạn có tin nhắn mới từ Công ty ABC",
      time: "5 giờ trước",
      read: false,
    },
    {
      id: 3,
      type: "job",
      message: "Có 5 công việc mới phù hợp với kỹ năng của bạn",
      time: "1 ngày trước",
      read: true,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return theme.palette.warning.main;
      case "accepted":
        return theme.palette.success.main;
      case "rejected":
        return theme.palette.error.main;
      case "active":
        return theme.palette.success.main;
      case "closed":
        return theme.palette.error.main;
      default:
        return theme.palette.info.main;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Đang chờ";
      case "accepted":
        return "Đã chấp nhận";
      case "rejected":
        return "Đã từ chối";
      case "active":
        return "Đang hoạt động";
      case "closed":
        return "Đã đóng";
      default:
        return status;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "application":
        return <AssignmentIcon />;
      case "message":
        return <MessageIcon />;
      case "job":
        return <WorkIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 3, md: 6 },
        backgroundImage:
          "linear-gradient(to bottom, rgba(100, 108, 255, 0.04), rgba(100, 108, 255, 0.02))",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: { xs: 3, md: 5 }, maxWidth: "800px" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.dark,
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Dashboard
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.6,
            }}
          >
            Chào mừng bạn đến với JobHub! Dưới đây là tổng quan về hoạt động của
            bạn.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Stats Cards Row - Thông tin quan trọng được hiển thị ở hàng đầu tiên với kích thước nhỏ gọn */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              sx={{
                borderRadius: { xs: 2, md: 3 },
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "warning.light",
                      color: "warning.contrastText",
                      mr: 2,
                      width: { xs: 40, md: 48 },
                      height: { xs: 40, md: 48 },
                    }}
                  >
                    <MessageIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Tin nhắn
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h4" fontWeight={700} sx={{ mr: 2 }}>
                    {stats.unreadMessages}
                  </Typography>
                  <Chip
                    label="Chưa đọc"
                    size="small"
                    color="warning"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 3,
                    height: "40px",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(100, 108, 255, 0.08)",
                    },
                  }}
                  onClick={() => navigate("/messages")}
                >
                  Xem tin nhắn
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Thêm card thống kê về công việc */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              sx={{
                borderRadius: { xs: 2, md: 3 },
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.light",
                      color: "primary.contrastText",
                      mr: 2,
                      width: { xs: 40, md: 48 },
                      height: { xs: 40, md: 48 },
                    }}
                  >
                    <WorkIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Công việc
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h4" fontWeight={700} sx={{ mr: 2 }}>
                    {stats.jobPosts}
                  </Typography>
                  <Chip
                    label="Bài đăng"
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 3,
                    height: "40px",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(100, 108, 255, 0.08)",
                    },
                  }}
                  onClick={() => navigate("/posts")}
                >
                  Quản lý tin
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Card công việc đã lưu */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              sx={{
                borderRadius: { xs: 2, md: 3 },
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "success.light",
                      color: "success.contrastText",
                      mr: 2,
                      width: { xs: 40, md: 48 },
                      height: { xs: 40, md: 48 },
                    }}
                  >
                    <BookmarkIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Bài đã lưu
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h4" fontWeight={700} sx={{ mr: 2 }}>
                    {stats.savedJobs}
                  </Typography>
                  <Chip
                    label="Công việc"
                    size="small"
                    color="success"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 3,
                    height: "40px",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(100, 108, 255, 0.08)",
                    },
                  }}
                  onClick={() => navigate("/profile")}
                >
                  Xem đã lưu
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Activity Chart - Thêm biểu đồ hoạt động */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: { xs: 2, md: 3 },
                p: { xs: 2, md: 3 },
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h5" fontWeight={600}>
                  Hoạt động gần đây
                </Typography>
                <Chip
                  label="Tuần này"
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              <ActivityChart />

              <Box
                sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="body2" color="text.secondary">
                  Tổng tương tác: {stats.profileViews} lượt
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Xem chi tiết
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Quick Action - Thêm khu vực hành động nhanh */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: { xs: 2, md: 3 },
                p: { xs: 2, md: 3 },
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.2s",
                height: "100%",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                Hành động nhanh
              </Typography>

              <Stack spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    py: 1.5,
                    bgcolor: "primary.main",
                  }}
                  onClick={() => navigate("/posts/create")}
                >
                  Đăng tin tuyển dụng mới
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<WorkIcon />}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    py: 1.5,
                  }}
                  onClick={() => navigate("/jobs")}
                >
                  Tìm kiếm việc làm
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<MessageIcon />}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    py: 1.5,
                  }}
                  onClick={() => navigate("/messages")}
                >
                  Kiểm tra tin nhắn
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* Recent Jobs - Đặt bên trái với tỷ lệ md=6 */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: { xs: 2, md: 3 },
                p: { xs: 2, md: 3 },
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                mb: { xs: 2, md: 0 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h5" fontWeight={600}>
                  Bài đăng gần đây
                </Typography>
                <Button
                  variant="text"
                  onClick={() => navigate("/posts")}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    borderRadius: "8px",
                    px: 2,
                  }}
                >
                  Xem tất cả
                </Button>
              </Box>

              <List
                sx={{
                  p: 0,
                  flex: 1,
                  overflow: "auto",
                  maxHeight: { xs: "300px", md: "300px" },
                }}
              >
                {recentJobs.map((job, index) => (
                  <React.Fragment key={job.id}>
                    <ListItem
                      sx={{
                        px: 2,
                        py: 1.5,
                        borderRadius: 2,
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        "&:hover": {
                          bgcolor: "rgba(0, 0, 0, 0.03)",
                        },
                        transition: "background 0.2s",
                      }}
                    >
                      <ListItemAvatar
                        sx={{
                          minWidth: { xs: "100%", sm: "auto" },
                          mb: { xs: 1, sm: 0 },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={job.logo}
                            alt={job.company}
                            sx={{
                              bgcolor: "primary.light",
                              mr: 2,
                              width: { xs: 40, md: 48 },
                              height: { xs: 40, md: 48 },
                            }}
                          >
                            {job.company.charAt(0)}
                          </Avatar>
                          <Box sx={{ display: { xs: "block", sm: "none" } }}>
                            <Typography
                              variant="body1"
                              fontWeight={600}
                              sx={{ wordBreak: "break-word" }}
                            >
                              {job.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {job.company}
                            </Typography>
                          </Box>
                        </Box>
                      </ListItemAvatar>
                      <ListItemText
                        sx={{ display: { xs: "none", sm: "block" } }}
                        primary={
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            sx={{ wordBreak: "break-word" }}
                          >
                            {job.title}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              component="span"
                            >
                              {job.company}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              component="div"
                            >
                              {job.applications} ứng viên • Đăng ngày:{" "}
                              {job.date}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        component="div"
                        sx={{
                          display: { xs: "block", sm: "none" },
                          mb: 1,
                        }}
                      >
                        {job.applications} ứng viên • Đăng ngày: {job.date}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                          mt: { xs: 1, sm: 0 },
                          alignSelf: { xs: "flex-end", sm: "center" },
                        }}
                      >
                        <Chip
                          label={getStatusText(job.status)}
                          size="small"
                          sx={{
                            bgcolor: `${getStatusColor(job.status)}20`,
                            color: getStatusColor(job.status),
                            fontWeight: 600,
                            px: 1,
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/jobs/${job.id}`)}
                          sx={{
                            bgcolor: "rgba(0, 0, 0, 0.04)",
                            "&:hover": {
                              bgcolor: "rgba(0, 0, 0, 0.08)",
                            },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </ListItem>
                    {index < recentJobs.length - 1 && (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>

              {recentJobs.length === 0 && (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 3,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Bạn chưa đăng tin tuyển dụng nào
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 1,
                      alignSelf: "center",
                      borderRadius: "8px",
                      textTransform: "none",
                      px: 3,
                    }}
                    onClick={() => navigate("/posts/create")}
                  >
                    Đăng tin tuyển dụng
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Notifications - Đặt bên phải với tỷ lệ md=6 */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: { xs: 2, md: 3 },
                p: { xs: 2, md: 3 },
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                mb: { xs: 2, md: 0 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h5" fontWeight={600}>
                  Thông báo
                </Typography>
                <Button
                  variant="text"
                  onClick={() => {}}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    borderRadius: "8px",
                    px: 2,
                  }}
                >
                  Đánh dấu đã đọc
                </Button>
              </Box>

              <List
                sx={{
                  p: 0,
                  flex: 1,
                  overflow: "auto",
                  maxHeight: { xs: "300px", md: "300px" },
                }}
              >
                {notifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem
                      sx={{
                        px: 2,
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: notification.read
                          ? "transparent"
                          : "rgba(100, 108, 255, 0.04)",
                        "&:hover": {
                          bgcolor: "rgba(0, 0, 0, 0.03)",
                        },
                        transition: "background 0.2s",
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
                        <Avatar
                          sx={{
                            bgcolor: notification.read
                              ? "grey.200"
                              : "primary.light",
                            color: notification.read
                              ? "text.secondary"
                              : "primary.contrastText",
                            width: 40,
                            height: 40,
                          }}
                        >
                          {getNotificationIcon(notification.type)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            fontWeight={notification.read ? 400 : 600}
                          >
                            {notification.message}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {notification.time}
                          </Typography>
                        }
                      />
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: "rgba(0, 0, 0, 0.04)",
                          "&:hover": {
                            bgcolor: "rgba(0, 0, 0, 0.08)",
                          },
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </ListItem>
                    {index < notifications.length - 1 && (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>

              {notifications.length === 0 && (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 3,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Bạn không có thông báo nào
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;

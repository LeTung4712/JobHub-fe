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
    <Box sx={{ mt: 2, height: 120, display: "flex", alignItems: "flex-end" }}>
      {data.map((value, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            mx: 0.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: `${(value / maxValue) * 100}px`,
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
          <Typography variant="caption" color="text.secondary">
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
        py: 6,
        backgroundImage:
          "linear-gradient(to bottom, rgba(100, 108, 255, 0.04), rgba(100, 108, 255, 0.02))",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.dark,
            mb: 2,
          }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 4,
            fontSize: "1.1rem",
          }}
        >
          Chào mừng bạn đến với JobHub! Dưới đây là tổng quan về hoạt động của
          bạn.
        </Typography>

        <Grid container spacing={3}>
          {/* Stats Cards Row */}
          <Grid item xs={12} md={3}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                height: "100%",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.light",
                      color: "primary.contrastText",
                      mr: 2,
                    }}
                  >
                    <BusinessCenterIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Ứng tuyển
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                  {stats.totalApplications}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (stats.acceptedApplications / stats.totalApplications) *
                      100
                    }
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="success.main"
                      >
                        {stats.acceptedApplications}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Chấp nhận
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="warning.main"
                      >
                        {stats.pendingApplications}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Đang chờ
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="error.main"
                      >
                        {stats.rejectedApplications}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Từ chối
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                height: "100%",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "success.light",
                      color: "success.contrastText",
                      mr: 2,
                    }}
                  >
                    <VisibilityIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Lượt xem hồ sơ
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                  {stats.profileViews}
                </Typography>
                <ActivityChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                height: "100%",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "warning.light",
                      color: "warning.contrastText",
                      mr: 2,
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
                  sx={{ mt: 3 }}
                  onClick={() => navigate("/messages")}
                >
                  Xem tin nhắn
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                height: "100%",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "info.light",
                      color: "info.contrastText",
                      mr: 2,
                    }}
                  >
                    <WorkIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    Bài đăng công việc
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700}>
                  {stats.jobPosts}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() => navigate("/create-post")}
                >
                  Đăng bài mới
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Jobs */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                p: 3,
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
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
                  sx={{ textTransform: "none" }}
                >
                  Xem tất cả
                </Button>
              </Box>

              <List sx={{ p: 0 }}>
                {recentJobs.map((job, index) => (
                  <React.Fragment key={job.id}>
                    <ListItem
                      sx={{
                        px: 2,
                        py: 1.5,
                        borderRadius: 2,
                        "&:hover": {
                          bgcolor: "rgba(0, 0, 0, 0.03)",
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={job.logo}
                          alt={job.company}
                          sx={{ bgcolor: "primary.light" }}
                        >
                          {job.company.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" fontWeight={600}>
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
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={getStatusText(job.status)}
                          size="small"
                          sx={{
                            bgcolor: `${getStatusColor(job.status)}20`,
                            color: getStatusColor(job.status),
                            fontWeight: 600,
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/job/${job.id}`)}
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
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    Bạn chưa đăng tin tuyển dụng nào
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/create-post")}
                  >
                    Đăng tin tuyển dụng
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Notifications */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                p: 3,
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
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
                  sx={{ textTransform: "none" }}
                >
                  Đánh dấu đã đọc
                </Button>
              </Box>

              <List sx={{ p: 0 }}>
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
                      }}
                    >
                      <ListItemIcon>
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
                      <IconButton size="small">
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
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    Bạn không có thông báo nào
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Saved Jobs */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                p: 3,
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
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
                  Công việc đã lưu
                </Typography>
                <Button
                  variant="text"
                  onClick={() => navigate("/saved-jobs")}
                  sx={{ textTransform: "none" }}
                >
                  Xem tất cả
                </Button>
              </Box>

              <Box sx={{ textAlign: "center", py: 3 }}>
                <BookmarkIcon sx={{ fontSize: 60, color: "grey.300", mb: 2 }} />
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Bạn đã lưu {stats.savedJobs} công việc
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/jobs")}
                >
                  Tìm kiếm thêm việc làm
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;

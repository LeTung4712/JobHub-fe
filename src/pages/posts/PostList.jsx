import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Divider,
  useTheme,
  Avatar,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

// Hàm để định dạng ngày tháng
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", options);
};

// Hàm lấy màu trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "success";
    case "expired":
      return "error";
    case "draft":
      return "warning";
    case "paused":
      return "default";
    default:
      return "primary";
  }
};

function PostList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  // Dữ liệu mẫu cho các bài đăng
  const posts = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Công ty ABC",
      location: "Hà Nội",
      date: "2023-06-01",
      deadline: "2023-07-15",
      status: "active",
      applicants: 12,
      views: 145,
      category: "software",
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Công ty XYZ",
      location: "Hồ Chí Minh",
      date: "2023-05-20",
      deadline: "2023-06-30",
      status: "active",
      applicants: 8,
      views: 98,
      category: "design",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Công ty Tech Solutions",
      location: "Đà Nẵng",
      date: "2023-04-15",
      deadline: "2023-05-15",
      status: "expired",
      applicants: 15,
      views: 210,
      category: "project-management",
    },
    {
      id: 4,
      title: "Java Developer",
      company: "Công ty ABC",
      location: "Hà Nội",
      date: "2023-05-01",
      deadline: "2023-06-01",
      status: "expired",
      applicants: 20,
      views: 180,
      category: "software",
    },
    {
      id: 5,
      title: "Marketing Specialist",
      company: "Công ty Digital Marketing",
      location: "Hồ Chí Minh",
      date: "2023-06-10",
      deadline: "2023-07-30",
      status: "active",
      applicants: 5,
      views: 75,
      category: "marketing",
    },
    {
      id: 6,
      title: "Data Analyst",
      company: "Công ty Big Data",
      location: "Hà Nội",
      date: "2023-06-05",
      deadline: "2023-07-20",
      status: "draft",
      applicants: 0,
      views: 0,
      category: "software",
    },
    {
      id: 7,
      title: "HR Manager",
      company: "Công ty HR Solutions",
      location: "Hồ Chí Minh",
      date: "2023-05-15",
      deadline: "2023-06-15",
      status: "paused",
      applicants: 7,
      views: 120,
      category: "hr",
    },
  ];

  // Lọc bài đăng theo tab và từ khóa tìm kiếm
  const filteredPosts = posts.filter((post) => {
    const matchesTab =
      tabValue === 0 || // Tất cả
      (tabValue === 1 && post.status === "active") || // Đang hoạt động
      (tabValue === 2 && post.status === "expired") || // Hết hạn
      (tabValue === 3 && post.status === "draft") || // Bản nháp
      (tabValue === 4 && post.status === "paused"); // Tạm dừng

    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Sắp xếp bài đăng
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "deadline":
        return new Date(a.deadline) - new Date(b.deadline);
      case "applicants":
        return b.applicants - a.applicants;
      case "views":
        return b.views - a.views;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Phân trang
  const postsPerPage = 5;
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const paginatedPosts = sortedPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1); // Reset về trang 1 khi chuyển tab
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleDeletePost = (id) => {
    // Thực hiện xóa bài đăng (trong ứng dụng thực tế sẽ gọi API)
    console.log("Deleting post with ID:", id);
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
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.dark,
            }}
          >
            Quản lý bài đăng
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/posts/create")}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
              },
            }}
          >
            Đăng tin mới
          </Button>
        </Box>

        <Card
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            background: "white",
            mb: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                placeholder="Tìm kiếm bài đăng..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  minWidth: { xs: "100%", sm: "300px" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton
                  onClick={() => setShowFilters(!showFilters)}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    color: showFilters
                      ? theme.palette.primary.main
                      : "text.secondary",
                  }}
                >
                  <FilterListIcon />
                </IconButton>
                <FormControl sx={{ minWidth: 180 }}>
                  <InputLabel id="sort-label">Sắp xếp theo</InputLabel>
                  <Select
                    labelId="sort-label"
                    id="sort-select"
                    value={sortBy}
                    label="Sắp xếp theo"
                    onChange={handleSortChange}
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="newest">Mới nhất</MenuItem>
                    <MenuItem value="oldest">Cũ nhất</MenuItem>
                    <MenuItem value="deadline">Deadline gần nhất</MenuItem>
                    <MenuItem value="applicants">Nhiều ứng viên nhất</MenuItem>
                    <MenuItem value="views">Nhiều lượt xem nhất</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                mb: 3,
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: "1rem",
                  minWidth: 10,
                  px: 2,
                },
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                },
              }}
            >
              <Tab label="Tất cả" />
              <Tab label="Đang hoạt động" />
              <Tab label="Đã hết hạn" />
              <Tab label="Bản nháp" />
              <Tab label="Tạm dừng" />
            </Tabs>

            <Divider sx={{ mb: 3 }} />

            {paginatedPosts.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {paginatedPosts.map((post) => (
                    <Grid item xs={12} key={post.id}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 0,
                          borderRadius: 2,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          },
                        }}
                      >
                        <CardContent
                          sx={{
                            p: 3,
                            "&:last-child": { pb: 3 },
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 2,
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <Chip
                                label={
                                  post.status === "active"
                                    ? "Đang hoạt động"
                                    : post.status === "expired"
                                    ? "Hết hạn"
                                    : post.status === "draft"
                                    ? "Bản nháp"
                                    : "Tạm dừng"
                                }
                                color={getStatusColor(post.status)}
                                size="small"
                                variant={
                                  post.status === "active"
                                    ? "filled"
                                    : "outlined"
                                }
                                sx={{ borderRadius: 1 }}
                              />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Ngày đăng: {formatDate(post.date)}
                              </Typography>
                            </Box>

                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                mb: 1,
                                color: theme.palette.primary.dark,
                                cursor: "pointer",
                                "&:hover": {
                                  color: theme.palette.primary.main,
                                },
                              }}
                              onClick={() => navigate(`/jobs/${post.id}`)}
                            >
                              {post.title}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                gap: 3,
                                mb: 2,
                                flexWrap: "wrap",
                              }}
                            >
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                <strong>Công ty:</strong> {post.company}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                <strong>Địa điểm:</strong> {post.location}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                <strong>Hạn nộp:</strong>{" "}
                                {formatDate(post.deadline)}
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", gap: 3 }}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Avatar
                                  sx={{
                                    width: 28,
                                    height: 28,
                                    bgcolor: "rgba(100, 108, 255, 0.1)",
                                    color: theme.palette.primary.main,
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                    mr: 1,
                                  }}
                                >
                                  {post.applicants}
                                </Avatar>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Ứng viên
                                </Typography>
                              </Box>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Avatar
                                  sx={{
                                    width: 28,
                                    height: 28,
                                    bgcolor: "rgba(100, 108, 255, 0.1)",
                                    color: theme.palette.primary.main,
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                    mr: 1,
                                  }}
                                >
                                  {post.views}
                                </Avatar>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Lượt xem
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "row", md: "column" },
                              justifyContent: {
                                xs: "flex-start",
                                md: "center",
                              },
                              gap: 1,
                              minWidth: { xs: "auto", md: "120px" },
                              borderLeft: {
                                xs: "none",
                                md: `1px solid ${theme.palette.divider}`,
                              },
                              pl: { xs: 0, md: 2 },
                              mt: { xs: 2, md: 0 },
                            }}
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<EditIcon />}
                              onClick={() => navigate(`/posts/edit/${post.id}`)}
                              sx={{ borderRadius: 2 }}
                            >
                              Sửa
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              startIcon={<DeleteOutlineIcon />}
                              onClick={() => handleDeletePost(post.id)}
                              sx={{ borderRadius: 2 }}
                            >
                              Xóa
                            </Button>
                            <Button
                              variant="outlined"
                              color="info"
                              size="small"
                              startIcon={<VisibilityIcon />}
                              onClick={() => navigate(`/jobs/${post.id}`)}
                              sx={{ borderRadius: 2 }}
                            >
                              Xem
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                  />
                </Box>
              </>
            ) : (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Không tìm thấy bài đăng nào
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Thử thay đổi bộ lọc hoặc tạo bài đăng mới
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/posts/create")}
                  sx={{ mt: 3 }}
                >
                  Đăng tin ngay
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default PostList;

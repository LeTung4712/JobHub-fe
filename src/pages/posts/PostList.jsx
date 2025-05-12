import React, { useState, useEffect, useCallback } from "react";
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
  CircularProgress,
  Alert,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { useNavigate } from "react-router-dom";
import { getMyJobs, deleteJob, updateJobStatus } from "../../api/jobs";
import { useSnackbar } from "notistack";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Hàm để map giá trị tab sang status API
  const getStatusByTab = (tabIndex) => {
    switch (tabIndex) {
      case 1:
        return "active";
      case 2:
        return "expired";
      case 3:
        return "draft";
      case 4:
        return "paused";
      default:
        return "";
    }
  };

  // Hàm để map giá trị sortBy sang tham số API
  const getSortParam = (sortValue) => {
    switch (sortValue) {
      case "newest":
        return "-createdAt";
      case "oldest":
        return "createdAt";
      case "deadline":
        return "deadline";
      case "applicants":
        return "-applications";
      case "views":
        return "-views";
      default:
        return "-createdAt";
    }
  };

  // Hàm lấy dữ liệu các bài đăng
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page,
        limit: 5,
        sort: getSortParam(sortBy),
      };

      // Thêm status nếu không phải tab "Tất cả"
      const status = getStatusByTab(tabValue);
      if (status) {
        params.status = status;
      }

      // Thêm từ khóa tìm kiếm nếu có
      if (searchTerm.trim()) {
        params.search = searchTerm;
      }

      const response = await getMyJobs(params);

      setPosts(response.data);
      setPagination({
        total: response.total,
        page: page,
        pages: Math.ceil(response.total / 5),
      });
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Đã xảy ra lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, [page, tabValue, sortBy, searchTerm]);

  // Gọi API khi các dependency thay đổi
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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

  const handleApplyClick = (jobId, jobTitle) => {
    // Kiểm tra jobId và jobTitle
    if (!jobId) {
      console.error("ID công việc không hợp lệ");
      return;
    }

    // Đặt giá trị mặc định nếu title không tồn tại
    const title = jobTitle || "job-post";

    try {
      // Tạo slug an toàn từ tiêu đề
      let slug = "";

      try {
        // Phương pháp 1: Sử dụng cách đơn giản, an toàn
        slug = title
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "") // Chỉ giữ chữ cái và số (không dấu)
          .replace(/\s+/g, "-")
          .replace(/-{2,}/g, "-")
          .replace(/^-+|-+$/g, ""); // Loại bỏ dấu - ở đầu và cuối
      } catch (e) {
        console.warn("Lỗi khi tạo slug phương pháp 1:", e);
        // Phương pháp 2: Nếu phương pháp 1 lỗi, tạo slug đơn giản
        slug = "job-" + jobId;
      }

      // Đảm bảo slug không rỗng
      if (!slug || slug.length === 0) {
        slug = "job-" + jobId;
      }

      // Giới hạn độ dài để tránh URL quá dài
      slug = slug.substring(0, 30);

      // Thêm timeout nhỏ để tránh lỗi message channel
      setTimeout(() => {
        navigate(`/jobs/${slug}/${jobId}`);
      }, 0);
    } catch (error) {
      console.error("Lỗi khi điều hướng:", error);
      // Fallback an toàn nhất
      window.location.href = `/jobs/${jobId}`;
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deleteJob(id);
      enqueueSnackbar("Xóa bài đăng thành công", { variant: "success" });
      fetchPosts(); // Tải lại danh sách sau khi xóa
    } catch (error) {
      enqueueSnackbar("Lỗi khi xóa bài đăng", { variant: "error" });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  // Thêm chức năng thay đổi trạng thái
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateJobStatus(id, newStatus);
      enqueueSnackbar("Cập nhật trạng thái thành công", { variant: "success" });
      fetchPosts(); // Tải lại danh sách
    } catch (error) {
      enqueueSnackbar("Lỗi khi cập nhật trạng thái", { variant: "error" });
    }
  };

  const handleMenuOpen = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPostId(null);
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
              <form
                onSubmit={handleSearch}
                style={{ display: "flex", flexGrow: 1 }}
              >
                <TextField
                  placeholder="Tìm kiếm bài đăng..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    flexGrow: 1,
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
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button type="submit" size="small">
                          Tìm
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
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

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Box sx={{ py: 3 }}>
                <Alert severity="error">{error}</Alert>
              </Box>
            ) : posts.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {posts.map((post) => (
                    <Grid item xs={12} key={post._id}>
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
                                Ngày đăng: {formatDate(post.createdAt)}
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
                              onClick={() =>
                                handleApplyClick(post._id, post.title)
                              }
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
                                {post.deadline
                                  ? formatDate(post.deadline)
                                  : "Không có"}
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
                                  {post.applications?.length || 0}
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
                                  {post.views || 0}
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
                              onClick={() =>
                                navigate(`/posts/edit/${post._id}`)
                              }
                              sx={{ borderRadius: 2 }}
                            >
                              Sửa
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              startIcon={<DeleteOutlineIcon />}
                              onClick={() => handleDeletePost(post._id)}
                              sx={{ borderRadius: 2 }}
                            >
                              Xóa
                            </Button>
                            <Button
                              variant="outlined"
                              color="info"
                              size="small"
                              startIcon={<VisibilityIcon />}
                              onClick={() => navigate(`/jobs/${post._id}`)}
                              sx={{ borderRadius: 2 }}
                            >
                              Xem
                            </Button>
                            <IconButton
                              size="small"
                              aria-label="more"
                              onClick={(e) => handleMenuOpen(e, post._id)}
                              sx={{
                                ml: { xs: 1, md: 0 },
                                mt: { xs: 0, md: 1 },
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Pagination
                    count={pagination.pages}
                    page={pagination.page}
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

        {/* Menu thay đổi trạng thái */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              handleStatusChange(selectedPostId, "active");
              handleMenuClose();
            }}
            disabled={
              posts.find((p) => p._id === selectedPostId)?.status === "active"
            }
          >
            <ListItemIcon>
              <PlayArrowIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText>Đặt là Đang hoạt động</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleStatusChange(selectedPostId, "paused");
              handleMenuClose();
            }}
            disabled={
              posts.find((p) => p._id === selectedPostId)?.status === "paused"
            }
          >
            <ListItemIcon>
              <PauseIcon fontSize="small" color="warning" />
            </ListItemIcon>
            <ListItemText>Tạm dừng</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleStatusChange(selectedPostId, "expired");
              handleMenuClose();
            }}
            disabled={
              posts.find((p) => p._id === selectedPostId)?.status === "expired"
            }
          >
            <ListItemIcon>
              <HourglassEmptyIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Đánh dấu Hết hạn</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleStatusChange(selectedPostId, "draft");
              handleMenuClose();
            }}
            disabled={
              posts.find((p) => p._id === selectedPostId)?.status === "draft"
            }
          >
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" color="info" />
            </ListItemIcon>
            <ListItemText>Lưu là Bản nháp</ListItemText>
          </MenuItem>
        </Menu>
      </Container>
    </Box>
  );
}

export default PostList;

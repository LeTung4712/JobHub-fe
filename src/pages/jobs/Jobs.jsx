import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Paper,
  Alert,
  useTheme,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Collapse,
  Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Drawer,
  useMediaQuery,
  Badge,
  Fab,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ClearIcon from "@mui/icons-material/Clear";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../../api/jobs";
import JobCard from "../../components/JobCard";

function Jobs() {
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [postType, setPostType] = useState("all");
  const [salaryRange, setSalaryRange] = useState([0, 50]);
  const [postDate, setPostDate] = useState("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalJobs, setTotalJobs] = useState(0);

  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Gọi API khi component mount hoặc khi bộ lọc thay đổi
  useEffect(() => {
    fetchJobs();
  }, [page, limit]);

  // Kích hoạt tìm kiếm khi các bộ lọc thay đổi (có delay để tránh gọi API quá nhiều)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (page === 1) {
        // Nếu đang ở trang 1, chỉ cần gọi fetchJobs
        fetchJobs();
      } else {
        // Nếu không ở trang 1, reset về trang 1 (sẽ trigger fetchJobs qua dependency)
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filterCategory, postType, salaryRange, postDate, searchQuery]);

  // Cập nhật số lượng bộ lọc đang kích hoạt
  useEffect(() => {
    updateActiveFiltersCount();
  }, [filterCategory, postType, salaryRange, postDate]);

  // Kiểm tra thời gian đăng
  const checkPostDate = (jobDate, filterDate) => {
    if (filterDate === "all") return true;
    if (!jobDate) return false;

    let dateToCheck;
    if (typeof jobDate === "string") {
      dateToCheck = new Date(jobDate);

      // Nếu là ngày không hợp lệ, thử xử lý định dạng khác
      if (isNaN(dateToCheck.getTime())) {
        // Thử chuyển định dạng dd/mm/yyyy
        const parts = jobDate.split("/");
        if (parts.length === 3) {
          dateToCheck = new Date(parts[2], parts[1] - 1, parts[0]);
        }
      }
    } else if (jobDate instanceof Date) {
      dateToCheck = jobDate;
    } else {
      return false;
    }

    // Nếu vẫn không phải ngày hợp lệ, trả về false
    if (isNaN(dateToCheck.getTime())) {
      return false;
    }

    const currentDate = new Date();
    const diffDays = Math.floor(
      (currentDate - dateToCheck) / (1000 * 60 * 60 * 24)
    );

    switch (filterDate) {
      case "24h":
        return diffDays < 1;
      case "3days":
        return diffDays <= 3;
      case "week":
        return diffDays <= 7;
      case "month":
        return diffDays <= 30;
      default:
        return true;
    }
  };

  // Lấy giá trị lương từ chuỗi lương hoặc giá trị số
  const getSalaryValue = (salary) => {
    if (typeof salary === "number") return salary;

    if (typeof salary === "string") {
      // Xử lý chuỗi lương: "15-25 triệu" => trả về giá trị trung bình 20
      const matches = salary.match(/(\d+)(?:\s*-\s*(\d+))?/);
      if (matches) {
        if (matches[2]) {
          // Có khoảng giá trị: lấy trung bình
          return (parseInt(matches[1]) + parseInt(matches[2])) / 2;
        } else if (matches[1]) {
          // Chỉ có một giá trị
          return parseInt(matches[1]);
        }
      }
    }

    return 0; // Giá trị mặc định
  };

  // Lọc và hiển thị danh sách công việc từ API
  const filteredJobs = jobs;

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
    // setPage(1) được xử lý ở useEffect
  };

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
    // setPage(1) được xử lý ở useEffect
  };

  const handleSalaryChange = (event, newValue) => {
    setSalaryRange(newValue);
    // Không cần reset page do useEffect sẽ xử lý
  };

  const handlePostDateChange = (event) => {
    setPostDate(event.target.value);
    // setPage(1) được xử lý ở useEffect
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Không cần gọi fetchJobs, useEffect sẽ xử lý với timeout
  };

  const clearSearch = () => {
    setSearchQuery("");
    // Không cần gọi fetchJobs hay reset page vì useEffect sẽ xử lý
  };

  const resetFilters = () => {
    setFilterCategory("all");
    setPostType("all");
    setSalaryRange([0, 50]);
    setPostDate("all");
    setSearchQuery("");
    // Không cần gọi fetchJobs hay reset page vì useEffect sẽ xử lý
  };

  const toggleFilters = () => {
    if (isMobile) {
      setMobileFiltersOpen(true);
    } else {
      setShowFilters(!showFilters);
    }
  };

  const handleMobileFiltersClose = () => {
    setMobileFiltersOpen(false);
  };

  const applyMobileFilters = () => {
    setMobileFiltersOpen(false);
    updateActiveFiltersCount();
    setPage(1); // Reset về trang đầu tiên
    fetchJobs();
  };

  // Cập nhật số lượng bộ lọc đang kích hoạt
  const updateActiveFiltersCount = () => {
    let count = 0;

    if (filterCategory !== "all") count++;
    if (postType !== "all") count++;
    if (salaryRange[0] > 0 || salaryRange[1] < 50) count++;
    if (postDate !== "all") count++;

    setActiveFiltersCount(count);
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "development":
        return "Phát triển";
      case "design":
        return "Thiết kế";
      case "management":
        return "Quản lý";
      case "data":
        return "Dữ liệu";
      default:
        return category;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "development":
        return "primary";
      case "design":
        return "secondary";
      case "management":
        return "success";
      case "data":
        return "info";
      default:
        return "default";
    }
  };

  const handleApplyClick = (jobId, jobTitle) => {
    // Tạo slug từ tiêu đề
    const slug = jobTitle
      .toLowerCase()
      .replace(/[^\w\sÀ-ỹ]/g, "") // Loại bỏ ký tự đặc biệt nhưng giữ dấu tiếng Việt
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
      .replace(/ì|í|ị|ỉ|ĩ/g, "i")
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
      .replace(/đ/g, "d")
      .replace(/-{2,}/g, "-") // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu
      .substring(0, 50); // Giới hạn độ dài slug

    navigate(`/jobs/${slug}/${jobId}`);
  };

  // Hàm để lấy danh sách công việc từ API
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      // Chuẩn bị tham số cho API
      const params = {
        page,
        limit,
      };

      // Chỉ thêm các tham số nếu có giá trị
      if (searchQuery) {
        params.search = searchQuery;
      }

      if (filterCategory !== "all") {
        params.category = filterCategory;
      }

      if (postType !== "all") {
        params.type = postType;
      }

      // Chỉ gửi salaryMin khi giá trị > 0
      if (salaryRange[0] > 0) {
        params.minSalary = salaryRange[0];
      }

      // Chỉ gửi salaryMax khi giá trị < giá trị max
      if (salaryRange[1] < 50) {
        params.maxSalary = salaryRange[1];
      }

      // Nếu có lọc theo ngày, thêm vào params
      if (postDate !== "all") {
        params.postDate = postDate;
      }

      // Gọi API
      const response = await getJobs(params);

      if (response.success) {
        // Xử lý dữ liệu từ API
        const processedJobs = response.data.map((job) => ({
          ...job,
          // Đảm bảo có các trường cần thiết cho UI
          id: job._id || job.id,
          category: job.category || "other",
          type: job.postType || job.type || "hiring",
          // Tính toán giá trị lương để hiển thị
          salaryValue: getSalaryValueFromJob(job),
          // Đảm bảo có title, company và location để hiển thị
          title: job.title || "Không có tiêu đề",
          company: job.company || job.author?.company || "Không xác định",
          location: job.location || "Không xác định",
          // Format salary string nếu có salaryMin và salaryMax
          salary: formatSalaryDisplay(job),
        }));

        setJobs(processedJobs || []);
        setTotalJobs(response.total || processedJobs.length || 0);
      } else {
        console.warn("API không trả về dữ liệu thành công:", response);
        setJobs([]);
        setError(response.message || "Không thể tải danh sách công việc");
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách công việc:", err);
      setJobs([]);
      setError("Đã xảy ra lỗi khi tải danh sách công việc");
    } finally {
      setLoading(false);
    }
  };

  // Helper để lấy giá trị lương từ job để sử dụng trong filter
  const getSalaryValueFromJob = (job) => {
    // Nếu đã có salaryValue (từ dữ liệu mẫu), sử dụng nó
    if (job.salaryValue) return job.salaryValue;

    // Nếu có salaryMin, sử dụng giá trị trung bình giữa salaryMin và salaryMax
    if (job.salaryMin) {
      const min = job.salaryMin;
      const max = job.salaryMax || min;
      return (min + max) / 2;
    }

    // Nếu có salary string, parse để lấy giá trị
    if (job.salary && typeof job.salary === "string") {
      const matches = job.salary.match(/(\d+)(?:\s*-\s*(\d+))?/);
      if (matches) {
        if (matches[2]) {
          // Có khoảng giá trị: lấy trung bình
          return (parseInt(matches[1]) + parseInt(matches[2])) / 2;
        } else if (matches[1]) {
          // Chỉ có một giá trị
          return parseInt(matches[1]);
        }
      }
    }

    return 0; // Giá trị mặc định
  };

  // Helper để format hiển thị mức lương
  const formatSalaryDisplay = (job) => {
    if (job.salary) return job.salary;

    if (job.salaryMin && job.salaryMax) {
      return `${job.salaryMin}-${job.salaryMax} triệu`;
    }

    if (job.salaryMin) {
      return `Từ ${job.salaryMin} triệu`;
    }

    if (job.salaryMax) {
      return `Đến ${job.salaryMax} triệu`;
    }

    return "Thỏa thuận";
  };

  // Gọi API khi submit form tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Chỉ cần ngăn form submit, mọi thứ được xử lý bởi useEffect
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
        {/* Header */}
        <Box
          sx={{
            mb: 5,
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
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
            Tìm kiếm việc làm
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
              fontSize: "1.1rem",
            }}
          >
            Khám phá hàng nghìn cơ hội việc làm từ các công ty hàng đầu. Tìm
            công việc phù hợp với kỹ năng và mục tiêu nghề nghiệp của bạn.
          </Typography>
        </Box>

        {/* Hiển thị lỗi nếu có */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 4, borderRadius: 2 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {/* Thanh tìm kiếm và lọc */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 4 },
            mb: 5,
            borderRadius: 3,
            background: "white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <form onSubmit={handleSearchSubmit}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2, md: 3 }}
              alignItems={{ xs: "stretch", md: "center" }}
            >
              <TextField
                fullWidth
                placeholder="Tên vị trí, công ty hoặc địa điểm..."
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={clearSearch}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "row", md: "row" },
                  width: { xs: "100%", md: "auto" },
                }}
              >
                <FormControl
                  sx={{
                    flexGrow: { xs: 1, md: 0 },
                    minWidth: { xs: "auto", md: 200 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                >
                  <InputLabel id="category-filter-label">Danh mục</InputLabel>
                  <Select
                    labelId="category-filter-label"
                    id="category-filter"
                    value={filterCategory}
                    onChange={handleCategoryChange}
                    label="Danh mục"
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterListIcon color="primary" sx={{ mr: 1 }} />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="all">Tất cả</MenuItem>
                    <MenuItem value="development">Phát triển</MenuItem>
                    <MenuItem value="design">Thiết kế</MenuItem>
                    <MenuItem value="management">Quản lý</MenuItem>
                    <MenuItem value="data">Dữ liệu</MenuItem>
                  </Select>
                </FormControl>

                {isMobile ? (
                  <Badge
                    badgeContent={activeFiltersCount}
                    color="primary"
                    sx={{
                      "& .MuiBadge-badge": {
                        right: 10,
                        top: 10,
                      },
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={toggleFilters}
                      startIcon={<TuneIcon />}
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        height: "56px",
                      }}
                    >
                      Bộ lọc
                    </Button>
                  </Badge>
                ) : (
                  <Button
                    variant={showFilters ? "contained" : "outlined"}
                    color="primary"
                    onClick={toggleFilters}
                    startIcon={<TuneIcon />}
                    sx={{ borderRadius: 2, whiteSpace: "nowrap" }}
                  >
                    Bộ lọc khác
                    {activeFiltersCount > 0 && (
                      <Box
                        component="span"
                        sx={{
                          ml: 1,
                          bgcolor: "white",
                          color: "primary.main",
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}
                      >
                        {activeFiltersCount}
                      </Box>
                    )}
                  </Button>
                )}
              </Box>
            </Stack>
          </form>

          {/* Bộ lọc mở rộng cho desktop */}
          {!isMobile && (
            <Collapse in={showFilters} timeout="auto">
              <Box
                sx={{
                  mt: 3,
                  pt: 3,
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr 1fr",
                  },
                  gap: 3,
                }}
              >
                {/* Loại bài đăng */}
                <FormControl component="fieldset">
                  <FormLabel
                    component="legend"
                    sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
                  >
                    Loại bài đăng
                  </FormLabel>
                  <RadioGroup
                    aria-label="post-type"
                    name="post-type"
                    value={postType}
                    onChange={handlePostTypeChange}
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio size="small" />}
                      label="Tất cả"
                    />
                    <FormControlLabel
                      value="hiring"
                      control={<Radio size="small" />}
                      label="Tuyển người"
                    />
                    <FormControlLabel
                      value="seeking"
                      control={<Radio size="small" />}
                      label="Tìm việc"
                    />
                  </RadioGroup>
                </FormControl>

                {/* Khoảng lương */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mb: 1 }}
                  >
                    Khoảng lương (triệu đồng)
                  </Typography>
                  <Box sx={{ px: 1, width: "90%" }}>
                    <Slider
                      value={salaryRange}
                      onChange={handleSalaryChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={50}
                      step={5}
                      marks={[
                        { value: 0, label: "0" },
                        { value: 10, label: "10" },
                        { value: 20, label: "20" },
                        { value: 30, label: "30" },
                        { value: 40, label: "40" },
                        { value: 50, label: "50+" },
                      ]}
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </Box>
                </Box>

                {/* Thời gian đăng */}
                <FormControl component="fieldset">
                  <FormLabel
                    component="legend"
                    sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
                  >
                    Thời gian đăng
                  </FormLabel>
                  <RadioGroup
                    aria-label="post-date"
                    name="post-date"
                    value={postDate}
                    onChange={handlePostDateChange}
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio size="small" />}
                      label="Tất cả"
                    />
                    <FormControlLabel
                      value="24h"
                      control={<Radio size="small" />}
                      label="24 giờ qua"
                    />
                    <FormControlLabel
                      value="3days"
                      control={<Radio size="small" />}
                      label="3 ngày qua"
                    />
                    <FormControlLabel
                      value="week"
                      control={<Radio size="small" />}
                      label="1 tuần qua"
                    />
                    <FormControlLabel
                      value="month"
                      control={<Radio size="small" />}
                      label="1 tháng qua"
                    />
                  </RadioGroup>
                </FormControl>

                {/* Nút Reset */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={resetFilters}
                    sx={{ borderRadius: 2, mt: 2 }}
                  >
                    Đặt lại bộ lọc
                  </Button>
                </Box>
              </Box>
            </Collapse>
          )}

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              pt: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: theme.palette.primary.main,
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={16} /> Đang tải dữ liệu...
                </Box>
              ) : (
                `Đang hiển thị ${filteredJobs.length} việc làm`
              )}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Sắp xếp theo: Mới nhất
            </Typography>
          </Box>
        </Paper>

        {/* Drawer cho bộ lọc trên mobile */}
        <Drawer
          anchor="bottom"
          open={mobileFiltersOpen}
          onClose={handleMobileFiltersClose}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              maxHeight: "85vh",
              overflowY: "auto",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              position: "sticky",
              top: 0,
              bgcolor: "background.paper",
              zIndex: 10,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Bộ lọc nâng cao
            </Typography>
            <IconButton edge="end" onClick={handleMobileFiltersClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: 3 }}>
            {/* Loại bài đăng */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                Loại bài đăng
              </Typography>
              <RadioGroup
                aria-label="post-type"
                name="post-type"
                value={postType}
                onChange={handlePostTypeChange}
                sx={{ ml: 1 }}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="Tất cả"
                />
                <FormControlLabel
                  value="hiring"
                  control={<Radio />}
                  label="Tuyển người"
                />
                <FormControlLabel
                  value="seeking"
                  control={<Radio />}
                  label="Tìm việc"
                />
              </RadioGroup>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Khoảng lương */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Khoảng lương (triệu đồng)
              </Typography>
              <Box sx={{ px: 2, width: "95%", mx: "auto" }}>
                <Slider
                  value={salaryRange}
                  onChange={handleSalaryChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={50}
                  step={5}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 10, label: "10" },
                    { value: 20, label: "20" },
                    { value: 30, label: "30" },
                    { value: 40, label: "40" },
                    { value: 50, label: "50+" },
                  ]}
                  sx={{ color: theme.palette.primary.main }}
                />
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Thời gian đăng */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                Thời gian đăng
              </Typography>
              <RadioGroup
                aria-label="post-date"
                name="post-date"
                value={postDate}
                onChange={handlePostDateChange}
                sx={{ ml: 1 }}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="Tất cả"
                />
                <FormControlLabel
                  value="24h"
                  control={<Radio />}
                  label="24 giờ qua"
                />
                <FormControlLabel
                  value="3days"
                  control={<Radio />}
                  label="3 ngày qua"
                />
                <FormControlLabel
                  value="week"
                  control={<Radio />}
                  label="1 tuần qua"
                />
                <FormControlLabel
                  value="month"
                  control={<Radio />}
                  label="1 tháng qua"
                />
              </RadioGroup>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 4,
                position: "sticky",
                bottom: 0,
                pt: 2,
                pb: 2,
                bgcolor: "background.paper",
                zIndex: 10,
              }}
            >
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={resetFilters}
                sx={{ borderRadius: 2, py: 1.5 }}
              >
                Đặt lại
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={applyMobileFilters}
                startIcon={<CheckIcon />}
                sx={{ borderRadius: 2, py: 1.5 }}
              >
                Áp dụng
              </Button>
            </Box>
          </Box>
        </Drawer>

        {/* Danh sách công việc */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : filteredJobs.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
              },
              gap: 2,
              width: "100%",
            }}
          >
            {filteredJobs.map((job) => (
              <Box
                key={job.id}
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: "100%",
                  height: "100%",
                }}
              >
                <JobCard
                  job={job}
                  onClick={handleApplyClick}
                  getCategoryLabel={getCategoryLabel}
                  getCategoryColor={getCategoryColor}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Alert
            severity="info"
            sx={{
              mt: 2,
              p: 3,
              borderRadius: 2,
              fontSize: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", mt: 1 }}
            >
              Không tìm thấy công việc
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Không tìm thấy việc làm phù hợp với tiêu chí tìm kiếm của bạn.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={resetFilters}
              startIcon={<ClearIcon />}
              sx={{ mt: 1 }}
            >
              Xóa bộ lọc
            </Button>
          </Alert>
        )}
      </Container>

      {/* Floating Action Button cho mobile để hiển thị bộ lọc */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="filter"
          onClick={toggleFilters}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Badge
            badgeContent={activeFiltersCount}
            color="error"
            invisible={activeFiltersCount === 0}
          >
            <TuneIcon />
          </Badge>
        </Fab>
      )}
    </Box>
  );
}

export default Jobs;

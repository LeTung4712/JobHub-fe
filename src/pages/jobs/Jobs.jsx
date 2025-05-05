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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  useMediaQuery,
  Badge,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [postType, setPostType] = useState("all");
  const [salaryRange, setSalaryRange] = useState([0, 50]);
  const [postDate, setPostDate] = useState("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Dữ liệu công việc mẫu (bao gồm dữ liệu cũ + thêm type và date)
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Công ty ABC",
      location: "Hà Nội",
      category: "development",
      salary: "15-25 triệu",
      salaryValue: 20, // Giá trị số cho filter
      time: "Toàn thời gian",
      type: "hiring", // tuyển người
      date: "2023-10-15", // Thời gian đăng
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Công ty XYZ",
      location: "Hồ Chí Minh",
      category: "development",
      salary: "20-30 triệu",
      salaryValue: 25,
      time: "Toàn thời gian",
      type: "hiring",
      date: "2023-10-20",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Công ty DEF",
      location: "Đà Nẵng",
      category: "design",
      salary: "15-22 triệu",
      salaryValue: 18,
      time: "Toàn thời gian",
      type: "hiring",
      date: "2023-09-30",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Công ty GHI",
      location: "Hà Nội",
      category: "management",
      salary: "30-45 triệu",
      salaryValue: 38,
      time: "Toàn thời gian",
      type: "hiring",
      date: "2023-10-05",
    },
    {
      id: 5,
      title: "Data Analyst",
      company: "Công ty JKL",
      location: "Hồ Chí Minh",
      category: "data",
      salary: "18-25 triệu",
      salaryValue: 22,
      time: "Toàn thời gian",
      type: "hiring",
      date: "2023-11-01",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "Công ty MNO",
      location: "Hà Nội",
      category: "development",
      salary: "25-35 triệu",
      salaryValue: 30,
      time: "Toàn thời gian",
      type: "hiring",
      date: "2023-11-10",
    },
    {
      id: 7,
      title: "Senior React Developer",
      company: "Nguyễn Văn A",
      location: "Hồ Chí Minh",
      category: "development",
      salary: "30-40 triệu",
      salaryValue: 35,
      time: "Toàn thời gian",
      type: "seeking", // tìm việc
      date: "2023-10-25",
    },
    {
      id: 8,
      title: "Graphic Designer",
      company: "Trần Thị B",
      location: "Hà Nội",
      category: "design",
      salary: "15-20 triệu",
      salaryValue: 17,
      time: "Bán thời gian",
      type: "seeking",
      date: "2023-11-05",
    },
    {
      id: 9,
      title: "Project Manager",
      company: "Lê Văn C",
      location: "Đà Nẵng",
      category: "management",
      salary: "30-40 triệu",
      salaryValue: 35,
      time: "Toàn thời gian",
      type: "seeking",
      date: "2023-10-10",
    },
  ];

  // Hàm kiểm tra thời gian đăng
  const checkPostDate = (jobDate, filterDate) => {
    if (filterDate === "all") return true;

    const currentDate = new Date();
    const postDate = new Date(jobDate);
    const diffDays = Math.floor(
      (currentDate - postDate) / (1000 * 60 * 60 * 24)
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

  // Lọc việc làm dựa trên tất cả các bộ lọc
  const filteredJobs = jobs.filter((job) => {
    // Lọc theo danh mục
    const categoryMatch =
      filterCategory === "all" || job.category === filterCategory;

    // Lọc theo tìm kiếm
    const searchMatch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Lọc theo loại bài đăng (tuyển dụng/tìm việc)
    const typeMatch = postType === "all" || job.type === postType;

    // Lọc theo khoảng lương
    const salaryMatch =
      job.salaryValue >= salaryRange[0] && job.salaryValue <= salaryRange[1];

    // Lọc theo thời gian đăng
    const dateMatch = checkPostDate(job.date, postDate);

    return (
      categoryMatch && searchMatch && typeMatch && salaryMatch && dateMatch
    );
  });

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
  };

  const handleSalaryChange = (event, newValue) => {
    setSalaryRange(newValue);
  };

  const handlePostDateChange = (event) => {
    setPostDate(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const resetFilters = () => {
    setFilterCategory("all");
    setPostType("all");
    setSalaryRange([0, 50]);
    setPostDate("all");
    setSearchQuery("");
    updateActiveFiltersCount();
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

  // Gọi hàm cập nhật số bộ lọc khi component mount và mỗi khi thay đổi bộ lọc
  useEffect(() => {
    updateActiveFiltersCount();
  }, [filterCategory, postType, salaryRange, postDate]);

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

  const handleApplyClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
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
              Đang hiển thị {filteredJobs.length} việc làm
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
        {filteredJobs.length > 0 ? (
          <Grid
            container
            spacing={2}
            sx={{
              "& .MuiGrid-item": {
                display: "flex",
              },
            }}
          >
            {filteredJobs.map((job) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                key={job.id}
                sx={{
                  mb: { xs: 2, sm: 2, md: 3 },
                  width: { lg: "20%" },
                  flexBasis: { lg: "20%" },
                  maxWidth: { lg: "20%" },
                }}
              >
                <Card
                  elevation={2}
                  sx={{
                    height: { xs: "360px", md: "340px" },
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.06)",
                    flexGrow: 1,
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  {/* Badge cho loại bài đăng */}
                  {job.type === "seeking" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: theme.palette.secondary.main,
                        color: "white",
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        py: 0.5,
                        px: 1,
                        borderBottomLeftRadius: 8,
                      }}
                    >
                      Tìm việc
                    </Box>
                  )}

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: { xs: 2, md: 2.5 },
                      "&:last-child": { pb: 2 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Box sx={{ mb: 1.5, height: "5rem" }}>
                        <Chip
                          label={getCategoryLabel(job.category)}
                          color={getCategoryColor(job.category)}
                          size="small"
                          sx={{ mb: 1, fontWeight: 500, fontSize: "0.7rem" }}
                        />
                        <Typography
                          variant="h6"
                          component="h2"
                          color="primary.dark"
                          sx={{
                            fontWeight: "bold",
                            fontSize: {
                              xs: "1rem",
                              md: "0.9rem",
                              lg: "0.95rem",
                            },
                            height: "2.5rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: 1.3,
                          }}
                        >
                          {job.title}
                        </Typography>
                      </Box>

                      <Stack spacing={1} sx={{ height: "8rem" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            height: "1.5rem",
                          }}
                        >
                          <BusinessIcon
                            fontSize="small"
                            color="action"
                            sx={{ fontSize: "0.9rem", minWidth: "18px" }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: { xs: "0.85rem", lg: "0.8rem" },
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {job.company}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            height: "1.5rem",
                          }}
                        >
                          <LocationOnIcon
                            fontSize="small"
                            color="action"
                            sx={{ fontSize: "0.9rem", minWidth: "18px" }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: { xs: "0.85rem", lg: "0.8rem" },
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {job.location}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            height: "1.5rem",
                          }}
                        >
                          <AttachMoneyIcon
                            fontSize="small"
                            color="action"
                            sx={{ fontSize: "0.9rem", minWidth: "18px" }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: { xs: "0.85rem", lg: "0.8rem" },
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {job.salary}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            height: "1.5rem",
                          }}
                        >
                          <AccessTimeIcon
                            fontSize="small"
                            color="action"
                            sx={{ fontSize: "0.9rem", minWidth: "18px" }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: { xs: "0.85rem", lg: "0.8rem" },
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {job.time}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions
                    sx={{ p: { xs: 1.5, md: 1.5 }, height: "3.5rem" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleApplyClick(job.id)}
                      sx={{
                        py: 0.5,
                        fontWeight: "bold",
                        fontSize: { xs: "0.85rem", md: "0.75rem" },
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      {job.type === "seeking" ? "Xem hồ sơ" : "Ứng tuyển ngay"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert
            severity="info"
            sx={{
              mt: 2,
              p: 3,
              borderRadius: 2,
              fontSize: "1rem",
            }}
          >
            Không tìm thấy việc làm phù hợp với tiêu chí tìm kiếm. Hãy thử lại
            với bộ lọc hoặc từ khóa khác.
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

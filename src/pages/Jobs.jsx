import React, { useState } from "react";
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
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Công ty ABC",
      location: "Hà Nội",
      category: "development",
      salary: "15-25 triệu",
      time: "Toàn thời gian",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Công ty XYZ",
      location: "Hồ Chí Minh",
      category: "development",
      salary: "20-30 triệu",
      time: "Toàn thời gian",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Công ty DEF",
      location: "Đà Nẵng",
      category: "design",
      salary: "15-22 triệu",
      time: "Toàn thời gian",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Công ty GHI",
      location: "Hà Nội",
      category: "management",
      salary: "30-45 triệu",
      time: "Toàn thời gian",
    },
    {
      id: 5,
      title: "Data Analyst",
      company: "Công ty JKL",
      location: "Hồ Chí Minh",
      category: "data",
      salary: "18-25 triệu",
      time: "Toàn thời gian",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "Công ty MNO",
      location: "Hà Nội",
      category: "development",
      salary: "25-35 triệu",
      time: "Toàn thời gian",
    },
  ];

  // Lọc việc làm dựa trên cả danh mục và tìm kiếm
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

    return categoryMatch && searchMatch;
  });

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
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

  const handleApplyClick = (jobId) => {
    navigate(`/job/${jobId}`);
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
            p: { xs: 3, md: 4 },
            mb: 5,
            borderRadius: 3,
            background: "white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
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

            <FormControl
              sx={{
                minWidth: { xs: "100%", md: 200 },
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
          </Stack>

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
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
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
                      Ứng tuyển ngay
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
    </Box>
  );
}

export default Jobs;

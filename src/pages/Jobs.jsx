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
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import FilterListIcon from "@mui/icons-material/FilterList";

function Jobs() {
  const [filterCategory, setFilterCategory] = useState("all");
  const theme = useTheme();

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Công ty ABC",
      location: "Hà Nội",
      category: "development",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Công ty XYZ",
      location: "Hồ Chí Minh",
      category: "development",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Công ty DEF",
      location: "Đà Nẵng",
      category: "design",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Công ty GHI",
      location: "Hà Nội",
      category: "management",
    },
    {
      id: 5,
      title: "Data Analyst",
      company: "Công ty JKL",
      location: "Hồ Chí Minh",
      category: "data",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "Công ty MNO",
      location: "Hà Nội",
      category: "development",
    },
  ];

  const filteredJobs =
    filterCategory === "all"
      ? jobs
      : jobs.filter((job) => job.category === filterCategory);

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
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

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom>
          Việc làm
        </Typography>

        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FilterListIcon color="primary" />
              <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                <InputLabel id="category-filter-label">Danh mục</InputLabel>
                <Select
                  labelId="category-filter-label"
                  id="category-filter"
                  value={filterCategory}
                  onChange={handleCategoryChange}
                  label="Danh mục"
                >
                  <MenuItem value="all">Tất cả</MenuItem>
                  <MenuItem value="development">Phát triển</MenuItem>
                  <MenuItem value="design">Thiết kế</MenuItem>
                  <MenuItem value="management">Quản lý</MenuItem>
                  <MenuItem value="data">Dữ liệu</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Đang hiển thị {filteredJobs.length} việc làm
            </Typography>
          </Box>
        </Paper>

        {filteredJobs.length > 0 ? (
          <Grid container spacing={3}>
            {filteredJobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 8,
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={getCategoryLabel(job.category)}
                        color={getCategoryColor(job.category)}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        color="primary"
                      >
                        {job.title}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <BusinessIcon fontSize="small" color="action" />
                      <Typography variant="body2">{job.company}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="body2">{job.location}</Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 1 }}
                    >
                      Ứng tuyển ngay
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ mt: 2 }}>
            Không tìm thấy việc làm phù hợp với bộ lọc. Hãy thử lại với bộ lọc
            khác.
          </Alert>
        )}
      </Container>
    </Box>
  );
}

export default Jobs;

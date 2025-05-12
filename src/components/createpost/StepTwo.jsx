import React from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Grid,
  Paper,
  Slider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { motion } from "framer-motion";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

import {
  categories,
  jobTypes,
  experienceLevels,
} from "../../constants/formData";

const StepTwo = ({
  postType,
  formData,
  formErrors,
  handleInputChange,
  handleDeadlineChange,
  handleSalaryRangeChange,
  valueLabelFormat,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary.dark"
          sx={{ mb: 1.5 }}
        >
          {postType === "hiring"
            ? "Thông tin tuyển dụng"
            : "Thông tin tìm việc"}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: "600px", mx: "auto" }}
        >
          {postType === "hiring"
            ? "Điền thông tin chi tiết về vị trí tuyển dụng"
            : "Điền thông tin chi tiết về công việc bạn đang tìm kiếm"}
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid rgba(0,0,0,0.06)",
          mb: 4,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              name="title"
              label={
                postType === "hiring" ? "Tiêu đề công việc" : "Tiêu đề bài đăng"
              }
              value={formData.title}
              onChange={handleInputChange}
              placeholder={
                postType === "hiring"
                  ? "Ví dụ: Frontend Developer, Kế toán trưởng, ..."
                  : "Ví dụ: Frontend Developer tìm việc, Kế toán có 5 năm kinh nghiệm, ..."
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkOutlineIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              error={!!formErrors.title}
              helperText={formErrors.title}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "white",
                  "&.Mui-focused": {
                    boxShadow: "0 0 0 2px rgba(100, 108, 255, 0.2)",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={postType === "hiring" ? 6 : 12}>
            <TextField
              required
              fullWidth
              id="location"
              name="location"
              label="Địa điểm làm việc"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Ví dụ: Hà Nội, Hồ Chí Minh, ..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              error={!!formErrors.location}
              helperText={formErrors.location}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "white",
                  "&.Mui-focused": {
                    boxShadow: "0 0 0 2px rgba(100, 108, 255, 0.2)",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              error={!!formErrors.category}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "white",
                  "&.Mui-focused": {
                    boxShadow: "0 0 0 2px rgba(100, 108, 255, 0.2)",
                  },
                },
              }}
            >
              <InputLabel id="category-label">Lĩnh vực</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Lĩnh vực"
                startAdornment={
                  <InputAdornment position="start" sx={{ mr: 1, ml: -0.5 }}>
                    <WorkOutlineIcon color="primary" />
                  </InputAdornment>
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.category && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ mt: 1, ml: 2 }}
                >
                  {formErrors.category}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              error={!!formErrors.type}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "white",
                  "&.Mui-focused": {
                    boxShadow: "0 0 0 2px rgba(100, 108, 255, 0.2)",
                  },
                },
              }}
            >
              <InputLabel id="type-label">Loại hình công việc</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                label="Loại hình công việc"
                startAdornment={
                  <InputAdornment position="start" sx={{ mr: 1, ml: -0.5 }}>
                    <WorkOutlineIcon color="primary" />
                  </InputAdornment>
                }
              >
                {jobTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.type && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ mt: 1, ml: 2 }}
                >
                  {formErrors.type}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid rgba(0,0,0,0.06)",
          mb: 4,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ mb: 3, color: "text.primary" }}
        >
          Chi tiết thêm
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "white",
                  "&.Mui-focused": {
                    boxShadow: "0 0 0 2px rgba(100, 108, 255, 0.2)",
                  },
                },
              }}
            >
              <InputLabel id="experience-label">Kinh nghiệm</InputLabel>
              <Select
                labelId="experience-label"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                label="Kinh nghiệm"
                startAdornment={
                  <InputAdornment position="start" sx={{ mr: 1, ml: -0.5 }}>
                    <WorkHistoryIcon color="primary" />
                  </InputAdornment>
                }
              >
                {experienceLevels.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {postType === "hiring" && (
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Hạn nộp hồ sơ"
                  value={formData.deadline}
                  onChange={handleDeadlineChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonthOutlinedIcon color="primary" />
                          </InputAdornment>
                        ),
                      },
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: "white",
                          "&.Mui-focused": {
                            boxShadow: "0 0 0 2px rgba(100, 108, 255, 0.2)",
                          },
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ width: "100%", mb: 3 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                <AttachMoneyOutlinedIcon color="primary" sx={{ mr: 1 }} />
                Mức lương (triệu VNĐ)
              </Typography>
              <Box sx={{ px: 2, py: 1 }}>
                <Slider
                  value={formData.salaryRange}
                  onChange={handleSalaryRangeChange}
                  valueLabelDisplay="on"
                  valueLabelFormat={valueLabelFormat}
                  min={0}
                  max={100}
                  step={1}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 25, label: "25" },
                    { value: 50, label: "50" },
                    { value: 75, label: "75" },
                    { value: 100, label: "100+" },
                  ]}
                  sx={{
                    "& .MuiSlider-thumb": {
                      backgroundColor: "primary.main",
                    },
                    "& .MuiSlider-valueLabel": {
                      backgroundColor: "primary.main",
                      borderRadius: 1,
                      px: 1,
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                    color: "text.secondary",
                    fontSize: "0.875rem",
                  }}
                >
                  <span>{formData.salaryRange[0]} triệu</span>
                  <span>{formData.salaryRange[1]} triệu</span>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default StepTwo;

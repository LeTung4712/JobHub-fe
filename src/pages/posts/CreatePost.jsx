import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
  Chip,
  Divider,
  useTheme,
  Alert,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
  Fab,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Component hiển thị panel cho mỗi tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`post-tabpanel-${index}`}
      aria-labelledby={`post-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function CreatePost() {
  const [postType, setPostType] = useState("hiring"); // "hiring" hoặc "seeking"
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    category: "",
    type: "",
    experience: "",
    description: "",
    requirements: [],
    deadline: null,
  });
  const [requirementInput, setRequirementInput] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Danh sách các lĩnh vực và loại hình công việc
  const categories = [
    { label: "Phát triển phần mềm", value: "software" },
    { label: "Thiết kế", value: "design" },
    { label: "Marketing", value: "marketing" },
    { label: "Quản lý dự án", value: "project-management" },
    { label: "Kế toán & Tài chính", value: "finance" },
    { label: "Dịch vụ khách hàng", value: "customer-service" },
    { label: "Sales", value: "sales" },
    { label: "Nhân sự", value: "hr" },
    { label: "Giáo dục", value: "education" },
    { label: "Khác", value: "other" },
  ];

  const jobTypes = [
    { label: "Toàn thời gian", value: "full-time" },
    { label: "Bán thời gian", value: "part-time" },
    { label: "Freelance", value: "freelance" },
    { label: "Hợp đồng", value: "contract" },
    { label: "Thực tập", value: "internship" },
    { label: "Remote", value: "remote" },
  ];

  const experienceLevels = [
    { label: "Mới đi làm", value: "entry" },
    { label: "1-2 năm", value: "junior" },
    { label: "3-5 năm", value: "mid" },
    { label: "5+ năm", value: "senior" },
    { label: "Chuyên gia", value: "expert" },
  ];

  // Các bước trong form
  const steps = [
    {
      label: "Loại bài đăng",
      optional: false,
    },
    {
      label: "Thông tin cơ bản",
      optional: false,
    },
    {
      label: "Chi tiết công việc",
      optional: false,
    },
    {
      label: postType === "hiring" ? "Yêu cầu công việc" : "Kỹ năng",
      optional: false,
    },
  ];

  // Xử lý chuyển bước
  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);

    // Đánh dấu bước hiện tại là hoàn thành
    setCompleted((prev) => ({
      ...prev,
      [activeStep]: true,
    }));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  // Kiểm tra dữ liệu trước khi qua bước tiếp
  const validateCurrentStep = () => {
    let isValid = true;
    let errors = {};

    if (activeStep === 1) {
      if (!formData.title) {
        errors.title = "Vui lòng nhập tiêu đề";
        isValid = false;
      }

      if (postType === "hiring" && !formData.company) {
        errors.company = "Vui lòng nhập tên công ty";
        isValid = false;
      }

      if (!formData.location) {
        errors.location = "Vui lòng nhập địa điểm";
        isValid = false;
      }

      if (!formData.category) {
        errors.category = "Vui lòng chọn lĩnh vực";
        isValid = false;
      }

      if (!formData.type) {
        errors.type = "Vui lòng chọn loại hình công việc";
        isValid = false;
      }
    }

    if (activeStep === 2) {
      if (!formData.description) {
        errors.description = "Vui lòng nhập mô tả";
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  // Xử lý khi next sang bước tiếp
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      handleNext();
    }
  };

  const handlePostTypeChange = (event, newType) => {
    if (newType !== null) {
      setPostType(newType);

      // Reset form khi chuyển loại bài đăng
      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        category: "",
        type: "",
        experience: "",
        description: "",
        requirements: [],
        deadline: null,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeadlineChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      deadline: date,
    }));
  };

  const addRequirement = () => {
    if (requirementInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, requirementInput.trim()],
      }));
      setRequirementInput("");
    }
  };

  const removeRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (
      !formData.title ||
      !formData.location ||
      !formData.category ||
      !formData.description
    ) {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
      return;
    }

    // Thêm validate riêng theo loại bài đăng
    if (postType === "hiring" && !formData.company) {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
      return;
    }

    // Submit form (would be an API call in a real app)
    console.log(`Creating ${postType} post:`, formData);

    // Show success message
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      navigate("/dashboard"); // Redirect to dashboard after successful submit
    }, 3000);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        py: { xs: 3, md: 6 },
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(to bottom, rgba(100, 108, 255, 0.04), rgba(100, 108, 255, 0.02))"
            : "linear-gradient(to bottom, rgba(20, 20, 30, 0.8), rgba(10, 10, 20, 0.9))",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: { xs: 3, md: 5 },
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.dark,
              mb: 2,
              textShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            Đăng bài mới
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: { xs: "100%", md: "80%" },
              mx: "auto",
            }}
          >
            Tạo một bài đăng để tuyển dụng nhân sự hoặc tìm kiếm cơ hội việc làm
            mới.
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ width: "100%", mb: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => {
                const stepProps = {};
                const labelProps = {};

                if (step.optional) {
                  labelProps.optional = (
                    <Typography variant="caption">Tùy chọn</Typography>
                  );
                }

                if (completed[index]) {
                  stepProps.completed = true;
                }

                return (
                  <Step key={step.label} {...stepProps}>
                    <StepLabel
                      {...labelProps}
                      StepIconProps={{
                        sx: {
                          color: completed[index]
                            ? theme.palette.success.main
                            : undefined,
                        },
                      }}
                      onClick={handleStep(index)}
                      sx={{ cursor: "pointer" }}
                    >
                      {step.label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        )}

        <Card
          component={motion.div}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          elevation={3}
          sx={{
            borderRadius: { xs: 2, md: 3 },
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            background: "white",
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {/* Nội dung từng bước */}
              {activeStep === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{ mb: 3, textAlign: "center" }}
                  >
                    Chọn loại bài đăng
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <ToggleButtonGroup
                      value={postType}
                      exclusive
                      onChange={handlePostTypeChange}
                      aria-label="post type"
                      sx={{ mb: 3, flexDirection: isMobile ? "column" : "row" }}
                    >
                      <ToggleButton
                        value="hiring"
                        aria-label="tuyển người"
                        sx={{
                          px: 4,
                          py: 2,
                          borderRadius: "10px",
                          mb: isMobile ? 2 : 0,
                          mr: isMobile ? 0 : 2,
                          border: `1px solid ${theme.palette.primary.main}`,
                          "&.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                          },
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.light,
                            color: "white",
                          },
                        }}
                      >
                        <BusinessCenterIcon
                          sx={{ mr: 1, fontSize: "1.5rem" }}
                        />
                        <Box>
                          <Typography variant="h6">Tuyển người</Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Đăng tin tuyển dụng
                          </Typography>
                        </Box>
                      </ToggleButton>
                      <ToggleButton
                        value="seeking"
                        aria-label="tìm việc"
                        sx={{
                          px: 4,
                          py: 2,
                          borderRadius: "10px",
                          border: `1px solid ${theme.palette.secondary.main}`,
                          "&.Mui-selected": {
                            backgroundColor: theme.palette.secondary.main,
                            color: "white",
                          },
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: theme.palette.secondary.light,
                            color: "white",
                          },
                        }}
                      >
                        <PersonSearchIcon sx={{ mr: 1, fontSize: "1.5rem" }} />
                        <Box>
                          <Typography variant="h6">Tìm việc</Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Đăng hồ sơ tìm việc
                          </Typography>
                        </Box>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNextStep}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: "10px",
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                        fontSize: "1rem",
                      }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Tiếp tục
                    </Button>
                  </Box>
                </motion.div>
              )}

              {activeStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                    {postType === "hiring"
                      ? "Thông tin tuyển dụng"
                      : "Thông tin tìm việc"}
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="title"
                        name="title"
                        label={
                          postType === "hiring"
                            ? "Tiêu đề công việc"
                            : "Tiêu đề bài đăng"
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
                      />
                    </Grid>

                    {postType === "hiring" && (
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="company"
                          name="company"
                          label="Tên công ty"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Tên công ty của bạn"
                          error={!!formErrors.company}
                          helperText={formErrors.company}
                        />
                      </Grid>
                    )}

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
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        required
                        error={!!formErrors.category}
                      >
                        <InputLabel id="category-label">Lĩnh vực</InputLabel>
                        <Select
                          labelId="category-label"
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          label="Lĩnh vực"
                        >
                          {categories.map((category) => (
                            <MenuItem
                              key={category.value}
                              value={category.value}
                            >
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
                      <FormControl fullWidth required error={!!formErrors.type}>
                        <InputLabel id="type-label">
                          Loại hình công việc
                        </InputLabel>
                        <Select
                          labelId="type-label"
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          label="Loại hình công việc"
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

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="salary"
                        name="salary"
                        label={
                          postType === "hiring"
                            ? "Mức lương đề xuất"
                            : "Mức lương mong muốn"
                        }
                        value={formData.salary}
                        onChange={handleInputChange}
                        placeholder="Ví dụ: 15-25 triệu, Thỏa thuận, ..."
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AttachMoneyOutlinedIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="experience-label">
                          Kinh nghiệm
                        </InputLabel>
                        <Select
                          labelId="experience-label"
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          label="Kinh nghiệm"
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
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    )}
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 4,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                      startIcon={<ArrowBackIcon />}
                      sx={{ borderRadius: "10px", px: 3 }}
                    >
                      Quay lại
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleNextStep}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        borderRadius: "10px",
                        px: 3,
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      Tiếp tục
                    </Button>
                  </Box>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                    Mô tả chi tiết
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="description"
                        name="description"
                        label={
                          postType === "hiring"
                            ? "Mô tả công việc"
                            : "Mô tả chi tiết"
                        }
                        multiline
                        rows={8}
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder={
                          postType === "hiring"
                            ? "Mô tả chi tiết về công việc, trách nhiệm, quyền lợi, ..."
                            : "Mô tả về bản thân, kinh nghiệm, kỹ năng và mong muốn công việc, ..."
                        }
                        error={!!formErrors.description}
                        helperText={formErrors.description}
                        FormHelperTextProps={{
                          sx: { fontSize: "0.875rem" },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            transition: "border 0.3s ease",
                            "&.Mui-focused": {
                              boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.1)",
                            },
                          },
                        }}
                      />

                      <Paper
                        elevation={0}
                        sx={{
                          mt: 2,
                          p: 2,
                          backgroundColor: "rgba(25, 118, 210, 0.05)",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <HelpOutlineIcon
                          color="primary"
                          sx={{ mr: 1, mt: 0.3 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {postType === "hiring"
                            ? "Mô tả chi tiết sẽ giúp ứng viên hiểu rõ hơn về công việc và quyết định ứng tuyển. Hãy đề cập đến trách nhiệm, yêu cầu và quyền lợi."
                            : "Mô tả chi tiết về kinh nghiệm và kỹ năng của bạn sẽ giúp nhà tuyển dụng hiểu rõ hơn về năng lực của bạn."}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 4,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                      startIcon={<ArrowBackIcon />}
                      sx={{ borderRadius: "10px", px: 3 }}
                    >
                      Quay lại
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleNextStep}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        borderRadius: "10px",
                        px: 3,
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      Tiếp tục
                    </Button>
                  </Box>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                    {postType === "hiring"
                      ? "Yêu cầu công việc"
                      : "Kỹ năng của tôi"}
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          mb: 2,
                          flexDirection: isMobile ? "column" : "row",
                        }}
                      >
                        <TextField
                          fullWidth
                          id="requirement-input"
                          value={requirementInput}
                          onChange={(e) => setRequirementInput(e.target.value)}
                          label={
                            postType === "hiring"
                              ? "Thêm yêu cầu"
                              : "Thêm kỹ năng"
                          }
                          placeholder={
                            postType === "hiring"
                              ? "Nhập yêu cầu và nhấn thêm"
                              : "Nhập kỹ năng và nhấn thêm"
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addRequirement();
                            }
                          }}
                        />
                        <Button
                          variant="contained"
                          onClick={addRequirement}
                          sx={{
                            px: 3,
                            height: isMobile ? "auto" : "56px",
                            mt: isMobile ? 1 : 0,
                            minWidth: isMobile ? "100%" : "120px",
                          }}
                          startIcon={<AddIcon />}
                        >
                          Thêm
                        </Button>
                      </Box>

                      <Paper
                        variant="outlined"
                        sx={{
                          mt: 2,
                          p: 3,
                          borderRadius: 2,
                          minHeight: "150px",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          alignContent:
                            formData.requirements.length > 0
                              ? "flex-start"
                              : "center",
                          justifyContent:
                            formData.requirements.length > 0
                              ? "flex-start"
                              : "center",
                          backgroundColor: theme.palette.background.default,
                          transition: "all 0.3s ease",
                        }}
                      >
                        {formData.requirements.length > 0 ? (
                          formData.requirements.map((req, index) => (
                            <Chip
                              key={index}
                              label={req}
                              onDelete={() => removeRequirement(index)}
                              color="primary"
                              variant="outlined"
                              sx={{
                                m: 0.5,
                                borderRadius: "8px",
                                py: 0.5,
                                px: 0.5,
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                                },
                              }}
                            />
                          ))
                        ) : (
                          <Typography color="text.secondary" align="center">
                            {postType === "hiring"
                              ? "Chưa có yêu cầu nào được thêm"
                              : "Chưa có kỹ năng nào được thêm"}
                          </Typography>
                        )}
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          mt: 2,
                          p: 2,
                          backgroundColor: "rgba(25, 118, 210, 0.05)",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <HelpOutlineIcon
                          color="primary"
                          sx={{ mr: 1, mt: 0.3 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {postType === "hiring"
                            ? "Thêm các yêu cầu cụ thể về kỹ năng, kiến thức hoặc công nghệ mà ứng viên cần có để phù hợp với vị trí."
                            : "Thêm các kỹ năng, công nghệ hoặc công cụ mà bạn thành thạo để nhà tuyển dụng hiểu rõ năng lực của bạn."}
                        </Typography>
                      </Paper>
                    </Grid>

                    {submitSuccess && (
                      <Grid item xs={12}>
                        <Alert
                          severity="success"
                          sx={{
                            mb: 2,
                            borderRadius: 2,
                            py: 1.5,
                          }}
                          icon={<CheckCircleOutlineIcon fontSize="inherit" />}
                        >
                          Đăng bài thành công! Bạn sẽ được chuyển hướng sau giây
                          lát.
                        </Alert>
                      </Grid>
                    )}

                    {submitError && (
                      <Grid item xs={12}>
                        <Alert
                          severity="error"
                          sx={{ mb: 2, borderRadius: 2, py: 1.5 }}
                        >
                          Vui lòng điền đầy đủ các trường bắt buộc.
                        </Alert>
                      </Grid>
                    )}
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 4,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                      startIcon={<ArrowBackIcon />}
                      sx={{ borderRadius: "10px", px: 3 }}
                    >
                      Quay lại
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{
                        borderRadius: "10px",
                        px: 4,
                        py: 1.5,
                        backgroundImage: `linear-gradient(90deg, ${
                          postType === "hiring"
                            ? theme.palette.primary.main
                            : theme.palette.secondary.main
                        }, ${
                          postType === "hiring"
                            ? theme.palette.primary.dark
                            : theme.palette.secondary.dark
                        })`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      Đăng bài ngay
                    </Button>
                  </Box>
                </motion.div>
              )}

              {/* Mobile stepper navigation */}
              {isMobile && (
                <Box
                  sx={{
                    mt: 4,
                    mb: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {steps.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 10,
                        height: 10,
                        mx: 0.5,
                        borderRadius: "50%",
                        backgroundColor:
                          activeStep === index
                            ? theme.palette.primary.main
                            : completed[index]
                            ? theme.palette.success.main
                            : theme.palette.grey[300],
                        transition: "all 0.3s",
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Floating back button for mobile */}
        {isMobile && activeStep > 0 && (
          <Fab
            color="default"
            aria-label="back"
            size="medium"
            onClick={handleBack}
            sx={{
              position: "fixed",
              bottom: 16,
              left: 16,
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            <ArrowBackIcon />
          </Fab>
        )}
      </Container>
    </Box>
  );
}

export default CreatePost;

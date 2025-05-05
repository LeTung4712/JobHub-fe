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
  CircularProgress,
  IconButton,
  Slider,
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createJob } from "../../api/jobs";

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
    category: "software",
    type: "full-time",
    experience: "entry",
    description: "",
    requirements: [],
    benefits: [],
    deadline: null,
    industry: "",
    companySize: "",
    website: "",
    salaryRange: [10, 25], // Mức lương mặc định từ 10-25 triệu
  });
  const [requirementInput, setRequirementInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [cvFileName, setCvFileName] = useState("");
  const [cvError, setCvError] = useState("");

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
        category: "software",
        type: "full-time",
        experience: "entry",
        description: "",
        requirements: [],
        benefits: [],
        deadline: null,
        industry: "",
        companySize: "",
        website: "",
        salaryRange: [10, 25], // Mức lương mặc định từ 10-25 triệu
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

  const addBenefit = () => {
    if (benefitInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, benefitInput.trim()],
      }));
      setBenefitInput("");
    }
  };

  const removeBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  // Kiểm tra đăng nhập
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  // Xử lý upload CV
  const handleCvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Kiểm tra kích thước file (giới hạn 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setCvError("File không được vượt quá 5MB");
        return;
      }

      // Kiểm tra định dạng file (PDF, DOC, DOCX)
      const fileType = file.type;
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!validTypes.includes(fileType)) {
        setCvError("Chỉ chấp nhận file PDF, DOC hoặc DOCX");
        return;
      }

      setCvFile(file);
      setCvFileName(file.name);
      setCvError("");
    }
  };

  // Xóa CV đã upload
  const handleRemoveCv = () => {
    setCvFile(null);
    setCvFileName("");
  };

  // Xử lý thay đổi khoảng lương
  const handleSalaryRangeChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      salaryRange: newValue,
      // Cập nhật cả trường salary để tương thích với phiên bản cũ
      salary: `${newValue[0]}-${newValue[1]} triệu`,
    }));
  };

  // Format value cho Slider lương
  const valueLabelFormat = (value) => {
    return `${value} triệu`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra người dùng đã đăng nhập chưa
    if (!isAuthenticated()) {
      // Hiển thị thông báo lỗi
      setSubmitError(true);
      setSuccessMessage("Vui lòng đăng nhập để đăng bài");

      // Chuyển hướng đến trang đăng nhập sau 2 giây
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    // Validate form
    if (
      !formData.title ||
      !formData.location ||
      !formData.category ||
      !formData.description
    ) {
      setSubmitError(true);
      setSuccessMessage("Vui lòng điền đầy đủ các trường bắt buộc");
      setTimeout(() => setSubmitError(false), 5000);
      return;
    }

    // Kiểm tra CV đối với bài đăng tìm việc
    if (postType === "seeking" && !cvFile) {
      setSubmitError(true);
      setSuccessMessage("Vui lòng tải lên CV của bạn");
      setTimeout(() => setSubmitError(false), 5000);
      return;
    }

    // Thêm validate riêng theo loại bài đăng
    if (postType === "hiring" && !formData.company) {
      setSubmitError(true);
      setSuccessMessage("Vui lòng nhập tên công ty");
      setTimeout(() => setSubmitError(false), 5000);
      return;
    }

    try {
      setIsSubmitting(true);

      // Chuẩn bị dữ liệu gửi lên API
      const jobData = {
        ...formData,
        postType: postType, // "hiring" hoặc "seeking"
        status: "active", // Trạng thái mặc định là active

        // Chuyển đổi định dạng ngày tháng (nếu có)
        deadline: formData.deadline
          ? formData.deadline.toISOString()
          : undefined,

        // Đảm bảo các trường bắt buộc cho mô hình Job
        title: formData.title.trim(),
        company:
          postType === "hiring" ? formData.company.trim() : "Cá nhân tìm việc",
        location: formData.location.trim(),
        category: formData.category,
        type: formData.type,
        description: formData.description.trim(),

        // Các trường tùy chọn
        experience: formData.experience,

        // Mức lương: sử dụng khoảng lương từ salaryRange
        salary: `${formData.salaryRange[0]}-${formData.salaryRange[1]} triệu`,
        salaryMin: formData.salaryRange[0],
        salaryMax: formData.salaryRange[1],

        // Thêm thông tin tùy thuộc vào loại bài đăng
        industry:
          postType === "hiring"
            ? formData.industry || "Công nghệ thông tin"
            : undefined,
        companySize:
          postType === "hiring"
            ? formData.companySize || "Không xác định"
            : undefined,
        website: postType === "hiring" ? formData.website || "" : undefined,

        // Thêm các trường mặc định
        applicants: 0,
        views: 0,

        // Sắp xếp lại mảng requirements để đảm bảo tính nhất quán
        requirements: Array.isArray(formData.requirements)
          ? formData.requirements.filter(Boolean)
          : [],

        // Sắp xếp lại mảng benefits để đảm bảo tính nhất quán
        benefits: Array.isArray(formData.benefits)
          ? formData.benefits.filter(Boolean)
          : [],
      };

      // Nếu có CV file, thêm vào formData để gửi
      let formDataToSend;

      if (postType === "seeking" && cvFile) {
        // Sử dụng FormData khi có file cần gửi
        const formDataWithFile = new FormData();

        // Thêm tất cả dữ liệu job
        Object.keys(jobData).forEach((key) => {
          if (key === "requirements" || key === "benefits") {
            // Chuyển đổi mảng thành chuỗi JSON
            formDataWithFile.append(key, JSON.stringify(jobData[key]));
          } else if (jobData[key] !== undefined && jobData[key] !== null) {
            formDataWithFile.append(key, jobData[key]);
          }
        });

        // Thêm file CV
        formDataWithFile.append("cv", cvFile);
        formDataWithFile.append("cvFileName", cvFileName);

        formDataToSend = formDataWithFile;
      } else {
        formDataToSend = jobData;
      }

      // Gọi API tạo công việc với config phù hợp
      const response = await createJob(
        formDataToSend,
        postType === "seeking" && cvFile
      );

      if (response.success) {
        // Hiển thị thông báo thành công
        setSubmitSuccess(true);
        setSuccessMessage(
          "Đăng bài thành công! Bạn sẽ được chuyển hướng sau giây lát."
        );

        // Chuyển hướng sau khi đăng thành công
        setTimeout(() => {
          setSubmitSuccess(false);
          navigate("/dashboard"); // Redirect to dashboard after successful submit
        }, 3000);
      } else {
        // Hiển thị thông báo lỗi từ API
        setSubmitError(true);
        setSuccessMessage(response.message || "Đã xảy ra lỗi khi đăng bài");
        setTimeout(() => setSubmitError(false), 5000);
      }
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      // Hiển thị thông báo lỗi
      setSubmitError(true);
      setSuccessMessage(error.message || "Đã xảy ra lỗi khi đăng bài");
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
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
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                            color: "rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          <AttachMoneyOutlinedIcon
                            color="primary"
                            sx={{ mr: 1 }}
                          />
                          {postType === "hiring"
                            ? "Mức lương đề xuất (triệu đồng)"
                            : "Mức lương mong muốn (triệu đồng)"}
                        </Typography>

                        <Box sx={{ px: 2, pt: 1, pb: 2 }}>
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
                              { value: 20, label: "20" },
                              { value: 40, label: "40" },
                              { value: 60, label: "60" },
                              { value: 80, label: "80" },
                              { value: 100, label: "100+" },
                            ]}
                            sx={{
                              color: theme.palette.primary.main,
                              "& .MuiSlider-valueLabel": {
                                backgroundColor: theme.palette.primary.main,
                              },
                              "& .MuiSlider-markLabel": {
                                fontSize: "0.75rem",
                                color: "text.secondary",
                              },
                            }}
                          />
                        </Box>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="center"
                        >
                          Mức lương:{" "}
                          <strong>
                            {formData.salaryRange[0]} -{" "}
                            {formData.salaryRange[1]} triệu
                          </strong>
                        </Typography>
                      </Box>
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

                    {/* Phần upload CV - Chỉ hiển thị khi loại bài đăng là "seeking" (tìm việc) */}
                    {postType === "seeking" && (
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Upload CV
                        </Typography>

                        <Box
                          sx={{
                            border: "1px dashed",
                            borderColor: cvError
                              ? "error.main"
                              : "primary.main",
                            borderRadius: 2,
                            p: { xs: 2, md: 4 },
                            textAlign: "center",
                            backgroundColor: "rgba(25, 118, 210, 0.04)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: "rgba(25, 118, 210, 0.08)",
                              cursor: "pointer",
                              boxShadow: "0 0 8px rgba(25, 118, 210, 0.2)",
                            },
                            position: "relative",
                            mb: 2,
                            minHeight: "160px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          component="label"
                        >
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            style={{ display: "none" }}
                            onChange={handleCvUpload}
                          />

                          {cvFile ? (
                            <Box
                              sx={{
                                width: "100%",
                                maxWidth: "400px",
                                mx: "auto",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  mb: 2,
                                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                                  borderRadius: "50%",
                                  width: "60px",
                                  height: "60px",
                                  mx: "auto",
                                }}
                              >
                                <InsertDriveFileIcon
                                  color="primary"
                                  sx={{ fontSize: 36 }}
                                />
                              </Box>
                              <Typography
                                variant="subtitle1"
                                color="primary.main"
                                fontWeight="medium"
                                gutterBottom
                              >
                                {cvFileName}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                              >
                                Nhấp để thay đổi file CV
                              </Typography>
                              <IconButton
                                size="small"
                                color="error"
                                sx={{
                                  position: "absolute",
                                  top: 16,
                                  right: 16,
                                  backgroundColor: "rgba(255,255,255,0.8)",
                                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                  "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.95)",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveCv();
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                py: { xs: 1, md: 2 },
                                maxWidth: "400px",
                                mx: "auto",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  mb: 2,
                                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                                  borderRadius: "50%",
                                  width: "70px",
                                  height: "70px",
                                  mx: "auto",
                                  alignItems: "center",
                                }}
                              >
                                <CloudUploadIcon
                                  color="primary"
                                  sx={{ fontSize: 40 }}
                                />
                              </Box>
                              <Typography
                                variant="subtitle1"
                                color="primary.main"
                                fontWeight="medium"
                                gutterBottom
                              >
                                Tải lên CV của bạn
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                              >
                                Kéo thả file vào đây hoặc nhấp để chọn
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: 1,
                                  mt: 2,
                                  p: 1,
                                  borderRadius: 1,
                                  backgroundColor: "rgba(25, 118, 210, 0.04)",
                                }}
                              >
                                <AttachFileIcon
                                  color="action"
                                  sx={{ fontSize: 16 }}
                                />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Định dạng: PDF, DOC, DOCX (tối đa 5MB)
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </Box>

                        {cvError && (
                          <Typography
                            color="error"
                            variant="body2"
                            sx={{
                              mt: 1,
                              mb: 2,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <CloseIcon fontSize="small" />
                            {cvError}
                          </Typography>
                        )}

                        <Paper
                          elevation={0}
                          sx={{
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
                            Tải lên CV của bạn để nhà tuyển dụng có thể đánh giá
                            kỹ năng và kinh nghiệm của bạn chi tiết hơn. CV rõ
                            ràng, chuyên nghiệp sẽ tăng cơ hội được mời phỏng
                            vấn.
                          </Typography>
                        </Paper>
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

                    {postType === "hiring" && (
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          fontWeight={600}
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Quyền lợi
                        </Typography>
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
                            id="benefit-input"
                            value={benefitInput}
                            onChange={(e) => setBenefitInput(e.target.value)}
                            label="Thêm quyền lợi"
                            placeholder="Nhập quyền lợi và nhấn thêm"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addBenefit();
                              }
                            }}
                          />
                          <Button
                            variant="contained"
                            color="success"
                            onClick={addBenefit}
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
                              formData.benefits.length > 0
                                ? "flex-start"
                                : "center",
                            justifyContent:
                              formData.benefits.length > 0
                                ? "flex-start"
                                : "center",
                            backgroundColor: theme.palette.background.default,
                            transition: "all 0.3s ease",
                          }}
                        >
                          {formData.benefits.length > 0 ? (
                            formData.benefits.map((benefit, index) => (
                              <Chip
                                key={index}
                                label={benefit}
                                onDelete={() => removeBenefit(index)}
                                color="success"
                                variant="outlined"
                                sx={{
                                  m: 0.5,
                                  borderRadius: "8px",
                                  py: 0.5,
                                  px: 0.5,
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    backgroundColor: "rgba(76, 175, 80, 0.08)",
                                  },
                                }}
                              />
                            ))
                          ) : (
                            <Typography color="text.secondary" align="center">
                              Chưa có quyền lợi nào được thêm
                            </Typography>
                          )}
                        </Paper>

                        <Paper
                          elevation={0}
                          sx={{
                            mt: 2,
                            p: 2,
                            backgroundColor: "rgba(76, 175, 80, 0.05)",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          <HelpOutlineIcon
                            color="success"
                            sx={{ mr: 1, mt: 0.3 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            Thêm các quyền lợi mà ứng viên sẽ được hưởng khi làm
                            việc tại công ty của bạn. Điều này giúp thu hút ứng
                            viên tiềm năng.
                          </Typography>
                        </Paper>
                      </Grid>
                    )}

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
                          {successMessage}
                        </Alert>
                      </Grid>
                    )}

                    {submitError && (
                      <Grid item xs={12}>
                        <Alert
                          severity="error"
                          sx={{ mb: 2, borderRadius: 2, py: 1.5 }}
                        >
                          {successMessage}
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
                      disabled={isSubmitting}
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
                      {isSubmitting ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CircularProgress size={16} color="inherit" /> Đang xử
                          lý...
                        </Box>
                      ) : (
                        "Đăng bài ngay"
                      )}
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

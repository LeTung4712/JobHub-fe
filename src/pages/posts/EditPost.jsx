import React, { useState, useEffect } from "react";
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
  FormControlLabel,
  Switch,
  CircularProgress,
  Paper,
  IconButton,
  Tooltip,
  Fade,
  Stack,
  Slider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CategoryIcon from "@mui/icons-material/Category";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { getJob, updateJob, deleteJob, updateJobStatus } from "../../api/jobs";
import { useSnackbar } from "notistack";

function EditPost() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    salaryMin: 0,
    salaryMax: 100,
    category: "",
    type: "",
    experience: "",
    description: "",
    requirements: [],
    benefits: [],
    deadline: null,
    status: "active",
    postType: "hiring",
  });
  const [requirementInput, setRequirementInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Categories và types từ API
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

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setIsLoading(true);
        const response = await getJob(id);

        if (response.success && response.data) {
          const job = response.data;
          setFormData({
            title: job.title || "",
            location: job.location || "",
            salary: job.salary || "",
            salaryMin: job.salaryMin || 0,
            salaryMax: job.salaryMax || 100,
            category: job.category || "",
            type: job.type || "",
            experience: job.experience || "",
            description: job.description || "",
            requirements: job.requirements || [],
            benefits: job.benefits || [],
            deadline: job.deadline ? new Date(job.deadline) : null,
            status: job.status || "active",
            postType: job.postType || "hiring",
          });
        } else {
          throw new Error("Không thể lấy thông tin công việc");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu công việc:", error);
        enqueueSnackbar("Không thể tải thông tin công việc", {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchJobData();
    }
  }, [id, enqueueSnackbar]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.checked ? "active" : "paused";
    try {
      setFormData((prev) => ({
        ...prev,
        status: newStatus,
      }));
      await updateJobStatus(id, newStatus);
      enqueueSnackbar(
        `Đã ${newStatus === "active" ? "kích hoạt" : "tạm dừng"} công việc`,
        { variant: "success" }
      );
    } catch (error) {
      setFormData((prev) => ({
        ...prev,
        status: prev.status === "active" ? "paused" : "active",
      }));
      enqueueSnackbar("Không thể cập nhật trạng thái", { variant: "error" });
    }
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

  const handleSalaryRangeChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      salaryMin: newValue[0],
      salaryMax: newValue[1],
      salary: `${newValue[0]}-${newValue[1]} triệu`,
    }));
  };

  const valueLabelFormat = (value) => {
    return `${value} triệu`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.location ||
      !formData.category ||
      !formData.type ||
      !formData.description
    ) {
      setSubmitError(true);
      setErrorMessage("Vui lòng điền đầy đủ các trường bắt buộc");
      setTimeout(() => setSubmitError(false), 5000);
      return;
    }

    try {
      setSubmitLoading(true);
      const jobData = {
        ...formData,
        deadline: formData.deadline ? formData.deadline.toISOString() : null,
      };
      const response = await updateJob(id, jobData);
      if (response.success) {
        enqueueSnackbar("Cập nhật công việc thành công", {
          variant: "success",
        });
        setTimeout(() => navigate("/posts"), 1500);
      } else {
        throw new Error(response.message || "Cập nhật không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật công việc:", error);
      setSubmitError(true);
      setErrorMessage(error.message || "Đã xảy ra lỗi khi cập nhật công việc");
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      setSubmitLoading(true);
      await deleteJob(id);
      enqueueSnackbar("Xóa công việc thành công", { variant: "success" });
      navigate("/posts");
    } catch (error) {
      console.error("Lỗi khi xóa công việc:", error);
      enqueueSnackbar("Không thể xóa công việc", { variant: "error" });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Box
      sx={{
        py: 4,
        backgroundImage:
          "linear-gradient(to bottom, rgba(100, 108, 255, 0.05), rgba(100, 108, 255, 0.03))",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton
            onClick={() => navigate("/posts")}
            sx={{ mr: 2, backgroundColor: "white", boxShadow: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="primary.main"
          >
            Chỉnh sửa bài đăng
          </Typography>
        </Box>

        {isLoading ? (
          <Card
            elevation={4}
            sx={{ borderRadius: 3, p: 5, textAlign: "center" }}
          >
            <CircularProgress size={50} sx={{ mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Đang tải thông tin bài đăng...
            </Typography>
          </Card>
        ) : (
          <Box>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                mb: 4,
                overflow: "hidden",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  py: 2,
                  px: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" fontWeight={600} color="white">
                  Trạng thái bài đăng
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.status === "active"}
                      onChange={handleStatusChange}
                      color="default"
                    />
                  }
                  label={
                    <Typography variant="body2" color="white" fontWeight={600}>
                      {formData.status === "active"
                        ? "Đang hoạt động"
                        : "Tạm ngưng"}
                    </Typography>
                  }
                  sx={{ mr: 0 }}
                />
              </Box>
              <Box
                sx={{
                  px: 3,
                  py: 2,
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {formData.status === "active"
                    ? "Bài đăng của bạn đang hiển thị cho ứng viên. Chuyển sang chế độ tạm ngưng nếu bạn không còn tuyển dụng vị trí này."
                    : "Bài đăng của bạn hiện đang tạm ngưng và không hiển thị cho ứng viên. Kích hoạt lại khi bạn muốn tiếp tục tuyển dụng."}
                </Typography>
              </Box>
            </Card>

            <Card
              elevation={4}
              sx={{ borderRadius: 3, mb: 4, overflow: "hidden" }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  py: 2,
                  px: 3,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6" fontWeight={600} color="primary.main">
                  Thông tin tuyển dụng
                </Typography>
              </Box>
              <CardContent sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        required
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                      >
                        <InputLabel id="post-type-label">
                          Loại bài đăng
                        </InputLabel>
                        <Select
                          labelId="post-type-label"
                          id="postType"
                          name="postType"
                          value={formData.postType}
                          onChange={handleInputChange}
                          label="Loại bài đăng"
                          startAdornment={
                            <InputAdornment position="start">
                              <WorkOutlineIcon color="primary" />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="hiring">Tuyển người</MenuItem>
                          <MenuItem value="seeking">Tìm việc</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="title"
                        name="title"
                        label={
                          formData.postType === "hiring"
                            ? "Tiêu đề công việc"
                            : "Vị trí ứng tuyển"
                        }
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder={
                          formData.postType === "hiring"
                            ? "Ví dụ: Frontend Developer, Kế toán trưởng, ..."
                            : "Ví dụ: Tôi đang tìm việc làm Frontend Developer, ..."
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <WorkOutlineIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                      />
                    </Grid>

                    {formData.postType === "hiring" ? (
                      // Form cho bài tuyển người
                      <>
                        <Grid item xs={12} sm={6}>
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
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Box sx={{ px: 2 }}>
                            <Typography gutterBottom>
                              Mức lương (triệu VND)
                            </Typography>
                            <Slider
                              value={[formData.salaryMin, formData.salaryMax]}
                              onChange={handleSalaryRangeChange}
                              valueLabelDisplay="auto"
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
                                color: theme.palette.primary.main,
                                "& .MuiSlider-thumb": {
                                  width: 24,
                                  height: 24,
                                  backgroundColor: "white",
                                  border: "2px solid currentColor",
                                  "&:hover, &.Mui-focusVisible": {
                                    boxShadow:
                                      "0 0 0 8px rgba(100, 108, 255, 0.16)",
                                  },
                                },
                                "& .MuiSlider-track": {
                                  height: 4,
                                },
                                "& .MuiSlider-rail": {
                                  height: 4,
                                  opacity: 0.5,
                                },
                                "& .MuiSlider-mark": {
                                  width: 2,
                                  height: 2,
                                  backgroundColor: "currentColor",
                                },
                                "& .MuiSlider-markLabel": {
                                  fontSize: "0.75rem",
                                  color: "text.secondary",
                                },
                              }}
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1 }}
                            >
                              {formData.salaryMin === formData.salaryMax
                                ? `${formData.salaryMin} triệu VND`
                                : `${formData.salaryMin} - ${formData.salaryMax} triệu VND`}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl
                            fullWidth
                            required
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          >
                            <InputLabel id="category-label">
                              Lĩnh vực
                            </InputLabel>
                            <Select
                              labelId="category-label"
                              id="category"
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              label="Lĩnh vực"
                              startAdornment={
                                <InputAdornment position="start">
                                  <CategoryIcon color="primary" />
                                </InputAdornment>
                              }
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
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl
                            fullWidth
                            required
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          >
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
                              startAdornment={
                                <InputAdornment position="start">
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
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl
                            fullWidth
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          >
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
                              startAdornment={
                                <InputAdornment position="start">
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
                                    },
                                  },
                                },
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>
                      </>
                    ) : (
                      // Form cho bài tìm việc
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            id="location"
                            name="location"
                            label="Địa điểm mong muốn"
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
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Box sx={{ px: 2 }}>
                            <Typography gutterBottom>
                              Mức lương mong muốn (triệu VND)
                            </Typography>
                            <Slider
                              value={[formData.salaryMin, formData.salaryMax]}
                              onChange={handleSalaryRangeChange}
                              valueLabelDisplay="auto"
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
                                color: theme.palette.primary.main,
                                "& .MuiSlider-thumb": {
                                  width: 24,
                                  height: 24,
                                  backgroundColor: "white",
                                  border: "2px solid currentColor",
                                  "&:hover, &.Mui-focusVisible": {
                                    boxShadow:
                                      "0 0 0 8px rgba(100, 108, 255, 0.16)",
                                  },
                                },
                                "& .MuiSlider-track": {
                                  height: 4,
                                },
                                "& .MuiSlider-rail": {
                                  height: 4,
                                  opacity: 0.5,
                                },
                                "& .MuiSlider-mark": {
                                  width: 2,
                                  height: 2,
                                  backgroundColor: "currentColor",
                                },
                                "& .MuiSlider-markLabel": {
                                  fontSize: "0.75rem",
                                  color: "text.secondary",
                                },
                              }}
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1 }}
                            >
                              {formData.salaryMin === formData.salaryMax
                                ? `${formData.salaryMin} triệu VND`
                                : `${formData.salaryMin} - ${formData.salaryMax} triệu VND`}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl
                            fullWidth
                            required
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          >
                            <InputLabel id="category-label">
                              Lĩnh vực mong muốn
                            </InputLabel>
                            <Select
                              labelId="category-label"
                              id="category"
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              label="Lĩnh vực mong muốn"
                              startAdornment={
                                <InputAdornment position="start">
                                  <CategoryIcon color="primary" />
                                </InputAdornment>
                              }
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
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl
                            fullWidth
                            required
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          >
                            <InputLabel id="type-label">
                              Loại hình công việc mong muốn
                            </InputLabel>
                            <Select
                              labelId="type-label"
                              id="type"
                              name="type"
                              value={formData.type}
                              onChange={handleInputChange}
                              label="Loại hình công việc mong muốn"
                              startAdornment={
                                <InputAdornment position="start">
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
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl
                            fullWidth
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          >
                            <InputLabel id="experience-label">
                              Kinh nghiệm hiện tại
                            </InputLabel>
                            <Select
                              labelId="experience-label"
                              id="experience"
                              name="experience"
                              value={formData.experience}
                              onChange={handleInputChange}
                              label="Kinh nghiệm hiện tại"
                              startAdornment={
                                <InputAdornment position="start">
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
                      </>
                    )}
                  </Grid>
                </Box>
              </CardContent>
            </Card>

            <Grid container spacing={4}>
              {formData.postType === "hiring" ? (
                // Form cho bài tuyển người
                <>
                  <Grid item xs={12} md={6}>
                    <Card
                      elevation={4}
                      sx={{ borderRadius: 3, height: "100%" }}
                    >
                      <Box
                        sx={{
                          backgroundColor: theme.palette.background.paper,
                          py: 2,
                          px: 3,
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          color="primary.main"
                        >
                          Yêu cầu công việc
                        </Typography>
                      </Box>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                          <TextField
                            fullWidth
                            id="requirement-input"
                            value={requirementInput}
                            onChange={(e) =>
                              setRequirementInput(e.target.value)
                            }
                            label="Thêm yêu cầu"
                            placeholder="Nhập yêu cầu và nhấn thêm"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addRequirement();
                              }
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          />
                          <Button
                            variant="contained"
                            onClick={addRequirement}
                            sx={{ px: 2, borderRadius: 2 }}
                            startIcon={<AddCircleOutlineIcon />}
                          >
                            Thêm
                          </Button>
                        </Box>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {formData.requirements.length > 0 ? (
                            formData.requirements.map((req, index) => (
                              <Chip
                                key={index}
                                label={req}
                                onDelete={() => removeRequirement(index)}
                                color="primary"
                                sx={{
                                  m: 0.5,
                                  borderRadius: 2,
                                  "& .MuiChip-deleteIcon": {
                                    color: "rgba(255, 255, 255, 0.7)",
                                  },
                                }}
                              />
                            ))
                          ) : (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ py: 2, fontStyle: "italic" }}
                            >
                              Chưa có yêu cầu nào được thêm vào
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card
                      elevation={4}
                      sx={{ borderRadius: 3, height: "100%" }}
                    >
                      <Box
                        sx={{
                          backgroundColor: theme.palette.background.paper,
                          py: 2,
                          px: 3,
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          color="primary.main"
                        >
                          Quyền lợi
                        </Typography>
                      </Box>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
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
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          />
                          <Button
                            variant="contained"
                            onClick={addBenefit}
                            sx={{ px: 2, borderRadius: 2 }}
                            color="success"
                            startIcon={<AddCircleOutlineIcon />}
                          >
                            Thêm
                          </Button>
                        </Box>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {formData.benefits.length > 0 ? (
                            formData.benefits.map((benefit, index) => (
                              <Chip
                                key={index}
                                label={benefit}
                                onDelete={() => removeBenefit(index)}
                                color="success"
                                sx={{
                                  m: 0.5,
                                  borderRadius: 2,
                                  "& .MuiChip-deleteIcon": {
                                    color: "rgba(255, 255, 255, 0.7)",
                                  },
                                }}
                              />
                            ))
                          ) : (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ py: 2, fontStyle: "italic" }}
                            >
                              Chưa có quyền lợi nào được thêm vào
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              ) : (
                // Form cho bài tìm việc
                <>
                  <Grid item xs={12} md={6}>
                    <Card
                      elevation={4}
                      sx={{ borderRadius: 3, height: "100%" }}
                    >
                      <Box
                        sx={{
                          backgroundColor: theme.palette.background.paper,
                          py: 2,
                          px: 3,
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          color="primary.main"
                        >
                          Kỹ năng
                        </Typography>
                      </Box>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                          <TextField
                            fullWidth
                            id="requirement-input"
                            value={requirementInput}
                            onChange={(e) =>
                              setRequirementInput(e.target.value)
                            }
                            label="Thêm kỹ năng"
                            placeholder="Nhập kỹ năng và nhấn thêm"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addRequirement();
                              }
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          />
                          <Button
                            variant="contained"
                            onClick={addRequirement}
                            sx={{ px: 2, borderRadius: 2 }}
                            startIcon={<AddCircleOutlineIcon />}
                          >
                            Thêm
                          </Button>
                        </Box>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {formData.requirements.length > 0 ? (
                            formData.requirements.map((req, index) => (
                              <Chip
                                key={index}
                                label={req}
                                onDelete={() => removeRequirement(index)}
                                color="primary"
                                sx={{
                                  m: 0.5,
                                  borderRadius: 2,
                                  "& .MuiChip-deleteIcon": {
                                    color: "rgba(255, 255, 255, 0.7)",
                                  },
                                }}
                              />
                            ))
                          ) : (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ py: 2, fontStyle: "italic" }}
                            >
                              Chưa có kỹ năng nào được thêm vào
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card
                      elevation={4}
                      sx={{ borderRadius: 3, height: "100%" }}
                    >
                      <Box
                        sx={{
                          backgroundColor: theme.palette.background.paper,
                          py: 2,
                          px: 3,
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          color="primary.main"
                        >
                          Mong muốn
                        </Typography>
                      </Box>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                          <TextField
                            fullWidth
                            id="benefit-input"
                            value={benefitInput}
                            onChange={(e) => setBenefitInput(e.target.value)}
                            label="Thêm mong muốn"
                            placeholder="Nhập mong muốn và nhấn thêm"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addBenefit();
                              }
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          />
                          <Button
                            variant="contained"
                            onClick={addBenefit}
                            sx={{ px: 2, borderRadius: 2 }}
                            color="success"
                            startIcon={<AddCircleOutlineIcon />}
                          >
                            Thêm
                          </Button>
                        </Box>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {formData.benefits.length > 0 ? (
                            formData.benefits.map((benefit, index) => (
                              <Chip
                                key={index}
                                label={benefit}
                                onDelete={() => removeBenefit(index)}
                                color="success"
                                sx={{
                                  m: 0.5,
                                  borderRadius: 2,
                                  "& .MuiChip-deleteIcon": {
                                    color: "rgba(255, 255, 255, 0.7)",
                                  },
                                }}
                              />
                            ))
                          ) : (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ py: 2, fontStyle: "italic" }}
                            >
                              Chưa có mong muốn nào được thêm vào
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              )}
            </Grid>

            <Card
              elevation={4}
              sx={{ borderRadius: 3, mt: 4, overflow: "hidden" }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  py: 2,
                  px: 3,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6" fontWeight={600} color="primary.main">
                  {formData.postType === "hiring"
                    ? "Mô tả công việc"
                    : "Mô tả hồ sơ"}
                </Typography>
              </Box>
              <CardContent sx={{ p: 4 }}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  name="description"
                  multiline
                  rows={8}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={
                    formData.postType === "hiring"
                      ? "Mô tả chi tiết về công việc, trách nhiệm, quyền lợi, ..."
                      : "Mô tả chi tiết về bản thân, kinh nghiệm làm việc, mục tiêu nghề nghiệp, ..."
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ alignSelf: "flex-start", mt: 1.5, mr: 2 }}
                      >
                        <AssignmentIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      pl: 0.5,
                    },
                  }}
                />
              </CardContent>
            </Card>

            {submitError && (
              <Alert severity="error" sx={{ mt: 4, mb: 2, borderRadius: 2 }}>
                {errorMessage}
              </Alert>
            )}

            {deleteConfirm && (
              <Alert severity="warning" sx={{ mt: 4, mb: 2, borderRadius: 2 }}>
                Bạn có chắc chắn muốn xóa bài đăng này? Hành động này không thể
                hoàn tác.
              </Alert>
            )}

            <Paper
              elevation={3}
              sx={{
                position: "sticky",
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                mt: 4,
                borderRadius: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Tooltip
                title={
                  deleteConfirm
                    ? "Nhấn để xác nhận xóa"
                    : "Nhấn để xóa bài đăng"
                }
                arrow
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={handleDelete}
                  disabled={submitLoading}
                  sx={{
                    borderRadius: 2,
                    borderWidth: "2px",
                    "&:hover": { borderWidth: "2px" },
                  }}
                >
                  {deleteConfirm ? "Xác nhận xóa" : "Xóa bài đăng"}
                </Button>
              </Tooltip>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/posts")}
                  disabled={submitLoading}
                  sx={{ borderRadius: 2 }}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitLoading}
                  startIcon={
                    submitLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                  onClick={handleSubmit}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    boxShadow: 2,
                  }}
                >
                  {submitLoading ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
              </Stack>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default EditPost;

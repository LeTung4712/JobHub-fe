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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
    category: "",
    type: "",
    experience: "",
    description: "",
    requirements: [],
    benefits: [],
    deadline: null,
    status: "active",
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
            salaryMin: job.salaryMin || "",
            salaryMax: job.salaryMax || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.category || !formData.type || !formData.description) {
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
        enqueueSnackbar("Cập nhật công việc thành công", { variant: "success" });
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
        py: 6,
        backgroundImage: "linear-gradient(to bottom, rgba(100, 108, 255, 0.04), rgba(100, 108, 255, 0.02))",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
            Chỉnh sửa bài đăng
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Cập nhật thông tin bài đăng tuyển dụng của bạn
          </Typography>
        </Paper>

        {isLoading ? (
          <Card elevation={3} sx={{ borderRadius: 2, p: 4, textAlign: "center" }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Đang tải thông tin bài đăng...
            </Typography>
          </Card>
        ) : (
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 4 }}>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                      <Typography variant="h5" fontWeight={600}>
                        Thông tin tuyển dụng
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.status === "active"}
                            onChange={handleStatusChange}
                            color="success"
                          />
                        }
                        label={
                          <Typography
                            variant="body2"
                            color={formData.status === "active" ? "success.main" : "text.secondary"}
                            fontWeight={600}
                          >
                            {formData.status === "active" ? "Đang hoạt động" : "Tạm ngưng"}
                          </Typography>
                        }
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="title"
                      name="title"
                      label="Tiêu đề công việc"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Ví dụ: Frontend Developer, Kế toán trưởng, ..."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <WorkOutlineIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

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
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="salary"
                      name="salary"
                      label="Mức lương"
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
                    <FormControl fullWidth required>
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
                          <MenuItem key={category.value} value={category.value}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="type-label">Loại hình công việc</InputLabel>
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
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="experience-label">Kinh nghiệm</InputLabel>
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

                  <Grid item xs={12}>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                      Yêu cầu công việc
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                      <TextField
                        fullWidth
                        id="requirement-input"
                        value={requirementInput}
                        onChange={(e) => setRequirementInput(e.target.value)}
                        label="Thêm yêu cầu"
                        placeholder="Nhập yêu cầu và nhấn thêm"
                      />
                      <Button
                        variant="contained"
                        onClick={addRequirement}
                        sx={{ px: 3 }}
                      >
                        Thêm
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {formData.requirements.map((req, index) => (
                        <Chip
                          key={index}
                          label={req}
                          onDelete={() => removeRequirement(index)}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                      Quyền lợi
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                      <TextField
                        fullWidth
                        id="benefit-input"
                        value={benefitInput}
                        onChange={(e) => setBenefitInput(e.target.value)}
                        label="Thêm quyền lợi"
                        placeholder="Nhập quyền lợi và nhấn thêm"
                      />
                      <Button
                        variant="contained"
                        onClick={addBenefit}
                        sx={{ px: 3 }}
                      >
                        Thêm
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {formData.benefits.map((benefit, index) => (
                        <Chip
                          key={index}
                          label={benefit}
                          onDelete={() => removeBenefit(index)}
                          color="success"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="description"
                      name="description"
                      label="Mô tả công việc"
                      multiline
                      rows={6}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Mô tả chi tiết về công việc, trách nhiệm, quyền lợi, ..."
                    />
                  </Grid>

                  {submitError && (
                    <Grid item xs={12}>
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage}
                      </Alert>
                    </Grid>
                  )}

                  {deleteConfirm && (
                    <Grid item xs={12}>
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        Bạn có chắc chắn muốn xóa bài đăng này? Hành động này không thể hoàn tác.
                      </Alert>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteOutlineIcon />}
                        onClick={handleDelete}
                        disabled={submitLoading}
                      >
                        {deleteConfirm ? "Xác nhận xóa" : "Xóa bài đăng"}
                      </Button>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                          variant="outlined"
                          onClick={() => navigate("/posts")}
                          disabled={submitLoading}
                        >
                          Hủy
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={submitLoading}
                          startIcon={submitLoading ? <CircularProgress size={20} /> : null}
                        >
                          {submitLoading ? "Đang cập nhật..." : "Cập nhật"}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}

export default EditPost;

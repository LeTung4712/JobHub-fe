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

function EditPost() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
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
    isActive: true,
  });
  const [requirementInput, setRequirementInput] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  // Mock categories and types (same as in CreatePost)
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

  // Simulate fetching data for the specific post
  useEffect(() => {
    // In a real app, you would fetch the data from an API
    // For this example, we'll use mock data
    const mockJob = {
      id: id,
      title: "Frontend Developer",
      company: "Công ty ABC",
      location: "Hà Nội",
      salary: "15-25 triệu",
      category: "software",
      type: "full-time",
      experience: "mid",
      description:
        "Chúng tôi đang tìm kiếm một Frontend Developer có kinh nghiệm để tham gia vào đội ngũ phát triển sản phẩm của công ty. Bạn sẽ có cơ hội làm việc với các công nghệ mới nhất và phát triển các tính năng mới cho sản phẩm của chúng tôi.",
      requirements: [
        "Có ít nhất 3 năm kinh nghiệm với JavaScript/TypeScript",
        "Thành thạo React và Redux",
        "Có kinh nghiệm với CSS preprocessors (SASS/LESS)",
        "Hiểu biết về RESTful APIs và GraphQL",
      ],
      deadline: new Date(2023, 6, 30),
      isActive: true,
    };

    // Simulate API call delay
    setTimeout(() => {
      setFormData(mockJob);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      isActive: e.target.checked,
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
      !formData.company ||
      !formData.location ||
      !formData.category ||
      !formData.type ||
      !formData.description
    ) {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
      return;
    }

    // Submit form (would be an API call in a real app)
    console.log("Updating job post:", formData);

    // Show success message
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      navigate("/dashboard"); // Redirect to dashboard after successful submit
    }, 3000);
  };

  const handleDelete = () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    // Delete job post (would be an API call in a real app)
    console.log("Deleting job post:", id);

    // Redirect to dashboard
    navigate("/dashboard");
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
            Chỉnh sửa bài đăng
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
              fontSize: "1.1rem",
            }}
          >
            Cập nhật thông tin bài đăng tuyển dụng của bạn.
          </Typography>
        </Box>

        {isLoading ? (
          <Card
            elevation={3}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              background: "white",
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">Đang tải thông tin bài đăng...</Typography>
          </Card>
        ) : (
          <Card
            elevation={3}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              background: "white",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h5" fontWeight={600}>
                        Thông tin tuyển dụng
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.isActive}
                            onChange={handleStatusChange}
                            color="success"
                          />
                        }
                        label={
                          <Typography
                            variant="body2"
                            color={
                              formData.isActive
                                ? "success.main"
                                : "text.secondary"
                            }
                            fontWeight={600}
                          >
                            {formData.isActive ? "Đang hoạt động" : "Tạm ngưng"}
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
                      id="company"
                      name="company"
                      label="Tên công ty"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Tên công ty của bạn"
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
                    </FormControl>
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

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                      Yêu cầu công việc
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
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

                    <Box
                      sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}
                    >
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

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                  </Grid>

                  {submitSuccess && (
                    <Grid item xs={12}>
                      <Alert severity="success" sx={{ mb: 2 }}>
                        Cập nhật bài đăng thành công! Bạn sẽ được chuyển hướng
                        sau giây lát.
                      </Alert>
                    </Grid>
                  )}

                  {submitError && (
                    <Grid item xs={12}>
                      <Alert severity="error" sx={{ mb: 2 }}>
                        Vui lòng điền đầy đủ các trường bắt buộc.
                      </Alert>
                    </Grid>
                  )}

                  {deleteConfirm && (
                    <Grid item xs={12}>
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        Bạn có chắc chắn muốn xóa bài đăng này? Hành động này
                        không thể hoàn tác.
                      </Alert>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteOutlineIcon />}
                        onClick={handleDelete}
                      >
                        {deleteConfirm ? "Xác nhận xóa" : "Xóa bài đăng"}
                      </Button>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                          variant="outlined"
                          onClick={() => navigate("/dashboard")}
                        >
                          Hủy
                        </Button>
                        <Button type="submit" variant="contained">
                          Cập nhật
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

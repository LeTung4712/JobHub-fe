import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AttachMoney as SalaryIcon,
  AccessTime as TimeIcon,
  CheckCircle as CheckIcon,
  Description as DescriptionIcon,
  School as EducationIcon,
  LocalLibrary as SkillsIcon,
  EmojiPeople as PersonIcon,
  Send as SendIcon,
  Upload as UploadIcon,
  ArrowBack as ArrowBackIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "0-1",
    coverLetter: "",
    resume: null,
  });

  // Giả định dữ liệu chi tiết công việc - trong thực tế sẽ lấy từ API
  const jobDetail = {
    id: id || "1",
    title: "Frontend Developer",
    company: "Công ty ABC",
    location: "Hà Nội",
    category: "development",
    salary: "15-25 triệu",
    time: "Toàn thời gian",
    description:
      "Chúng tôi đang tìm kiếm một Frontend Developer có kinh nghiệm để tham gia đội ngũ phát triển sản phẩm của công ty. Bạn sẽ làm việc với các công nghệ hiện đại và đội ngũ nhiều kinh nghiệm để xây dựng các ứng dụng web có trải nghiệm người dùng tuyệt vời.",
    requirements: [
      "Có ít nhất 2 năm kinh nghiệm với React, Vue hoặc Angular",
      "Thành thạo HTML, CSS, JavaScript/TypeScript",
      "Hiểu biết về RESTful APIs và GraphQL",
      "Có kinh nghiệm làm việc với Git và các quy trình CI/CD",
      "Có khả năng làm việc độc lập và theo nhóm",
    ],
    benefits: [
      "Mức lương cạnh tranh và bonus theo hiệu suất",
      "Bảo hiểm sức khỏe cao cấp cho nhân viên và gia đình",
      "Đào tạo và phát triển chuyên môn liên tục",
      "Môi trường làm việc năng động, sáng tạo",
      "Chế độ nghỉ phép và nghỉ bệnh hợp lý",
    ],
    postedDate: "28/04/2023",
    deadline: "30/05/2023",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    if (activeStep === 1) {
      // Giả lập gửi form
      setTimeout(() => {
        setCompleted(true);
      }, 1500);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleNext();
  };

  const handleFinish = () => {
    navigate("/jobs");
  };

  const steps = ["Chi tiết công việc", "Thông tin ứng viên", "Hoàn thành"];

  // Validate form
  const isFormValid = () => {
    const { fullName, email, phone, coverLetter, resume } = formData;
    return (
      fullName.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      coverLetter.trim() !== "" &&
      resume !== null
    );
  };

  // Hiển thị nội dung dựa trên bước hiện tại
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 4 },
                mb: 4,
                borderRadius: 3,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Box>
                  <Typography variant="overline" color="primary">
                    {jobDetail.category === "development"
                      ? "Phát triển"
                      : jobDetail.category}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    color="text.primary"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {jobDetail.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <BusinessIcon
                        fontSize="small"
                        color="action"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2">
                        {jobDetail.company}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationIcon
                        fontSize="small"
                        color="action"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2">
                        {jobDetail.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <SalaryIcon
                        fontSize="small"
                        color="action"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2">
                        {jobDetail.salary}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TimeIcon
                        fontSize="small"
                        color="action"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2">{jobDetail.time}</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "flex-start", md: "flex-end" },
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  <Chip
                    label={`Đăng ngày: ${jobDetail.postedDate}`}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Chip
                    label={`Hạn chót: ${jobDetail.deadline}`}
                    color="primary"
                    size="small"
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  <DescriptionIcon sx={{ mr: 1 }} color="primary" />
                  Mô tả công việc
                </Typography>
                <Typography variant="body1" paragraph>
                  {jobDetail.description}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  <SkillsIcon sx={{ mr: 1 }} color="primary" />
                  Yêu cầu
                </Typography>
                <List disablePadding>
                  {jobDetail.requirements.map((req, index) => (
                    <ListItem
                      key={index}
                      sx={{ py: 0.5, px: 0 }}
                      disableGutters
                    >
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  <WorkIcon sx={{ mr: 1 }} color="primary" />
                  Quyền lợi
                </Typography>
                <List disablePadding>
                  {jobDetail.benefits.map((benefit, index) => (
                    <ListItem
                      key={index}
                      sx={{ py: 0.5, px: 0 }}
                      disableGutters
                    >
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={benefit} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleNext}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    boxShadow: 3,
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: 5,
                    },
                  }}
                >
                  Ứng tuyển ngay
                </Button>
              </Box>
            </Paper>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      Về công ty
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Công ty ABC là một trong những công ty hàng đầu trong lĩnh
                      vực công nghệ thông tin tại Việt Nam. Với hơn 10 năm kinh
                      nghiệm, chúng tôi đã xây dựng được danh tiếng vững chắc và
                      đội ngũ chuyên gia giỏi.
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Xem thêm về công ty
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      Việc làm tương tự
                    </Typography>
                    <List>
                      <ListItem disableGutters>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <WorkIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="React Developer"
                          secondary="Công ty DEF"
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <WorkIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="JavaScript Developer"
                          secondary="Công ty XYZ"
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <WorkIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Frontend Team Lead"
                          secondary="Công ty MNO"
                        />
                      </ListItem>
                    </List>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Xem thêm
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              background: "white",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <Box sx={{ maxWidth: "800px", mx: "auto" }}>
              <Box sx={{ mb: 4, textAlign: "center" }}>
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: theme.palette.primary.dark }}
                >
                  Thông tin ứng tuyển
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Vui lòng điền thông tin ứng tuyển cho vị trí{" "}
                  <b>{jobDetail.title}</b> tại <b>{jobDetail.company}</b>
                </Typography>
              </Box>

              <Alert
                severity="info"
                sx={{
                  mb: 4,
                  borderRadius: 2,
                  alignItems: "center",
                  "& .MuiAlert-icon": {
                    fontSize: "2rem",
                    mr: 2,
                  },
                }}
              >
                <Typography variant="subtitle1" fontWeight="medium">
                  Hãy hoàn thành tất cả các trường thông tin bên dưới để tiếp
                  tục
                </Typography>
                <Typography variant="body2">
                  Thông tin của bạn sẽ chỉ được sử dụng cho mục đích tuyển dụng
                  và sẽ được bảo mật
                </Typography>
              </Alert>

              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      pb: 1,
                      mb: 2,
                    }}
                  >
                    <PersonIcon sx={{ mr: 1 }} color="primary" />
                    Thông tin cá nhân
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Họ và tên"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        placeholder="Nhập họ và tên đầy đủ của bạn"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        placeholder="email@example.com"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        placeholder="0xx xxx xxxx"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <Typography variant="subtitle2" gutterBottom>
                          Số năm kinh nghiệm
                        </Typography>
                        <RadioGroup
                          row
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="0-1"
                            control={<Radio color="primary" />}
                            label="0-1 năm"
                          />
                          <FormControlLabel
                            value="1-3"
                            control={<Radio color="primary" />}
                            label="1-3 năm"
                          />
                          <FormControlLabel
                            value="3-5"
                            control={<Radio color="primary" />}
                            label="3-5 năm"
                          />
                          <FormControlLabel
                            value="5+"
                            control={<Radio color="primary" />}
                            label="Trên 5 năm"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      pb: 1,
                      mb: 2,
                    }}
                  >
                    <DescriptionIcon sx={{ mr: 1 }} color="primary" />
                    Thư giới thiệu
                  </Typography>

                  <TextField
                    fullWidth
                    label="Thư giới thiệu (Cover Letter)"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    required
                    multiline
                    rows={5}
                    variant="outlined"
                    placeholder="Giới thiệu về bản thân, kỹ năng và lý do bạn muốn ứng tuyển vị trí này..."
                    InputProps={{
                      sx: { borderRadius: 2 },
                    }}
                    helperText="Viết ngắn gọn nhưng đầy đủ thông tin về kỹ năng và kinh nghiệm của bạn"
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      pb: 1,
                      mb: 2,
                    }}
                  >
                    <UploadIcon sx={{ mr: 1 }} color="primary" />
                    Hồ sơ CV
                  </Typography>

                  <Box
                    sx={{
                      border: "2px dashed",
                      borderColor: theme.palette.primary.light,
                      borderRadius: 2,
                      p: 3,
                      textAlign: "center",
                      backgroundColor: "rgba(100, 108, 255, 0.04)",
                      transition: "all 0.3s",
                      "&:hover": {
                        backgroundColor: "rgba(100, 108, 255, 0.08)",
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <input
                      accept=".pdf,.doc,.docx"
                      id="resume-upload"
                      type="file"
                      hidden
                      onChange={handleFileChange}
                    />
                    <label htmlFor="resume-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<UploadIcon />}
                        size="large"
                        sx={{
                          mb: 2,
                          px: 3,
                          py: 1,
                          borderRadius: 2,
                          fontWeight: "bold",
                        }}
                      >
                        Tải lên CV của bạn
                      </Button>
                    </label>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {formData.resume
                        ? `Đã chọn: ${formData.resume.name}`
                        : "Định dạng hỗ trợ: PDF, DOC, DOCX (tối đa 5MB)"}
                    </Typography>
                    {formData.resume && (
                      <Chip
                        label={formData.resume.name}
                        color="primary"
                        variant="outlined"
                        onDelete={() =>
                          setFormData({ ...formData, resume: null })
                        }
                      />
                    )}
                  </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

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
                    sx={{
                      borderRadius: 2,
                      px: 3,
                    }}
                  >
                    Quay lại
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={<SendIcon />}
                    disabled={!isFormValid()}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1,
                      fontWeight: "bold",
                    }}
                  >
                    Gửi hồ sơ ứng tuyển
                  </Button>
                </Box>
              </form>
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    color: theme.palette.primary.main,
                  }}
                >
                  <SendIcon sx={{ mr: 1 }} color="primary" />
                  Xác nhận gửi hồ sơ
                </Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Typography variant="body1" paragraph>
                    Bạn đang ứng tuyển vị trí <b>{jobDetail.title}</b> tại{" "}
                    <b>{jobDetail.company}</b>.
                  </Typography>
                  <Typography variant="body1">
                    Bạn có chắc chắn muốn gửi hồ sơ ứng tuyển?
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ p: 2, pt: 0 }}>
                <Button
                  onClick={() => setOpenDialog(false)}
                  color="inherit"
                  sx={{ borderRadius: 2 }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleCloseDialog}
                  color="primary"
                  variant="contained"
                  autoFocus
                  sx={{ borderRadius: 2, fontWeight: "bold" }}
                >
                  Xác nhận gửi
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        );
      case 2:
        return (
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              textAlign: "center",
            }}
          >
            <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
              {!completed ? (
                <CircularProgress size={60} />
              ) : (
                <CheckIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
              )}
            </Box>
            {completed ? (
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Ứng tuyển thành công!
                </Typography>
                <Typography variant="body1" paragraph>
                  Hồ sơ ứng tuyển của bạn đã được gửi thành công tới{" "}
                  {jobDetail.company} cho vị trí {jobDetail.title}.
                </Typography>
                <Typography variant="body1" paragraph>
                  Nhà tuyển dụng sẽ xem xét hồ sơ của bạn và liên hệ trong thời
                  gian sớm nhất.
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFinish}
                    sx={{ mx: 1 }}
                  >
                    Xem việc làm khác
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Đang xử lý...
                </Typography>
                <Typography variant="body1">
                  Vui lòng đợi trong giây lát, hệ thống đang xử lý hồ sơ của
                  bạn.
                </Typography>
              </Box>
            )}
          </Paper>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box
      sx={{
        py: 4,
        backgroundImage:
          "linear-gradient(to bottom, rgba(100, 108, 255, 0.05), rgba(100, 108, 255, 0.02))",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/jobs")}
            sx={{ mb: 2 }}
          >
            Quay lại danh sách việc làm
          </Button>

          <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep)}
        </Box>
      </Container>
    </Box>
  );
};

export default JobDetail;

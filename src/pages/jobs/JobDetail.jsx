import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Grid,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  ListItemAvatar,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
  Business as BusinessIcon,
  LocationOn as LocationOnIcon,
  AttachMoney as AttachMoneyIcon,
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  ChatBubbleOutline as ChatIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  People as PeopleIcon,
  Public as PublicIcon,
  AttachFile as AttachFileIcon,
  InsertEmoticon as EmojiIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const JobDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();

  // State để theo dõi bước trong form liên hệ
  const [activeStep, setActiveStep] = useState(0);

  // State cho dialog liên hệ và thông báo
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  // State lưu tin tuyển dụng
  const [isSaved, setIsSaved] = useState(false);

  // State cho tin nhắn
  const [messageData, setMessageData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Lịch sử tin nhắn
  const [messageHistory, setMessageHistory] = useState([]);

  // Dữ liệu chi tiết việc làm (mẫu)
  const jobDetail = {
    id: id,
    title: "Senior Frontend Developer",
    company: "Tech Solutions Vietnam",
    location: "Hồ Chí Minh",
    salary: "1500$ - 2500$",
    time: "Toàn thời gian",
    postedDate: "15/07/2023",
    deadline: "15/08/2023",
    description:
      "Chúng tôi đang tìm kiếm một Frontend Developer có kinh nghiệm để tham gia vào đội ngũ phát triển sản phẩm mới của công ty. Bạn sẽ làm việc với các công nghệ hiện đại như React, Redux và Material-UI để xây dựng giao diện người dùng hấp dẫn và trải nghiệm người dùng tuyệt vời.",
    requirements: [
      "Tối thiểu 3 năm kinh nghiệm với Frontend development",
      "Thành thạo JavaScript, HTML5, CSS3",
      "Kinh nghiệm sâu với React và các framework frontend hiện đại",
      "Hiểu biết tốt về state management (Redux, Context API)",
      "Kinh nghiệm làm việc với RESTful APIs và GraphQL",
      "Có kiến thức về UI/UX design và responsive web design",
      "Có khả năng làm việc độc lập và trong môi trường nhóm",
    ],
    benefits: [
      "Mức lương cạnh tranh và xét duyệt định kỳ",
      "Bảo hiểm sức khỏe toàn diện",
      "Lịch làm việc linh hoạt và cơ hội làm việc từ xa",
      "Môi trường làm việc năng động và sáng tạo",
      "Cơ hội đào tạo và phát triển kỹ năng chuyên môn",
      "Đóng góp vào các dự án có tác động lớn",
      "Team building và các hoạt động công ty hàng quý",
    ],
    companyLogo: "https://randomuser.me/api/portraits/men/1.jpg",
    industry: "Công nghệ thông tin",
    companySize: "50-100",
    website: "https://techsolutions.vn",
    companyDescription:
      "Tech Solutions Vietnam là công ty công nghệ hàng đầu chuyên về các giải pháp phần mềm và dịch vụ IT. Chúng tôi cung cấp môi trường làm việc năng động, sáng tạo và nhiều cơ hội phát triển cho nhân viên.",
    recruiterName: "Nguyễn Văn A",
    recruiterPosition: "HR Manager",
    recruiterAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    recruiterPhone: "0901234567",
    recruiterEmail: "hr@techsolutions.vn",
  };

  // Danh sách việc làm tương tự (mẫu)
  const similarJobs = [
    {
      id: "job-1",
      title: "Frontend Developer",
      company: "Global Tech",
      location: "Hà Nội",
      companyLogo: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "job-2",
      title: "React Developer",
      company: "Fintech Solutions",
      location: "Hồ Chí Minh",
      companyLogo: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "job-3",
      title: "UI/UX Designer",
      company: "Creative Studio",
      location: "Đà Nẵng",
      companyLogo: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  ];

  // Các bước trong tiến trình ứng tuyển
  const steps = ["Thông tin chi tiết"];

  // Hàm xử lý mở/đóng dialog liên hệ
  const handleOpenContactDialog = () => {
    setOpenContactDialog(true);
  };

  const handleCloseContactDialog = () => {
    setOpenContactDialog(false);
  };

  // Hàm xử lý đóng thông báo
  const handleCloseAlert = () => {
    setOpenSuccessAlert(false);
  };

  // Hàm xử lý lưu việc làm
  const handleToggleSave = () => {
    setIsSaved(!isSaved);
  };

  // Hàm xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm xử lý gửi tin nhắn
  const handleSubmitMessage = (e) => {
    e.preventDefault();

    // Thêm tin nhắn mới vào lịch sử
    const newMessage = {
      id: Date.now(),
      content: messageData.message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isUser: true,
    };

    setMessageHistory((prev) => [...prev, newMessage]);

    // Giả lập phản hồi từ nhà tuyển dụng
    setTimeout(() => {
      const recruiterReply = {
        id: Date.now() + 1,
        content:
          "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isUser: false,
      };
      setMessageHistory((prev) => [...prev, recruiterReply]);
    }, 1000);

    // Reset form và hiển thị thông báo thành công
    setMessageData((prev) => ({
      ...prev,
      message: "",
    }));

    setOpenContactDialog(false);
    setOpenSuccessAlert(true);
  };

  // Hiển thị nội dung dựa trên bước hiện tại
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Grid container spacing={4}>
              {/* Thông tin chi tiết việc làm */}
              <Grid item xs={12} md={8}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    mb: 3,
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      gutterBottom={true}
                      sx={{ mb: { xs: 2, sm: 0 } }}
                    >
                      {jobDetail.title}
                    </Typography>

                    <Box>
                      <Tooltip title={isSaved ? "Đã lưu" : "Lưu việc làm"}>
                        <IconButton
                          onClick={handleToggleSave}
                          color={isSaved ? "primary" : "default"}
                        >
                          {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: { xs: 1, sm: 2 },
                      mb: 3,
                      justifyContent: { xs: "center", sm: "flex-start" },
                    }}
                  >
                    <Chip
                      icon={<BusinessIcon fontSize="small" />}
                      label={jobDetail.company}
                      variant="outlined"
                      size="medium"
                      clickable
                    />
                    <Chip
                      icon={<LocationOnIcon fontSize="small" />}
                      label={jobDetail.location}
                      variant="outlined"
                      size="medium"
                    />
                    <Chip
                      icon={<AttachMoneyIcon fontSize="small" />}
                      label={jobDetail.salary}
                      variant="outlined"
                      size="medium"
                    />
                    <Chip
                      icon={<WorkIcon fontSize="small" />}
                      label={jobDetail.time}
                      variant="outlined"
                      size="medium"
                    />
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Mô tả công việc
                  </Typography>
                  <Typography paragraph sx={{ lineHeight: 1.8 }}>
                    {jobDetail.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Yêu cầu
                  </Typography>
                  <List sx={{ pl: 2 }}>
                    {jobDetail.requirements.map((req, index) => (
                      <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircleIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={req} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Quyền lợi
                  </Typography>
                  <List sx={{ pl: 2 }}>
                    {jobDetail.benefits.map((benefit, index) => (
                      <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <StarIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                {/* Thông tin công ty */}
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    mb: 3,
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Về công ty
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      flexDirection: { xs: "column", sm: "row" },
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Avatar
                      src={jobDetail.companyLogo || jobDetail.recruiterAvatar}
                      alt={jobDetail.company}
                      sx={{
                        width: { xs: 80, sm: 70 },
                        height: { xs: 80, sm: 70 },
                        mr: { xs: 0, sm: 2 },
                        mb: { xs: 2, sm: 0 },
                      }}
                    />
                    <Box>
                      <Typography variant="h6">{jobDetail.company}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {jobDetail.industry}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    {jobDetail.companyDescription}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      justifyContent: { xs: "center", sm: "flex-start" },
                    }}
                  >
                    <Chip
                      icon={<PeopleIcon />}
                      label={`${jobDetail.companySize} nhân viên`}
                      variant="outlined"
                    />
                    <Chip
                      icon={<PublicIcon />}
                      label={jobDetail.website}
                      variant="outlined"
                      component="a"
                      href={
                        jobDetail.website.startsWith("http")
                          ? jobDetail.website
                          : `https://${jobDetail.website}`
                      }
                      target="_blank"
                      clickable
                    />
                  </Box>
                </Paper>
              </Grid>

              {/* Sidebar - Thông tin nhà tuyển dụng và các hành động */}
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    mb: 3,
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    position: { xs: "static", md: "sticky" },
                    top: 20,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Liên hệ nhà tuyển dụng
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                      flexDirection: { xs: "column", sm: "row" },
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Avatar
                      src={jobDetail.recruiterAvatar}
                      alt={jobDetail.recruiterName}
                      sx={{
                        width: { xs: 80, sm: 60 },
                        height: { xs: 80, sm: 60 },
                        mr: { xs: 0, sm: 2 },
                        mb: { xs: 2, sm: 0 },
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {jobDetail.recruiterName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {jobDetail.recruiterPosition}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "row", sm: "column" },
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                      gap: 2,
                      justifyContent: { xs: "space-between", sm: "flex-start" },
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      startIcon={<ChatIcon />}
                      onClick={handleOpenContactDialog}
                      size="large"
                      sx={{
                        flex: { xs: "1 1 100%", sm: "1 1 auto" },
                        order: { xs: 1, sm: 1 },
                        mb: { xs: 1, sm: 2 },
                      }}
                    >
                      Gửi tin nhắn
                    </Button>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: { xs: "row", sm: "column" },
                        width: "100%",
                      }}
                    >
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<PhoneIcon />}
                        href={`tel:${jobDetail.recruiterPhone}`}
                        size="large"
                        sx={{
                          flex: "1 1 50%",
                          order: { xs: 2, sm: 2 },
                          mb: { xs: 0, sm: 2 },
                        }}
                      >
                        Gọi điện
                      </Button>

                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<EmailIcon />}
                        href={`mailto:${jobDetail.recruiterEmail}`}
                        size="large"
                        sx={{ flex: "1 1 50%", order: { xs: 3, sm: 3 } }}
                      >
                        Gửi email
                      </Button>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Ngày đăng
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        align="right"
                      >
                        {jobDetail.postedDate}
                      </Typography>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Hạn nộp hồ sơ
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        align="right"
                      >
                        {jobDetail.deadline}
                      </Typography>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Loại hình
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        align="right"
                      >
                        {jobDetail.time}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Việc làm tương tự */}
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Việc làm tương tự
                  </Typography>

                  <List
                    disablePadding
                    sx={{
                      display: { xs: "flex", md: "block" },
                      flexDirection: { xs: "row", sm: "row", md: "column" },
                      flexWrap: "nowrap",
                      overflowX: { xs: "auto", md: "visible" },
                      pb: { xs: 1, md: 0 },
                      mx: { xs: -1, md: 0 },
                      "&::-webkit-scrollbar": {
                        height: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderRadius: "4px",
                      },
                    }}
                  >
                    {similarJobs.map((job, index) => (
                      <React.Fragment key={job.id}>
                        <ListItem
                          button
                          disableGutters
                          onClick={() => navigate(`/jobs/${job.id}`)}
                          sx={{
                            px: { xs: 1, md: 0 },
                            minWidth: { xs: "200px", sm: "250px", md: "100%" },
                            flexShrink: 0,
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar src={job.companyLogo} alt={job.company} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={job.title}
                            primaryTypographyProps={{
                              noWrap: { xs: true, md: false },
                              variant: "body2",
                              fontWeight: "medium",
                            }}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  variant="body2"
                                  component="span"
                                  noWrap
                                  sx={{ display: "block" }}
                                >
                                  {job.company}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mt: 0.5,
                                  }}
                                >
                                  <LocationOnIcon
                                    fontSize="small"
                                    sx={{ mr: 0.5, fontSize: 16 }}
                                  />
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    noWrap
                                  >
                                    {job.location}
                                  </Typography>
                                </Box>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        {index < similarJobs.length - 1 && (
                          <Divider
                            component="li"
                            sx={{ display: { xs: "none", md: "block" } }}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      // Xóa các case còn lại vì không cần form ứng tuyển nữa
      default:
        return <Typography>Không tìm thấy nội dung</Typography>;
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 2, sm: 4 },
        backgroundImage:
          "linear-gradient(to bottom, rgba(100, 108, 255, 0.05), rgba(100, 108, 255, 0.02))",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 2, sm: 4 } }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/jobs")}
            sx={{ mb: 2 }}
          >
            Quay lại danh sách việc làm
          </Button>

          <Stepper
            activeStep={activeStep}
            sx={{
              mb: { xs: 3, sm: 5 },
              display: { xs: "none", sm: "flex" },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep)}
        </Box>
      </Container>

      {/* Dialog liên hệ với nhà tuyển dụng */}
      <Dialog
        open={openContactDialog}
        onClose={handleCloseContactDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 2 },
            m: { xs: 0, sm: 2 },
            height: { xs: "100%", sm: "auto" },
            maxHeight: { xs: "100%", sm: "80vh" },
            width: { xs: "100%", sm: "auto" },
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Liên hệ với nhà tuyển dụng
            </Typography>
            <IconButton edge="end" onClick={handleCloseContactDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              flexDirection: { xs: "column", sm: "row" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Avatar
              src={jobDetail.recruiterAvatar}
              alt={jobDetail.recruiterName}
              sx={{
                width: { xs: 70, sm: 50 },
                height: { xs: 70, sm: 50 },
                mr: { xs: 0, sm: 2 },
                mb: { xs: 2, sm: 0 },
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {jobDetail.recruiterName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {jobDetail.recruiterPosition}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmitMessage}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  name="fullName"
                  value={messageData.fullName}
                  onChange={handleChange}
                  required
                  margin="normal"
                  placeholder="Nhập họ tên của bạn"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={messageData.email}
                  onChange={handleChange}
                  required
                  margin="normal"
                  placeholder="Email liên hệ của bạn"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  value={messageData.phone}
                  onChange={handleChange}
                  required
                  margin="normal"
                  placeholder="Số điện thoại của bạn"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nội dung tin nhắn"
                  name="message"
                  value={messageData.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                  margin="normal"
                  placeholder="Nhập nội dung tin nhắn bạn muốn gửi đến nhà tuyển dụng..."
                  size="small"
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: { xs: "space-between", sm: "flex-end" },
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1, sm: 0 },
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCloseContactDialog}
                sx={{
                  mr: { xs: 0, sm: 2 },
                  order: { xs: 2, sm: 1 },
                }}
                fullWidth={false}
                size="large"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                sx={{ order: { xs: 1, sm: 2 } }}
                size="large"
              >
                Gửi tin nhắn
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      {/* Thông báo gửi tin nhắn thành công */}
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Tin nhắn của bạn đã được gửi thành công đến nhà tuyển dụng!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default JobDetail;

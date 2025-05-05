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
  CircularProgress,
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
  Check as CheckIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { getJob } from "../../api/jobs";

// Kiểm tra đăng nhập
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const JobDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  // Lấy ID từ URL
  const id = params.id; // id sẽ được tự động giải nén từ URL do cấu hình route
  const theme = useTheme();

  // State để theo dõi bước trong form liên hệ
  const [activeStep, setActiveStep] = useState(0);

  // State cho dialog liên hệ và thông báo
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // State lưu tin tuyển dụng
  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // State cho tin nhắn
  const [messageData, setMessageData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Lịch sử tin nhắn
  const [messageHistory, setMessageHistory] = useState([]);

  // State cho dữ liệu công việc
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  // Kiểm tra công việc đã lưu
  useEffect(() => {
    const checkSavedJob = async () => {
      // Kiểm tra xem công việc đã được lưu chưa
      if (isAuthenticated()) {
        // TODO: Thêm API kiểm tra công việc đã lưu
        // Giả lập
        const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
        if (savedJobs.includes(id)) {
          setIsSaved(true);
        }
      }
    };

    checkSavedJob();
  }, [id]);

  // Lấy thông tin chi tiết công việc từ API
  useEffect(() => {
    const fetchJobDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getJob(id);
        if (response.success) {
          // Xử lý dữ liệu từ API
          const job = response.data;
          const processedJob = {
            ...job,
            // Đảm bảo các trường cần thiết cho UI
            id: job._id || job.id,
            title: job.title || "Không có tiêu đề",
            company: job.author?.company || job.company || "Không xác định",
            location: job.location || "Không xác định",
            salary:
              job.salary ||
              `${job.salaryMin || 0} - ${job.salaryMax || 0} triệu`,
            time: job.workingTime || job.time || "Toàn thời gian",
            description: job.description || "Không có mô tả",
            // Đảm bảo các mảng dữ liệu đều có giá trị để tránh lỗi map
            requirements: job.requirements || [],
            benefits: job.benefits || [],
            // Thông tin công ty và nhà tuyển dụng
            industry: job.industry || "Công nghệ thông tin",
            companySize: job.companySize || "Không xác định",
            website: job.website || "#",
            companyDescription: job.companyDescription || "Không có thông tin",
            // Thông tin liên hệ
            recruiterName: job.author?.fullName || "Nhà tuyển dụng",
            recruiterPosition: job.author?.currentPosition || "HR Manager",
            recruiterAvatar:
              job.author?.avatar ||
              "https://randomuser.me/api/portraits/men/32.jpg",
            recruiterPhone: job.author?.phone || "Không có thông tin",
            recruiterEmail: job.author?.email || "Không có thông tin",
            // Thời gian
            createdAt: job.createdAt,
            deadline: job.deadline,
          };
          setJobDetail(processedJob);

          // Kiểm tra xem người dùng đã ứng tuyển hay chưa
          if (
            job.applications &&
            job.applications.some(
              (app) =>
                app.applicant &&
                app.applicant._id === localStorage.getItem("userId")
            )
          ) {
            setApplied(true);
          }
        } else {
          setError(response.message || "Không thể tải thông tin công việc");
        }
      } catch (err) {
        console.error("Lỗi khi tải thông tin công việc:", err);
        setError("Đã xảy ra lỗi khi tải thông tin công việc");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  // Dữ liệu chi tiết việc làm mẫu (sử dụng khi API chưa hoàn thiện)
  const sampleJobDetail = {
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

  // Sử dụng dữ liệu mẫu nếu không có dữ liệu từ API
  const displayedJobDetail = jobDetail || sampleJobDetail;

  // Các bước trong tiến trình ứng tuyển
  const steps = ["Thông tin chi tiết"];

  // Hàm xử lý mở/đóng dialog liên hệ
  const handleOpenContactDialog = () => {
    setOpenContactDialog(true);
  };

  const handleCloseContactDialog = () => {
    setOpenContactDialog(false);
  };

  // Hàm xử lý thành công
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setOpenSuccessAlert(true);
  };

  // Hàm xử lý lưu việc làm
  const handleToggleSave = async () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    try {
      setSaveLoading(true);

      // TODO: Thêm API lưu/hủy lưu công việc
      // Giả lập
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Lưu vào localStorage tạm thời
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");

      if (isSaved) {
        // Xóa khỏi danh sách đã lưu
        const newSavedJobs = savedJobs.filter((jobId) => jobId !== id);
        localStorage.setItem("savedJobs", JSON.stringify(newSavedJobs));
        setIsSaved(false);
        showSuccessMessage("Đã xóa khỏi danh sách lưu");
      } else {
        // Thêm vào danh sách đã lưu
        savedJobs.push(id);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
        setIsSaved(true);
        showSuccessMessage("Đã lưu công việc vào danh sách");
      }
    } catch (err) {
      console.error("Lỗi khi lưu/hủy lưu công việc:", err);
    } finally {
      setSaveLoading(false);
    }
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
    showSuccessMessage(
      "Tin nhắn của bạn đã được gửi thành công đến nhà tuyển dụng!"
    );
  };

  // Hàm xử lý ứng tuyển
  const handleApply = async () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    if (applied) {
      showSuccessMessage("Bạn đã ứng tuyển vị trí này trước đó!");
      return;
    }

    try {
      setApplyLoading(true);
      // TODO: Thêm API ứng tuyển ở đây
      // const response = await applyForJob(id);

      // Giả lập thành công
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Ghi nhận ứng tuyển thành công
      setApplied(true);

      // Hiển thị thông báo thành công
      showSuccessMessage(
        "Ứng tuyển thành công! Nhà tuyển dụng sẽ sớm liên hệ với bạn."
      );
    } catch (err) {
      console.error("Lỗi khi ứng tuyển:", err);
      showSuccessMessage("Đã xảy ra lỗi khi ứng tuyển. Vui lòng thử lại sau.");
    } finally {
      setApplyLoading(false);
    }
  };

  // Hàm xử lý đóng thông báo
  const handleCloseAlert = () => {
    setOpenSuccessAlert(false);
  };

  // Hiển thị giao diện loading
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Hiển thị thông báo lỗi
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => navigate("/jobs")}
        >
          Quay lại danh sách công việc
        </Button>
      </Container>
    );
  }

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
                      {displayedJobDetail.title}
                    </Typography>

                    <Box>
                      <Tooltip title={isSaved ? "Đã lưu" : "Lưu việc làm"}>
                        <IconButton
                          onClick={handleToggleSave}
                          color={isSaved ? "primary" : "default"}
                          disabled={saveLoading}
                        >
                          {saveLoading ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : isSaved ? (
                            <BookmarkIcon />
                          ) : (
                            <BookmarkBorderIcon />
                          )}
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
                      label={displayedJobDetail.company}
                      variant="outlined"
                      size="medium"
                      clickable
                    />
                    <Chip
                      icon={<LocationOnIcon fontSize="small" />}
                      label={displayedJobDetail.location}
                      variant="outlined"
                      size="medium"
                    />
                    <Chip
                      icon={<AttachMoneyIcon fontSize="small" />}
                      label={displayedJobDetail.salary}
                      variant="outlined"
                      size="medium"
                    />
                    <Chip
                      icon={<WorkIcon fontSize="small" />}
                      label={displayedJobDetail.time}
                      variant="outlined"
                      size="medium"
                    />
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Mô tả công việc
                  </Typography>
                  <Typography paragraph sx={{ lineHeight: 1.8 }}>
                    {displayedJobDetail.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Yêu cầu
                  </Typography>
                  <List sx={{ pl: 2 }}>
                    {displayedJobDetail.requirements.map((req, index) => (
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
                    {displayedJobDetail.benefits.map((benefit, index) => (
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
                      src={
                        displayedJobDetail.companyLogo ||
                        displayedJobDetail.recruiterAvatar
                      }
                      alt={displayedJobDetail.company}
                      sx={{
                        width: { xs: 80, sm: 70 },
                        height: { xs: 80, sm: 70 },
                        mr: { xs: 0, sm: 2 },
                        mb: { xs: 2, sm: 0 },
                      }}
                    />
                    <Box>
                      <Typography variant="h6">
                        {displayedJobDetail.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {displayedJobDetail.industry}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    {displayedJobDetail.companyDescription}
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
                      label={`${displayedJobDetail.companySize} nhân viên`}
                      variant="outlined"
                    />
                    <Chip
                      icon={<PublicIcon />}
                      label={displayedJobDetail.website}
                      variant="outlined"
                      component="a"
                      href={
                        displayedJobDetail.website.startsWith("http")
                          ? displayedJobDetail.website
                          : `https://${displayedJobDetail.website}`
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
                      src={displayedJobDetail.recruiterAvatar}
                      alt={displayedJobDetail.recruiterName}
                      sx={{
                        width: { xs: 80, sm: 60 },
                        height: { xs: 80, sm: 60 },
                        mr: { xs: 0, sm: 2 },
                        mb: { xs: 2, sm: 0 },
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {displayedJobDetail.recruiterName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {displayedJobDetail.recruiterPosition}
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

                    <Button
                      fullWidth
                      variant={applied ? "outlined" : "contained"}
                      color={applied ? "success" : "success"}
                      size="large"
                      disabled={applyLoading || applied}
                      sx={{
                        flex: { xs: "1 1 100%", sm: "1 1 auto" },
                        order: { xs: 0, sm: 0 },
                        mb: { xs: 1, sm: 2 },
                      }}
                      onClick={handleApply}
                      startIcon={applied && <CheckIcon />}
                    >
                      {applyLoading ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CircularProgress size={16} color="inherit" /> Đang xử
                          lý...
                        </Box>
                      ) : applied ? (
                        "Đã ứng tuyển"
                      ) : (
                        "Ứng tuyển ngay"
                      )}
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
                        href={`tel:${displayedJobDetail.recruiterPhone}`}
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
                        href={`mailto:${displayedJobDetail.recruiterEmail}`}
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
                        {displayedJobDetail.createdAt
                          ? new Date(
                              displayedJobDetail.createdAt
                            ).toLocaleDateString("vi-VN")
                          : displayedJobDetail.postedDate || "Không xác định"}
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
                        {displayedJobDetail.deadline
                          ? typeof displayedJobDetail.deadline === "string" &&
                            displayedJobDetail.deadline.includes("T")
                            ? new Date(
                                displayedJobDetail.deadline
                              ).toLocaleDateString("vi-VN")
                            : displayedJobDetail.deadline
                          : "Không có hạn"}
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
                        {displayedJobDetail.time}
                      </Typography>
                    </Grid>
                  </Grid>
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
              src={displayedJobDetail.recruiterAvatar}
              alt={displayedJobDetail.recruiterName}
              sx={{
                width: { xs: 70, sm: 50 },
                height: { xs: 70, sm: 50 },
                mr: { xs: 0, sm: 2 },
                mb: { xs: 2, sm: 0 },
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {displayedJobDetail.recruiterName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {displayedJobDetail.recruiterPosition}
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
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default JobDetail;

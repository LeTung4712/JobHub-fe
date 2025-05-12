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
  Close as CloseIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarTodayIcon,
  Event as EventIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { getJob, downloadCV } from "../../api/jobs";
import { useAuth } from "../../App";

// Cache cho dữ liệu job
const jobCache = new Map();

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
  const { user } = useAuth();

  // Lấy ID người dùng hiện tại từ context thay vì localStorage
  const currentUserId = user?._id;

  // State để kiểm tra nếu bài đăng này thuộc về người dùng hiện tại
  const [isOwnPost, setIsOwnPost] = useState(false);

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

  // State cho tải xuống CV
  const [downloadingCV, setDownloadingCV] = useState(false);

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

      // Kiểm tra cache trước khi gọi API
      if (jobCache.has(id)) {
        const cachedJob = jobCache.get(id);
        setJobDetail(cachedJob);

        // Kiểm tra nếu người dùng hiện tại là tác giả của bài đăng
        if (
          currentUserId &&
          cachedJob.author &&
          cachedJob.author._id === currentUserId
        ) {
          setIsOwnPost(true);
        }

        setLoading(false);
        return;
      }

      try {
        const response = await getJob(id);
        if (response.success) {
          // Xử lý dữ liệu từ API
          const job = response.data;

          // Kiểm tra nếu người dùng hiện tại là tác giả của bài đăng
          if (currentUserId && job.author && job.author._id === currentUserId) {
            setIsOwnPost(true);
          }

          const processedJob = {
            ...job,
            // Đảm bảo các trường cần thiết cho UI
            id: job._id || job.id,
            title: job.title || "Không có tiêu đề",
            location: job.location || "Không xác định",
            salary:
              job.salary ||
              `${job.salaryMin || 0} - ${job.salaryMax || 0} triệu`,
            time: job.type || "Toàn thời gian",
            description: job.description || "Không có mô tả",
            // Đảm bảo các mảng dữ liệu đều có giá trị để tránh lỗi map
            requirements: job.requirements || [],
            benefits: job.benefits || [],
            // Thông tin tác giả
            authorName: job.author?.fullName || "Nhà tuyển dụng",
            authorPosition: job.author?.currentPosition || "HR Manager",
            authorAvatar:
              job.author?.avatar ||
              "https://randomuser.me/api/portraits/men/32.jpg",
            authorPhone: job.author?.phone || "Không có thông tin",
            authorEmail: job.author?.email || "Không có thông tin",
            // Thời gian
            createdAt: job.createdAt,
            deadline: job.deadline,
            // Loại bài đăng
            postType: job.postType || "hiring",
            experience: job.experience || "Không xác định",
            // Thông tin tác giả
            authorId: job.author?._id,
            // CV file
            cvFile: job.cvFile || null,
            hasCv: !!job.cvFile,
          };

          // Lưu vào cache
          jobCache.set(id, processedJob);

          setJobDetail(processedJob);
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
    postType: "hiring",
    experience: "5+ năm",
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
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    // Không cho phép liên hệ với chính mình
    if (isOwnPost) {
      showSuccessMessage(
        "Bạn không thể liên hệ với chính mình trên bài đăng của bạn"
      );
      return;
    }
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

    // Không cho phép lưu bài đăng của chính mình
    if (isOwnPost) {
      showSuccessMessage("Không thể lưu bài đăng của chính bạn");
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

  // Hàm xử lý tải CV
  const handleDownloadCV = async () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    try {
      setDownloadingCV(true);
      const fileId = displayedJobDetail.cvFile;

      if (!fileId) {
        showSuccessMessage("Không tìm thấy file CV");
        return;
      }

      const downloadUrl = await downloadCV(fileId);

      // Tạo element a để tải xuống
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute(
        "download",
        `CV-${displayedJobDetail.authorName.replace(/\s+/g, "-")}.pdf`
      );
      document.body.appendChild(link);
      link.click();

      // Xóa element và URL để giải phóng bộ nhớ
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      showSuccessMessage("Đã tải xuống CV thành công");
    } catch (error) {
      console.error("Lỗi khi tải CV:", error);
      showSuccessMessage("Đã xảy ra lỗi khi tải CV. Vui lòng thử lại sau.");
    } finally {
      setDownloadingCV(false);
    }
  };

  // Hàm helper để hiển thị văn bản phù hợp dựa trên loại bài đăng
  const getDisplayTextByPostType = (hiringText, seekingText) => {
    return displayedJobDetail.postType === "seeking" ? seekingText : hiringText;
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
                  {/* Header với tiêu đề và nút lưu */}
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
                      {!isOwnPost ? (
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
                      ) : (
                        <Chip
                          label="Bài đăng của bạn"
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Box>

                  {/* Thông tin cơ bản */}
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
                    <Chip
                      icon={<StarIcon fontSize="small" />}
                      label={displayedJobDetail.experience}
                      variant="outlined"
                      size="medium"
                    />
                    <Chip
                      icon={<CalendarTodayIcon fontSize="small" />}
                      label={
                        displayedJobDetail.createdAt
                          ? new Date(
                              displayedJobDetail.createdAt
                            ).toLocaleDateString("vi-VN")
                          : displayedJobDetail.postedDate || "Không xác định"
                      }
                      variant="outlined"
                      size="medium"
                    />
                    {displayedJobDetail.postType !== "seeking" &&
                      displayedJobDetail.deadline && (
                        <Chip
                          icon={<EventIcon fontSize="small" />}
                          label={`Hạn nộp: ${
                            typeof displayedJobDetail.deadline === "string" &&
                            displayedJobDetail.deadline.includes("T")
                              ? new Date(
                                  displayedJobDetail.deadline
                                ).toLocaleDateString("vi-VN")
                              : displayedJobDetail.deadline
                          }`}
                          variant="outlined"
                          size="medium"
                          color="error"
                        />
                      )}
                  </Box>

                  {/* Thông tin liên hệ */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                      p: 2,
                      bgcolor: "rgba(0, 0, 0, 0.02)",
                      borderRadius: 1,
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <Avatar
                        src={displayedJobDetail.authorAvatar}
                        alt={displayedJobDetail.authorName}
                        sx={{
                          width: { xs: 50, sm: 40 },
                          height: { xs: 50, sm: 40 },
                          mr: 2,
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {displayedJobDetail.authorName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {displayedJobDetail.authorPosition}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        flex: 1,
                        justifyContent: { xs: "center", sm: "flex-end" },
                      }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<PhoneIcon />}
                        href={`tel:${displayedJobDetail.authorPhone}`}
                        size="small"
                      >
                        Gọi điện
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<EmailIcon />}
                        href={`mailto:${displayedJobDetail.authorEmail}`}
                        size="small"
                      >
                        Gửi email
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<ChatIcon />}
                        onClick={handleOpenContactDialog}
                        size="small"
                      >
                        Nhắn tin
                      </Button>
                      {/* Nút tải CV - chỉ hiển thị khi bài đăng là tìm việc và có CV */}
                      {displayedJobDetail.postType === "seeking" &&
                        displayedJobDetail.hasCv && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={
                              downloadingCV ? (
                                <CircularProgress size={20} color="secondary" />
                              ) : (
                                <DescriptionIcon />
                              )
                            }
                            onClick={handleDownloadCV}
                            size="small"
                            disabled={downloadingCV}
                            sx={{
                              borderWidth: "1px",
                              "&:hover": {
                                backgroundColor: "rgba(156, 39, 176, 0.04)",
                              },
                            }}
                          >
                            Tải CV
                          </Button>
                        )}
                    </Box>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  {/* Mô tả công việc */}
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {displayedJobDetail.postType === "seeking"
                      ? "Mô tả hồ sơ"
                      : "Mô tả công việc"}
                  </Typography>
                  <Typography paragraph sx={{ lineHeight: 1.8 }}>
                    {displayedJobDetail.description}
                  </Typography>

                  {/* Yêu cầu */}
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {displayedJobDetail.postType === "seeking"
                      ? "Kỹ năng"
                      : "Yêu cầu"}
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

                  {/* Quyền lợi - chỉ hiển thị cho bài đăng tuyển dụng */}
                  {displayedJobDetail.postType !== "seeking" && (
                    <>
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
                    </>
                  )}
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
              {displayedJobDetail.postType === "seeking"
                ? "Liên hệ với ứng viên"
                : "Liên hệ với nhà tuyển dụng"}
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
              src={displayedJobDetail.authorAvatar}
              alt={displayedJobDetail.authorName}
              sx={{
                width: { xs: 70, sm: 50 },
                height: { xs: 70, sm: 50 },
                mr: { xs: 0, sm: 2 },
                mb: { xs: 2, sm: 0 },
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {displayedJobDetail.authorName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {displayedJobDetail.authorPosition}
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
                  placeholder={
                    displayedJobDetail.postType === "seeking"
                      ? "Nhập nội dung tin nhắn bạn muốn gửi đến ứng viên..."
                      : "Nhập nội dung tin nhắn bạn muốn gửi đến nhà tuyển dụng..."
                  }
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

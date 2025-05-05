import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  Tab,
  Tabs,
  IconButton,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  useTheme,
  Badge,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import { getProfile, updateProfile } from "../../api/auth";

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Input = styled("input")({
  display: "none",
});

function Profile() {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Khởi tạo dữ liệu mặc định
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    currentPosition: "",
    yearsOfExperience: "",
    education: "",
    skills: [],
    bio: "",
    website: "",
    isAvailableForWork: false,
  });

  const [newSkill, setNewSkill] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const theme = useTheme();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  // Lấy thông tin người dùng từ API khi component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProfile();
        if (response.success && response.data) {
          // Chuẩn bị dữ liệu từ API để hiển thị
          const userData = response.data;
          setProfileData({
            fullName: userData.fullName || "",
            email: userData.email || "",
            phone: userData.phone || "",
            location: userData.location || "",
            currentPosition: userData.currentPosition || "",
            yearsOfExperience: userData.yearsOfExperience || "",
            education: userData.education || "",
            skills: userData.skills || [],
            bio: userData.bio || "",
            website: userData.website || "",
            isAvailableForWork: userData.isAvailableForWork || false,
            avatar: userData.avatar || null,
          });

          // Nếu có avatar, thiết lập preview
          if (userData.avatar) {
            setAvatarPreview(userData.avatar);
          }
        } else {
          setError("Không thể tải thông tin người dùng");
        }
      } catch (err) {
        console.error("Lỗi khi tải thông tin người dùng:", err);
        setError("Đã xảy ra lỗi khi tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Nếu đang chỉnh sửa rồi nhấn cancel, reset avatar preview
      if (!avatarFile) {
        setAvatarPreview(profileData.avatar || null);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleAvailabilityChange = (e) => {
    setProfileData({
      ...profileData,
      isAvailableForWork: e.target.checked,
    });
  };

  const handleAddSkill = () => {
    if (
      newSkill.trim() !== "" &&
      !profileData.skills.includes(newSkill.trim())
    ) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Chuẩn bị dữ liệu để cập nhật
      const updatedData = {
        fullName: profileData.fullName,
        phone: profileData.phone,
        location: profileData.location,
        currentPosition: profileData.currentPosition,
        yearsOfExperience: profileData.yearsOfExperience,
        education: profileData.education,
        bio: profileData.bio,
        website: profileData.website,
        isAvailableForWork: profileData.isAvailableForWork,
        skills: profileData.skills,
      };

      // Xử lý avatar nếu có (trong dự án thực tế cần upload file)
      if (avatarFile) {
        // TODO: Thêm logic upload avatar và cập nhật API
        // updatedData.avatar = avatarUrl;
      }

      // Gọi API cập nhật thông tin
      const response = await updateProfile(updatedData);

      if (response.success) {
        // Cập nhật thông tin người dùng trong context
        updateUser({
          fullName: profileData.fullName,
        });

        // Hiển thị thông báo thành công
        setSaveSuccess(true);
        setIsEditing(false);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setError("Không thể cập nhật thông tin");
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật thông tin:", err);
      setError("Đã xảy ra lỗi khi cập nhật thông tin");
    } finally {
      setLoading(false);
    }
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
        <Box sx={{ mb: 5 }}>
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
            Hồ sơ cá nhân
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
              fontSize: "1.1rem",
            }}
          >
            Quản lý thông tin cá nhân, xem lịch sử ứng tuyển và các bài đăng của
            bạn.
          </Typography>
        </Box>

        {/* Hiển thị thông báo lỗi nếu có */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Hiển thị loading spinner khi đang tải dữ liệu */}
        {loading && !isEditing ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            {/* Profile Card - Left Side */}
            <Box
              sx={{
                width: { xs: "100%", md: "350px" },
                flexShrink: 0,
              }}
            >
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  background: "white",
                  position: "sticky",
                  top: 20,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row", md: "column" },
                      alignItems: "center",
                      textAlign: "center",
                      mb: 3,
                      gap: { xs: 0, sm: 3, md: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: { xs: 3, sm: 0, md: 3 },
                      }}
                    >
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          isEditing ? (
                            <label htmlFor="avatar-upload">
                              <Input
                                accept="image/*"
                                id="avatar-upload"
                                type="file"
                                onChange={handleAvatarChange}
                              />
                              <IconButton
                                component="span"
                                sx={{
                                  bgcolor: theme.palette.primary.main,
                                  color: "white",
                                  "&:hover": {
                                    bgcolor: theme.palette.primary.dark,
                                  },
                                }}
                              >
                                <UploadIcon />
                              </IconButton>
                            </label>
                          ) : null
                        }
                      >
                        <Avatar
                          src={avatarPreview}
                          alt={profileData.fullName}
                          sx={{
                            width: 120,
                            height: 120,
                            mb: 2,
                            border: "4px solid white",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                            bgcolor: theme.palette.primary.main,
                          }}
                        >
                          {profileData.fullName?.charAt(0).toUpperCase() || "U"}
                        </Avatar>
                      </Badge>

                      {/* Trạng thái tìm việc */}
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                          px: 2,
                          py: 0.5,
                          borderRadius: 10,
                          bgcolor: profileData.isAvailableForWork
                            ? "success.light"
                            : "gray.light",
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: profileData.isAvailableForWork
                              ? "success.main"
                              : "text.disabled",
                          }}
                        />
                        <Typography
                          variant="body2"
                          color={
                            profileData.isAvailableForWork
                              ? "success.main"
                              : "text.secondary"
                          }
                          fontWeight="600"
                        >
                          {profileData.isAvailableForWork
                            ? "Đang tìm việc"
                            : "Không tìm việc"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        width: "100%",
                        textAlign: { xs: "center", sm: "left", md: "center" },
                      }}
                    >
                      {isEditing ? (
                        <TextField
                          fullWidth
                          margin="normal"
                          id="fullName"
                          name="fullName"
                          label="Họ và tên"
                          value={profileData.fullName}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          {profileData.fullName}
                        </Typography>
                      )}

                      {isEditing ? (
                        <TextField
                          fullWidth
                          margin="normal"
                          id="currentPosition"
                          name="currentPosition"
                          label="Vị trí hiện tại"
                          value={profileData.currentPosition}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <Typography
                          variant="subtitle1"
                          color="primary.main"
                          fontWeight="500"
                          gutterBottom
                        >
                          {profileData.currentPosition}
                        </Typography>
                      )}

                      {isEditing && (
                        <FormControlLabel
                          sx={{ mt: 1 }}
                          control={
                            <Switch
                              checked={profileData.isAvailableForWork}
                              onChange={handleAvailabilityChange}
                              color="success"
                            />
                          }
                          label="Trạng thái tìm việc"
                        />
                      )}
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <List dense>
                    <ListItem sx={{ px: 0, py: 0.75 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <EmailIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          id="email"
                          name="email"
                          label="Email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                          disabled // Email không thể chỉnh sửa
                        />
                      ) : (
                        <ListItemText
                          primary={profileData.email}
                          primaryTypographyProps={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "0.9rem",
                          }}
                        />
                      )}
                    </ListItem>

                    <ListItem sx={{ px: 0, py: 0.75 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <PhoneIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          id="phone"
                          name="phone"
                          label="Số điện thoại"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <ListItemText
                          primary={profileData.phone || "Chưa cập nhật"}
                          primaryTypographyProps={{
                            fontWeight: "500",
                            fontSize: "0.9rem",
                            color: profileData.phone
                              ? "text.primary"
                              : "text.disabled",
                          }}
                        />
                      )}
                    </ListItem>

                    <ListItem sx={{ px: 0, py: 0.75 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <LocationOnIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          id="location"
                          name="location"
                          label="Địa điểm"
                          value={profileData.location}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <ListItemText
                          primary={profileData.location || "Chưa cập nhật"}
                          primaryTypographyProps={{
                            fontSize: "0.9rem",
                            color: profileData.location
                              ? "text.primary"
                              : "text.disabled",
                          }}
                        />
                      )}
                    </ListItem>

                    <ListItem sx={{ px: 0, py: 0.75 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <WorkIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          id="yearsOfExperience"
                          name="yearsOfExperience"
                          label="Năm kinh nghiệm"
                          value={profileData.yearsOfExperience}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <ListItemText
                          primary={
                            profileData.yearsOfExperience
                              ? `${profileData.yearsOfExperience} năm kinh nghiệm`
                              : "Chưa cập nhật"
                          }
                          primaryTypographyProps={{
                            fontSize: "0.9rem",
                            color: profileData.yearsOfExperience
                              ? "text.primary"
                              : "text.disabled",
                          }}
                        />
                      )}
                    </ListItem>

                    <ListItem sx={{ px: 0, py: 0.75 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <SchoolIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          id="education"
                          name="education"
                          label="Học vấn"
                          value={profileData.education}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <ListItemText
                          primary={profileData.education || "Chưa cập nhật"}
                          primaryTypographyProps={{
                            fontSize: "0.9rem",
                            color: profileData.education
                              ? "text.primary"
                              : "text.disabled",
                          }}
                        />
                      )}
                    </ListItem>

                    <ListItem sx={{ px: 0, py: 0.75 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <PublicIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          id="website"
                          name="website"
                          label="Website"
                          value={profileData.website}
                          onChange={handleInputChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <ListItemText
                          primary={
                            profileData.website ? (
                              <Typography
                                component="a"
                                href={profileData.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                color="primary"
                                sx={{
                                  textDecoration: "none",
                                  "&:hover": { textDecoration: "underline" },
                                  fontSize: "0.9rem",
                                }}
                              >
                                {profileData.website}
                              </Typography>
                            ) : (
                              <Typography
                                color="text.disabled"
                                sx={{ fontSize: "0.9rem" }}
                              >
                                Chưa cập nhật
                              </Typography>
                            )
                          }
                        />
                      )}
                    </ListItem>
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ mt: 2 }}>
                    {isEditing ? (
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Button
                          onClick={handleSaveProfile}
                          variant="contained"
                          startIcon={<SaveIcon />}
                          fullWidth
                          disabled={loading}
                        >
                          {loading ? "Đang lưu..." : "Lưu"}
                        </Button>
                        <Button
                          onClick={handleEditToggle}
                          variant="outlined"
                          color="error"
                          startIcon={<CancelIcon />}
                        >
                          Hủy
                        </Button>
                      </Stack>
                    ) : (
                      <Button
                        onClick={handleEditToggle}
                        variant="outlined"
                        startIcon={<EditIcon />}
                        fullWidth
                      >
                        Chỉnh sửa hồ sơ
                      </Button>
                    )}
                  </Box>

                  {saveSuccess && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      Lưu hồ sơ thành công!
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Box>

            {/* Main Content - Right Side */}
            <Box sx={{ flexGrow: 1 }}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  background: "white",
                  height: "100%",
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    "& .MuiTab-root": {
                      py: 2,
                      fontSize: "1rem",
                    },
                  }}
                >
                  <Tab label="Thông tin chi tiết" />
                </Tabs>

                {/* Thông tin chi tiết tab */}
                <TabPanel value={tabValue} index={0}>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      Giới thiệu
                    </Typography>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        id="bio"
                        name="bio"
                        label="Giới thiệu bản thân"
                        multiline
                        rows={4}
                        value={profileData.bio}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{ mb: 3 }}
                      />
                    ) : (
                      <Typography
                        variant="body1"
                        paragraph
                        sx={{
                          mb: 3,
                          lineHeight: 1.7,
                          color: profileData.bio
                            ? "text.primary"
                            : "text.disabled",
                        }}
                      >
                        {profileData.bio || "Chưa có thông tin giới thiệu"}
                      </Typography>
                    )}

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h5" fontWeight={600} gutterBottom>
                        Kỹ năng
                      </Typography>

                      {isEditing && (
                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                          <TextField
                            fullWidth
                            id="new-skill"
                            label="Thêm kỹ năng mới"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            variant="outlined"
                            size="small"
                          />
                          <Button
                            variant="contained"
                            onClick={handleAddSkill}
                            startIcon={<AddIcon />}
                          >
                            Thêm
                          </Button>
                        </Stack>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        {profileData.skills && profileData.skills.length > 0 ? (
                          profileData.skills.map((skill, index) => (
                            <Chip
                              key={index}
                              label={skill}
                              color="primary"
                              variant="outlined"
                              onDelete={
                                isEditing
                                  ? () => handleRemoveSkill(skill)
                                  : undefined
                              }
                            />
                          ))
                        ) : (
                          <Typography color="text.disabled">
                            Chưa có kỹ năng nào được thêm vào
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                      <Typography variant="h5" fontWeight={600} gutterBottom>
                        CV / Resume
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<UploadIcon />}
                        >
                          Tải lên CV
                          <input type="file" hidden accept=".pdf,.doc,.docx" />
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>
              </Paper>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Profile;

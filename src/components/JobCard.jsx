import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Stack,
  Chip,
  Button,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const JobCard = ({ job, onClick, getCategoryLabel, getCategoryColor }) => {
  const theme = useTheme();

  // Mapping cho kinh nghiệm để hiển thị
  const getExperienceLabel = (experienceCode) => {
    const experienceMap = {
      entry: "Mới đi làm",
      junior: "1-2 năm",
      mid: "3-5 năm",
      senior: "5+ năm",
      expert: "Chuyên gia",
    };
    return experienceMap[experienceCode] || "Không yêu cầu";
  };

  // Mapping cho loại hình công việc
  const getJobTypeLabel = (typeCode) => {
    const typeMap = {
      "full-time": "Toàn thời gian",
      "part-time": "Bán thời gian",
      freelance: "Freelance",
      contract: "Hợp đồng",
      internship: "Thực tập",
      remote: "Remote",
    };
    return typeMap[typeCode] || "Khác";
  };

  return (
    <Card
      elevation={3}
      sx={{
        height: { xs: 420, md: 400, xl: 400 },
        minHeight: { xs: 420, md: 400, xl: 400 },
        maxHeight: { xs: 420, md: 400, xl: 400 },
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        boxShadow: "0 4px 24px 0 rgba(100,108,255,0.08)",
        border: "1px solid #f0f0f0",
        transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
        background: "#fff",
        overflow: "hidden",
        flexGrow: 1,
        position: "relative",
        "&:hover": {
          boxShadow: "0 8px 32px 0 rgba(100,108,255,0.16)",
          borderColor: theme.palette.primary.main,
          transform: "translateY(-4px) scale(1.01)",
        },
      }}
    >
      {/* Badge cho loại bài đăng */}
      {job.type === "seeking" && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: theme.palette.secondary.main,
            color: "white",
            fontSize: "0.7rem",
            fontWeight: "bold",
            py: 0.5,
            px: 1,
            borderBottomLeftRadius: 8,
          }}
        >
          Tìm việc
        </Box>
      )}

      <CardContent
        sx={{
          flexGrow: 1,
          p: { xs: 2.5, md: 3 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          minHeight: 0,
        }}
      >
        <Box sx={{ mb: 1.5, minHeight: "4.2rem" }}>
          <Chip
            label={getCategoryLabel(job.category)}
            color={getCategoryColor(job.category)}
            size="small"
            sx={{ mb: 1, fontWeight: 500, fontSize: "0.7rem" }}
          />
          <Typography
            variant="h6"
            component="h2"
            color="primary.dark"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1rem", md: "0.95rem" },
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.3,
              wordBreak: "break-word",
              whiteSpace: "normal",
              minHeight: "2.6em",
            }}
          >
            {job.title}
          </Typography>
        </Box>

        <Stack spacing={1} sx={{ flexGrow: 1, minHeight: "11rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: "1.5rem",
            }}
          >
            <LocationOnIcon
              fontSize="small"
              color="action"
              sx={{ fontSize: "0.9rem", minWidth: "18px" }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.85rem", lg: "0.8rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {job.location}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: "1.5rem",
            }}
          >
            <WorkOutlineIcon
              fontSize="small"
              color="action"
              sx={{ fontSize: "0.9rem", minWidth: "18px" }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.85rem", lg: "0.8rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {getJobTypeLabel(job.type)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: "1.5rem",
            }}
          >
            <AttachMoneyIcon
              fontSize="small"
              color="action"
              sx={{ fontSize: "0.9rem", minWidth: "18px" }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.85rem", lg: "0.8rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {job.salary}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: "1.5rem",
            }}
          >
            <WorkHistoryIcon
              fontSize="small"
              color="action"
              sx={{ fontSize: "0.9rem", minWidth: "18px" }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.85rem", lg: "0.8rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Kinh nghiệm: {getExperienceLabel(job.experience)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: "1.5rem",
            }}
          >
            <AccessTimeIcon
              fontSize="small"
              color="action"
              sx={{ fontSize: "0.9rem", minWidth: "18px" }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.85rem", lg: "0.8rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {job.deadline
                ? typeof job.deadline === "string" && job.deadline.includes("T")
                  ? new Date(job.deadline).toLocaleDateString("vi-VN")
                  : job.deadline
                : "Không có hạn"}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          p: { xs: 2, md: 2 },
          pt: 0,
          mt: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          minHeight: 64,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onClick(job.id, job.title)}
          sx={{
            py: 1,
            fontWeight: "bold",
            fontSize: { xs: "0.95rem", md: "0.85rem" },
            borderRadius: 2,
            boxShadow: "none",
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(100,108,255,0.12)",
            },
          }}
        >
          {job.postType === "seeking" ? "Xem hồ sơ" : "Ứng tuyển ngay"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;

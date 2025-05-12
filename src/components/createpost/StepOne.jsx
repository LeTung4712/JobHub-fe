import React from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Avatar,
  useTheme,
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";

const StepOne = ({ postType, handlePostTypeChange, handleNextStep }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary.dark"
          sx={{ mb: 1.5 }}
        >
          Bạn muốn đăng bài gì?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: "600px", mx: "auto" }}
        >
          Chọn loại bài đăng phù hợp với nhu cầu của bạn
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 4 },
          mb: 6,
          mt: { xs: 2, md: 3 },
        }}
      >
        {/* Tuyển dụng */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: 3.5,
            transition: "all 0.3s ease",
            border: `2px solid ${
              postType === "hiring" ? theme.palette.primary.main : "transparent"
            }`,
            backgroundColor:
              postType === "hiring" ? "rgba(100, 108, 255, 0.04)" : "white",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            width: { xs: "100%", md: "45%" },
            boxShadow:
              postType === "hiring"
                ? "0 8px 25px rgba(100, 108, 255, 0.12)"
                : "0 8px 20px rgba(0,0,0,0.05)",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 12px 30px rgba(100, 108, 255, 0.15)",
              borderColor: theme.palette.primary.main,
            },
          }}
          onClick={() => handlePostTypeChange(null, "hiring")}
        >
          {postType === "hiring" && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: theme.palette.primary.main,
                color: "white",
                px: 2,
                py: 0.5,
                borderBottomLeftRadius: 12,
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              Đang chọn
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 80,
                height: 80,
                mb: 3,
                boxShadow: "0 8px 20px rgba(100, 108, 255, 0.2)",
              }}
            >
              <BusinessCenterIcon sx={{ fontSize: 40 }} />
            </Avatar>

            <Typography
              variant="h5"
              color="primary.dark"
              fontWeight={600}
              gutterBottom
            >
              Tuyển người
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 3 }}
            >
              Đăng tin tuyển dụng cho các vị trí cần tuyển của công ty bạn
            </Typography>

            <Divider sx={{ width: "70%", mb: 3 }} />

            <Box sx={{ width: "100%" }}>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <CheckCircleOutlineIcon color="primary" fontSize="small" />
                Đăng tuyển không giới hạn vị trí
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <CheckCircleOutlineIcon color="primary" fontSize="small" />
                Quản lý ứng viên dễ dàng
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CheckCircleOutlineIcon color="primary" fontSize="small" />
                Hiển thị trong kết quả tìm kiếm
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Tìm việc */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: 3.5,
            transition: "all 0.3s ease",
            border: `2px solid ${
              postType === "seeking"
                ? theme.palette.secondary.main
                : "transparent"
            }`,
            backgroundColor:
              postType === "seeking" ? "rgba(245, 0, 87, 0.04)" : "white",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            width: { xs: "100%", md: "45%" },
            boxShadow:
              postType === "seeking"
                ? "0 8px 25px rgba(245, 0, 87, 0.12)"
                : "0 8px 20px rgba(0,0,0,0.05)",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 12px 30px rgba(245, 0, 87, 0.15)",
              borderColor: theme.palette.secondary.main,
            },
          }}
          onClick={() => handlePostTypeChange(null, "seeking")}
        >
          {postType === "seeking" && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                px: 2,
                py: 0.5,
                borderBottomLeftRadius: 12,
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              Đang chọn
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: theme.palette.secondary.main,
                width: 80,
                height: 80,
                mb: 3,
                boxShadow: "0 8px 20px rgba(245, 0, 87, 0.2)",
              }}
            >
              <PersonSearchIcon sx={{ fontSize: 40 }} />
            </Avatar>

            <Typography
              variant="h5"
              color="secondary.dark"
              fontWeight={600}
              gutterBottom
            >
              Tìm việc
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 3 }}
            >
              Đăng hồ sơ tìm việc để được các nhà tuyển dụng tiếp cận
            </Typography>

            <Divider sx={{ width: "70%", mb: 3 }} />

            <Box sx={{ width: "100%" }}>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <CheckCircleOutlineIcon color="secondary" fontSize="small" />
                Nhận thông báo việc làm phù hợp
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <CheckCircleOutlineIcon color="secondary" fontSize="small" />
                Chủ động liên hệ nhà tuyển dụng
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CheckCircleOutlineIcon color="secondary" fontSize="small" />
                Nổi bật hồ sơ trong mắt nhà tuyển dụng
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
          pt: 3,
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextStep}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 10,
            boxShadow: "0 8px 20px rgba(100, 108, 255, 0.2)",
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 10px 25px rgba(100, 108, 255, 0.3)",
            },
          }}
          endIcon={<ArrowForwardIcon />}
        >
          Tiếp tục
        </Button>
      </Box>
    </motion.div>
  );
};

export default StepOne;

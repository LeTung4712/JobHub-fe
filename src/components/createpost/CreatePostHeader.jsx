import React from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { motion } from "framer-motion";

const CreatePostHeader = ({ handleBack }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={0}
      component={motion.div}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      sx={{
        mb: { xs: 4, md: 5 },
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        backgroundImage:
          "linear-gradient(120deg, rgba(100, 108, 255, 0.08), rgba(100, 108, 255, 0.03))",
        border: "1px solid rgba(100, 108, 255, 0.1)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            width: { xs: 50, md: 60 },
            height: { xs: 50, md: 60 },
            boxShadow: "0 4px 12px rgba(100, 108, 255, 0.3)",
          }}
        >
          <PostAddIcon fontSize="large" />
        </Avatar>
        <Box>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h1"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.dark,
              lineHeight: 1.2,
            }}
          >
            Đăng bài mới
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 0.5, fontSize: { xs: "0.9rem", md: "1rem" } }}
          >
            Tạo một bài đăng để tuyển dụng hoặc tìm kiếm việc làm
          </Typography>
        </Box>
      </Box>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{
          borderRadius: 2,
          px: 2.5,
          height: 45,
          borderWidth: 1.5,
          alignSelf: { xs: "flex-start", md: "center" },
          ml: { xs: 8, md: 0 },
        }}
      >
        Quay lại
      </Button>
    </Paper>
  );
};

export default CreatePostHeader;

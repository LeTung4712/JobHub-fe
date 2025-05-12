import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Grid,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const StepFour = ({
  postType,
  formData,
  requirementInput,
  benefitInput,
  setRequirementInput,
  setBenefitInput,
  addRequirement,
  removeRequirement,
  addBenefit,
  removeBenefit,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary.dark"
          sx={{ mb: 1.5 }}
        >
          {postType === "hiring"
            ? "Yêu cầu & Quyền lợi"
            : "Kỹ năng & Mong muốn"}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: "600px", mx: "auto" }}
        >
          {postType === "hiring"
            ? "Thêm các yêu cầu và quyền lợi cho ứng viên"
            : "Thêm các kỹ năng và mong muốn của bạn"}
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid rgba(0,0,0,0.06)",
          mb: 4,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                <CheckCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                {postType === "hiring" ? "Yêu cầu công việc" : "Kỹ năng"}
              </Typography>

              <Box sx={{ display: "flex", mb: 2 }}>
                <TextField
                  fullWidth
                  value={requirementInput}
                  onChange={(e) => setRequirementInput(e.target.value)}
                  placeholder={
                    postType === "hiring"
                      ? "Ví dụ: Có kinh nghiệm với React"
                      : "Ví dụ: Thành thạo React"
                  }
                  size="small"
                  InputProps={{
                    sx: {
                      borderRadius: "8px 0 0 8px",
                      bgcolor: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRight: "none",
                      },
                    },
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addRequirement();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={addRequirement}
                  sx={{
                    borderRadius: "0 8px 8px 0",
                    px: 3,
                    boxShadow: "none",
                    minWidth: "auto",
                  }}
                >
                  <AddIcon />
                </Button>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(100, 108, 255, 0.04)",
                  border: "1px solid rgba(100, 108, 255, 0.12)",
                  minHeight: "200px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {formData.requirements.length > 0 ? (
                  formData.requirements.map((req, index) => (
                    <Chip
                      key={index}
                      label={req}
                      onDelete={() => removeRequirement(index)}
                      color="primary"
                      variant="outlined"
                      sx={{
                        m: 0.5,
                        borderRadius: 2,
                        "& .MuiChip-label": {
                          px: 1.5,
                        },
                        "& .MuiChip-deleteIcon": {
                          color: "primary.light",
                          "&:hover": {
                            color: "error.main",
                          },
                        },
                      }}
                    />
                  ))
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      {postType === "hiring"
                        ? "Chưa có yêu cầu nào được thêm"
                        : "Chưa có kỹ năng nào được thêm"}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                <CheckCircleOutlineIcon color="secondary" sx={{ mr: 1 }} />
                {postType === "hiring" ? "Quyền lợi" : "Mong muốn"}
              </Typography>

              <Box sx={{ display: "flex", mb: 2 }}>
                <TextField
                  fullWidth
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  placeholder={
                    postType === "hiring"
                      ? "Ví dụ: Bảo hiểm sức khỏe"
                      : "Ví dụ: Môi trường làm việc năng động"
                  }
                  size="small"
                  InputProps={{
                    sx: {
                      borderRadius: "8px 0 0 8px",
                      bgcolor: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRight: "none",
                      },
                    },
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addBenefit();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={addBenefit}
                  sx={{
                    borderRadius: "0 8px 8px 0",
                    px: 3,
                    boxShadow: "none",
                    minWidth: "auto",
                  }}
                >
                  <AddIcon />
                </Button>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(245, 0, 87, 0.04)",
                  border: "1px solid rgba(245, 0, 87, 0.12)",
                  minHeight: "200px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {formData.benefits.length > 0 ? (
                  formData.benefits.map((benefit, index) => (
                    <Chip
                      key={index}
                      label={benefit}
                      onDelete={() => removeBenefit(index)}
                      color="secondary"
                      variant="outlined"
                      sx={{
                        m: 0.5,
                        borderRadius: 2,
                        "& .MuiChip-label": {
                          px: 1.5,
                        },
                        "& .MuiChip-deleteIcon": {
                          color: "secondary.light",
                          "&:hover": {
                            color: "error.main",
                          },
                        },
                      }}
                    />
                  ))
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      {postType === "hiring"
                        ? "Chưa có quyền lợi nào được thêm"
                        : "Chưa có mong muốn nào được thêm"}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default StepFour;

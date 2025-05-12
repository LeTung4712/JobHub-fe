import React from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import CategoryIcon from "@mui/icons-material/Category";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";

const StepThree = ({
  postType,
  formData,
  formErrors,
  handleInputChange,
  cvFile,
  cvFileName,
  cvError,
  handleCvUpload,
  handleRemoveCv,
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
          Chi tiết công việc
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: "600px", mx: "auto" }}
        >
          {postType === "hiring"
            ? "Mô tả chi tiết về công việc và trách nhiệm"
            : "Mô tả chi tiết về kinh nghiệm và công việc bạn tìm kiếm"}
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
        <Grid
          container
          spacing={0}
          sx={{
            width: "100%",
            m: 0,
            p: 0,
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              width: "100%",
              maxWidth: "none",
              flexBasis: "100%",
              flexGrow: 1,
              p: 0,
              m: 0,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
              }}
            >
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
                <CategoryIcon color="primary" sx={{ mr: 1 }} />
                {postType === "hiring"
                  ? "Mô tả công việc"
                  : "Mô tả kinh nghiệm"}
              </Typography>

              <TextField
                required
                fullWidth
                id="description"
                name="description"
                label="Mô tả chi tiết"
                multiline
                rows={10}
                value={formData.description}
                onChange={handleInputChange}
                placeholder={
                  postType === "hiring"
                    ? "Mô tả chi tiết về công việc, trách nhiệm, môi trường làm việc, ..."
                    : "Mô tả chi tiết về kinh nghiệm làm việc, dự án đã tham gia, kỹ năng, ..."
                }
                error={!!formErrors.description}
                helperText={formErrors.description}
                sx={{
                  width: "100%",
                  mx: 0,
                  px: 0,
                  my: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "white",
                    minHeight: "220px",
                    "&.Mui-focused": {
                      boxShadow: "0 0 0 2px rgba(100, 108, 255, 0.2)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    px: 2.5,
                    py: 2,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1rem",
                    fontWeight: 500,
                  },
                }}
              />
            </Box>
          </Grid>

          {/* CV upload section cho người tìm việc */}
          {postType === "seeking" && (
            <Grid item xs={12}>
              <Box sx={{ mt: 2, mb: 1 }}>
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
                  <CloudUploadIcon color="primary" sx={{ mr: 1 }} />
                  Tải lên CV của bạn
                </Typography>

                {!cvFile ? (
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      borderStyle: "dashed",
                      borderWidth: 2,
                      width: "100%",
                      justifyContent: "center",
                      bgcolor: "rgba(100, 108, 255, 0.04)",
                    }}
                  >
                    Chọn file CV (PDF, DOC, DOCX)
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvUpload}
                    />
                  </Button>
                ) : (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid rgba(0,0,0,0.1)",
                      bgcolor: "background.paper",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <InsertDriveFileIcon
                        color="primary"
                        sx={{ mr: 1.5, fontSize: 28 }}
                      />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {cvFileName}
                      </Typography>
                    </Box>
                    <IconButton color="error" onClick={handleRemoveCv}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                )}

                {cvError && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {cvError}
                  </Typography>
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default StepThree;

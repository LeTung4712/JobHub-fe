import React from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";

const StepNavigation = ({
  activeStep,
  isLastStep,
  isSubmitting,
  handleBack,
  handleNextStep,
  handleSubmit,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 4,
        pt: 3,
        borderTop: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      {/* Nút Quay lại */}
      <Button
        variant="outlined"
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        sx={{
          borderRadius: 10,
          px: 3,
          py: 1.2,
          fontWeight: 600,
          textTransform: "none",
          borderWidth: 1.5,
          "&:hover": {
            borderWidth: 1.5,
          },
        }}
      >
        Quay lại
      </Button>

      {/* Nút Tiếp tục hoặc Đăng tin */}
      {isLastStep ? (
        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
          startIcon={
            isSubmitting ? <CircularProgress size={20} color="inherit" /> : null
          }
          sx={{
            borderRadius: 10,
            px: 4,
            py: 1.2,
            fontWeight: 600,
            textTransform: "none",
            bgcolor: "success.main",
            boxShadow: "0 8px 20px rgba(76, 175, 80, 0.2)",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "success.dark",
              transform: "translateY(-2px)",
              boxShadow: "0 10px 25px rgba(76, 175, 80, 0.3)",
            },
          }}
        >
          {isSubmitting ? "Đang đăng..." : "Đăng tin"}
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleNextStep}
          endIcon={<ArrowForwardIcon />}
          sx={{
            borderRadius: 10,
            px: 4,
            py: 1.2,
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 8px 20px rgba(100, 108, 255, 0.2)",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 10px 25px rgba(100, 108, 255, 0.3)",
            },
          }}
        >
          Tiếp tục
        </Button>
      )}
    </Box>
  );
};

export default StepNavigation;

import React from "react";
import { Box, Paper, Stepper, Step, StepLabel, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const StepIndicator = ({ steps, activeStep, completed, handleStep, isMobile }) => {
  const theme = useTheme();

  if (isMobile) {
    // Mobile view: hiển thị điểm đại diện các bước
    return (
      <Box
        sx={{
          mt: 4,
          mb: 1,
          display: "flex",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {steps.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: activeStep === index ? 24 : 10,
              height: 10,
              borderRadius: "10px",
              backgroundColor:
                activeStep === index
                  ? theme.palette.primary.main
                  : completed[index]
                  ? theme.palette.success.main
                  : theme.palette.grey[300],
              transition: "all 0.3s",
              boxShadow:
                activeStep === index
                  ? "0 2px 6px rgba(100, 108, 255, 0.4)"
                  : "none",
            }}
          />
        ))}
      </Box>
    );
  }

  // Desktop view: hiển thị Stepper đầy đủ
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      sx={{ width: "100%", mb: 4 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(100, 108, 255, 0.08)",
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepLabel-root": {
              color: theme.palette.text.secondary,
            },
            "& .MuiStepIcon-root": {
              fontSize: 28,
              transition: "all 0.2s ease",
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: theme.palette.primary.main,
              filter: "drop-shadow(0 2px 4px rgba(100, 108, 255, 0.3))",
            },
            "& .MuiStepIcon-root.Mui-completed": {
              color: theme.palette.success.main,
            },
            "& .MuiStepConnector-line": {
              borderColor: "rgba(100, 108, 255, 0.15)",
            },
            "& .MuiStepLabel-label": {
              mt: 0.5,
              fontWeight: 500,
            },
            "& .MuiStepLabel-label.Mui-active": {
              color: theme.palette.primary.dark,
              fontWeight: "bold",
            },
            "& .MuiStepLabel-label.Mui-completed": {
              fontWeight: 500,
            },
          }}
        >
          {steps.map((step, index) => {
            const stepProps = {};
            const labelProps = {};

            if (step.optional) {
              labelProps.optional = (
                <Typography variant="caption">Tùy chọn</Typography>
              );
            }

            if (completed[index]) {
              stepProps.completed = true;
            }

            return (
              <Step key={step.label} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  StepIconProps={{
                    sx: {
                      color: completed[index]
                        ? theme.palette.success.main
                        : undefined,
                    },
                  }}
                  onClick={handleStep(index)}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={activeStep === index ? 600 : 400}
                  >
                    {step.label}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Paper>
    </Box>
  );
};

export default StepIndicator; 
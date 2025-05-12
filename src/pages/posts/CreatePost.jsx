import React from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Fab,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Custom hooks
import { useCreatePostForm } from "../../hooks/useCreatePostForm";

// Components
import CreatePostHeader from "../../components/createpost/CreatePostHeader";
import StepIndicator from "../../components/createpost/StepIndicator";
import StepOne from "../../components/createpost/StepOne";
import StepNavigation from "../../components/createpost/StepNavigation";
import AlertMessages from "../../components/createpost/AlertMessages";

// Lazy load các component của các bước để tối ưu hiệu suất
const StepTwo = React.lazy(() => import("../../components/createpost/StepTwo"));
const StepThree = React.lazy(() =>
  import("../../components/createpost/StepThree")
);
const StepFour = React.lazy(() =>
  import("../../components/createpost/StepFour")
);

function CreatePost() {
  const {
    postType,
    activeStep,
    completed,
    formData,
    requirementInput,
    benefitInput,
    submitSuccess,
    submitError,
    formErrors,
    isSubmitting,
    successMessage,
    errorMessage,
    cvFile,
    cvFileName,
    cvError,
    setRequirementInput,
    setBenefitInput,
    handleBack,
    handleStep,
    handleNextStep,
    handlePostTypeChange,
    handleInputChange,
    handleDeadlineChange,
    addRequirement,
    removeRequirement,
    addBenefit,
    removeBenefit,
    handleCvUpload,
    handleRemoveCv,
    handleSalaryRangeChange,
    valueLabelFormat,
    handleSubmit,
  } = useCreatePostForm();

  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Các bước trong form
  const steps = [
    {
      label: "Loại bài đăng",
      optional: false,
    },
    {
      label: "Thông tin cơ bản",
      optional: false,
    },
    {
      label: "Chi tiết công việc",
      optional: false,
    },
    {
      label:
        postType === "hiring" ? "Yêu cầu & Quyền lợi" : "Kỹ năng & Mong muốn",
      optional: false,
    },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        py: { xs: 4, md: 6 },
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, rgba(249, 250, 255, 1) 0%, rgba(240, 242, 255, 1) 100%)"
            : "linear-gradient(135deg, rgba(25, 25, 35, 1) 0%, rgba(35, 35, 45, 1) 100%)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <CreatePostHeader handleBack={() => navigate("/dashboard")} />

        {/* Stepper */}
        {!isMobile && (
          <StepIndicator
            steps={steps}
            activeStep={activeStep}
            completed={completed}
            handleStep={handleStep}
            isMobile={isMobile}
          />
        )}

        <Card
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          elevation={isMobile ? 2 : 4}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.07)",
            background: "white",
            mb: 4,
            border: "1px solid rgba(100, 108, 255, 0.1)",
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5, md: 4.5 } }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {/* Nội dung từng bước */}
              {activeStep === 0 && (
                <StepOne
                  postType={postType}
                  handlePostTypeChange={handlePostTypeChange}
                  handleNextStep={handleNextStep}
                />
              )}

              {activeStep === 1 && (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <StepTwo
                    postType={postType}
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                    handleDeadlineChange={handleDeadlineChange}
                    handleSalaryRangeChange={handleSalaryRangeChange}
                    valueLabelFormat={valueLabelFormat}
                  />
                </React.Suspense>
              )}

              {activeStep === 2 && (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <StepThree
                    postType={postType}
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                    cvFile={cvFile}
                    cvFileName={cvFileName}
                    cvError={cvError}
                    handleCvUpload={handleCvUpload}
                    handleRemoveCv={handleRemoveCv}
                  />
                </React.Suspense>
              )}

              {activeStep === 3 && (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <StepFour
                    postType={postType}
                    formData={formData}
                    requirementInput={requirementInput}
                    benefitInput={benefitInput}
                    setRequirementInput={setRequirementInput}
                    setBenefitInput={setBenefitInput}
                    addRequirement={addRequirement}
                    removeRequirement={removeRequirement}
                    addBenefit={addBenefit}
                    removeBenefit={removeBenefit}
                  />
                </React.Suspense>
              )}

              {/* Navigation buttons */}
              {activeStep > 0 && (
                <StepNavigation
                  activeStep={activeStep}
                  isLastStep={activeStep === 3}
                  isSubmitting={isSubmitting}
                  handleBack={handleBack}
                  handleNextStep={handleNextStep}
                  handleSubmit={handleSubmit}
                />
              )}

              {/* Error and success messages */}
              <AlertMessages
                submitSuccess={submitSuccess}
                submitError={submitError}
                successMessage={successMessage}
                errorMessage={errorMessage}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Floating back button for mobile */}
        {isMobile && activeStep > 0 && (
          <Fab
            color="default"
            aria-label="back"
            size="medium"
            onClick={handleBack}
            sx={{
              position: "fixed",
              bottom: 16,
              left: 16,
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              zIndex: 1000,
            }}
          >
            <ArrowBackIcon />
          </Fab>
        )}

        {/* Mobile stepper navigation */}
        {isMobile && (
          <StepIndicator
            steps={steps}
            activeStep={activeStep}
            completed={completed}
            handleStep={handleStep}
            isMobile={isMobile}
          />
        )}
      </Container>
    </Box>
  );
}

export default CreatePost;

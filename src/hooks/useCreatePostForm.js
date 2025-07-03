import { useState } from "react";
import { createJob } from "../api/jobs";
import { useNavigate } from "react-router-dom";
import { defaultFormData } from "../constants/formData";

export const useCreatePostForm = () => {
  const navigate = useNavigate();

  // Form states
  const [postType, setPostType] = useState("hiring"); // "hiring" hoặc "seeking"
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [formData, setFormData] = useState(defaultFormData);
  const [requirementInput, setRequirementInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");

  // Status states
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // CV file states
  const [cvFile, setCvFile] = useState(null);
  const [cvFileName, setCvFileName] = useState("");
  const [cvError, setCvError] = useState("");

  // Steps navigation handlers
  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);

    // Đánh dấu bước hiện tại là hoàn thành
    setCompleted((prev) => ({
      ...prev,
      [activeStep]: true,
    }));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  // Form validation
  const validateCurrentStep = () => {
    let isValid = true;
    let errors = {};

    if (activeStep === 1) {
      if (!formData.title) {
        errors.title = "Vui lòng nhập tiêu đề";
        isValid = false;
      }

      if (!formData.location) {
        errors.location = "Vui lòng nhập địa điểm";
        isValid = false;
      }

      if (!formData.category) {
        errors.category = "Vui lòng chọn lĩnh vực";
        isValid = false;
      }

      if (!formData.type) {
        errors.type = "Vui lòng chọn loại hình công việc";
        isValid = false;
      }
    }

    if (activeStep === 2) {
      if (!formData.description) {
        errors.description = "Vui lòng nhập mô tả";
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle next step with validation
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      handleNext();
    }
  };

  // Post type change
  const handlePostTypeChange = (event, newType) => {
    if (newType !== null) {
      setPostType(newType);
      // Reset form khi chuyển loại bài đăng
      setFormData(defaultFormData);
    }
  };

  // Form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Deadline change
  const handleDeadlineChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      deadline: date,
    }));
  };

  // Requirements handlers
  const addRequirement = () => {
    if (requirementInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, requirementInput.trim()],
      }));
      setRequirementInput("");
    }
  };

  const removeRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  // Benefits handlers
  const addBenefit = () => {
    if (benefitInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, benefitInput.trim()],
      }));
      setBenefitInput("");
    }
  };

  const removeBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  // Auth check
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  // CV upload handlers
  const handleCvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Kiểm tra kích thước file (giới hạn 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setCvError("File không được vượt quá 5MB");
        return;
      }

      // Kiểm tra định dạng file (PDF, DOC, DOCX)
      const fileType = file.type;
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!validTypes.includes(fileType)) {
        setCvError("Chỉ chấp nhận file PDF, DOC hoặc DOCX");
        return;
      }

      setCvFile(file);
      setCvFileName(file.name);
      setCvError("");
    }
  };

  const handleRemoveCv = () => {
    setCvFile(null);
    setCvFileName("");
  };

  // Salary range handler
  const handleSalaryRangeChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      salaryRange: newValue,
      // Cập nhật cả trường salary để tương thích với phiên bản cũ
      salary: `${newValue[0]}-${newValue[1]} triệu`,
    }));
  };

  const valueLabelFormat = (value) => {
    return `${value} triệu`;
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(false);
    setSubmitSuccess(false);
    setFormErrors({});

    // Validate các trường bắt buộc
    const errors = {};
    if (!formData.title) errors.title = "Vui lòng nhập tiêu đề";
    if (!formData.location) errors.location = "Vui lòng nhập địa điểm";
    if (!formData.category) errors.category = "Vui lòng chọn lĩnh vực";
    if (!formData.type) errors.type = "Vui lòng chọn loại hình công việc";
    if (!formData.description) errors.description = "Vui lòng nhập mô tả";

    // Validate requirements và benefits
    if (formData.postType === "hiring") {
      if (formData.requirements.length === 0) {
        errors.requirements = "Vui lòng thêm ít nhất một yêu cầu công việc";
      }
      if (formData.benefits.length === 0) {
        errors.benefits = "Vui lòng thêm ít nhất một quyền lợi";
      }
    } else {
      if (formData.requirements.length === 0) {
        errors.requirements = "Vui lòng thêm ít nhất một kỹ năng";
      }
      if (formData.benefits.length === 0) {
        errors.benefits = "Vui lòng thêm ít nhất một mong muốn";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitError(true);
      setErrorMessage("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      setIsSubmitting(true);
      const jobData = {
        ...formData,
        deadline: formData.deadline ? formData.deadline.toISOString() : null,
      };

      const response = await createJob(jobData);
      if (response.success) {
        setSubmitSuccess(true);
        setSuccessMessage("Tạo bài đăng thành công!");
        setTimeout(() => {
          navigate("/posts");
        }, 1500);
      } else {
        throw new Error(response.message || "Tạo bài đăng không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài đăng:", error);
      setSubmitError(true);
      setErrorMessage(error.message || "Đã xảy ra lỗi khi tạo bài đăng");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Form states
    postType,
    activeStep,
    completed,
    formData,
    requirementInput,
    benefitInput,

    // Status states
    submitSuccess,
    submitError,
    formErrors,
    isSubmitting,
    successMessage,
    errorMessage,

    // CV file states
    cvFile,
    cvFileName,
    cvError,

    // Handlers
    setPostType,
    setActiveStep,
    setRequirementInput,
    setBenefitInput,
    setFormErrors,
    handleNext,
    handleBack,
    handleStep,
    validateCurrentStep,
    handleNextStep,
    handlePostTypeChange,
    handleInputChange,
    handleDeadlineChange,
    addRequirement,
    removeRequirement,
    addBenefit,
    removeBenefit,
    isAuthenticated,
    handleCvUpload,
    handleRemoveCv,
    handleSalaryRangeChange,
    valueLabelFormat,
    handleSubmit,
  };
};

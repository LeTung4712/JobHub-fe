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

    // Kiểm tra người dùng đã đăng nhập chưa
    if (!isAuthenticated()) {
      // Hiển thị thông báo lỗi
      setSubmitError(true);
      setErrorMessage("Vui lòng đăng nhập để đăng bài");

      // Chuyển hướng đến trang đăng nhập sau 2 giây
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    // Validate form
    if (
      !formData.title ||
      !formData.location ||
      !formData.category ||
      !formData.description
    ) {
      setSubmitError(true);
      setErrorMessage("Vui lòng điền đầy đủ các trường bắt buộc");
      setTimeout(() => setSubmitError(false), 5000);
      return;
    }

    // Kiểm tra CV đối với bài đăng tìm việc
    if (postType === "seeking" && !cvFile) {
      setSubmitError(true);
      setErrorMessage("Vui lòng tải lên CV của bạn");
      setTimeout(() => setSubmitError(false), 5000);
      return;
    }

    try {
      setIsSubmitting(true);

      // Chuẩn bị dữ liệu gửi lên API
      const jobData = {
        ...formData,
        postType: postType,
        status: "active",
        deadline: formData.deadline
          ? formData.deadline.toISOString()
          : undefined,
        title: formData.title.trim(),
        location: formData.location.trim(),
        category: formData.category,
        type: formData.type,
        description: formData.description.trim(),
        experience: formData.experience,
        salary: `${formData.salaryRange[0]}-${formData.salaryRange[1]} triệu`,
        salaryMin: formData.salaryRange[0],
        salaryMax: formData.salaryRange[1],
        industry:
          postType === "hiring"
            ? formData.industry || "Công nghệ thông tin"
            : undefined,
        companySize:
          postType === "hiring"
            ? formData.companySize || "Không xác định"
            : undefined,
        website: postType === "hiring" ? formData.website || "" : undefined,
        applicants: 0,
        views: 0,
        requirements: Array.isArray(formData.requirements)
          ? formData.requirements.filter(Boolean)
          : [],
        benefits: Array.isArray(formData.benefits)
          ? formData.benefits.filter(Boolean)
          : [],
      };

      // Nếu có CV file, thêm vào formData để gửi
      let formDataToSend;

      if (postType === "seeking" && cvFile) {
        // Sử dụng FormData khi có file cần gửi
        const formDataWithFile = new FormData();

        // Thêm tất cả dữ liệu job
        Object.keys(jobData).forEach((key) => {
          if (key === "requirements" || key === "benefits") {
            // Chuyển đổi mảng thành chuỗi JSON
            formDataWithFile.append(key, JSON.stringify(jobData[key]));
          } else if (jobData[key] !== undefined && jobData[key] !== null) {
            formDataWithFile.append(key, jobData[key]);
          }
        });

        // Thêm file CV
        formDataWithFile.append("cv", cvFile);
        formDataWithFile.append("cvFileName", cvFileName);

        formDataToSend = formDataWithFile;
      } else {
        formDataToSend = jobData;
      }

      // Gọi API tạo công việc với config phù hợp
      const response = await createJob(
        formDataToSend,
        postType === "seeking" && cvFile
      );

      if (response.success) {
        // Hiển thị thông báo thành công
        setSubmitSuccess(true);
        setSuccessMessage(
          "Đăng bài thành công! Bạn sẽ được chuyển hướng sau giây lát."
        );

        // Chuyển hướng sau khi đăng thành công
        setTimeout(() => {
          setSubmitSuccess(false);
          navigate("/dashboard"); // Redirect to dashboard after successful submit
        }, 3000);
      } else {
        // Hiển thị thông báo lỗi từ API
        setSubmitError(true);
        setErrorMessage(response.message || "Đã xảy ra lỗi khi đăng bài");
        setTimeout(() => setSubmitError(false), 5000);
      }
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      // Hiển thị thông báo lỗi
      setSubmitError(true);
      setErrorMessage(error.message || "Đã xảy ra lỗi khi đăng bài");
      setTimeout(() => setSubmitError(false), 5000);
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

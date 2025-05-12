// Dữ liệu cho form CreatePost

// Danh sách các lĩnh vực
export const categories = [
  { label: "Phát triển phần mềm", value: "software" },
  { label: "Thiết kế", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Quản lý dự án", value: "project-management" },
  { label: "Kế toán & Tài chính", value: "finance" },
  { label: "Dịch vụ khách hàng", value: "customer-service" },
  { label: "Sales", value: "sales" },
  { label: "Nhân sự", value: "hr" },
  { label: "Giáo dục", value: "education" },
  { label: "Khác", value: "other" },
];

// Loại hình công việc
export const jobTypes = [
  { label: "Toàn thời gian", value: "full-time" },
  { label: "Bán thời gian", value: "part-time" },
  { label: "Freelance", value: "freelance" },
  { label: "Hợp đồng", value: "contract" },
  { label: "Thực tập", value: "internship" },
  { label: "Remote", value: "remote" },
];

// Cấp độ kinh nghiệm
export const experienceLevels = [
  { label: "Mới đi làm", value: "entry" },
  { label: "1-2 năm", value: "junior" },
  { label: "3-5 năm", value: "mid" },
  { label: "5+ năm", value: "senior" },
  { label: "Chuyên gia", value: "expert" },
];

// Form mặc định
export const defaultFormData = {
  title: "",
  company: "",
  location: "",
  salary: "",
  category: "software",
  type: "full-time",
  experience: "entry",
  description: "",
  requirements: [],
  benefits: [],
  deadline: null,
  industry: "",
  companySize: "",
  website: "",
  salaryRange: [10, 25], // Mức lương mặc định từ 10-25 triệu
};

/**
 * Hàm tạo slug từ chuỗi tiếng Việt
 * @param {string} str - Chuỗi cần chuyển đổi thành slug
 * @param {number} maxLength - Độ dài tối đa của slug (mặc định: 50)
 * @returns {string} - Slug đã được tạo
 */
export const slugify = (str, maxLength = 50) => {
  if (!str) return "";

  // Chuyển về chữ thường
  let slug = str.toLowerCase();

  // Chuyển đổi các ký tự tiếng Việt
  const vietnameseMap = {
    "à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ": "a",
    "è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ": "e",
    "ì|í|ị|ỉ|ĩ": "i",
    "ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ": "o",
    "ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ": "u",
    "ỳ|ý|ỵ|ỷ|ỹ": "y",
    đ: "d",
  };

  // Thay thế các ký tự tiếng Việt
  for (const [key, value] of Object.entries(vietnameseMap)) {
    slug = slug.replace(new RegExp(key, "g"), value);
  }

  // Loại bỏ các ký tự đặc biệt, chỉ giữ lại chữ cái, số và dấu gạch ngang
  slug = slug.replace(/[^a-z0-9\s-]/g, "");

  // Thay thế khoảng trắng bằng dấu gạch ngang
  slug = slug.replace(/\s+/g, "-");

  // Loại bỏ các dấu gạch ngang liên tiếp
  slug = slug.replace(/-+/g, "-");

  // Loại bỏ dấu gạch ngang ở đầu và cuối
  slug = slug.replace(/^-+|-+$/g, "");

  // Giới hạn độ dài
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
    // Đảm bảo không cắt giữa từ
    slug = slug.substring(0, slug.lastIndexOf("-"));
  }

  return slug;
};

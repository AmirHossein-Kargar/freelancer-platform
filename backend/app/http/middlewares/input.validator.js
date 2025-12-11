const createError = require("http-errors");

// Advanced input validation and sanitization
const inputValidator = {
  // Validate and sanitize phone number
  validatePhoneNumber: (phoneNumber) => {
    if (!phoneNumber || typeof phoneNumber !== "string") {
      throw createError.BadRequest("شماره موبایل معتبر وارد کنید");
    }

    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, "");

    // Check Iranian mobile number format
    if (!/^09[0-9]{9}$/.test(cleaned)) {
      throw createError.BadRequest(
        "شماره موبایل باید با 09 شروع شده و 11 رقم باشد"
      );
    }

    return cleaned;
  },

  // Validate and sanitize email
  validateEmail: (email) => {
    if (!email || typeof email !== "string") {
      throw createError.BadRequest("ایمیل معتبر وارد کنید");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleaned = email.trim().toLowerCase();

    if (!emailRegex.test(cleaned)) {
      throw createError.BadRequest("فرمت ایمیل صحیح نیست");
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /[<>'"]/,
      /javascript:/i,
      /data:/i,
      /vbscript:/i,
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(cleaned)) {
        throw createError.BadRequest("ایمیل حاوی کاراکترهای غیرمجاز است");
      }
    }

    return cleaned;
  },

  // Validate and sanitize name
  validateName: (name) => {
    if (!name || typeof name !== "string") {
      throw createError.BadRequest("نام معتبر وارد کنید");
    }

    const cleaned = name.trim();

    if (cleaned.length < 2 || cleaned.length > 50) {
      throw createError.BadRequest("نام باید بین 2 تا 50 کاراکتر باشد");
    }

    // Allow Persian, Arabic, and English letters, spaces, and common punctuation
    const nameRegex =
      /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z\s\-\.]+$/;

    if (!nameRegex.test(cleaned)) {
      throw createError.BadRequest("نام حاوی کاراکترهای غیرمجاز است");
    }

    return cleaned;
  },

  // Validate OTP code
  validateOTP: (otp) => {
    if (!otp || typeof otp !== "string") {
      throw createError.BadRequest("کد تایید معتبر وارد کنید");
    }

    const cleaned = otp.replace(/\D/g, "");

    if (cleaned.length < 4 || cleaned.length > 6) {
      throw createError.BadRequest("کد تایید باید بین 4 تا 6 رقم باشد");
    }

    return cleaned;
  },

  // General text sanitization
  sanitizeText: (text, maxLength = 1000) => {
    if (!text || typeof text !== "string") {
      return "";
    }

    let cleaned = text.trim();

    // Remove potentially dangerous characters
    cleaned = cleaned.replace(/[<>'"]/g, "");

    // Limit length
    if (cleaned.length > maxLength) {
      cleaned = cleaned.substring(0, maxLength);
    }

    return cleaned;
  },

  // Validate file uploads (if needed in future)
  validateFile: (file) => {
    if (!file) {
      throw createError.BadRequest("فایل انتخاب نشده است");
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
      throw createError.BadRequest("نوع فایل مجاز نیست");
    }

    if (file.size > maxSize) {
      throw createError.BadRequest("حجم فایل بیش از حد مجاز است");
    }

    return true;
  },
};

// Middleware to validate common inputs
const validateCommonInputs = (req, res, next) => {
  try {
    // Validate phone number if present
    if (req.body.phoneNumber) {
      req.body.phoneNumber = inputValidator.validatePhoneNumber(
        req.body.phoneNumber
      );
    }

    // Validate email if present
    if (req.body.email) {
      req.body.email = inputValidator.validateEmail(req.body.email);
    }

    // Validate name if present
    if (req.body.name) {
      req.body.name = inputValidator.validateName(req.body.name);
    }

    // Validate OTP if present
    if (req.body.otp) {
      req.body.otp = inputValidator.validateOTP(req.body.otp);
    }

    // Sanitize biography if present
    if (req.body.biography) {
      req.body.biography = inputValidator.sanitizeText(req.body.biography, 200);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  inputValidator,
  validateCommonInputs,
};

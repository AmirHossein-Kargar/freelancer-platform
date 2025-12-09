const rateLimit = require("express-rate-limit");

// Rate limiter for getting OTP (sending SMS)
const getOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 OTP requests per 15 minutes
  message: {
    statusCode: 429,
    message: "درخواست‌ های زیادی ارسال شده است لطفاً 15 دقیقه دیگر تلاش کنید",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      statusCode: 429,
      message:
        "درخواست‌ های زیادی برای دریافت کد ارسال شده است لطفاً 15 دقیقه دیگر تلاش کنید",
    });
  },
});

// Rate limiter for checking OTP (verifying code)
const checkOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 verification attempts per 15 minutes
  message: {
    statusCode: 429,
    message:
      "تلاش‌ های زیادی برای وارد کردن کد انجام شده است لطفاً 15 دقیقه دیگر تلاش کنید",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      statusCode: 429,
      message:
        "تلاش‌ های زیادی برای وارد کردن کد انجام شده است لطفاً 15 دقیقه دیگر تلاش کنید",
    });
  },
});

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    statusCode: 429,
    message: "درخواست‌ های زیادی ارسال شده است لطفاً کمی صبر کنید",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { getOtpLimiter, checkOtpLimiter, apiLimiter };

const rateLimit = require("express-rate-limit");
const { securityLogger } = require("./security.logger");

// Check if rate limiting is enabled
const isRateLimitingEnabled = process.env.ENABLE_RATE_LIMITING === "true";

// Dummy middleware that does nothing (when rate limiting is disabled)
const noOpMiddleware = (req, res, next) => next();

// Rate limiter for getting OTP (sending SMS)
const getOtpLimiterInstance = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 OTP requests per 15 minutes
  message: {
    statusCode: 429,
    message: "درخواست‌ های زیادی ارسال شده است لطفاً 15 دقیقه دیگر تلاش کنید",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    securityLogger.log(
      "OTP_RATE_LIMIT_EXCEEDED",
      {
        phoneNumber: req.body.phoneNumber,
        attempts: "exceeded_limit",
      },
      req
    );

    res.status(429).json({
      statusCode: 429,
      message:
        "درخواست‌ های زیادی برای دریافت کد ارسال شده است لطفاً 15 دقیقه دیگر تلاش کنید",
    });
  },
});

// Rate limiter for checking OTP (verifying code)
const checkOtpLimiterInstance = rateLimit({
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
    securityLogger.log(
      "OTP_VERIFICATION_RATE_LIMIT_EXCEEDED",
      {
        phoneNumber: req.body.phoneNumber,
        attempts: "exceeded_limit",
      },
      req
    );

    res.status(429).json({
      statusCode: 429,
      message:
        "تلاش‌ های زیادی برای وارد کردن کد انجام شده است لطفاً 15 دقیقه دیگر تلاش کنید",
    });
  },
});

// General API rate limiter
const apiLimiterInstance = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    statusCode: 429,
    message: "درخواست‌ های زیادی ارسال شده است لطفاً کمی صبر کنید",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  getOtpLimiter: isRateLimitingEnabled ? getOtpLimiterInstance : noOpMiddleware,
  checkOtpLimiter: isRateLimitingEnabled
    ? checkOtpLimiterInstance
    : noOpMiddleware,
  apiLimiter: isRateLimitingEnabled ? apiLimiterInstance : noOpMiddleware,
};

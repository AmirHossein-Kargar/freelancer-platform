const crypto = require("crypto");
const createError = require("http-errors");

// Simple CSRF protection using double submit cookie pattern
class CSRFProtection {
  constructor() {
    this.tokenName = "csrf-token";
    this.cookieName = "csrf-cookie";
  }

  // Generate CSRF token
  generateToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  // Middleware to set CSRF token
  setToken() {
    return (req, res, next) => {
      if (req.method === "GET") {
        const token = this.generateToken();

        // Set token in cookie
        res.cookie(this.cookieName, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600000, // 1 hour
        });

        // Also send in response header for client to use
        res.setHeader("X-CSRF-Token", token);
      }
      next();
    };
  }

  // Middleware to verify CSRF token
  verifyToken() {
    return (req, res, next) => {
      // Skip verification for GET, HEAD, OPTIONS
      if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        return next();
      }

      const tokenFromHeader = req.get("X-CSRF-Token") || req.body._csrf;
      const tokenFromCookie = req.signedCookies[this.cookieName];

      if (!tokenFromHeader || !tokenFromCookie) {
        throw createError.Forbidden("CSRF token missing");
      }

      if (tokenFromHeader !== tokenFromCookie) {
        throw createError.Forbidden("CSRF token mismatch");
      }

      next();
    };
  }
}

const csrfProtection = new CSRFProtection();

module.exports = {
  setCSRFToken: csrfProtection.setToken(),
  verifyCSRFToken: csrfProtection.verifyToken(),
};

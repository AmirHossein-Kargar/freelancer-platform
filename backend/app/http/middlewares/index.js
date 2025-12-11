// Central export for all security middlewares
const { securityMiddleware } = require("./security.middleware");
const {
  logSuspiciousActivity,
  logInjectionAttempts,
  securityLogger,
} = require("./security.logger");
const {
  generalConcurrentLimiter,
  authConcurrentLimiter,
} = require("./concurrent.limiter");
const { inputValidator, validateCommonInputs } = require("./input.validator");
const { setCSRFToken, verifyCSRFToken } = require("./csrf.protection");
const { ipFilter, ipFilterInstance } = require("./ip.filter");
const {
  sessionSecurity,
  sessionSecurityInstance,
} = require("./session.security");
const { getOtpLimiter, checkOtpLimiter, apiLimiter } = require("./rateLimiter");

// Security middleware stack for different route types
const securityStack = {
  // Basic security for all routes
  basic: [
    logSuspiciousActivity,
    logInjectionAttempts,
    ipFilter,
    generalConcurrentLimiter,
  ],

  // Enhanced security for authentication routes
  auth: [
    logSuspiciousActivity,
    logInjectionAttempts,
    ipFilter,
    authConcurrentLimiter,
    validateCommonInputs,
  ],

  // Full security for sensitive operations
  sensitive: [
    logSuspiciousActivity,
    logInjectionAttempts,
    ipFilter,
    authConcurrentLimiter,
    validateCommonInputs,
    sessionSecurity,
    verifyCSRFToken,
  ],
};

module.exports = {
  // Individual middlewares
  securityMiddleware,
  logSuspiciousActivity,
  logInjectionAttempts,
  securityLogger,
  generalConcurrentLimiter,
  authConcurrentLimiter,
  inputValidator,
  validateCommonInputs,
  setCSRFToken,
  verifyCSRFToken,
  ipFilter,
  ipFilterInstance,
  sessionSecurity,
  sessionSecurityInstance,
  getOtpLimiter,
  checkOtpLimiter,
  apiLimiter,

  // Security stacks
  securityStack,
};

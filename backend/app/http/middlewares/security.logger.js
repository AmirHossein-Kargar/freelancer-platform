const fs = require("fs");
const path = require("path");

// Security event logger
class SecurityLogger {
  constructor() {
    this.logDir = path.join(__dirname, "../../../logs");
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  log(event, details, req) {
    const timestamp = new Date().toISOString();
    const ip = req.ip || req.connection.remoteAddress || "unknown";
    const userAgent = req.get("User-Agent") || "unknown";

    const logEntry = {
      timestamp,
      event,
      ip,
      userAgent,
      url: req.originalUrl,
      method: req.method,
      details,
    };

    const logFile = path.join(
      this.logDir,
      `security-${new Date().toISOString().split("T")[0]}.log`
    );
    const logLine = JSON.stringify(logEntry) + "\n";

    fs.appendFileSync(logFile, logLine);
  }
}

const securityLogger = new SecurityLogger();

// Middleware to log suspicious activities
const logSuspiciousActivity = (req, res, next) => {
  // Log multiple failed login attempts
  const originalSend = res.send;
  res.send = function (data) {
    if (res.statusCode === 429) {
      securityLogger.log(
        "RATE_LIMIT_EXCEEDED",
        {
          statusCode: res.statusCode,
          path: req.path,
        },
        req
      );
    }

    if (res.statusCode === 401 || res.statusCode === 403) {
      securityLogger.log(
        "UNAUTHORIZED_ACCESS_ATTEMPT",
        {
          statusCode: res.statusCode,
          path: req.path,
          body: req.body,
        },
        req
      );
    }

    originalSend.call(this, data);
  };

  next();
};

// Log potential SQL injection attempts
const logInjectionAttempts = (req, res, next) => {
  const suspiciousPatterns = [
    /(\$where|\$ne|\$gt|\$lt|\$gte|\$lte|\$in|\$nin|\$regex)/i,
    /(union|select|insert|update|delete|drop|create|alter)/i,
    /(<script|javascript:|vbscript:|onload|onerror)/i,
  ];

  const checkForInjection = (obj, path = "") => {
    if (typeof obj === "string") {
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(obj)) {
          securityLogger.log(
            "INJECTION_ATTEMPT",
            {
              pattern: pattern.toString(),
              value: obj,
              path: path,
            },
            req
          );
          break;
        }
      }
    } else if (typeof obj === "object" && obj !== null) {
      for (const [key, value] of Object.entries(obj)) {
        checkForInjection(value, `${path}.${key}`);
      }
    }
  };

  if (req.body) checkForInjection(req.body, "body");
  if (req.query) checkForInjection(req.query, "query");
  if (req.params) checkForInjection(req.params, "params");

  next();
};

module.exports = {
  securityLogger,
  logSuspiciousActivity,
  logInjectionAttempts,
};

const createError = require("http-errors");
const { securityLogger } = require("./security.logger");

// IP filtering middleware
class IPFilter {
  constructor() {
    // These would typically come from database or config file
    this.blacklistedIPs = new Set([
      // Add known malicious IPs here
    ]);

    this.whitelistedIPs = new Set(["127.0.0.1", "::1", "localhost"]);

    // Suspicious IP tracking
    this.suspiciousIPs = new Map(); // IP -> { count, lastSeen, blocked }
    this.maxSuspiciousAttempts = 10;
    this.blockDuration = 60 * 60 * 1000; // 1 hour
  }

  // Add IP to blacklist
  blacklistIP(ip, reason = "Manual blacklist") {
    this.blacklistedIPs.add(ip);
    securityLogger.log("IP_BLACKLISTED", { ip, reason }, { ip });
  }

  // Remove IP from blacklist
  removeFromBlacklist(ip) {
    this.blacklistedIPs.delete(ip);
    securityLogger.log("IP_REMOVED_FROM_BLACKLIST", { ip }, { ip });
  }

  // Track suspicious activity
  trackSuspiciousActivity(ip, activity) {
    const now = Date.now();
    const current = this.suspiciousIPs.get(ip) || {
      count: 0,
      lastSeen: now,
      blocked: false,
    };

    current.count++;
    current.lastSeen = now;

    if (current.count >= this.maxSuspiciousAttempts && !current.blocked) {
      current.blocked = true;
      this.blacklistIP(ip, `Suspicious activity: ${activity}`);

      // Auto-unblock after duration
      setTimeout(() => {
        this.removeFromBlacklist(ip);
        this.suspiciousIPs.delete(ip);
      }, this.blockDuration);
    }

    this.suspiciousIPs.set(ip, current);
  }

  // Main filtering middleware
  filter() {
    return (req, res, next) => {
      const ip = req.ip || req.connection.remoteAddress;

      // Check if IP is blacklisted
      if (this.blacklistedIPs.has(ip)) {
        securityLogger.log("BLOCKED_IP_ACCESS_ATTEMPT", { ip }, req);
        throw createError.Forbidden("دسترسی از این IP مسدود شده است");
      }

      // Check for suspicious patterns in request
      this.checkSuspiciousPatterns(req, ip);

      next();
    };
  }

  // Check for suspicious request patterns
  checkSuspiciousPatterns(req, ip) {
    const suspiciousPatterns = [
      // SQL injection patterns
      /(\bunion\b|\bselect\b|\binsert\b|\bupdate\b|\bdelete\b|\bdrop\b)/i,
      // XSS patterns
      /(<script|javascript:|vbscript:|onload|onerror)/i,
      // Path traversal
      /(\.\.|\/etc\/|\/proc\/|\/sys\/)/i,
      // Command injection
      /(\||;|&|`|\$\(|\${)/,
    ];

    const checkString = `${req.url} ${JSON.stringify(
      req.body
    )} ${JSON.stringify(req.query)}`;

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(checkString)) {
        this.trackSuspiciousActivity(ip, "Malicious pattern detected");
        securityLogger.log(
          "SUSPICIOUS_PATTERN_DETECTED",
          {
            ip,
            pattern: pattern.toString(),
            url: req.url,
            method: req.method,
          },
          req
        );
        break;
      }
    }
  }

  // Get current blacklist (for admin purposes)
  getBlacklist() {
    return Array.from(this.blacklistedIPs);
  }

  // Get suspicious IPs (for admin purposes)
  getSuspiciousIPs() {
    return Array.from(this.suspiciousIPs.entries());
  }
}

const ipFilter = new IPFilter();

module.exports = {
  ipFilter: ipFilter.filter(),
  ipFilterInstance: ipFilter,
};

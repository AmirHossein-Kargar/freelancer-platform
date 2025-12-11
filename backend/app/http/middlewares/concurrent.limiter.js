// Concurrent request limiter to prevent DoS attacks
class ConcurrentLimiter {
  constructor(maxConcurrent = 10) {
    this.maxConcurrent = maxConcurrent;
    this.activeRequests = new Map(); // IP -> count
  }

  middleware() {
    return (req, res, next) => {
      const ip = req.ip || req.connection.remoteAddress;
      const currentCount = this.activeRequests.get(ip) || 0;

      if (currentCount >= this.maxConcurrent) {
        return res.status(429).json({
          statusCode: 429,
          message: "تعداد درخواست‌های همزمان بیش از حد مجاز است",
        });
      }

      // Increment counter
      this.activeRequests.set(ip, currentCount + 1);

      // Decrement counter when request finishes
      const cleanup = () => {
        const count = this.activeRequests.get(ip) || 0;
        if (count <= 1) {
          this.activeRequests.delete(ip);
        } else {
          this.activeRequests.set(ip, count - 1);
        }
      };

      res.on("finish", cleanup);
      res.on("close", cleanup);
      res.on("error", cleanup);

      next();
    };
  }
}

// Create limiter instances for different endpoints
const generalLimiter = new ConcurrentLimiter(10);
const authLimiter = new ConcurrentLimiter(3); // More restrictive for auth endpoints

module.exports = {
  generalConcurrentLimiter: generalLimiter.middleware(),
  authConcurrentLimiter: authLimiter.middleware(),
};

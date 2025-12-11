const createError = require("http-errors");
const { securityLogger } = require("./security.logger");

// Session security middleware
class SessionSecurity {
  constructor() {
    // Track active sessions per user
    this.activeSessions = new Map(); // userId -> Set of sessionIds
    this.sessionData = new Map(); // sessionId -> { userId, ip, userAgent, createdAt, lastActivity }
    this.maxSessionsPerUser = 3;
    this.sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
  }

  // Create new session
  createSession(userId, req) {
    const sessionId = this.generateSessionId();
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get("User-Agent") || "unknown";

    // Clean up old sessions for this user
    this.cleanupUserSessions(userId);

    // Add new session
    if (!this.activeSessions.has(userId)) {
      this.activeSessions.set(userId, new Set());
    }

    const userSessions = this.activeSessions.get(userId);

    // If user has too many sessions, remove oldest
    if (userSessions.size >= this.maxSessionsPerUser) {
      const oldestSession = Array.from(userSessions)[0];
      this.removeSession(oldestSession);
    }

    userSessions.add(sessionId);

    this.sessionData.set(sessionId, {
      userId,
      ip,
      userAgent,
      createdAt: Date.now(),
      lastActivity: Date.now(),
    });

    securityLogger.log(
      "SESSION_CREATED",
      {
        userId,
        sessionId,
        ip,
        userAgent,
      },
      req
    );

    return sessionId;
  }

  // Validate session
  validateSession(sessionId, req) {
    const session = this.sessionData.get(sessionId);

    if (!session) {
      throw createError.Unauthorized("جلسه کاری نامعتبر است");
    }

    const now = Date.now();

    // Check session timeout
    if (now - session.lastActivity > this.sessionTimeout) {
      this.removeSession(sessionId);
      throw createError.Unauthorized("جلسه کاری منقضی شده است");
    }

    // Check IP consistency (optional - can be disabled for mobile users)
    const currentIP = req.ip || req.connection.remoteAddress;
    if (session.ip !== currentIP) {
      securityLogger.log(
        "SESSION_IP_MISMATCH",
        {
          sessionId,
          originalIP: session.ip,
          currentIP,
          userId: session.userId,
        },
        req
      );

      // Optionally invalidate session on IP change
      // this.removeSession(sessionId);
      // throw createError.Unauthorized('تغییر IP تشخیص داده شد');
    }

    // Update last activity
    session.lastActivity = now;

    return session;
  }

  // Remove session
  removeSession(sessionId) {
    const session = this.sessionData.get(sessionId);

    if (session) {
      const userSessions = this.activeSessions.get(session.userId);
      if (userSessions) {
        userSessions.delete(sessionId);
        if (userSessions.size === 0) {
          this.activeSessions.delete(session.userId);
        }
      }

      this.sessionData.delete(sessionId);

      securityLogger.log(
        "SESSION_REMOVED",
        {
          sessionId,
          userId: session.userId,
        },
        { ip: session.ip }
      );
    }
  }

  // Clean up expired sessions for a user
  cleanupUserSessions(userId) {
    const userSessions = this.activeSessions.get(userId);
    if (!userSessions) return;

    const now = Date.now();
    const expiredSessions = [];

    for (const sessionId of userSessions) {
      const session = this.sessionData.get(sessionId);
      if (session && now - session.lastActivity > this.sessionTimeout) {
        expiredSessions.push(sessionId);
      }
    }

    expiredSessions.forEach((sessionId) => this.removeSession(sessionId));
  }

  // Generate secure session ID
  generateSessionId() {
    const crypto = require("crypto");
    return crypto.randomBytes(32).toString("hex");
  }

  // Middleware to check session security
  middleware() {
    return (req, res, next) => {
      // This would integrate with your existing JWT token system
      // For now, we'll just add session tracking to existing auth

      if (req.user) {
        // User is authenticated, track their session
        const sessionId =
          req.headers["x-session-id"] || this.createSession(req.user._id, req);

        try {
          this.validateSession(sessionId, req);
          req.sessionId = sessionId;
        } catch (error) {
          // Session validation failed, but don't break existing auth flow
          securityLogger.log(
            "SESSION_VALIDATION_FAILED",
            {
              error: error.message,
              userId: req.user._id,
            },
            req
          );
        }
      }

      next();
    };
  }

  // Get user sessions (for admin purposes)
  getUserSessions(userId) {
    const userSessions = this.activeSessions.get(userId);
    if (!userSessions) return [];

    return Array.from(userSessions).map((sessionId) => {
      const session = this.sessionData.get(sessionId);
      return {
        sessionId,
        ...session,
        isActive: Date.now() - session.lastActivity < this.sessionTimeout,
      };
    });
  }

  // Force logout user from all sessions
  logoutUser(userId) {
    const userSessions = this.activeSessions.get(userId);
    if (userSessions) {
      Array.from(userSessions).forEach((sessionId) =>
        this.removeSession(sessionId)
      );
    }
  }
}

const sessionSecurity = new SessionSecurity();

module.exports = {
  sessionSecurity: sessionSecurity.middleware(),
  sessionSecurityInstance: sessionSecurity,
};

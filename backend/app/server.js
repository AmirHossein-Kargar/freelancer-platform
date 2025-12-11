const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const createError = require("http-errors");
const path = require("path");
const { allRoutes } = require("./router/router");
const {
  securityMiddleware,
} = require("./http/middlewares/security.middleware");
const {
  logSuspiciousActivity,
  logInjectionAttempts,
} = require("./http/middlewares/security.logger");
const {
  generalConcurrentLimiter,
} = require("./http/middlewares/concurrent.limiter");
dotenv.config();
class Application {
  #app = express();
  #PORT = process.env.PORT || 5000;
  #DB_URI = process.env.APP_DB;

  constructor() {
    this.createServer();
    this.connectToDB();
    this.configServer();
    this.initClientSession();
    this.configRoutes();
    this.errorHandling();
  }
  createServer() {
    this.#app.listen(this.#PORT, () =>
      console.log(`listening on port ${this.#PORT}`)
    );
  }
  connectToDB() {
    mongoose
      .connect(this.#DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log("MongoDB connected!!"))
      .catch((err) => console.log("Failed to connect to MongoDB", err));
  }
  configServer() {
    // Apply security middleware first
    securityMiddleware(this.#app);

    // Trust proxy for accurate IP addresses
    this.#app.set("trust proxy", 1);

    // CORS configuration
    this.#app.use(
      cors({
        credentials: true,
        origin: process.env.ALLOW_CORS_ORIGIN,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      })
    );

    // Body parsing with size limits
    this.#app.use(express.json({ limit: "10mb" }));
    this.#app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Security logging
    this.#app.use(logSuspiciousActivity);
    this.#app.use(logInjectionAttempts);

    // Concurrent request limiting
    this.#app.use(generalConcurrentLimiter);

    // Static files
    this.#app.use(express.static(path.join(__dirname, "..")));
  }
  initClientSession() {
    this.#app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY));
  }
  configRoutes() {
    this.#app.use("/api", allRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر یافت نشد"));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        statusCode,
        message,
      });
    });
  }
}

module.exports = Application;

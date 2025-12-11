const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const { verifyAccessToken } = require("../http/middlewares/user.middleware");
const {
  UserAuthController,
} = require("../http/controllers/userAuth.controller");
const {
  getOtpLimiter,
  checkOtpLimiter,
} = require("../http/middlewares/rateLimiter");
const {
  authConcurrentLimiter,
} = require("../http/middlewares/concurrent.limiter");
const { validateCommonInputs } = require("../http/middlewares/input.validator");

router.post(
  "/get-otp",
  authConcurrentLimiter,
  getOtpLimiter,
  validateCommonInputs,
  expressAsyncHandler(UserAuthController.getOtp)
);
router.post(
  "/check-otp",
  authConcurrentLimiter,
  checkOtpLimiter,
  validateCommonInputs,
  expressAsyncHandler(UserAuthController.checkOtp)
);
router.post(
  "/complete-profile",
  verifyAccessToken,
  validateCommonInputs,
  expressAsyncHandler(UserAuthController.completeProfile)
);
router.get(
  "/refresh-token",
  expressAsyncHandler(UserAuthController.refreshToken)
);
router.patch(
  "/update",
  verifyAccessToken,
  validateCommonInputs,
  expressAsyncHandler(UserAuthController.updateProfile)
);

router.get(
  "/profile",
  verifyAccessToken,
  expressAsyncHandler(UserAuthController.getUserProfile)
);

router.post("/logout", expressAsyncHandler(UserAuthController.logout));

module.exports = {
  userAuthRoutes: router,
};

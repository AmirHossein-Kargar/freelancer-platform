const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
// const { uploadFile } = require("../../utils/multer");
const { verifyAccessToken } = require("../http/middlewares/user.middleware");
const {
  UserAuthController,
} = require("../http/controllers/userAuth.controller");
const {
  getOtpLimiter,
  checkOtpLimiter,
} = require("../http/middlewares/rateLimiter");

router.post(
  "/get-otp",
  getOtpLimiter,
  expressAsyncHandler(UserAuthController.getOtp)
);
router.post(
  "/check-otp",
  checkOtpLimiter,
  expressAsyncHandler(UserAuthController.checkOtp)
);
router.post(
  "/complete-profile",
  verifyAccessToken,
  expressAsyncHandler(UserAuthController.completeProfile)
);
router.get(
  "/refresh-token",
  expressAsyncHandler(UserAuthController.refreshToken)
);
router.patch(
  "/update",
  verifyAccessToken,
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

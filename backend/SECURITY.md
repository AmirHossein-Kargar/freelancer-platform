# راهنمای امنیت بک‌اند

## موارد امنیتی پیاده‌سازی شده

### 1. **Rate Limiting**

- محدودیت درخواست OTP: 3 درخواست در 15 دقیقه
- محدودیت تایید OTP: 5 تلاش در 15 دقیقه
- محدودیت کلی API: 100 درخواست در 15 دقیقه

### 2. **Security Headers (Helmet.js)**

- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### 3. **Input Validation & Sanitization**

- MongoDB injection prevention
- XSS attack prevention
- Input validation برای شماره تلفن، ایمیل، نام
- محدودیت حجم درخواست‌ها (10MB)

### 4. **Concurrent Request Limiting**

- محدودیت درخواست‌های همزمان عمومی: 10 درخواست
- محدودیت درخواست‌های همزمان احراز هویت: 3 درخواست

### 5. **Security Logging**

- ثبت تلاش‌های مشکوک
- ثبت تلاش‌های injection
- ثبت تجاوز از rate limit
- ثبت دسترسی‌های غیرمجاز

### 6. **IP Filtering**

- Blacklist برای IP های مخرب
- تشخیص الگوهای مشکوک
- مسدودسازی خودکار IP های مشکوک

### 7. **Session Security**

- ردیابی جلسات کاری
- محدودیت تعداد جلسات همزمان (3 جلسه)
- timeout جلسات (24 ساعت)
- تشخیص تغییر IP

### 8. **CSRF Protection**

- Double submit cookie pattern
- تولید token های امن
- تایید token در درخواست‌های POST/PUT/DELETE

## فایل‌های امنیتی

```
backend/app/http/middlewares/
├── security.middleware.js      # Helmet و security headers
├── security.logger.js         # ثبت رویدادهای امنیتی
├── concurrent.limiter.js       # محدودیت درخواست‌های همزمان
├── input.validator.js          # validation و sanitization
├── csrf.protection.js          # محافظت از CSRF
├── ip.filter.js               # فیلتر IP
├── session.security.js        # امنیت جلسات
├── rateLimiter.js            # محدودیت نرخ درخواست
└── index.js                  # export مرکزی
```

## نحوه استفاده

### اعمال امنیت پایه

```javascript
const { securityStack } = require("./middlewares");
router.use("/api", securityStack.basic);
```

### اعمال امنیت احراز هویت

```javascript
router.post("/login", securityStack.auth, loginController);
```

### اعمال امنیت کامل

```javascript
router.post("/sensitive-operation", securityStack.sensitive, controller);
```

## لاگ‌های امنیتی

لاگ‌ها در مسیر `backend/logs/` ذخیره می‌شوند:

- `security-YYYY-MM-DD.log`: رویدادهای امنیتی روزانه

## متغیرهای محیطی مورد نیاز

```env
NODE_ENV=production              # برای فعال‌سازی HTTPS redirect
COOKIE_PARSER_SECRET_KEY=...     # برای امضای کوکی‌ها
ALLOW_CORS_ORIGIN=...           # دامنه مجاز برای CORS
```

## توصیه‌های اضافی

### 1. **HTTPS**

- در production حتماً از HTTPS استفاده کنید
- گواهی SSL معتبر تهیه کنید

### 2. **Database Security**

- از MongoDB Atlas یا سرور امن استفاده کنید
- authentication و authorization فعال کنید
- backup منظم تهیه کنید

### 3. **Environment Variables**

- secret key ها را در .env نگهداری کنید
- .env را در .gitignore قرار دهید
- از secret key های قوی استفاده کنید

### 4. **Monitoring**

- لاگ‌های امنیتی را مرتب بررسی کنید
- سیستم هشدار برای حملات تنظیم کنید
- metrics امنیتی را track کنید

### 5. **Updates**

- dependencies را مرتب آپدیت کنید
- `npm audit` را اجرا کنید
- security patch ها را سریع اعمال کنید

## تست امنیت

برای تست موارد امنیتی:

```bash
# بررسی آسیب‌پذیری‌ها
npm audit

# تست rate limiting
curl -X POST http://localhost:5000/api/user/get-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"09123456789"}'

# تست security headers
curl -I http://localhost:5000/api/user/profile
```

## گزارش مشکلات امنیتی

اگر مشکل امنیتی پیدا کردید:

1. فوراً به تیم توسعه اطلاع دهید
2. جزئیات را در لاگ‌ها بررسی کنید
3. در صورت لزوم IP مشکوک را مسدود کنید

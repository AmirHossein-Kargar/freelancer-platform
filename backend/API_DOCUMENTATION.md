# 📚 مستندات API - پلتفرم فریلنسینگ

## 🔗 Base URL

```
http://localhost:5000/api
```

## 🔐 احراز هویت (Authentication)

تمام درخواست‌ها از طریق Cookie-based authentication با استفاده از `accessToken` و `refreshToken` انجام می‌شود.

### نقش‌های کاربری (Roles)

- `USER` - کاربر عادی
- `FREELANCER` - فریلنسر
- `OWNER` - کارفرما
- `ADMIN` - مدیر سیستم

---

## 📱 User Authentication APIs

### 1. دریافت کد OTP

**Endpoint:** `POST /user/get-otp`

**توضیحات:** ارسال کد یکبار مصرف به شماره موبایل کاربر

**Request Body:**

```json
{
  "phoneNumber": "09123456789"
}
```

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "کد تائید برای شماره موبایل ۰۹۱۲۳۴۵۶۷۸۹ ارسال گردید",
    "expiresIn": 90000,
    "phoneNumber": "09123456789"
  }
}
```

**Response (Test Mode - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "کد تائید برای ورود تستی: 123456",
    "expiresIn": 90000,
    "phoneNumber": "09123456789"
  }
}
```

**Errors:**

- `400 Bad Request` - شماره موبایل معتبر نیست
- `401 Unauthorized` - ورود انجام نشد

---

### 2. تایید کد OTP

**Endpoint:** `POST /user/check-otp`

**توضیحات:** بررسی صحت کد OTP و ورود کاربر

**Request Body:**

```json
{
  "phoneNumber": "09123456789",
  "otp": "123456"
}
```

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "کد تایید شد، خوش آمدید",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "phoneNumber": "09123456789",
      "name": "نام کاربر",
      "email": "user@example.com",
      "role": "FREELANCER",
      "isActive": true,
      "isVerifiedPhoneNumber": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Response (Profile Incomplete - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "کد تایید شد، لطفا اطلاعات خود را تکمیل کنید",
    "user": { ... }
  }
}
```

**Errors:**

- `400 Bad Request` - کد ارسال شده صحیح نیست یا منقضی شده
- `404 Not Found` - کاربری با این مشخصات یافت نشد

---

### 3. تکمیل پروفایل

**Endpoint:** `POST /user/complete-profile`

**توضیحات:** تکمیل اطلاعات پروفایل کاربر پس از ورود

**Authentication:** Required (accessToken)

**Request Body:**

```json
{
  "name": "علی احمدی",
  "email": "ali@example.com",
  "role": "FREELANCER"
}
```

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "اطلاعات شما با موفقیت تکمیل شد",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "علی احمدی",
      "email": "ali@example.com",
      "phoneNumber": "09123456789",
      "role": "FREELANCER",
      "isActive": true,
      "isVerifiedPhoneNumber": true
    }
  }
}
```

**Errors:**

- `400 Bad Request` - کاربری با این ایمیل قبلا ثبت نام کرده
- `403 Forbidden` - شماره موبایل تایید نشده

---

### 4. بروزرسانی پروفایل

**Endpoint:** `PATCH /user/update`

**توضیحات:** ویرایش اطلاعات پروفایل کاربر

**Authentication:** Required

**Request Body:**

```json
{
  "name": "علی احمدی",
  "email": "ali@example.com",
  "biography": "توضیحات درباره من",
  "phoneNumber": "09123456789"
}
```

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "اطلاعات با موفقیت آپدیت شد"
  }
}
```

**Errors:**

- `400 Bad Request` - اطلاعات ویرایش نشد

---

### 5. دریافت پروفایل کاربر

**Endpoint:** `GET /user/profile`

**توضیحات:** دریافت اطلاعات پروفایل کاربر جاری

**Authentication:** Required

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "علی احمدی",
      "email": "ali@example.com",
      "phoneNumber": "09123456789",
      "role": "FREELANCER",
      "biography": "توضیحات",
      "isActive": true,
      "isVerifiedPhoneNumber": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

### 6. تازه‌سازی توکن

**Endpoint:** `GET /user/refresh-token`

**توضیحات:** دریافت accessToken جدید با استفاده از refreshToken

**Response (Success - 200):**

```json
{
  "StatusCode": 200,
  "data": {
    "user": { ... }
  }
}
```

---

### 7. خروج از حساب

**Endpoint:** `POST /user/logout`

**توضیحات:** خروج کاربر و حذف توکن‌ها

**Response (Success - 200):**

```json
{
  "StatusCode": 200,
  "roles": null,
  "auth": false
}
```

---

## 📂 Category APIs

### 1. دریافت لیست دسته‌بندی‌ها

**Endpoint:** `GET /category/list`

**توضیحات:** دریافت تمام دسته‌بندی‌ها

**Query Parameters (Optional):**

- هر فیلد از مدل Category قابل فیلتر است

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "categories": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "برنامه‌نویسی",
        "englishTitle": "programming",
        "description": "توضیحات",
        "type": "main",
        "parent": null
      }
    ]
  }
}
```

**Errors:**

- `503 Service Unavailable` - دسته بندی ها یافت نشد

---

### 2. دریافت دسته‌بندی با ID

**Endpoint:** `GET /category/:id`

**توضیحات:** دریافت اطلاعات یک دسته‌بندی خاص

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "category": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "برنامه‌نویسی",
      "englishTitle": "programming",
      "description": "توضیحات",
      "type": "main"
    }
  }
}
```

**Errors:**

- `400 Bad Request` - دسته بندی با این عنوان وجود ندارد

---

## 🎯 Project APIs

### 1. دریافت لیست پروژه‌ها

**Endpoint:** `GET /project/list`

**توضیحات:** دریافت لیست تمام پروژه‌ها با قابلیت جستجو و فیلتر

**Authentication:** Required

**Query Parameters:**

- `search` (string) - جستجو در عنوان و توضیحات
- `category` (string) - فیلتر بر اساس دسته‌بندی (مثال: "programming,design")
- `status` (string) - فیلتر وضعیت: "OPEN" یا "CLOSED"
- `sort` (string) - مرتب‌سازی: "latest", "earliest"

**Example:**

```
GET /project/list?search=وب&category=programming&status=OPEN&sort=latest
```

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "projects": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "توسعه وب‌سایت فروشگاهی",
        "description": "نیاز به توسعه یک وب‌سایت فروشگاهی با React",
        "tags": ["react", "nodejs", "mongodb"],
        "budget": 50000000,
        "deadline": "2024-12-31T00:00:00.000Z",
        "status": "OPEN",
        "category": {
          "_id": "...",
          "title": "برنامه‌نویسی",
          "englishTitle": "programming"
        },
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 2. دریافت پروژه‌های کارفرما

**Endpoint:** `GET /project/owner-projects`

**توضیحات:** دریافت لیست پروژه‌های ایجاد شده توسط کارفرما

**Authentication:** Required (OWNER or ADMIN)

**Query Parameters:**

- `search` (string)
- `category` (string)
- `sort` (string) - "latest", "earliest", "popular"

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "projects": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "پروژه من",
        "description": "...",
        "budget": 50000000,
        "status": "OPEN",
        "category": { ... },
        "owner": {
          "_id": "...",
          "name": "علی احمدی"
        },
        "freelancer": {
          "_id": "...",
          "name": "محمد رضایی"
        }
      }
    ]
  }
}
```

---

### 3. ایجاد پروژه جدید

**Endpoint:** `POST /project/add`

**توضیحات:** ایجاد پروژه جدید توسط کارفرما

**Authentication:** Required (OWNER or ADMIN)

**Request Body:**

```json
{
  "title": "توسعه اپلیکیشن موبایل",
  "description": "نیاز به توسعه یک اپلیکیشن موبایل با React Native",
  "tags": ["react-native", "mobile", "ios", "android"],
  "category": "507f1f77bcf86cd799439011",
  "budget": 100000000,
  "deadline": "2024-12-31"
}
```

**Response (Success - 201):**

```json
{
  "statusCode": 201,
  "data": {
    "message": "پروژه با موفقیت ایجاد شد",
    "project": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "توسعه اپلیکیشن موبایل",
      "description": "...",
      "tags": ["react-native", "mobile"],
      "category": "...",
      "budget": 100000000,
      "deadline": "2024-12-31T00:00:00.000Z",
      "owner": "...",
      "status": "OPEN"
    }
  }
}
```

**Errors:**

- `500 Internal Server Error` - پروژه ثبت نشد

---

### 4. دریافت جزئیات پروژه

**Endpoint:** `GET /project/:id`

**توضیحات:** دریافت اطلاعات کامل یک پروژه شامل پیشنهادها

**Authentication:** Required (OWNER or ADMIN)

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "project": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "پروژه من",
      "description": "...",
      "budget": 50000000,
      "category": {
        "title": "برنامه‌نویسی",
        "englishTitle": "programming"
      },
      "owner": {
        "_id": "...",
        "name": "علی احمدی"
      },
      "freelancer": {
        "_id": "...",
        "name": "محمد رضایی"
      },
      "proposals": [
        {
          "_id": "...",
          "description": "پیشنهاد من",
          "price": 45000000,
          "duration": 30,
          "status": 1,
          "user": {
            "_id": "...",
            "name": "محمد رضایی"
          }
        }
      ]
    }
  }
}
```

**Errors:**

- `400 Bad Request` - شناسه پروژه صحیح نیست
- `404 Not Found` - پروژه یافت نشد

---

### 5. بروزرسانی پروژه

**Endpoint:** `PATCH /project/update/:id`

**توضیحات:** ویرایش اطلاعات پروژه

**Authentication:** Required (OWNER or ADMIN)

**Request Body:**

```json
{
  "title": "عنوان جدید",
  "description": "توضیحات جدید",
  "tags": ["tag1", "tag2"],
  "category": "507f1f77bcf86cd799439011",
  "budget": 60000000,
  "deadline": "2024-12-31"
}
```

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "به روز رسانی با موفقیت انجام شد"
  }
}
```

**Errors:**

- `500 Internal Server Error` - به روزرسانی انجام نشد

---

### 6. تغییر وضعیت پروژه

**Endpoint:** `PATCH /project/:id`

**توضیحات:** تغییر وضعیت پروژه (باز/بسته)

**Authentication:** Required (OWNER or ADMIN)

**Request Body:**

```json
{
  "status": "CLOSED"
}
```

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "پروژه بسته شد"
  }
}
```

**Errors:**

- `500 Internal Server Error` - وضعیت پروپوزال آپدیت نشد

---

### 7. حذف پروژه

**Endpoint:** `DELETE /project/:id`

**توضیحات:** حذف پروژه (فقط اگر فریلنسر انتخاب نشده باشد)

**Authentication:** Required (OWNER or ADMIN)

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "پروژه با موفقیت حذف شد"
  }
}
```

**Errors:**

- `400 Bad Request` - پروژه قابل حذف نیست (فریلنسر انتخاب شده)
- `404 Not Found` - پروژه یافت نشد

---

## 💼 Proposal APIs

### 1. دریافت لیست پیشنهادها

**Endpoint:** `GET /proposal/list`

**توضیحات:** دریافت لیست پیشنهادهای فریلنسر

**Authentication:** Required (FREELANCER or ADMIN)

**Query Parameters:**

- `sort` (string) - "latest", "earliest"

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "proposals": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "description": "من می‌توانم این پروژه را انجام دهم",
        "price": 45000000,
        "duration": 30,
        "status": 1,
        "user": "507f1f77bcf86cd799439011",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 2. ایجاد پیشنهاد جدید

**Endpoint:** `POST /proposal/add`

**توضیحات:** ارسال پیشنهاد برای یک پروژه

**Authentication:** Required (FREELANCER or ADMIN)

**Request Body:**

```json
{
  "description": "من می‌توانم این پروژه را با کیفیت بالا انجام دهم",
  "price": 45000000,
  "duration": 30,
  "projectId": "507f1f77bcf86cd799439011"
}
```

**Response (Success - 201):**

```json
{
  "statusCode": 201,
  "data": {
    "message": "پیشنهاد با موفقیت ایجاد شد"
  }
}
```

**Errors:**

- `500 Internal Server Error` - پیشنهاد ثبت نشد

---

### 3. دریافت جزئیات پیشنهاد

**Endpoint:** `GET /proposal/:id`

**توضیحات:** دریافت اطلاعات یک پیشنهاد خاص

**Authentication:** Required (FREELANCER or ADMIN)

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "proposal": {
      "_id": "507f1f77bcf86cd799439011",
      "description": "...",
      "price": 45000000,
      "duration": 30,
      "status": 1,
      "user": "...",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Errors:**

- `400 Bad Request` - شناسه پروژه صحیح نیست
- `404 Not Found` - پروژه یافت نشد

---

### 4. تغییر وضعیت پیشنهاد

**Endpoint:** `PATCH /proposal/:id`

**توضیحات:** تایید یا رد پیشنهاد توسط کارفرما

**Authentication:** Required (OWNER or ADMIN)

**Request Body:**

```json
{
  "status": 2,
  "projectId": "507f1f77bcf86cd799439011"
}
```

**Status Values:**

- `0` - رد شده
- `1` - در انتظار تایید
- `2` - تایید شده

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "وضعیت پروپوزال تایید شد"
  }
}
```

**Errors:**

- `500 Internal Server Error` - وضعیت پروپوزال آپدیت نشد

---

## 👑 Admin APIs

### Category Management

#### 1. افزودن دسته‌بندی

**Endpoint:** `POST /admin/category/add`

**Authentication:** Required (ADMIN)

**Request Body:**

```json
{
  "title": "برنامه‌نویسی",
  "englishTitle": "programming",
  "description": "توضیحات",
  "type": "main",
  "parent": null
}
```

**Response (Success - 201):**

```json
{
  "statusCode": 201,
  "data": {
    "message": "دسته بندی با موفقیت افزوده شد"
  }
}
```

**Errors:**

- `400 Bad Request` - دسته بندی با این عنوان وجود دارد
- `500 Internal Server Error` - خطای داخلی

---

#### 2. بروزرسانی دسته‌بندی

**Endpoint:** `PATCH /admin/category/update/:id`

**Authentication:** Required (ADMIN)

**Request Body:**

```json
{
  "title": "عنوان جدید",
  "englishTitle": "new-title",
  "type": "sub",
  "description": "توضیحات جدید"
}
```

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "به روز رسانی با موفقیت انجام شد"
  }
}
```

---

#### 3. حذف دسته‌بندی

**Endpoint:** `DELETE /admin/category/remove/:id`

**Authentication:** Required (ADMIN)

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "حذف دسته بندی با موفقیت انجام شد"
  }
}
```

---

### User Management

#### 1. دریافت لیست کاربران

**Endpoint:** `GET /admin/user/list`

**Authentication:** Required (ADMIN)

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "users": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "علی احمدی",
        "email": "ali@example.com",
        "phoneNumber": "09123456789",
        "role": "FREELANCER",
        "isActive": true,
        "isVerifiedPhoneNumber": true
      }
    ]
  }
}
```

---

#### 2. تایید کاربر

**Endpoint:** `PATCH /admin/user/verify/:userId`

**Authentication:** Required (ADMIN)

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "message": "کاربر با موفقیت تایید شد"
  }
}
```

---

#### 3. دریافت پروفایل کاربر

**Endpoint:** `GET /admin/user/profile/:userId`

**Authentication:** Required (ADMIN)

**Response (Success - 200):**

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "علی احمدی",
      "email": "ali@example.com",
      "phoneNumber": "09123456789",
      "role": "FREELANCER",
      "biography": "...",
      "isActive": true
    }
  }
}
```

---

## ⚠️ خطاهای رایج (Common Errors)

### HTTP Status Codes

| کد  | عنوان                 | توضیحات                                   |
| --- | --------------------- | ----------------------------------------- |
| 200 | OK                    | درخواست با موفقیت انجام شد                |
| 201 | Created               | منبع جدید با موفقیت ایجاد شد              |
| 400 | Bad Request           | داده‌های ارسالی نامعتبر است               |
| 401 | Unauthorized          | احراز هویت انجام نشده یا توکن نامعتبر است |
| 403 | Forbidden             | دسترسی به این منبع ممنوع است              |
| 404 | Not Found             | منبع درخواستی یافت نشد                    |
| 500 | Internal Server Error | خطای داخلی سرور                           |
| 503 | Service Unavailable   | سرویس در دسترس نیست                       |

### ساختار پاسخ خطا

```json
{
  "statusCode": 400,
  "message": "پیام خطا به فارسی",
  "error": "Bad Request"
}
```

### خطاهای احراز هویت

```json
{
  "statusCode": 401,
  "message": "لطفا وارد حساب کاربری خود شوید",
  "error": "Unauthorized"
}
```

### خطاهای اعتبارسنجی (Validation)

```json
{
  "statusCode": 400,
  "message": "\"email\" must be a valid email",
  "error": "Bad Request"
}
```

---

## 🔒 نکات امنیتی

1. **Cookie-based Authentication**: تمام توکن‌ها به صورت httpOnly cookie ذخیره می‌شوند
2. **CORS**: فقط درخواست‌های از دامنه مجاز پذیرفته می‌شود
3. **Rate Limiting**: محدودیت تعداد درخواست برای جلوگیری از حملات
4. **Input Validation**: تمام ورودی‌ها با Joi اعتبارسنجی می‌شوند
5. **Refresh Token**: برای تازه‌سازی خودکار accessToken استفاده می‌شود

---

## 📝 نکات مهم

1. **Pagination**: در حال حاضر پیاده‌سازی نشده (می‌تواند در آینده اضافه شود)
2. **File Upload**: در حال حاضر پشتیبانی نمی‌شود
3. **Real-time Updates**: از WebSocket استفاده نمی‌شود
4. **Testing Mode**: با تنظیم `IS_TESTING_MODE_OTP=true` می‌توان بدون ارسال SMS تست کرد

---

## 🚀 نمونه استفاده با Axios

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // برای ارسال cookie
});

// Interceptor برای مدیریت خطاها
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // تلاش برای refresh token
      try {
        await api.get("/user/refresh-token");
        // تکرار درخواست اصلی
        return api.request(error.config);
      } catch (refreshError) {
        // هدایت به صفحه لاگین
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

// مثال استفاده
async function login(phoneNumber, otp) {
  const { data } = await api.post("/user/check-otp", {
    phoneNumber,
    otp,
  });
  return data;
}
```

---

## 📞 پشتیبانی

برای گزارش مشکلات یا پیشنهادات، لطفا با تیم توسعه تماس بگیرید.

**نسخه API:** 1.0.0  
**آخرین بروزرسانی:** دسامبر 2024

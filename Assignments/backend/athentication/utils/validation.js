import Joi from "joi";

// سكيما تسجيل المستخدم
export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required(),
});

// سكيما تسجيل الدخول
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// سكيما تغيير كلمة المرور
export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .invalid(Joi.ref("currentPassword"))
    .message({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      "any.invalid": "New password cannot be the same as the current password.",
    })
    .required(),
});

// سكيما التصنيفات
export const categorySchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
});

// سكيما الكورسات
export const courseSchema = Joi.object({
  title: Joi.string().min(3).max(255).required().messages({
    "string.min": "Title must be at least 3 characters long.",
    "string.max": "Title must not exceed 255 characters.",
    "any.required": "Title is required.",
  }),
  description: Joi.string().allow("", null).max(10000).messages({
    "string.max": "Description must not exceed 10000 characters.",
    "string.base": "Description must be a string.",
  }),
  category_id: Joi.number().integer().allow(null),
  thumbnail_url: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Thumbnail must be a valid URL",
  }),
  is_published: Joi.boolean().default(false),
  is_approved: Joi.boolean().default(false),
});

// سكيما الوحدة (الموديول)
export const moduleSchema = Joi.object({
  course_id: Joi.number().integer().required(),
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().allow("", null).max(10000),
  order: Joi.number().integer().required(),
});

// سكيما الدرس
export const lessonSchema = Joi.object({
  module_id: Joi.number().integer().required(),
  title: Joi.string().min(3).max(255).required(),
  content_type: Joi.string().valid("video", "quiz", "text").required(),
  content_url: Joi.string().uri().allow(null, ""),
  duration: Joi.number().integer().min(0).default(0),
  order: Joi.number().integer().required(),
  is_free: Joi.boolean().default(false),
});

// سكيما الاختبار (Quiz)
export const quizSchema = Joi.object({
  lesson_id: Joi.number().integer().required(),
  question: Joi.string().required(),
  options: Joi.array().items(Joi.string()).min(2).required(),
  correct_answer: Joi.string().required(),
  max_score: Joi.number().integer().default(10),
});

// سكيما الواجب (Assignment)
export const assignmentSchema = Joi.object({
  lesson_id: Joi.number().integer().required(),
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().allow("").optional(),
  deadline: Joi.date().iso().required(),
  max_score: Joi.number().integer().min(0).max(100).optional(),
});

// سكيما تسليم الواجب (Submission)
export const submissionSchema = Joi.object({
  assignment_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
  submission_url: Joi.string().uri().required(),
  grade: Joi.number().integer().min(0).max(100).optional(),
  feedback: Joi.string().allow("").optional(),
});

// سكيما التسجيل في كورس (Enrollment)
export const enrollmentSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  course_id: Joi.number().integer().required(),
  progress: Joi.number().integer().min(0).max(100).optional(),
  completed_at: Joi.date().iso().allow(null),
});

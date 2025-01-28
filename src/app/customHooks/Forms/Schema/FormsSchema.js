import { z } from "zod";
// email Schema
export const emailSchema = z.object({
  email_or_phone: z
    .string()
    .min(1, { message: "أدخل البريد الإلكتروني أو رقم الهاتف" })
    .regex(/^(05\d{8}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, {
      message: "أدخل بريد إلكتروني أو رقم هاتف صالح",
    }),
});
// phone Schema
export const phoneSchema = z.object({
  Phone: z
    .string()
    .min(1, { message: "أدخل رقم الهاتف" })
    .regex(/^05\d{8}$/, {
      message: "يجب أن يكون رقم الهاتف سعودي",
    }),
});
// login Schema
export const loginSchema = z.object({
  email_or_phone: z
    .string()
    .min(1, { message: "أدخل البريد الإلكتروني أو رقم الهاتف" })
    .regex(/^(05\d{8}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, {
      message: "أدخل بريد إلكتروني أو رقم هاتف صالح",
    }),
  password: z.string().min(1, { message: "أدخل كلمة المرور" }),
});
// Register Schema
export const registerSchema = z
  .object({
    FirstName: z
      .string()
      .min(1, { message: "أدخل الإسم الأول" })
      .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
    LastName: z
      .string()
      .min(1, { message: "أدخل إسم العائلة" })
      .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
    Email: z
      .string()
      .min(1, { message: "أدخل البريد الإلكتروني " })
      .email({ message: "أدخل بريد إلكتروني صالح" }),
    Phone: z
      .string()
      .min(1, { message: "أدخل رقم الهاتف" })
      .regex(/^05\d{8}$/, {
        message: "يجب أن يكون رقم الهاتف سعودي",
      }),
    password: z.string().min(1, { message: "أدخل كلمة المرور" }),
    confirmPassword: z.string().min(1, { message: "تأكيد كلمة المرور" }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: " كلمة المرور وتأكيد كلمة المرور غير متطابقين",
    path: ["confirmPassword"],
  });



// Cart Register Schema
export const CartRegisterSchema = z.object({
  FirstName: z
    .string()
    .min(1, { message: "أدخل الإسم الأول" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
  LastName: z
    .string()
    .min(1, { message: "أدخل إسم العائلة" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
  Email: z
    .string()
    .min(1, { message: "أدخل البريد الإلكتروني " })
    .email({ message: "أدخل بريد إلكتروني صالح" }),
  CityID: z.number({ message: "إختر المدينة" }),
  Address: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل العنوان" })
    .regex(/^[a-zA-Z\u0600-\u06FF0-9\s-]+$/, {
      message: "أدخل قيمة صالحة",
    }),
    password: z.string().min(1, { message: "أدخل كلمة المرور" }),
    confirmPassword: z.string().min(1, { message: "تأكيد كلمة المرور" }),
})
.refine((value) => value.password === value.confirmPassword, {
  message: " كلمة المرور وتأكيد كلمة المرور غير متطابقين",
  path: ["confirmPassword"],
});
// forgetPassword Schema
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "أدخل البريد الإلكتروني " })
    .email({ message: "أدخل بريد إلكتروني صالح" }),
});
// ResetPassword Schema
export const resetPassSchema = z
  .object({
    password: z.string().min(1, { message: "أدخل كلمة المرور" }),
    confirmPassword: z.string().min(1, { message: "تأكيد كلمة المرور" }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: " كلمة المرور وتأكيد كلمة المرور غير متطابقين",
    path: ["confirmPassword"],
  });
// userInfo Schema
export const userInfoSchema = z.object({
  FirstName: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل الإسم الأول" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
  LastName: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل إسم العائلة" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
  Phone: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل رقم الهاتف" })
    .regex(/^05\d{8}$/, {
      message: "يجب أن يكون رقم الهاتف سعودي",
    }),
  Address: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل العنوان" })
    .regex(/^[a-zA-Z\u0600-\u06FF0-9\s-]+$/, {
      message: "أدخل قيمة صالحة",
    }),
  CityId: z.number({ message: "إختر المدينة" }),
});
export const userInfoCartSchema = z.object({
  FirstName: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل الإسم الأول" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
  LastName: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل إسم العائلة" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
  Phone: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل رقم الهاتف" })
    .regex(/^05\d{8}$/, {
      message: "يجب أن يكون رقم الهاتف سعودي",
    }),
  Address: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل العنوان" })
    .regex(/^[a-zA-Z\u0600-\u06FF0-9\s-]+$/, {
      message: "أدخل قيمة صالحة",
    }),
  CityId: z.number({ message: "إختر المدينة" }),
  Email: z
  .string()
  .min(1, { message: "أدخل البريد الإلكتروني " })
  .email({ message: "أدخل بريد إلكتروني صالح" }),
});
export const friendSchema = z.object({
  friendName: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل إسم الصديق" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
  friendPhone: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل رقم الهاتف" })
    .regex(/^05\d{8}$/, {
      message: "يجب أن يكون رقم الهاتف سعودي",
    }),
  friendAddress: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل العنوان" })
    .regex(/^[a-zA-Z\u0600-\u06FF0-9\s-]+$/, {
      message: "أدخل قيمة صالحة",
    }),
  FriendCityId: z.number({ message: "إختر المدينة" }),
});

// contact us schema
export const contactUsSchema = z.object({
  userName: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل الإسم" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
  email: z
    .string()
    .min(1, { message: "أدخل البريد الإلكتروني " })
    .email({ message: "أدخل بريد إلكتروني صالح" }),
  phone: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل رقم الهاتف" })
    .regex(/^05\d{8}$/, {
      message: "يجب أن يكون رقم الهاتف سعودي",
    }),
  address: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل العنوان" })
    .regex(/^[a-zA-Z\u0600-\u06FF0-9\s-]+$/, {
      message: "أدخل قيمة صالحة",
    }),
  message: z
    .string({ message: "أدخل قيمة صالحة" })
    .min(1, { message: "أدخل الرسالة" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
});

import { z } from "zod";
export const freindDataSchema = z.object({
  Name: z
    .string()
    .min(1, { message: "أدخل الإسم الأول" })
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, { message: "أدخل قيمة صالحة" }),
  Phone: z
    .string()
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
  CityID: z.number({ message: "إختر المدينة" }),
});

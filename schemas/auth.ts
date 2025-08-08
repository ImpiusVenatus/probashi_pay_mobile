import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const otpSchema = z.object({
  code: z.string().length(6, "OTP must be 6 digits"),
});

export const createAccountSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    country: z.string().min(2, "Please select a country"),
    currency: z.string().min(3, "Please select a currency"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupEmailFormData = z.infer<typeof signupEmailSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;
export type CreateAccountFormData = {
  name: string;
  password: string;
  confirmPassword: string;
  country: string;
  currency: string;
};

export type UserCreateData = {
  email: string;
  full_name: string;
  password: string;
  country: string;
  currency: string;
};

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

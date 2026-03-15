const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Enter a valid email").toLowerCase().trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
});

const loginSchema = z.object({
  email: z.string().email("Enter a valid email").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2).max(80).optional(),
    email: z.string().email().toLowerCase().trim().optional(),
    currentPassword: z.string().min(1).optional(),
    newPassword: z.string().min(8).max(128).optional(),
  })
  .refine((value) => value.name || value.email || value.newPassword, {
    message: "Provide at least one field to update",
  })
  .refine((value) => !value.newPassword || value.currentPassword, {
    message: "Current password is required to set a new password",
  });

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
};

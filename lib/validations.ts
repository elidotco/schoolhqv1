import * as z from "zod";

export const signUpvalidation = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export const onBoardingvalidation = z.object({
  schoolName: z.string().min(1),
  schoolAddress: z.string().min(1),
  schoolPhone: z.string().min(1),
  schoolEmail: z.email(),
  schoolRegion: z.string().min(1),
});

// Set up profile schema and partial schema for updates
export const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  avatarUrl: z.url().optional(),
  Phone: z.string().optional(),

  schoolId: z.string().optional(),
});
export const partialProfileSchema = profileSchema.partial();

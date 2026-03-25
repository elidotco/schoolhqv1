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

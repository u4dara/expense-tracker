import * as z from 'zod';

const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, 'Name must be at least 3 characters!')
      .max(50, 'Name is too long!'),
    email: z.email('Please check the email!'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(16, 'Password is too long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export default signUpSchema;

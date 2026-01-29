import * as z from 'zod';

const signInSchema = z.object({
  email: z.email('Please check the email!'),
  password: z.string(),
});

export default signInSchema;

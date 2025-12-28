import { config } from 'dotenv';

config({ path: '.env' });

export const { NODE_ENV, PORT, MONGODB_URI } = process.env;

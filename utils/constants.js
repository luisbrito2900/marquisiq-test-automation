import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Application constants and configuration
 * Values are loaded from environment variables with fallback defaults
 */
export const APP_CONFIG = {
  BASE_URL: process.env.BASE_URL || 'https://sandbox.marquisiq.com/',
  API_ENDPOINTS: {
    GENERIC_API: '/generic/api/generic',
    CUSTOMER_WITH_MASTER: 'vwCustomerWithMaster',
  },
};

export const TEST_DATA = {
  CREDENTIALS: {
    USERNAME: process.env.USERNAME || '',
    PASSWORD: process.env.PASSWORD || '',
  },
  MASTER_CUSTOMER_NAME: process.env.MASTER_CUSTOMER_NAME || 'The Walt Disney Company',
};

export const TIMEOUTS = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
};


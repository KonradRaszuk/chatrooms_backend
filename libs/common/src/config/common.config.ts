import { registerAs } from '@nestjs/config';

export default registerAs('common', () => {
  return {
    webUrl: process.env.WEB_PORTAL_URL,
    apiUrl: process.env.API_URL,
  };
});

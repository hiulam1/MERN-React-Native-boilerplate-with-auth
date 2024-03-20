import 'dotenv/config';

interface AuthConfig {
  authRequired: boolean;
  auth0Logout: boolean;
  secret: string;
  baseURL: string;
  clientID: string;
  issuerBaseURL: string;
}

const config: AuthConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.OAUTH_SECRET!,
  baseURL: "http://localhost:3000",
  clientID: process.env.CLIENT_ID!,
  issuerBaseURL: process.env.ISSUER_BASE_URL!,
};

export default config;

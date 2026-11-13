import "dotenv/config";

function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
  return value;
}

const env = {
  server: {
    port: requireEnv("PORT"),
    environment: requireEnv("NODE_ENV"),
    url: requireEnv("BASE_URL"),
  },
  frontend: {
    url: requireEnv("FRONTEND_URL"),
  },
};

export default env;

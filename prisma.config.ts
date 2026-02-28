import * as dotenv from "dotenv";

// Load .env first, then .env.local overrides it
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });

export default {
  schema: "prisma/schema.prisma",
};

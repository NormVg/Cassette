import { betterAuth } from "better-auth";
import ps from "pg";

import { username } from "better-auth/plugins";

// import { PostGress } from "~/utils/PgPool";

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // await sendEmailVerify(url,user.email,user.name);
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  plugins: [username()],

  database: new ps.Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

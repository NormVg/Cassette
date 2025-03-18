import {
  BoxOAuth,
  OAuthConfig,
} from "box-typescript-sdk-gen/lib/box/oauth.generated.js";

const config = new OAuthConfig({
  clientId: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET,
});
const oauth = new BoxOAuth({ config });

import { UserSchema } from "~/server/models/user.schema";
import { auth } from "~/utils/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  // const userInfo = await PostGress.query('SELECT * FROM "user" WHERE id = $1', [session.user.username])

  const query = getQuery(event);

  if (query.code) {
    // Exchange auth code for tokens
    const tokens = await oauth.getTokensAuthorizationCodeGrant(query.code);

    const box_tokens = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };



    const user = {
      userID: session.user.id,
      email: session.user.email,
      username: session.user.username,

      box_access_token: tokens.accessToken,
      box_refresh_token: tokens.refreshToken,
    };

    // const asd = await new UserSchema(user).save()

    const UpdateUser = await UserSchema.findOneAndUpdate(
      { userID: session.user.id },

      { $set: user },

      { new: true, runValidators: true }
    );

    if (UpdateUser) {
      return sendRedirect(event, "/");

    } else {
      await new UserSchema(user).save();

      return sendRedirect(event, "/");
    }

    // TODO: Store tokens in database (accessToken, refreshToken)
    // return sendRedirect(event, "/");
  }

  return { success: false, message: "Missing auth code" };
});

import { BoxClient } from "box-typescript-sdk-gen/lib/client.generated.js";
import {
  BoxOAuth,
  OAuthConfig,
} from "box-typescript-sdk-gen/lib/box/oauth.generated.js";

const config = new OAuthConfig({
  clientId: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET,
});

import { UserSchema } from "~/server/models/user.schema";

const oauth = new BoxOAuth({ config });

const ClientOAuthBox = async (username) => {
  console.log("BOX CLIENT IS WORKING");
  const user_cassette = await UserSchema.find({ username: username });
  const accessToken = user_cassette[0].box_access_token;
  const refreshToken = user_cassette[0].box_refresh_token;

  console.log(
    "BOX CLIENT IS",
    user_cassette[0].box_access_token,
    user_cassette[0].box_refresh_token
  );

  try {
    const client = new BoxClient({ auth: oauth });
    await oauth.tokenStorage.store({ accessToken, refreshToken });
    const asd = await client.users.getUserMe();
    console.log("USER TOKEN IS GOOD", await oauth.retrieveToken());

    const currentTokens = await oauth.retrieveToken();

    if (
      currentTokens.accessToken !== accessToken ||
      currentTokens.refreshToken !== refreshToken
    ) {
      const updatedBody = {
        userID: user_cassette[0].userID,
        email: user_cassette[0].email,
        username: user_cassette[0].username,
        box_access_token: currentTokens.accessToken,
        box_refresh_token: currentTokens.refreshToken,
      };

      await UserSchema.findOneAndUpdate(
        { userID: user_cassette[0].userID },
        { $set: updatedBody },
        { new: true, runValidators: true }
      );

      console.log("Tokens updated in the database.");
    }
    // { accessToken: 'VSHaGepMRdTZB3M2JIYDXYLgWnD7X55T',
    //   refreshToken: 'BEvQSyzD8yqBTPLcDEz16E1cD3sxsYh61zicQxoevg5rZpT7WoDD0UgtVDMfyq4i' }
    return client;
  } catch (error) {
    console.log("USER TOKEN MUST ME REFRESH");

    console.log(refreshToken);

    const tokens = await oauth.refreshToken();
    console.log(tokens);

    const NewAccessToken = tokens.accessToken;
    const NewRefreshToken = tokens.refreshToken;

    const body = {
      userID: user_cassette[0].userID,
      email: user_cassette[0].email,
      username: user_cassette[0].username,
      box_access_token: NewAccessToken,
      box_refresh_token: NewRefreshToken,
    };

    const UserNew = await UserSchema.findOneAndUpdate(
      { userID: user_cassette[0].userID },

      { $set: body },

      { new: true, runValidators: true }
    );

    const client = new BoxClient({ auth: oauth });
    oauth.tokenStorage.store({ NewAccessToken });

    return client;
  }
};

export { ClientOAuthBox };

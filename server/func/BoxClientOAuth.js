import { BoxClient } from "box-typescript-sdk-gen/lib/client.generated.js";
import {
  BoxOAuth,
  OAuthConfig,
} from "box-typescript-sdk-gen/lib/box/oauth.generated.js";

const config = new OAuthConfig({
  clientId: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET,
});

import { UserSchema } from "~/server/models/user.schema"
const oauth = new BoxOAuth({ config });

const ClientOAuthBox = async (username) => {

  console.log("BOX CLIENT IS WORKING")
  const user_cassette = await UserSchema.find({ username: username });
  const accessToken = user_cassette[0].box_access_token;
  console.log("BOX CLIENT IS WORKING",user_cassette[0].box_access_token,user_cassette[0].box_refresh_token)

  try {

    const client = new BoxClient({ auth: oauth });
    oauth.tokenStorage.store({ accessToken });
    const asd = await client.users.getUserMe()
    return client

  } catch (error) {
    const refreshToken = user_cassette[0].box_refresh_token
    const tokens = await oauth.refreshToken(refreshToken);
    console.log(tokens)

    const NewAccessToken =  tokens.accessToken
    const NewRefreshToken =  tokens.refreshToken


    const body = {
      userID: user_cassette[0].userID,
      email: res.rows[0].email,
      username: res.rows[0].username,
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

    return client


  }



};

export { ClientOAuthBox };

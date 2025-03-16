import { PostGress } from "~/utils/PgPool";

import { UserSchema } from "~/server/models/user.schema";

export default defineEventHandler(async (event) => {
  try {


    const body = await readBody(event);

    const username = body.username;
    const bci = body.ClientID;
    const bui = body.userID;
    const bcs = body.ClientSecret;

    const res = await PostGress.query(
      'SELECT * FROM "user" WHERE username = $1',
      [username]
    );

    const user_tao_id = res.rows[0].id;

    const user = {
      userID: user_tao_id,
      email: res.rows[0].email,
      username: res.rows[0].username,
      box_user_id: bui,
      box_client_id: bci,
      box_client_secret: bcs,
    };



    const UserNew = await UserSchema.findOneAndUpdate(
      { userID: user_tao_id },

      { $set: user },

      { new: true, runValidators: true }
    );




    if (UserNew) {

      return true;

    } else {

      return false;
    }
  } catch (error) {
    return error;
  }
});

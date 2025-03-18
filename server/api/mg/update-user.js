import { PostGress } from "~/utils/PgPool";

import { UserSchema } from "~/server/models/user.schema";

export default defineEventHandler(async (event) => {
  try {


    const body = await readBody(event);

    const username = body.username;

    const bat = body.box_access_token;
    const brt = body.box_refresh_token;

    const res = await PostGress.query(
      'SELECT * FROM "user" WHERE username = $1',
      [username]
    );

    const user_tao_id = res.rows[0].id;

    const user = {
      userID: user_tao_id,
      email: res.rows[0].email,
      username: res.rows[0].username,
      box_access_token: bat,
      box_refresh_token: brt,
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

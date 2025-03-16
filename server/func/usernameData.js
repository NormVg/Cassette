import { PostGress } from "~/utils/PgPool";
import {UserSchema} from "~/server/models/user.schema"


const usernameData = async (username) => {



    const res = await PostGress.query(
      'SELECT * FROM "user" WHERE username = $1',
      [username]
    );

    const user_cassette = await UserSchema.find({ userID: res.rows[0].id });

    return user_cassette



}

export{  usernameData}

import { thumbSchema } from "~/server/models/thumb.schema"

import { UserSchema } from "~/server/models/user.schema"

import { PostGress } from "~/utils/PgPool";

export default defineEventHandler(async (event) => {



  try {


const { tao_id, username,thumbID } = await getQuery(event);

  var user_tao_id = "";

  if (tao_id === undefined) {

    const res = await PostGress.query(
      'SELECT * FROM "user" WHERE username = $1',
      [username]
    );

    const rep = await UserSchema.find({ userID: res.rows[0].id });

    if (rep.length === 0) {

      return "ERROR: user not found";

    }

    user_tao_id = res.rows[0].id;

  } else {

    user_tao_id = tao_id;

  }


  const userThumbIndex = await thumbSchema.find({userID:user_tao_id})
  const FindResp = userThumbIndex[0].index.find(item => item.songID	=== thumbID)

  if (!FindResp){

    return false
  }
  return sendRedirect(event,"/api/box/getURL?file_id="+FindResp.thumbID)


} catch (error) {
  return error
}


})

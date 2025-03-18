import { PostGress } from "~/utils/PgPool"

import { UserSchema } from "../models/user.schema";

export default defineEventHandler( async (event) => {
    try {

    // const { username,bcs,bci,bui } = getQuery(event)

    const body = await readBody(event)

    const username = body.username
    const bat = body.box_access_token
    const brt = body.box_refresh_token

    console.log(username,bat,brt,"BHAIIIIIIII SETUP USER HA")

    const res = await PostGress.query('SELECT * FROM "user" WHERE username = $1', [username])

    const rep = await UserSchema.find({userID:res.rows[0].id})


    if (rep.length === 0){
      // http://localhost:3000/api/setupUser?username=vishnu_gupta_vg&bcs=BCS&bci=BCI&bui=BUIII

      const user =  {
      userID:res.rows[0].id,
      email: res.rows[0].email,
      username: res.rows[0].username,

      box_access_token: bat,
      box_refresh_token: brt,
    }
    await new UserSchema(user).save()
    return true
    }





    return false
  } catch (error) {
    return error
  }
});






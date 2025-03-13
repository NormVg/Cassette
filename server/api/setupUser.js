import { PostGress } from "~/utils/PgPool"

import { UserSchema } from "../models/user.schema";

export default defineEventHandler( async (event) => {
    try {

    // const { username,bcs,bci,bui } = getQuery(event)

    const body = await readBody(event)
      console.log(body)
    const username = body.username
    const bci = body.ClientID
    const bui = body.userID
    const bcs = body.ClientSecret


    const res = await PostGress.query('SELECT * FROM "user" WHERE username = $1', [username])

    const rep = await UserSchema.find({userID:res.rows[0].id})


    if (rep.length === 0){
      // http://localhost:3000/api/setupUser?username=vishnu_gupta_vg&bcs=BCS&bci=BCI&bui=BUIII

      const user =  {
      userID:res.rows[0].id,
      email: res.rows[0].email,
      username: res.rows[0].username,
      box_user_id: bui,
      box_client_id: bci,
      box_client_secret: bcs
    }
    await new UserSchema(user).save()
    return true
    }





    return false
  } catch (error) {
    return error
  }
});






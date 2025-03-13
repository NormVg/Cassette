import { PostGress } from "~/utils/PgPool"

import { UserSchema } from "../models/user.schema";

export default defineEventHandler( async (event) => {
    try {

    const { username } = getQuery(event)

    const res = await PostGress.query('SELECT * FROM "user" WHERE username = $1', [username])

    const rep = await UserSchema.find({userID:res.rows[0].id})


    if (rep.length === 0){
     return false
    }else{
      return true
    }
  } catch (error) {
    return error
  }
});






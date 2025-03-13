


import { PostGress } from "~/utils/PgPool"

export default defineEventHandler(async (event) => {
  try {

    const { username } = getQuery(event)

    const res = await PostGress.query('SELECT * FROM "user" WHERE username = $1', [username])


    return res.rows

  } catch (error) {
    return error
  }

})

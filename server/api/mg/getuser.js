import { usernameData } from "~/server/func/usernameData";


export default defineEventHandler(async (event) => {
  try {

    const { username } = getQuery(event)

    var user_cassette = await usernameData(username)


    if (user_cassette.length === 0) {
      return "ERROR: user not found";
    }



    return user_cassette

  } catch (error) {
    return error
  }

})

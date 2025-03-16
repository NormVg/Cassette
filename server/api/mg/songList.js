import { usernameData } from "~/server/func/usernameData";
import { songSchema } from "../../models/song.schema";


export default defineEventHandler(async (event) => {
  try {
    const {  username } = await getQuery(event);

    var user_cassette = await usernameData(username)

    var user_tao_id = user_cassette[0].userID;


    if (user_cassette.length === 0) {
      return "ERROR: user not found";
    }



    const userData = await songSchema.find({
      userID: user_tao_id,
    });



    return userData[0].index;
  } catch (error) {
    return error;
  }
});

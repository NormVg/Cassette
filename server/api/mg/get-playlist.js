import { usernameData } from "~/server/func/usernameData";
import { playlistSchema } from "../../models/playlist.schema";


export default defineEventHandler(async (event) => {
  try {
    const { username } = await getQuery(event);

    var user_cassette = await usernameData(username)

    var user_tao_id = user_cassette[0].userID;


    if (user_cassette.length === 0) {
      return "ERROR: user not found";
    }




    const body = {
      userID :user_tao_id,
      playlist:[]
    }


      const PlaylistNew = await playlistSchema.find({
        userID:user_tao_id
      })

      if (PlaylistNew.length != 0 ) {
        return  PlaylistNew
      } else {
        const made_new = await new playlistSchema(body).save();

        return body


      }
    // return userData[0].index;
  } catch (error) {
    return error;
  }
});

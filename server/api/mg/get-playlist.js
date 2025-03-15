import { playlistSchema } from "../../models/playlist.schema";
import { UserSchema } from "../../models/user.schema";

export default defineEventHandler(async (event) => {
  try {
    const { tao_id, username } = await getQuery(event);

    // const newPlaylist = await readBody(event)

    var user_tao_id = "";

    if (tao_id === undefined) {
      const rep = await UserSchema.find({ username: username });

      if (rep.length === 0) {
        return "ERROR: user not found";
      }
      // return rep.userID
      console.log(rep)
      user_tao_id = rep[0].userID;

    } else {
      user_tao_id = tao_id;
    }


    console.log(user_tao_id)




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

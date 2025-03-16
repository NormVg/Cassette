
import { thumbSchema } from "~/server/models/thumb.schema";


import { usernameData } from "../func/usernameData";

export default defineEventHandler(async (event) => {
  try {



    const {  username, thumbID } = await getQuery(event);

    var user_cassette = await usernameData(username)

    var user_tao_id = user_cassette[0].userID;




    if (user_cassette.length === 0) {
      return "ERROR: user not found";
    }

    const userThumbIndex = await thumbSchema.find({ userID: user_tao_id });
    const FindResp = userThumbIndex[0].index.find(
      (item) => item.songID === thumbID
    );

    if (!FindResp) {
      return false;
    }
    return sendRedirect(
      event,
      "/api/box/getURL?file_id=" + FindResp.thumbID + "&username=" + username
    );
  } catch (error) {
    return error;
  }
});

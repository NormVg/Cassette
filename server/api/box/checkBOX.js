import { usernameData } from "~/server/func/usernameData";
import {

  BoxFolderChild,
} from "~/utils/BoxClient";

import { ClientOAuthBox } from "~/server/func/BoxClientOAuth";



export default defineEventHandler(async (event) => {

  try {

  const { username } = await getQuery(event);


  var user_cassette = await usernameData(username)

  // var user_tao_id = user_cassette[0].userID;

  var user_box_user_id = user_cassette[0].box_user_id;
  var user_box_client_id = user_cassette[0].box_client_id
  var user_box_client_secret = user_cassette[0].box_client_secret


  if (user_cassette.length === 0) {
    return "ERROR: user not found";
  }





  const boxClient = await ClientOAuthBox(username);

  const cass_data = await BoxFolderChild(boxClient, "cassette_data");
  // console.log(cass_data)

  return true

  } catch (error) {
    return false
    }

});

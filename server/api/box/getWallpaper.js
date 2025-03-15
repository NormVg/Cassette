import { ClientBox,BoxFileURL,BoxFolderChild ,BoxListDir} from "~/utils/BoxClient";

export default defineEventHandler(async (event) => {

  const {username} = await getQuery(event)

  const boxClient = await ClientBox()

  const cass_data = await BoxFolderChild(boxClient,'cassette_data')

  const cass_list = await BoxListDir(boxClient,cass_data.id)

  const wallpaper = cass_list.find(
    (item) =>
      item.name.match(/^wallpaper.*\.(jpeg|jpg|png|gif)$/i)
  );

  if (!wallpaper) {
    return false
  }

  const file_id = wallpaper.id;


  const url =  await BoxFileURL(boxClient,file_id)


  return url

});

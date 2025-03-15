import { defineMongooseModel } from "#nuxt/mongoose";

export const playlistSchema = defineMongooseModel({
  name: "PLAYLIST",
  schema: {
    userID: { type: String, required: true },
    playlist: [
      {
        PlayName:{ type: String, required: true },
        PlaySongs:[
          {
            songID:{ type: String, required: true },
            name: { type: String, required: true },
          }
        ],
      },
     ],
  },
  options: {
    collection: "user_playlist",
  },
});

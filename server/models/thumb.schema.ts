import { defineMongooseModel } from "#nuxt/mongoose";

export const thumbSchema = defineMongooseModel({
  name: "THUMBNAIL",
  schema: {
    userID: { type: String, required: true },
    lastSync: { type: String, required: true },
    index: [
      {
        songID:{ type: String, required: true },
        name: { type: String, required: true },
        thumbID: { type: String, required: true },
      },
    ],
  },
  options: {
    collection: "thumbnail_index",
  },
});

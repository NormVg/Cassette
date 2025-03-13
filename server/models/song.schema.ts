import { defineMongooseModel } from "#nuxt/mongoose";

export const songSchema = defineMongooseModel({
  name: "SONG",
  schema: {
    userID: { type: String, required: true },
    lastSync: { type: String, required: true },
    index: {
      type: Object,
      required: true,
    },
  },
  options: {
    collection: "music_index",
  },
});

import { defineMongooseModel } from '#nuxt/mongoose'


export const UserSchema = defineMongooseModel({
  name: 'USER',
  schema: {
    userID: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    box_access_token: { type: String, required: true },
    box_refresh_token: { type: String, required: true },

  },
  options: {
    collection: 'userData',
  },
})

import { defineMongooseModel } from '#nuxt/mongoose'


export const UserSchema = defineMongooseModel({
  name: 'USER',
  schema: {
    userID: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    box_user_id: { type: String, required: true },
    box_client_id: { type: String, required: true },
    box_client_secret: { type: String, required: true },
  },
  options: {
    collection: 'userData',
  },
})

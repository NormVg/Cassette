

export default defineEventHandler(async (event) => {
  try {

    const { tao_id,username } = getQuery(event)
    var userData
    var user_tao_id = "";

    if (tao_id === undefined) {
      const rep = await UserSchema.find({ username: username });

      if (rep.length === 0) {
        return "ERROR: user not found";
      }
      // return rep.userID
      console.log(rep)
      userData = rep
      user_tao_id = rep[0].userID;

    } else {
      user_tao_id = tao_id;
    }



    return userData

  } catch (error) {
    return error
  }

})

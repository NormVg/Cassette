
export default defineEventHandler(async (event) => {

  console.log("HELLO JIIIIIIIII GET AUTH")

  try {
    console.log(process.env.BOX_CLIENT_ID, process.env.BOX_REDIRECT_URI);

    if (!process.env.BOX_CLIENT_ID || !process.env.BOX_REDIRECT_URI) {
        throw new Error("Missing BOX_CLIENT_ID or BOX_REDIRECT_URI in environment variables");
    }

    const url = new URL('https://account.box.com/api/oauth2/authorize');
    url.searchParams.append('client_id', process.env.BOX_CLIENT_ID);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('redirect_uri', process.env.BOX_REDIRECT_URI);

    return sendRedirect(event, url.toString());
  }  catch (error) {
    return console.error();

  }

});

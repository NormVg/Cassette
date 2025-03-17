import { auth } from "~/utils/auth";

export default defineEventHandler(async (event) => {
    const session = await auth.api.getSession({
        headers: event.headers,

    })

    console.log(session,"AAAAAAAA MUMMMU");



});

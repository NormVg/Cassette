import { authClient } from "~/utils/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await authClient.useSession(useFetch);


  if (session.value) {
    if (to.path === "/login") {
      return navigateTo("/");
    }else if (to.path === "/signup") {
      return navigateTo("/");
    }
  }

  if (!session.value) {

    if (to.path === "/") {
      return navigateTo("/login");
    }else if (to.path === "/signup") {
      return navigateTo("https://account.thealphaones.com/signup?redirect=https://cassette.thealphaones.com/",{external:true});
    }
  }






});

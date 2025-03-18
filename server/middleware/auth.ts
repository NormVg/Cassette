import { auth } from "~/utils/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  const request = getRequestURL(event);

  if (request.pathname.startsWith("/api")) {
    if (request.pathname.startsWith("/api/box/songURL")) {
      return;
    }
    if (request.pathname.startsWith("/api/download-thumb")) {
      return;
    }

    if (request.pathname.startsWith("/api/auth/")) {
      return;
    }

    if (!session || !session.user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }
  }
});

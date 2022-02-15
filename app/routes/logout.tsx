import { Link, Form, redirect } from "remix";
import type { LoaderFunction } from "remix";
import { getSession, destroySession } from "../session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

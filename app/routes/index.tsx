import { LoaderFunction, useLoaderData } from "remix";
import { getSession } from "../session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  return { user };
};

export default function Index() {
  const { user } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold">Welcome to Remix</h1>
      {user && (
        <div>
          <p>You are logged in as {user.email}</p>
          <a href="/logout">Logout</a>
        </div>
      )}
      {!user && <a href="/login">Login</a>}
    </div>
  );
}

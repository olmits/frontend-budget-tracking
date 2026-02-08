import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  // 1. Get the cookie store
  const cookieStore = await cookies();

  // 2. Delete the token (This is allowed here!)
  cookieStore.delete("token");

  // 3. Redirect to login
  redirect("/login?error=SessionExpired");
}
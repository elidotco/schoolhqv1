import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import path from "path";
import { is } from "zod/v4/locales";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") || "";

  const isBoneyard = userAgent.includes("Boneyard");

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return supabaseResponse;
  }

  // Get the user from Supabase auth
  const { data } = await supabase.auth.getUser();

  // 2. DEFINE PUBLIC PATHS (Routes that don't need a user)
  const isLandingPage = pathname === "/"; // Example of a public route
  const isAuthRoute =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/sign-up") ||
    pathname.startsWith("/auth/callback") ||
    pathname.startsWith("/auth/sign-up-success");
  pathname.startsWith("/dashboard");

  const isPublicRoute = isLandingPage || isAuthRoute;

  // 3. LOGGED OUT USER LOGIC
  if (!data.user) {
    if (isBoneyard) {
      console.log(
        "Boneyard detected. Skipping auth redirect for path:",
        pathname,
      );
      return supabaseResponse;
    }

    // If they aren't logged in and aren't on an auth page, send to login
    // if (!isPublicRoute) {
    //   const url = request.nextUrl.clone();
    //   url.pathname = "/auth/login";
    //   return NextResponse.redirect(url);
    // }
    // If logged out and on an auth page, let them through
    return supabaseResponse;
  }

  return supabaseResponse;
}

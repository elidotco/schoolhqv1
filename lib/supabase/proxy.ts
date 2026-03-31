import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

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

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return supabaseResponse;
  }

  // Get the user from Supabase auth
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 2. DEFINE PUBLIC PATHS (Routes that don't need a user)
  const isAuthRoute =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/sign-up") ||
    pathname.startsWith("/auth/callback") ||
    pathname.startsWith("/auth/sign-up-success");

  // 3. LOGGED OUT USER LOGIC
  if (!session) {
    // If they aren't logged in and aren't on an auth page, send to login
    if (
      !isAuthRoute &&
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
    // If logged out and on an auth page, let them through
    return supabaseResponse;
  }

  // 4. LOGGED IN USER LOGIC (Check Profile)

  // const hasSchool = !!user.user_metadata?.school_id;
  // const isOnboarding = pathname.startsWith("/auth/onboarding");

  // A. No school? Force them to onboarding (unless they are already there)
  // if (!hasSchool && !isOnboarding) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/auth/onboarding";
  //   return NextResponse.redirect(url);
  // }

  // B. Has school? Don't let them go back to onboarding or login
  // if (hasSchool && (isOnboarding || isAuthRoute)) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/dashboard";
  //   return NextResponse.redirect(url);
  // }

  return supabaseResponse;
}

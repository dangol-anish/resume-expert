import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const url = request.nextUrl.clone();

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

// //   const {
// //     data: { user },
// //   } = await supabase.auth.getUser();

// //   if (!user) {
// //     if (
// //       !url.pathname.startsWith("/login") &&
// //       !url.pathname.startsWith("/signup") &&
// //       url.pathname !== "/"
// //     ) {
// //       url.pathname = "/login";
// //       return NextResponse.redirect(url);
// //     }
// //   } else {
// //     if (
// //       url.pathname.startsWith("/login") ||
// //       url.pathname.startsWith("/signup") ||
// //       url.pathname === "/"
// //     ) {
// //       // user is logged in but trying to access login, signup, or root page, redirect to a protected page
// //       url.pathname = "/projects";
// //       return NextResponse.redirect(url);
// //     }
//   }

  return response;
}

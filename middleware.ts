import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
    // publicRoutes: ['/','/api/webhook/clerk'],
    // ignoredROutes['/','api/webhook/clerk']
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
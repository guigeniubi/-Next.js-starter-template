import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(`[Middleware] ${request.method} ${request.nextUrl.pathname}`);
  return NextResponse.next();
}

// 可选：配置中间件作用范围
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

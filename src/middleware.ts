export { default } from 'next-auth/middleware'

export const config = { matcher: [
    // '/:path*',
    '/((?!login|api|_next/static|_next/image|favicon.ico).*)',
]}
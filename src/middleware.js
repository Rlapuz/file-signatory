import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware() {

    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (req.nextUrl.pathname === '/admin' || req.nextUrl.pathname === '/admin/upload' || req.nextUrl.pathname === '/admin/signup' || req.nextUrl.pathname === '/admin/profile') {
                    return token?.role === "ADMIN"
                }

                return Boolean(token)
            }
        }
    })



// export { default } from "next-auth/middleware"

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*']
}


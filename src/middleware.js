import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware() {

    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (req.nextUrl.pathname === '/admin') {
                    return token?.role === "admin"
                }

                return Boolean(token)
            }
        }
    })



// export { default } from "next-auth/middleware"

export const config = {
    matcher: ['/dashboard/:path*', '/admin']
}


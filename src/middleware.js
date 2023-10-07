export { default } from "next-auth/middleware"

export const config = {
    matcher: ['/dashboard/:path*', '/admin']
}

// // deploy to vercel
// export const config = {
//     matcher: ['https://file-signatory.vercel.app/dashboard/:path*', 'https://file-signatory.vercel.app/admin']
// }
export { default } from "next-auth/middleware"

// Check if the user is authenticated only for the editor pages

export const config = { matcher: ["/editor"] }
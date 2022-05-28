import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  jwt: {
    encryption: true,
  },
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      return profile.email_verified && profile.email === "cesapit@gmail.com";
    },
  },
});

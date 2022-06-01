import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ profile }) {
      return (
        profile.email_verified as boolean &&
        (profile.email === process.env.PERSONAL_EMAIL1 ||
          profile.email === process.env.PERSONAL_EMAIL2)
      );
    },
  },
});

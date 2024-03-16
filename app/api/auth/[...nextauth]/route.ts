import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // Only allow sign in for specific email addresses
      return (
        (profile?.email === process.env.PERSONAL_EMAIL1 ||
          profile?.email === process.env.PERSONAL_EMAIL2)
      );
    },
  },
});

export { handler as GET, handler as POST };

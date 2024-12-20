// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connect } from '../../../dbConfig/dbConfig';
import User from '../../../models/userModel';

connect();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // This callback is triggered whenever a user successfully signs in
      if (account.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user in database
          const newUser = new User({
            email: user.email,
            username: user.name,
            password: "", // Google login does not require a password
          });
          await newUser.save();
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.TOKEN_SECRET,
});

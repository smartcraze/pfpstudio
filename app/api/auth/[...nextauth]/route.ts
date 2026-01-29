import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/clientPromise"
import dbConnect from "@/lib/db"
import { User } from "@/models/User"

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        // @ts-ignore
        session.user.id = token.sub; 
        
        // Fetch fresh credits
        await dbConnect();
        const dbUser = await User.findById(token.sub);
        if (dbUser) {
             // @ts-ignore
             session.user.credits = dbUser.credits;
        }
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
        if (trigger === "update" && session?.credits) {
             token.credits = session.credits;
        }
        if (user) {
            token.sub = user.id;
        }
        return token;
    }
  },
  events: {
    async createUser({ user }) {
        // Set default credits to 3 for new users
        await dbConnect();
        await User.findByIdAndUpdate(user.id, { credits: 3 });
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

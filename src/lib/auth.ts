import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { Profile, Account, User } from "next-auth/core/types"
import { AdapterUser } from "next-auth/adapters"
import { googleAuth } from "@/lib/helper"


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: User | AdapterUser, account: Account | null, profile?: Profile | undefined }) {

      console.log('here')

      if (account?.provider === "google") {
        googleAuth(account, profile)
        console.log(account, 'acc')
        console.log(profile, 'prof')
        console.log(user, 'user')
      }

      return true
    }
  }
}

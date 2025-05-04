import { NextAuthOptions, Account, Profile, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { AdapterUser } from "next-auth/adapters"
import { googleAuth } from "@/lib/helper"
import { cookies } from 'next/headers';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User | AdapterUser
      account: Account | null
      profile?: Profile
    }) {
      if (account?.provider === "google") {
        const data = await googleAuth(account, profile)
        cookies().set('token', data.token as string)
        cookies().set('user',JSON.stringify( data.user))
      } else if(account?.provider === "github"){
        console.log(account, 'acc git')
      }

      console.log(account, 'acco')
        
      return true
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/home`
    },
  },
}

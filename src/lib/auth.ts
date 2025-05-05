import { NextAuthOptions, Account, Profile } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { cookies } from 'next/headers';
import { connectToDatabase } from "./database"
import UserModel from "@/models/User"
import jwt from 'jsonwebtoken'
import { emailToUsername, hashPassword } from "./helper";

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
      account,
      profile,
    }: {
      account: Account | null
      profile?: Profile
    }) {
      const auth = await authWithProvider(profile, account?.provider ?? 'local')

      if (!auth) return false

      return true
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/home`
    },
  },
}

const authWithProvider = async (profile: Profile | undefined, provider: string) => {

  try {
    if (!profile?.email) {
      return false
    }

    if (provider === 'local') {
      return false
    }

    await connectToDatabase();

    const user = await UserModel.findOne({
      email: profile.email,
      provider: provider
    }).exec()

    if (!user) {
      const username = await emailToUsername(profile.email)

      let user = await UserModel.create({
        fullname: profile.name,
        username: username,
        email: profile.email,
        password: await hashPassword(username),
        avatar: process.env.ROBOHASH_URL + username,
        provider: provider
      })

      const token = jwt.sign({
        _id: user._id
      }, process.env.SECRET_KEY!, {
        expiresIn: "1h"
      })

      const data = {
        _id: user._id.toString(),
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      }

      cookies().set('token', token as string)
      cookies().set('user', JSON.stringify(data))

    } else if (user) {

      if (user.provider === provider) {
        const token = await jwt.sign(
          {
            _id: user._id,
          },
          process.env.SECRET_KEY!,
          {
            expiresIn: 60 * 60,
          }
        );
  
        const data = {
          _id: user._id.toString(),
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        }
  
        cookies().set('token', token as string)
        cookies().set('user', JSON.stringify(data))
      } else {
        return false
      }
    }

    return true

  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

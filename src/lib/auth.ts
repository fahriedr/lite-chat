import { NextAuthOptions, Account, Profile } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { cookies } from 'next/headers';
import { connectToDatabase } from "./database"
import UserModel from "@/models/User"
import jwt from 'jsonwebtoken'
import { emailToUsername, hashPassword } from "./helper";
import { ErrorAuthProvider, User } from "@/types";

type ProviderKey = 'google_id' | 'github_id';

type UserCreateInput = {
  fullname?: string;
  username: string;
  email: string;
  password: string | null;
  avatar: string;
  provider: string | null;
  email_verified: boolean;
  [key: `${string}_id`]: string | boolean | undefined; 
};


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
      try {

        console.log(account, 'account')
        console.log(profile, 'account')
        const auth = await authWithProvider(profile, account)

        if (typeof auth === 'string') {
          throw new Error(auth)
        }

        return true
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'server-error'
        throw new Error(errorMessage)
      }
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/home`
    },
  },
  pages: {
    error: '/login',
    signIn: '/login',
  },
}

const authWithProvider = async (profile: Profile | undefined, account: Account | null): Promise<string | boolean> => {

  try {
    if (!profile?.email) {
      return ErrorAuthProvider.INVALID_PROFILE
    }

    await connectToDatabase();

    const user = await UserModel.findOne({
      email: profile.email
    }).exec()

    const providerKey = `${account?.provider}_id` as ProviderKey;

    if (!user) {
      
      const username = await emailToUsername(profile.email)

      const userData: UserCreateInput = {
        fullname: profile.name,
        username: username,
        email: profile.email,
        password: null,
        avatar: process.env.ROBOHASH_URL + username,
        provider: account?.provider ?? null,
        email_verified: true,
      }

      userData[providerKey] = account?.providerAccountId

      let user = await UserModel.create(userData)

      setAuthCookies(user)

    } else {
      if (!user[providerKey]) {
        user[providerKey] = account?.providerAccountId!;
        user.email_verified = true
        await user.save();

        setAuthCookies(user)
  
      } else {
        setAuthCookies(user)
      }
    }

    return true

  } catch (error) {
    console.log(error)
    return ErrorAuthProvider.SERVER
  }
}

const setAuthCookies = (user: any) => {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY!, { expiresIn: "1h" });
  cookies().set('token', token);
  cookies().set('user', JSON.stringify({
    _id: user._id.toString(),
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  }));
};

// app/api/auth/custom-callback/route.ts
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import jwt from "jsonwebtoken"
import User from "@/models/User"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/database"

export async function GET() {

  console.log('hello callback')
  // const session = await getServerSession(authOptions)

  // if (!session?.user?.email) {
  //   return NextResponse.redirect("/login?error=NoSession")
  // }

  // await connectToDatabase()

  // const user = await User.findOne({ email: session.user.email })

  // if (!user) {
  //   return NextResponse.redirect("/login?error=NoUser")
  // }

  // const token = await jwt.sign(
  //   {
  //     _id: user._id,
  //   },
  //   process.env.SECRET_KEY!,
  //   {
  //     expiresIn: 60 * 60,
  //   }
  // );

  // cookies().set("token", token, {
  //   httpOnly: true,
  //   path: "/",
  //   maxAge: 3600,
  // })

  return true

  // return NextResponse.redirect("/login")
}

import { connectToDatabase } from "@/lib/database";
import { comparePassword } from "@/lib/helper";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import jwt from 'jsonwebtoken'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectToDatabase();
  const body = await req.json();

  const validate = schema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.format(), { status: 400 });
  }

  const checkUser = await User.findOne({ email: body.email })
    .select("+password")
    .exec();

  if (!checkUser) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const validatePassword = await comparePassword(
    body.password,
    checkUser.password
  );

  if (!validatePassword) {
    return NextResponse.json(
      { success: false, message: "Password incorrect" },
      { status: 404 }
    );
  }

  const token = await jwt.sign(
    {
      _id: checkUser._id,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1h",
    }
  );

  const data = {
	  _id: checkUser._id,
	  fullname: checkUser.fullname,
	  username: checkUser.username,
	  email: checkUser.email,
	  avatar: checkUser.avatar,
  }

  return NextResponse.json({
    data: data,
    token: token,
  });
};

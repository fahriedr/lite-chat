import { connectToDatabase } from "@/lib/database";
import { comparePassword, CustomErrorResponse, CustomSuccessResponse, zodErrorResponse } from "@/lib/helper";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import jwt from 'jsonwebtoken'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDatabase();
    const body = await req.json();

    const validate = schema.safeParse(body);

    if (!validate.success) {
      return zodErrorResponse(validate.error)
    }

    const checkUser = await User.findOne({ email: body.email })
      .select("+password")
      .exec();

    if (!checkUser) {
      return CustomErrorResponse("User not found", 404)
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
        expiresIn: 60 * 60,
      }
    );

    const data = {
      _id: checkUser._id,
      fullname: checkUser.fullname,
      username: checkUser.username,
      email: checkUser.email,
      avatar: checkUser.avatar,
    }

    return CustomSuccessResponse('Success', 200, 
      {
        user: data,
        token: token
      }
    )
  } catch (error) {
    console.log(error)
    return CustomErrorResponse('Something went wrong', 500)
  }
};

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.formData()
  console.log(body)
  const name = body.get('username')
  return NextResponse.json({ data: body })
}
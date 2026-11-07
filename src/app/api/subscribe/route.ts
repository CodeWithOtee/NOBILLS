import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (
      typeof email !== "string" ||
      !/^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)
    ) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    console.log("Newsletter signup:", email);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

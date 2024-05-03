import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (request) => {
  try {
    const req = await request.json();
    cookies().set("theme", req.theme);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

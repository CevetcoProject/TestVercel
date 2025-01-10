import { NextRequest, NextResponse } from "next/server";
import Env from "@/config/env";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";

connect();

export async function POST(request: NextRequest) {
  const payload: MagicLinkPayloadVerify = await request.json();

  return NextResponse.json({
    status: 200,
    message: "Link is valid.",
    email: email,
  });
}
 


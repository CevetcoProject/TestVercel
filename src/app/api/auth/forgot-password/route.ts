import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

import Cryptr from "cryptr";
import Env from "@/config/env";
import { render } from "@react-email/render";
import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import { sendEmail } from "@/config/mail";
import { connect } from "@/database/mongo.config";

connect();



import { NextRequest, NextResponse } from "next/server";
import Env from "@/config/env";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";

connect();

 


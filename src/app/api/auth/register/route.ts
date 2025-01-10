import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import { registerSchema } from "@/validator/authValidationSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcryptjs";

interface UserPayload {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  birthday: string;
  address: string;
  phone: string;
  gender: string;
  language: string;
  username: string;
}

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connect();

    const body: UserPayload = await request.json();

    // Set custom error reporter
    vine.errorReporter = () => new ErrorReporter();

    // Validate the request body
    const validator = vine.compile(registerSchema);
    const output = await validator.validate(body);

    try {
      // Check if a user with the given email already exists
      const existingUser = await User.findOne({ email: output.email });
      if (existingUser) {
        return NextResponse.json(
          {
            status: 400,
            errors: {
              email: "Email is already used.",
            },
          },
          { status: 200 }
        );
      }

      // Check if this is the first user
      const userCount = await User.countDocuments();

      // Assign role based on user count
      const role = userCount === 0 ? "Admin" : output.role || "User";
      output.role = role;

      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      output.password = bcrypt.hashSync(output.password, salt);

      output.avatar = output.avatar || '/images/user/user-circle.svg';
      output.language = output.language || 'English';
      output.gender = output.gender || 'Not specified';
      output.phone = output.phone || 'N/A';
      output.address = output.address || 'N/A';
      output.birthday = output.birthday || 'Unknown';
      output.username = output.username || 'Anonymous';

      // Create the user
      const newUser = await User.create(output);

      return NextResponse.json(
        { status: 200, msg: "User Created successfully!", data: newUser},
        { status: 200 }
      );
    } catch (error) {
      console.error("Database/Processing Error:", error); // Log pour le débogage

      return NextResponse.json(
        { 
          status: 500, 
          error: "An error occurred while creating the user.", 
          details: error.message // Détails spécifiques pour le client
        },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }

    console.error("Internal Server Error:", error); // Log complet pour le serveur
    return NextResponse.json(
      { 
        status: 500, 
        error: "Internal server error.", 
        details: error instanceof Error ? error.message : "An unknown error occurred"
      },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import { userSchema } from "@/validator/authValidationSchema";
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
    const validator = vine.compile(userSchema);
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

      // Assign role based on user count
      const role = output.role || "User";
      output.role = role;

      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      output.password = bcrypt.hashSync(output.password, salt);

      output.avatar = output.avatar || '/images/user/user-circle.svg';
      output.language = output.language || 'English';
      output.gender = output.gender || '';
      output.phone = output.phone || '';
      output.address = output.address || '';
      output.birthday = output.birthday || '';
      output.username = output.username || '';

      // Create the user
      const newUser = await User.create(output);

      return NextResponse.json(
        { status: 200, msg: "User Created successfully!", data: newUser},
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }

    console.error("Internal Server Error:", error.message);
    return NextResponse.json(
      { status: 500, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Connectez-vous à la base de données
    await connect();

    // Récupérer tous les profils d'accès
    const userData = await User.find({});

    // Vérifiez si des profils existent
    if (userData.length === 0) {
      return NextResponse.json(
        { status: 404, message: "No profiles found." },
        { status: 404 }
      );
    }

    // Retourner les profils récupérés
    return NextResponse.json(
      { status: 200, data: userData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    return NextResponse.json(
      { status: 500, error: "Internal server error." },
      { status: 500 }
    );
  }
}

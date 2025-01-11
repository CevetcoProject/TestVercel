import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/mongo.config";
import { Access } from "@/models/Access";
import { accessSchema } from "@/validator/authValidationSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";

interface AccessPayload {
  name: string;
  description: string;
  services: string[];
  functionalities: string[];
}

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connect();

    // Parse and validate the request body
    const body: AccessPayload = await request.json();
    vine.errorReporter = () => new ErrorReporter();

    const validator = vine.compile(accessSchema);
    const output = await validator.validate(body);

    // Create a new profile
    const newAccess = await Access.create(output);


    return NextResponse.json(
      { status: 200, message: "Profile created successfully!", data: newAccess },
      { status: 200 }
    );
  } catch (error) {
  if (error instanceof Error) {
    console.error("Internal Server Error:", error.message);
  } else {
    console.error("Unknown error occurred:", error);
  }
  return NextResponse.json(
    { status: 500, error: "Internal server error." },
    { status: 500 }
  );
}

export async function GET(request: NextRequest) {
  try {
    // Connectez-vous à la base de données
    await connect();

    // Récupérer tous les profils d'accès
    const accessProfiles = await Access.find({});

    // Vérifiez si des profils existent
    if (accessProfiles.length === 0) {
      return NextResponse.json(
        { status: 404, message: "No profiles found." },
        { status: 404 }
      );
    }

    // Retourner les profils récupérés
    return NextResponse.json(
      { status: 200, data: accessProfiles },
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

// app/api/logout/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Optional: Instantiate a singleton for better performance in development/serverless environments.
const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  // Extract query parameters from the URL.
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { message: "User email is required" },
      { status: 400 }
    );
  }

  try {
    // Attempt to delete the user record by their unique email.
    const deletedUser = await prisma.user.delete({
      where: { email },
    });

    return NextResponse.json(
      { message: "User deleted successfully", deletedUser },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Type guard for the 'error' value, since it's of type 'unknown'
    let message = "Unknown error occurred";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status: 500 });
  }
}

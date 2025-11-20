import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error retrieving users", error);
    return NextResponse.json(
      { message: "Error retrieving users" },
      { status: 500 }
    );
  }
}


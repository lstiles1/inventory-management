import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
      orderBy: {
        date: "desc",
      },
    });

    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    return NextResponse.json(expenseByCategorySummary);
  } catch (error) {
    console.error("Error retrieving expenses by category", error);
    return NextResponse.json(
      { message: "Error retrieving expenses by category" },
      { status: 500 }
    );
  }
}


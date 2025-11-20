import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("search") ?? undefined;
    const products = await prisma.products.findMany({
      where: search
        ? {
            name: {
              contains: search,
            },
          }
        : undefined,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error retrieving products", error);
    return NextResponse.json(
      { message: "Error retrieving products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, name, price, rating, stockQuantity } = body;

    if (!productId || !name || price === undefined || stockQuantity === undefined) {
      return NextResponse.json(
        { message: "Missing product fields" },
        { status: 400 }
      );
    }

    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price: Number(price),
        rating: rating !== undefined ? Number(rating) : null,
        stockQuantity: Number(stockQuantity),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product", error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}


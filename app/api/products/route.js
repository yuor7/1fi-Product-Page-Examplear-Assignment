import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
export const dynamic = "force-dynamic";
// GET /api/products - list all products (summary view)
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).lean();

    // Return a lightweight summary: name + the first/default variant's price+image
    const summary = products.map((p) => ({
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      startingPrice: Math.min(...p.variants.map((v) => v.price)),
      mrp: p.variants[0].mrp,
      image: p.variants[0].image,
      variantCount: p.variants.length,
    }));

    return NextResponse.json({ products: summary });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

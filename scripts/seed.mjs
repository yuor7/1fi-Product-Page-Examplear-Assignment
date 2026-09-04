// Run with: node scripts/seed.mjs
// Requires MONGODB_URI to be set (loads from .env.local automatically)
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI not found. Add it to .env.local first.");
  process.exit(1);
}

const { default: Product } = await import("../models/Product.js");
const { default: seedProducts } = await import("../data/seedProducts.js");

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  await Product.deleteMany({});
  console.log("Cleared existing products");

  await Product.insertMany(seedProducts);
  console.log(`Inserted ${seedProducts.length} products`);

  await mongoose.disconnect();
  console.log("Done. Disconnected.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

import mongoose from "mongoose";

// A single EMI plan option for a product/variant
const EmiPlanSchema = new mongoose.Schema(
  {
    tenureMonths: { type: Number, required: true }, // e.g. 3, 6, 12, 24, 36...
    monthlyAmount: { type: Number, required: true }, // rupees per month
    interestRate: { type: Number, required: true }, // e.g. 0 or 10.5
    cashback: { type: Number, default: 0 }, // additional cashback in rupees
  },
  { _id: false }
);

// A purchasable variant of a product (e.g. 256GB Silver)
const VariantSchema = new mongoose.Schema(
  {
    variantId: { type: String, required: true }, // e.g. "256gb-silver"
    label: { type: String, required: true }, // e.g. "256GB · Silver"
    color: { type: String },
    storage: { type: String },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true }, // discounted/selling price
    image: { type: String, required: true }, // image URL
    emiPlans: { type: [EmiPlanSchema], required: true },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true }, // e.g. "iphone-17-pro"
    name: { type: String, required: true }, // e.g. "iPhone 17 Pro"
    brand: { type: String, required: true },
    description: { type: String },
    variants: { type: [VariantSchema], required: true, validate: (v) => v.length >= 2 },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);

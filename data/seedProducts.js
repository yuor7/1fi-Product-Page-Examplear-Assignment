// Helper to generate EMI plans for a given price, mirroring the 1Fi reference structure
function buildEmiPlans(price) {
  const cashback = 7500;
  return [
    { tenureMonths: 3, monthlyAmount: Math.round(price / 3), interestRate: 0, cashback },
    { tenureMonths: 6, monthlyAmount: Math.round(price / 6), interestRate: 0, cashback },
    { tenureMonths: 12, monthlyAmount: Math.round(price / 12), interestRate: 0, cashback },
    { tenureMonths: 24, monthlyAmount: Math.round(price / 24), interestRate: 0, cashback },
    { tenureMonths: 36, monthlyAmount: Math.round((price * 1.105) / 36), interestRate: 10.5, cashback },
    { tenureMonths: 48, monthlyAmount: Math.round((price * 1.14) / 48), interestRate: 10.5, cashback },
    { tenureMonths: 60, monthlyAmount: Math.round((price * 1.175) / 60), interestRate: 10.5, cashback },
  ];
}

const seedProducts = [
  {
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    description:
      "The latest iPhone 17 Pro with A19 Pro chip Exceptional performance. New Center Stage front camera. Ultimate pro camera system. Breakthrough battery life. A19 Pro chip,.",
    variants: [
      {
        variantId: "256gb-silver",
        label: "256GB · Silver",
        color: "Silver",
        storage: "256GB",
        mrp: 134900,
        price: 127400,
        image:
          "https://images.unsplash.com/photo-1697284959152-32ef13855932?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        emiPlans: buildEmiPlans(127400),
      },
      {
        variantId: "256gb-orange",
        label: "256GB · Cosmic Orange",
        color: "Cosmic Orange",
        storage: "256GB",
        mrp: 134900,
        price: 127400,
        image:
          "https://images.unsplash.com/photo-1757709608566-4b9fd41a7af5?w=800&q=80",
        emiPlans: buildEmiPlans(127400),
      },
      {
        variantId: "512gb-blue",
        label: "512GB · Deep Blue",
        color: "Deep Blue",
        storage: "512GB",
        mrp: 154900,
        price: 147400,
        image:
          "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        emiPlans: buildEmiPlans(147400),
      },
    ],
  },
  {
    slug: "samsung-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    description:
      "Samsung's flagship with a 200MP camera, S Pen, and a titanium frame.",
    variants: [
      {
        variantId: "256gb-titanium-black",
        label: "256GB · Titanium Black",
        color: "Titanium Black",
        storage: "256GB",
        mrp: 129999,
        price: 119999,
        image:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
        emiPlans: buildEmiPlans(119999),
      },
      {
        variantId: "256gb-titanium-gray",
        label: "256GB · Titanium Gray",
        color: "Titanium Gray",
        storage: "256GB",
        mrp: 129999,
        price: 119999,
        image:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
        emiPlans: buildEmiPlans(119999),
      },
      {
        variantId: "512gb-titanium-black",
        label: "512GB · Titanium Black",
        color: "Titanium Black",
        storage: "512GB",
        mrp: 144999,
        price: 134999,
        image:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
        emiPlans: buildEmiPlans(134999),
      },
    ],
  },
  {
    slug: "oneplus-13",
    name: "OnePlus 13",
    brand: "OnePlus",
    description:
      "Flagship performance with Snapdragon 8 Elite, Hasselblad cameras, and 100W fast charging.",
    variants: [
      {
        variantId: "256gb-black",
        label: "256GB · Midnight Black",
        color: "Midnight Black",
        storage: "256GB",
        mrp: 69999,
        price: 64999,
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
        emiPlans: buildEmiPlans(64999),
      },
      {
        variantId: "256gb-blue",
        label: "256GB · Arctic Blue",
        color: "Arctic Blue",
        storage: "256GB",
        mrp: 69999,
        price: 64999,
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
        emiPlans: buildEmiPlans(64999),
      },
      {
        variantId: "512gb-black",
        label: "512GB · Midnight Black",
        color: "Midnight Black",
        storage: "512GB",
        mrp: 74999,
        price: 69999,
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
        emiPlans: buildEmiPlans(69999),
      },
    ],
  },
];

export default seedProducts;

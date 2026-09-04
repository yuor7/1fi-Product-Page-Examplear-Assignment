# 1Fi — EMI Product App

A full-stack product page for buying phones on EMI plans backed by mutual funds, built for the 1Fi SDE1 assignment.

## Tech stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend:** Next.js Route Handlers (Node.js API routes) — no separate server needed
- **Database:** MongoDB with Mongoose

Next.js was used for both frontend and backend since its Route Handlers satisfy the
"Node.js backend + REST API" requirement while keeping one deployable app (ideal for
a fast Vercel deploy).

## Project structure

```
app/
  page.js                     # Home page — product listing (client component, fetches /api/products)
  products/[slug]/page.js     # Product detail page — variant + EMI plan selection
  api/products/route.js       # GET /api/products
  api/products/[slug]/route.js# GET /api/products/:slug
lib/mongodb.js                # Mongoose connection helper (cached across requests)
models/Product.js             # Mongoose schema
data/seedProducts.js          # Seed data (3 products, 3 variants each, 7 EMI plans each)
scripts/seed.mjs              # Seed script — run once to populate the database
```

## Setup and run instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up MongoDB**
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (or use a local MongoDB instance).
   - Copy `.env.local.example` to `.env.local` and paste your connection string:
     ```
     MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/1fi?retryWrites=true&w=majority
     ```

3. **Seed the database**
   ```bash
   node scripts/seed.mjs
   ```
   This clears the `products` collection and inserts 3 products (iPhone 17 Pro, Samsung
   Galaxy S25 Ultra, OnePlus 13), each with 3 variants and 7 EMI plans per variant.

4. **Run the dev server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`.

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## API endpoints

### `GET /api/products`

Returns a lightweight summary of all products (for the listing page).

**Example response:**
```json
{
  "products": [
    {
      "slug": "iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "startingPrice": 127400,
      "mrp": 134900,
      "image": "https://images.unsplash.com/...",
      "variantCount": 3
    }
  ]
}
```

### `GET /api/products/:slug`

Returns the full product document, including every variant and its EMI plans.

**Example response:**
```json
{
  "product": {
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "brand": "Apple",
    "description": "The latest iPhone 17 Pro with A19 Pro chip...",
    "variants": [
      {
        "variantId": "256gb-silver",
        "label": "256GB · Silver",
        "color": "Silver",
        "storage": "256GB",
        "mrp": 134900,
        "price": 127400,
        "image": "https://images.unsplash.com/...",
        "emiPlans": [
          { "tenureMonths": 3, "monthlyAmount": 42467, "interestRate": 0, "cashback": 7500 },
          { "tenureMonths": 6, "monthlyAmount": 21233, "interestRate": 0, "cashback": 7500 },
          { "tenureMonths": 36, "monthlyAmount": 3911, "interestRate": 10.5, "cashback": 7500 }
        ]
      }
    ]
  }
}
```

If the slug doesn't exist, this returns `404` with `{ "error": "Product not found" }`.

## Database schema

**Collection: `products`**

| Field         | Type              | Notes                                    |
|---------------|-------------------|-------------------------------------------|
| `slug`        | String (unique)   | Used for the product's URL: `/products/:slug` |
| `name`        | String            | e.g. "iPhone 17 Pro"                     |
| `brand`       | String            | e.g. "Apple"                             |
| `description` | String            | Optional                                 |
| `variants`    | Array of Variant  | At least 2 required                      |

**Variant subdocument**

| Field       | Type             | Notes                                |
|-------------|------------------|----------------------------------------|
| `variantId` | String           | e.g. "256gb-silver"                  |
| `label`     | String           | Display label, e.g. "256GB · Silver" |
| `color`     | String           |                                       |
| `storage`   | String           |                                       |
| `mrp`       | Number           | Original price                       |
| `price`     | Number           | Selling price                        |
| `image`     | String (URL)     |                                       |
| `emiPlans`  | Array of EmiPlan |                                       |

**EmiPlan subdocument**

| Field           | Type   | Notes                        |
|-----------------|--------|-------------------------------|
| `tenureMonths`  | Number | e.g. 3, 6, 12, 24, 36, 48, 60 |
| `monthlyAmount` | Number | Rupees per month              |
| `interestRate`  | Number | e.g. 0 or 10.5                |
| `cashback`      | Number | Additional cashback in rupees |

A product/variant model was chosen (rather than one flat product-per-color-per-storage
document) because it mirrors how the reference page groups variants under one product
listing while keeping each variant's own price and EMI plans independent.

## Deployment

Deployed on Vercel. Set the `MONGODB_URI` environment variable in the Vercel project
settings (Project → Settings → Environment Variables) to the same connection string
used locally, then redeploy.

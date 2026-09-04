"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="min-h-screen">
      <header className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="grid place-items-center h-8 w-8 rounded-md text-white text-sm font-semibold"
              style={{ background: "var(--accent)" }}
            >
              1Fi
            </span>
            <span className="text-sm" style={{ color: "var(--ink-soft)" }}>
              Buy now, pay with your investments
            </span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-14 pb-8">
        <h1 className="text-3xl sm:text-4xl font-medium leading-tight" style={{ color: "var(--ink)" }}>
          Own it today. Your mutual funds cover the rest.
        </h1>
        <p className="mt-3 max-w-lg" style={{ color: "var(--ink-soft)" }}>
          Pick a phone, choose an EMI plan backed by your investments, and
          skip the credit check — plans starting at 0% interest.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        {error && (
          <p className="text-sm" style={{ color: "#b42318" }}>
            {error}
          </p>
        )}

        {!products && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-72 rounded-xl animate-pulse"
                style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
              />
            ))}
          </div>
        )}

        {products && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group rounded-xl p-4 transition-shadow hover:shadow-md"
                style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
              >
                <div className="relative h-40 w-full overflow-hidden rounded-lg" style={{ background: "var(--paper)" }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>
                    {p.brand}
                  </p>
                  <h2 className="mt-0.5 font-medium">{p.name}</h2>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-semibold">
                      ₹{p.startingPrice.toLocaleString("en-IN")}
                    </span>
                    {p.mrp > p.startingPrice && (
                      <span className="text-sm line-through" style={{ color: "var(--ink-soft)" }}>
                        ₹{p.mrp.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs" style={{ color: "var(--gain)" }}>
                    EMI plans from 0% interest
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

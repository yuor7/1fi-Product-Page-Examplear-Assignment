"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [variantId, setVariantId] = useState(null);
  const [selectedTenure, setSelectedTenure] = useState(null);
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data.product);
        setVariantId(data.product.variants[0].variantId);
        setSelectedTenure(data.product.variants[0].emiPlans[0].tenureMonths);
      })
      .catch((err) => setError(err.message));
  }, [slug]);

  const variant = useMemo(
    () => product?.variants.find((v) => v.variantId === variantId),
    [product, variantId]
  );

  const selectedPlan = useMemo(
    () => variant?.emiPlans.find((p) => p.tenureMonths === selectedTenure),
    [variant, selectedTenure]
  );

  if (error) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <p style={{ color: "#b42318" }}>{error}</p>
        <Link href="/" className="mt-4 inline-block text-sm underline" style={{ color: "var(--accent)" }}>
          Back to products
        </Link>
      </main>
    );
  }

  if (!product || !variant) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="h-96 rounded-xl animate-pulse" style={{ background: "var(--panel)", border: "1px solid var(--line)" }} />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <header className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-5xl px-6 py-5 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="grid place-items-center h-8 w-8 rounded-md text-white text-sm font-semibold"
              style={{ background: "var(--accent)" }}
            >
              1Fi
            </span>
          </Link>
          <span className="text-sm" style={{ color: "var(--ink-soft)" }}>/ {product.name}</span>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: product image + details */}
        <div>
          <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-xl" style={{ background: "var(--panel)", border: "1px solid var(--line)" }}>
            <Image
              src={variant.image}
              alt={`${product.name} ${variant.label}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              unoptimized
              priority
            />
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>
              {product.brand}
            </p>
            <h1 className="mt-1 text-2xl font-medium">{product.name}</h1>
            <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>{variant.storage}{variant.color ? ` · ${variant.color}` : ""}</p>

            {product.description && (
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {product.description}
              </p>
            )}

            {/* Variant selector */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Choose a variant</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.variantId}
                    onClick={() => {
                      setVariantId(v.variantId);
                      setSelectedTenure(v.emiPlans[0].tenureMonths);
                      setConfirmed(null);
                    }}
                    className="px-3 py-2 rounded-lg text-sm border transition-colors"
                    style={
                      v.variantId === variantId
                        ? { background: "var(--accent-soft)", borderColor: "var(--accent)", color: "var(--accent)" }
                        : { background: "var(--panel)", borderColor: "var(--line)", color: "var(--ink)" }
                    }
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: price + EMI plans */}
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold">₹{variant.price.toLocaleString("en-IN")}</span>
            {variant.mrp > variant.price && (
              <span className="text-base line-through" style={{ color: "var(--ink-soft)" }}>
                ₹{variant.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>EMI plans backed by mutual funds</p>

          <div className="mt-5 space-y-2">
            {variant.emiPlans.map((plan) => {
              const selected = plan.tenureMonths === selectedTenure;
              return (
                <button
                  key={plan.tenureMonths}
                  onClick={() => {
                    setSelectedTenure(plan.tenureMonths);
                    setConfirmed(null);
                  }}
                  className="w-full text-left rounded-lg px-4 py-3 border transition-colors flex items-center justify-between"
                  style={
                    selected
                      ? { background: "var(--accent-soft)", borderColor: "var(--accent)" }
                      : { background: "var(--panel)", borderColor: "var(--line)" }
                  }
                >
                  <div>
                    <p className="font-medium">
                      ₹{plan.monthlyAmount.toLocaleString("en-IN")}{" "}
                      <span className="font-normal" style={{ color: "var(--ink-soft)" }}>
                        x {plan.tenureMonths} months
                      </span>
                    </p>
                    {plan.cashback > 0 && (
                      <p className="text-xs mt-0.5" style={{ color: "var(--gain)" }}>
                        Additional cashback of ₹{plan.cashback.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full shrink-0"
                    style={
                      plan.interestRate === 0
                        ? { background: "var(--gain-soft)", color: "var(--gain)" }
                        : { background: "var(--paper)", color: "var(--ink-soft)", border: "1px solid var(--line)" }
                    }
                  >
                    {plan.interestRate === 0 ? "0% interest" : `${plan.interestRate}% interest`}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setConfirmed(selectedPlan)}
            className="mt-6 w-full rounded-lg py-3 font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Proceed with this plan
          </button>

          {confirmed && (
            <p className="mt-3 text-sm text-center" style={{ color: "var(--gain)" }}>
              Selected: ₹{confirmed.monthlyAmount.toLocaleString("en-IN")} x {confirmed.tenureMonths} months
              {confirmed.interestRate === 0 ? " at 0% interest" : ` at ${confirmed.interestRate}% interest`}.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

import "./globals.css";

export const metadata = {
  title: "1Fi — Buy now, pay with your investments",
  description: "Shop for phones with EMI plans backed by your mutual funds — 0% interest options included.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

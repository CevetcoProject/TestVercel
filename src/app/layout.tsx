import AppWrapper from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CEVETCO",
  description: "This is Next.js SignIn",
  // other metadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body><AppWrapper>{children}</AppWrapper></body>
    </html>
  );
}


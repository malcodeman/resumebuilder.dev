"use client";
import { Layout } from "components/Layout";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}

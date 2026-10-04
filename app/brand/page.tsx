import type { Metadata } from "next";
import BrandClient from "./BrandClient";

export const metadata: Metadata = {
  title: "Develop Your Brand",
  description: "A guided walkthrough for building an accessible colour palette and type choices.",
};

export default function BrandPage() {
  return <BrandClient />;
}
